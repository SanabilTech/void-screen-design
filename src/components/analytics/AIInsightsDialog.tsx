
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles, Save, XCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useAdminAuth } from "@/context/AdminAuthContext";

interface AIInsightsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isAnalyzing: boolean;
  recommendations: string | null;
  onSave?: () => void;
  onDiscard?: () => void;
}

export function AIInsightsDialog({ 
  open, 
  onOpenChange, 
  isAnalyzing, 
  recommendations,
  onSave,
  onDiscard
}: AIInsightsDialogProps) {
  const { user } = useAdminAuth();
  
  const renderMarkdown = (content: string) => {
    // Split the content by lines to process each line
    return content.split('\n').map((line, lineIndex) => {
      // Process headings (# Heading)
      if (line.match(/^#{1,6}\s/)) {
        const level = line.match(/^(#{1,6})\s/)?.[1].length || 1;
        const text = line.replace(/^#{1,6}\s/, '');
        
        switch (level) {
          case 1:
            return <h1 key={lineIndex} className="text-2xl font-bold mt-6 mb-3">{text}</h1>;
          case 2:
            return <h2 key={lineIndex} className="text-xl font-bold mt-5 mb-2">{text}</h2>;
          case 3:
            return <h3 key={lineIndex} className="text-lg font-bold mt-4 mb-2">{text}</h3>;
          default:
            return <h4 key={lineIndex} className="text-base font-bold mt-3 mb-1">{text}</h4>;
        }
      }
      
      // Process bullet points
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        let bulletContent = line.trim().substring(2);
        
        // Handle bold text in bullets
        bulletContent = bulletContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        return (
          <div key={lineIndex} className="flex items-start gap-2 mb-2 ml-1">
            <Sparkles className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
            <p 
              className="m-0" 
              dangerouslySetInnerHTML={{ __html: bulletContent }}
            />
          </div>
        );
      }
      
      // Process bold text
      if (line.includes('**')) {
        return (
          <p 
            key={lineIndex} 
            className="mb-3"
            dangerouslySetInnerHTML={{ 
              __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            }}
          />
        );
      }
      
      // Regular paragraph
      if (line.trim()) {
        return <p key={lineIndex} className="mb-3">{line}</p>;
      }
      
      // Empty line
      return <div key={lineIndex} className="h-2" />;
    });
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI-Generated Insights
          </DialogTitle>
          <DialogDescription>
            Smart insights based on your platform's analytics data
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh] pr-4">
          {isAnalyzing ? (
            <div className="space-y-3 py-4">
              <div className="flex items-center justify-center">
                <div className="relative">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-primary animate-pulse" />
                </div>
              </div>
              <Skeleton className="h-4 w-4/5 mx-auto" />
              <Skeleton className="h-4 w-3/4 mx-auto" />
              <Skeleton className="h-4 w-5/6 mx-auto" />
              <Skeleton className="h-4 w-3/5 mx-auto" />
              <p className="text-center text-sm text-muted-foreground mt-4">
                Analyzing your platform data and generating insights...
              </p>
            </div>
          ) : (
            <div className="prose prose-sm max-w-none dark:prose-invert py-4">
              {recommendations ? (
                <div className="space-y-1">
                  {renderMarkdown(recommendations)}
                </div>
              ) : (
                <p className="text-center text-muted-foreground">
                  No recommendations available. Try analyzing your data first.
                </p>
              )}
            </div>
          )}
        </ScrollArea>
        
        {!isAnalyzing && recommendations && (
          <div className="flex justify-end gap-3 mt-4 pt-4 border-t">
            <Button 
              variant="outline" 
              onClick={onDiscard}
              className="flex items-center gap-2"
            >
              <XCircle className="h-4 w-4" />
              Discard
            </Button>
            <Button 
              onClick={onSave}
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              Save Report
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
