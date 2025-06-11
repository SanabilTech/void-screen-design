
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { AIReport, AIReportCard } from './AIReportCard';
import { Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAdminAuth } from '@/context/AdminAuthContext';

const AIReportsList = () => {
  const [reports, setReports] = useState<AIReport[]>([]);
  const { toast } = useToast();
  const { user } = useAdminAuth();

  useEffect(() => {
    // Load reports whenever the component mounts or window is focused
    loadReports();
    
    // Add event listener for storage changes to handle updates from other tabs
    window.addEventListener('storage', handleStorageChange);
    
    // Add event listener for window focus to refresh reports
    window.addEventListener('focus', loadReports);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', loadReports);
    };
  }, []);

  const loadReports = () => {
    const reportsJSON = localStorage.getItem('ai-reports');
    if (reportsJSON) {
      try {
        const parsedReports = JSON.parse(reportsJSON);
        setReports(parsedReports);
      } catch (error) {
        console.error('Error parsing reports:', error);
      }
    }
  };

  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === 'ai-reports') {
      loadReports();
    }
  };

  const handleDeleteReport = (id: string) => {
    const updatedReports = reports.filter(report => report.id !== id);
    setReports(updatedReports);
    localStorage.setItem('ai-reports', JSON.stringify(updatedReports));
    
    toast({
      title: "Report deleted",
      description: "The AI insights report has been removed.",
    });
  };

  if (reports.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <CardTitle className="text-xl">AI Insights Reports</CardTitle>
            </div>
          </div>
          <CardDescription>
            Saved analysis and recommendations from AI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reports.map(report => (
              <AIReportCard
                key={report.id}
                report={report}
                onDelete={handleDeleteReport}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIReportsList;
