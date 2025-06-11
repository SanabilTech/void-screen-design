
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { toast } from "@/hooks/use-toast";

export const useDocumentAccess = () => {
  const { session, isAdmin } = useAdminAuth();

  const getDocumentUrl = async (path: string | null): Promise<string | null> => {
    if (!path) return null;
    
    try {
      console.log(`Attempting to access document: ${path}`);
      
      // Check if we have a valid session with access token
      if (!session?.access_token || !isAdmin) {
        console.error("No valid session, access token, or admin privileges");
        toast({
          title: "Authentication Required",
          description: "You need to be logged in with admin access to view this document",
          variant: "destructive"
        });
        return null;
      }
      
      console.log("Using admin edge function for document access");
      
      // Call the admin-access-document Edge Function with the path
      const { data, error } = await supabase.functions.invoke('admin-access-document', {
        body: { documentPath: path },
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });
      
      if (error) {
        console.error("Edge function error:", error);
        toast({
          title: "Access Error",
          description: `Could not access document: ${error.message}`,
          variant: "destructive"
        });
        return null;
      }
      
      if (data?.signedUrl) {
        console.log("Successfully retrieved admin document URL");
        return data.signedUrl;
      } else {
        console.error("No signed URL returned from edge function", data);
        toast({
          title: "Document Error",
          description: "Could not generate document URL",
          variant: "destructive"
        });
        return null;
      }
    } catch (error: any) {
      console.error("Error accessing document:", error);
      toast({
        title: "System Error",
        description: `An unexpected error occurred: ${error.message}`,
        variant: "destructive"
      });
      return null;
    }
  };
  
  const getDocumentFileName = (path: string | null): string => {
    if (!path) return "No document";
    
    // Extract just the file name from the path
    const pathParts = path.split('/');
    const fileName = pathParts[pathParts.length - 1];
    
    // Clean up the file name by removing timestamp prefix if present
    const cleanName = fileName.replace(/^\d+-/, '');
    
    return cleanName;
  };

  // New method to get document information from the documents table
  const getOrderDocuments = async (orderId: string): Promise<{ 
    nationalIdPath: string | null;
    salaryCertificatePath: string | null;
  } | null> => {
    try {
      if (!session?.access_token || !isAdmin) {
        console.error("No valid session, access token, or admin privileges");
        return null;
      }
      
      const { data, error } = await supabase
        .from('documents')
        .select('national_id_path, salary_certificate_path')
        .eq('order_id', orderId)
        .maybeSingle();
      
      if (error) {
        console.error("Error fetching document paths:", error);
        return null;
      }
      
      if (!data) {
        // If no entry in documents table, try to get from orders table (backward compatibility)
        const { data: orderData, error: orderError } = await supabase
          .from('orders')
          .select('national_id_path, salary_certificate_path')
          .eq('id', orderId)
          .maybeSingle();
        
        if (orderError || !orderData) {
          return null;
        }
        
        return {
          nationalIdPath: orderData.national_id_path,
          salaryCertificatePath: orderData.salary_certificate_path
        };
      }
      
      return {
        nationalIdPath: data.national_id_path,
        salaryCertificatePath: data.salary_certificate_path
      };
    } catch (error) {
      console.error("Error getting order documents:", error);
      return null;
    }
  };

  return { getDocumentUrl, getDocumentFileName, getOrderDocuments };
};
