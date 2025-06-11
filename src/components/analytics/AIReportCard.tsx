
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Sparkles, Trash2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { AIInsightsDialog } from "./AIInsightsDialog";
import { useAdminAuth } from "@/context/AdminAuthContext";

export interface AIReport {
  id: string;
  title: string;
  date: string;
  recommendations: string;
}

interface AIReportCardProps {
  report: AIReport;
  onDelete: (id: string) => void;
}

export function AIReportCard({ report, onDelete }: AIReportCardProps) {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const { user } = useAdminAuth();
  
  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <CardTitle className="text-base">{report.title}</CardTitle>
            </div>
          </div>
          <CardDescription>{report.date}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm line-clamp-2">
            {report.recommendations.split('\n')[0] || "AI generated insights and recommendations"}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Open
              </Button>
            </DialogTrigger>
            <AIInsightsDialog
              open={dialogOpen}
              onOpenChange={setDialogOpen}
              isAnalyzing={false}
              recommendations={report.recommendations}
            />
          </Dialog>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => onDelete(report.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
