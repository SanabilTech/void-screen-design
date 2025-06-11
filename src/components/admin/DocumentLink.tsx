
import { useState } from "react";
import { FileText, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDocumentAccess } from "@/hooks/useDocumentAccess";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";
import { useAdminAuth } from "@/context/AdminAuthContext";

interface DocumentLinkProps {
  documentPath: string | null;
  label: string;
  orderId?: string;
}

const DocumentLink = ({ documentPath, label, orderId }: DocumentLinkProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { getDocumentUrl, getDocumentFileName, getOrderDocuments } = useDocumentAccess();
  const { session, isAdmin } = useAdminAuth();
  const fileName = getDocumentFileName(documentPath);
  
  const checkAdminAccess = () => {
    if (!session?.access_token) {
      toast({
        title: "Authentication Required",
        description: "You must be logged in as an admin to access documents",
        variant: "destructive"
      });
      return false;
    }
    
    if (!isAdmin) {
      toast({
        title: "Unauthorized",
        description: "You need admin privileges to access documents",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };
  
  const handleViewDocument = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    
    if (!checkAdminAccess()) return;
    setIsLoading(true);
    
    try {
      // If we have orderId but no documentPath, try to fetch from documents table
      let path = documentPath;
      if (!path && orderId) {
        const documents = await getOrderDocuments(orderId);
        if (documents) {
          if (label.toLowerCase().includes('national')) {
            path = documents.nationalIdPath;
          } else if (label.toLowerCase().includes('salary')) {
            path = documents.salaryCertificatePath;
          }
        }
      }
      
      if (!path) {
        toast({
          title: "Document Not Found",
          description: "This document is not available",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }
      
      console.log("Accessing document path:", path);
      console.log("Auth status:", { 
        hasSession: !!session, 
        isAdmin, 
        accessToken: session?.access_token ? "Present" : "Missing",
        tokenLength: session?.access_token ? session.access_token.length : 0
      });
      
      const url = await getDocumentUrl(path);
      if (url) {
        console.log("Opening document URL in new tab");
        window.open(url, "_blank", "noopener,noreferrer");
      } else {
        toast({
          title: "Unable to Access Document",
          description: "There was a problem generating the document URL. Please check the console for details.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error viewing document:", error);
      toast({
        title: "Error",
        description: "Failed to access document. Check browser console for details.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDownloadDocument = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    
    if (!checkAdminAccess()) return;
    setIsLoading(true);
    
    try {
      // If we have orderId but no documentPath, try to fetch from documents table
      let path = documentPath;
      if (!path && orderId) {
        const documents = await getOrderDocuments(orderId);
        if (documents) {
          if (label.toLowerCase().includes('national')) {
            path = documents.nationalIdPath;
          } else if (label.toLowerCase().includes('salary')) {
            path = documents.salaryCertificatePath;
          }
        }
      }
      
      if (!path) {
        toast({
          title: "Document Not Found",
          description: "This document is not available",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }
      
      console.log("Downloading document path:", path);
      
      const url = await getDocumentUrl(path);
      if (url) {
        const docFileName = getDocumentFileName(path);
        console.log("Starting document download:", docFileName);
        const a = document.createElement('a');
        a.href = url;
        a.download = docFileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        toast({
          title: "Download Started",
          description: `Downloading ${docFileName}`,
        });
      } else {
        toast({
          title: "Unable to Download Document",
          description: "There was a problem generating the download link. Please check the console for details.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error downloading document:", error);
      toast({
        title: "Error",
        description: "Failed to download document. Check browser console for details.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Check if we might have a document available via the orderId even if documentPath is not provided
  const mightHaveDocument = !!documentPath || !!orderId;

  if (!mightHaveDocument) {
    return (
      <div className="flex items-center text-muted-foreground text-xs">
        <FileText className="h-4 w-4 mr-1 text-muted-foreground" />
        <span>{label}: Not uploaded</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="text-xs font-medium mb-1">{label}:</div>
      <div className="flex items-center gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                className="h-8 px-2 text-xs"
                onClick={handleViewDocument}
                disabled={isLoading}
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                View
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View {fileName || "document"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                className="h-8 px-2 text-xs"
                onClick={handleDownloadDocument}
                disabled={isLoading}
              >
                <Download className="h-3 w-3 mr-1" />
                Download
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Download {fileName || "document"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default DocumentLink;
