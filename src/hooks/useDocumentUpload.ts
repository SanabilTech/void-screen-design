
import { supabase } from "@/integrations/supabase/client";

export const useDocumentUpload = () => {
  const uploadDocuments = async (
    nationalIdFile: File,
    salaryCertificateFile: File
  ): Promise<{ 
    nationalIdPath: string | null;
    salaryCertificatePath: string | null;
    success: boolean;
    orderId: string | null;
  }> => {
    try {
      // Generate unique filenames for the uploaded documents
      const nationalIdFileName = `${Date.now()}-${nationalIdFile.name.replace(/\s+/g, '_')}`;
      const salaryCertFileName = `${Date.now()}-${salaryCertificateFile.name.replace(/\s+/g, '_')}`;
      
      // Upload the national ID to the verification-documents/national-id folder
      const natIdUpload = await supabase.storage
        .from('verification-documents')
        .upload(`national-id/${nationalIdFileName}`, nationalIdFile);
        
      if (natIdUpload.error) {
        console.error("Error uploading ID:", natIdUpload.error);
        return { nationalIdPath: null, salaryCertificatePath: null, success: false, orderId: null };
      }
      
      // Upload the salary certificate to the verification-documents/salary-certificate folder
      const salCertUpload = await supabase.storage
        .from('verification-documents')
        .upload(`salary-certificate/${salaryCertFileName}`, salaryCertificateFile);
      
      if (salCertUpload.error) {
        console.error("Error uploading salary certificate:", salCertUpload.error);
        return { nationalIdPath: null, salaryCertificatePath: null, success: false, orderId: null };
      }

      return {
        nationalIdPath: natIdUpload.data?.path || null,
        salaryCertificatePath: salCertUpload.data?.path || null,
        success: true,
        orderId: null // This will be set later when the order is created
      };
    } catch (error) {
      console.error("Error in document upload:", error);
      return { nationalIdPath: null, salaryCertificatePath: null, success: false, orderId: null };
    }
  };

  return { uploadDocuments };
};
