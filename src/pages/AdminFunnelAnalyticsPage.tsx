
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Filter, BarChart, PieChart } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { WebsiteFunnel } from "@/components/analytics/WebsiteFunnel";
import { subDays } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminFunnelAnalyticsPage: React.FC = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });
  const [deviceFilter, setDeviceFilter] = useState<string>("all");
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [viewType, setViewType] = useState<'funnel' | 'referrals'>('funnel');

  return (
    <div className="min-h-screen pt-24 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center mb-4">
          <Button variant="ghost" onClick={() => navigate("/admin/dashboard")} className="mr-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">User Journey Analytics</h1>
          <p className="text-gray-600">
            Track how users navigate through your website and identify potential drop-off points
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Website Analytics</CardTitle>
                  <CardDescription>
                    Analyze user journey and traffic sources
                  </CardDescription>
                </div>
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="funnel" className="mb-6" onValueChange={(value) => setViewType(value as 'funnel' | 'referrals')}>
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="funnel" className="flex items-center">
                    <BarChart className="h-4 w-4 mr-2" />
                    User Funnel
                  </TabsTrigger>
                  <TabsTrigger value="referrals" className="flex items-center">
                    <PieChart className="h-4 w-4 mr-2" />
                    Traffic Sources
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="w-full md:w-1/2">
                  <div className="text-sm font-medium mb-2">Date Range</div>
                  <DatePickerWithRange
                    date={dateRange}
                    setDate={setDateRange}
                    className="w-full"
                  />
                </div>
                <div className="w-full md:w-1/4">
                  <div className="text-sm font-medium mb-2">Device Type</div>
                  <Select
                    value={deviceFilter}
                    onValueChange={setDeviceFilter}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="All Devices" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Devices</SelectItem>
                      <SelectItem value="desktop">Desktop</SelectItem>
                      <SelectItem value="mobile">Mobile</SelectItem>
                      <SelectItem value="tablet">Tablet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {viewType === 'funnel' && (
                  <div className="w-full md:w-1/4">
                    <div className="text-sm font-medium mb-2">Traffic Source</div>
                    <Select
                      value={sourceFilter}
                      onValueChange={setSourceFilter}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="All Sources" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Sources</SelectItem>
                        <SelectItem value="direct">Direct</SelectItem>
                        <SelectItem value="organic">Organic Search</SelectItem>
                        <SelectItem value="social">Social Media</SelectItem>
                        <SelectItem value="referral">Referral</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="paid">Paid Ads</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              <div className="h-[500px]">
                <WebsiteFunnel
                  dateRange={dateRange}
                  deviceFilter={deviceFilter}
                  sourceFilter={sourceFilter}
                  viewType={viewType}
                />
              </div>

              <div className="bg-muted/30 p-4 rounded-md mt-6">
                <h3 className="font-medium mb-2">Understanding This Chart</h3>
                {viewType === 'funnel' ? (
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    <li>
                      This funnel shows the path users take through your website from landing to purchase
                    </li>
                    <li>
                      The width of each step represents the number of users at that stage
                    </li>
                    <li>
                      Hover over each step to see detailed information and drop-off rates
                    </li>
                    <li>
                      Use the filters above to analyze behavior across different devices and traffic sources
                    </li>
                  </ul>
                ) : (
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    <li>
                      This chart shows where your website traffic is coming from
                    </li>
                    <li>
                      Each bar represents a different traffic source (search engines, social media, etc.)
                    </li>
                    <li>
                      Use this data to identify which channels are bringing the most visitors
                    </li>
                    <li>
                      Filter by device type to see how traffic sources vary between desktop and mobile users
                    </li>
                  </ul>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminFunnelAnalyticsPage;
