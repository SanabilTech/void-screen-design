import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { 
  BarChart as BarChartIcon, 
  PieChart as PieChartIcon, 
  LineChart as LineChartIcon, 
  Sparkles, 
  TrendingUp,
  ShoppingBag,
  Filter,
  Download,
  ArrowLeft,
  FileText
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  Legend,
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid,
  LineChart,
  Line
} from 'recharts';
import { AIInsightsDialog } from '@/components/analytics/AIInsightsDialog';
import AIReportsList from '@/components/analytics/AIReportsList';
import KeyDesirabilityInsights from '@/components/analytics/KeyDesirabilityInsights';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';
import { format, subMonths } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { 
  ChartContainer, 
  ChartTooltipContent
} from '@/components/ui/chart';
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DateRange } from 'react-day-picker';
import { DatePickerWithRange } from '@/components/ui/date-range-picker';
import type { Database } from '@/integrations/supabase/types';
import { AIReport } from '@/components/analytics/AIReportCard';
import { useAdminAuth } from '@/context/AdminAuthContext';

type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];

type Order = Tables<"orders">;
type OrderWithDetails = Order & { 
  device_type?: string; 
  brand_category?: string; 
  product_type?: string;
  price_tier?: string;
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

const CHART_CONFIG = {
  condition: {
    new: { label: "New", color: "#0088FE" },
    refurbished: { label: "Refurbished", color: "#00C49F" },
    other: { label: "Other", color: "#FFBB28" }
  },
  deviceTier: {
    "high-end": { label: "High-end", color: "#FF8042" },
    "mid-range": { label: "Mid-range", color: "#8884d8" },
    "budget": { label: "Budget", color: "#82ca9d" }
  }
};

const AdminAnalyticsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [orders, setOrders] = useState<OrderWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendations, setRecommendations] = useState<string | null>(null);
  const [insightsDialogOpen, setInsightsDialogOpen] = useState(false);
  const [reportTitle, setReportTitle] = useState<string>('AI Product Strategy Insights');
  const [reportDate, setReportDate] = useState<string>(new Date().toISOString());
  const [dateRange, setDateRange] = useState<DateRange>({
    from: subMonths(new Date(), 3),
    to: new Date(),
  });
  const [timeframe, setTimeframe] = useState<'all' | 'monthly' | 'weekly'>('all');
  
  const [analyticsData, setAnalyticsData] = useState({
    conditions: [] as { name: string, value: number, percentage: number }[],
    deviceTiers: [] as { name: string, value: number, percentage: number }[],
    brands: [] as { name: string, value: number, percentage: number }[],
    productTypes: [] as { name: string, value: number, percentage: number }[],
    priceTiers: [] as { name: string, value: number, percentage: number }[],
    deviceCategories: [] as { name: string, value: number, percentage: number }[],
    
    protectionPlanAdoption: [] as { name: string, value: number, percentage: number }[],
    businessVsConsumer: [] as { name: string, value: number, percentage: number }[],
    leaseTermPreference: [] as { name: string, value: number, percentage: number }[],
    
    ordersOverTime: [] as { date: string, count: number }[],
    revenueOverTime: [] as { date: string, amount: number }[],
    
    totalOrderCount: 0,
    totalRevenue: 0,
    avgOrderValue: 0,
    protectionPlanRate: 0,
    highEndRate: 0,
    refurbishedRate: 0,
  });

  useEffect(() => {
    fetchOrders();
  }, [dateRange, timeframe]);

  const handleGoBack = () => {
    navigate('/admin/dashboard');
  };

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      let query = supabase
        .from("orders")
        .select("*");
      
      if (dateRange.from && dateRange.to) {
        query = query.gte('created_at', dateRange.from.toISOString())
                     .lte('created_at', dateRange.to.toISOString());
      }
      
      const { data, error } = await query.order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      const enhancedOrders = data.map(order => {
        const deviceType = categorizeDeviceType(order.product_name);
        const productType = categorizeProductType(order.product_name);
        const priceTier = categorizePriceTier(Number(order.total_monthly_price || 0));
        
        return {
          ...order,
          device_type: deviceType,
          product_type: productType,
          price_tier: priceTier
        };
      });

      setOrders(enhancedOrders);
      calculateAnalytics(enhancedOrders);
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to fetch orders: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const calculateAnalytics = (ordersData: OrderWithDetails[]) => {
    if (!ordersData.length) {
      setAnalyticsData({
        conditions: [],
        deviceTiers: [],
        brands: [],
        productTypes: [],
        priceTiers: [],
        deviceCategories: [],
        protectionPlanAdoption: [],
        businessVsConsumer: [],
        leaseTermPreference: [],
        ordersOverTime: [],
        revenueOverTime: [],
        totalOrderCount: 0,
        totalRevenue: 0,
        avgOrderValue: 0,
        protectionPlanRate: 0,
        highEndRate: 0,
        refurbishedRate: 0,
      });
      return;
    }

    const conditionCounts: Record<string, number> = {};
    const deviceTierCounts: Record<string, number> = {};
    const brandCounts: Record<string, number> = {};
    const productTypeCounts: Record<string, number> = {};
    const priceTierCounts: Record<string, number> = {};
    const leaseTermCounts: Record<string, number> = {};
    const deviceCategoryCounts: Record<string, number> = {};
    
    const ordersByDate: Record<string, number> = {};
    const revenueByDate: Record<string, number> = {};
    
    let totalRevenue = 0;
    let protectionPlanCount = 0;
    let businessOrderCount = 0;
    let highEndCount = 0;
    let refurbishedCount = 0;

    ordersData.forEach(order => {
      const condition = order.selected_condition || "unknown";
      conditionCounts[condition] = (conditionCounts[condition] || 0) + 1;
      
      if (condition.toLowerCase() === 'refurbished') {
        refurbishedCount++;
      }

      const deviceType = order.device_type || "unknown";
      deviceTierCounts[deviceType] = (deviceTierCounts[deviceType] || 0) + 1;
      
      if (deviceType === 'high-end') {
        highEndCount++;
      }

      const brand = getBrandFromProductName(order.product_name);
      brandCounts[brand] = (brandCounts[brand] || 0) + 1;

      const productType = order.product_type || "unknown";
      productTypeCounts[productType] = (productTypeCounts[productType] || 0) + 1;

      const deviceCategory = mapToDeviceCategory(productType);
      deviceCategoryCounts[deviceCategory] = (deviceCategoryCounts[deviceCategory] || 0) + 1;

      const priceTier = order.price_tier || "unknown";
      priceTierCounts[priceTier] = (priceTierCounts[priceTier] || 0) + 1;

      if (order.has_protection_plan) {
        protectionPlanCount++;
      }

      if (order.is_business_order) {
        businessOrderCount++;
      }

      let leaseTerm = "unknown";
      try {
        if (typeof order.selected_lease_term === 'string') {
          const leaseTermObj = JSON.parse(order.selected_lease_term);
          leaseTerm = leaseTermObj.name || "unknown";
        } else if (order.selected_lease_term && typeof order.selected_lease_term === 'object' && 'name' in order.selected_lease_term) {
          leaseTerm = String(order.selected_lease_term.name);
        }
      } catch (e) {
        console.error("Error parsing lease term:", e);
      }
      leaseTermCounts[leaseTerm] = (leaseTermCounts[leaseTerm] || 0) + 1;

      totalRevenue += Number(order.total_monthly_price || 0);

      const orderDate = formatDateForGrouping(order.created_at, timeframe);
      ordersByDate[orderDate] = (ordersByDate[orderDate] || 0) + 1;
      revenueByDate[orderDate] = (revenueByDate[orderDate] || 0) + Number(order.total_monthly_price || 0);
    });

    const totalOrders = ordersData.length;
    
    const conditionsData = Object.entries(conditionCounts).map(([name, value]) => ({
      name,
      value,
      percentage: (value / totalOrders) * 100
    })).sort((a, b) => b.value - a.value);

    const deviceTiersData = Object.entries(deviceTierCounts).map(([name, value]) => ({
      name,
      value,
      percentage: (value / totalOrders) * 100
    })).sort((a, b) => b.value - a.value);

    const brandsData = Object.entries(brandCounts).map(([name, value]) => ({
      name,
      value,
      percentage: (value / totalOrders) * 100
    })).sort((a, b) => b.value - a.value);

    const productTypesData = Object.entries(productTypeCounts).map(([name, value]) => ({
      name,
      value,
      percentage: (value / totalOrders) * 100
    })).sort((a, b) => b.value - a.value);
    
    const deviceCategoriesData = Object.entries(deviceCategoryCounts).map(([name, value]) => ({
      name,
      value,
      percentage: (value / totalOrders) * 100
    })).sort((a, b) => b.value - a.value);

    const priceTiersData = Object.entries(priceTierCounts).map(([name, value]) => ({
      name,
      value,
      percentage: (value / totalOrders) * 100
    })).sort((a, b) => {
      const order = ['premium', 'high', 'medium', 'low', 'budget', 'unknown'];
      return order.indexOf(a.name) - order.indexOf(b.name);
    });

    const protectionPlanData = [
      { name: "With Protection", value: protectionPlanCount, percentage: (protectionPlanCount / totalOrders) * 100 },
      { name: "Without Protection", value: totalOrders - protectionPlanCount, percentage: ((totalOrders - protectionPlanCount) / totalOrders) * 100 }
    ];

    const businessVsConsumerData = [
      { name: "Business", value: businessOrderCount, percentage: (businessOrderCount / totalOrders) * 100 },
      { name: "Consumer", value: totalOrders - businessOrderCount, percentage: ((totalOrders - businessOrderCount) / totalOrders) * 100 }
    ];

    const leaseTermData = Object.entries(leaseTermCounts).map(([name, value]) => ({
      name,
      value,
      percentage: (value / totalOrders) * 100
    })).sort((a, b) => b.value - a.value);

    const ordersTimeSeriesData = Object.entries(ordersByDate)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const revenueTimeSeriesData = Object.entries(revenueByDate)
      .map(([date, amount]) => ({ date, amount }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    setAnalyticsData({
      conditions: conditionsData,
      deviceTiers: deviceTiersData,
      brands: brandsData,
      productTypes: productTypesData,
      priceTiers: priceTiersData,
      deviceCategories: deviceCategoriesData,
      protectionPlanAdoption: protectionPlanData,
      businessVsConsumer: businessVsConsumerData,
      leaseTermPreference: leaseTermData,
      ordersOverTime: ordersTimeSeriesData,
      revenueOverTime: revenueTimeSeriesData,
      totalOrderCount: totalOrders,
      totalRevenue: totalRevenue,
      avgOrderValue: totalOrders ? totalRevenue / totalOrders : 0,
      protectionPlanRate: totalOrders ? (protectionPlanCount / totalOrders) * 100 : 0,
      highEndRate: totalOrders ? (highEndCount / totalOrders) * 100 : 0,
      refurbishedRate: totalOrders ? (refurbishedCount / totalOrders) * 100 : 0,
    });
  };

  const categorizeDeviceType = (productName: string): string => {
    const lowerName = productName.toLowerCase();
    if (lowerName.includes("pro") || lowerName.includes("max") || lowerName.includes("ultra")) {
      return "high-end";
    } else if (lowerName.includes("plus") || lowerName.includes("air")) {
      return "mid-range";
    }
    return "budget";
  };

  const categorizeProductType = (productName: string): string => {
    const lowerName = productName.toLowerCase();
    if (lowerName.includes("phone") || lowerName.includes("iphone")) {
      return "smartphone";
    } else if (lowerName.includes("macbook") || lowerName.includes("laptop")) {
      return "laptop";
    }
    return "other";
  };

  const categorizePriceTier = (price: number): string => {
    if (price >= 300) {
      return "premium";
    } else if (price >= 200) {
      return "high";
    } else if (price >= 150) {
      return "medium";
    } else if (price >= 100) {
      return "low";
    }
    return "budget";
  };

  const getBrandFromProductName = (productName: string): string => {
    const lowerName = productName.toLowerCase();
    if (lowerName.includes("apple") || lowerName.includes("iphone") || lowerName.includes("macbook")) {
      return "Apple";
    } else if (lowerName.includes("samsung")) {
      return "Samsung";
    } else if (lowerName.includes("huawei")) {
      return "Huawei";
    } else if (lowerName.includes("lenovo")) {
      return "Lenovo";
    }
    return "Other";
  };

  const formatDateForGrouping = (dateString: string, timeframe: string): string => {
    const date = new Date(dateString);
    
    switch (timeframe) {
      case 'weekly':
        const firstDayOfWeek = new Date(date);
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 1);
        firstDayOfWeek.setDate(diff);
        return format(firstDayOfWeek, 'yyyy-MM-dd');
      
      case 'monthly':
        return format(date, 'yyyy-MM');
      
      default:
        return format(date, 'yyyy-MM-dd');
    }
  };

  const exportAnalyticsToCSV = () => {
    try {
      const headers = [
        'Category',
        'Subcategory',
        'Value',
        'Percentage'
      ].join(',');

      const rows = [
        ...analyticsData.deviceTiers.map(item => 
          [`Device Tier,${item.name},${item.value},${item.percentage.toFixed(2)}%`]
        ),
        ...analyticsData.conditions.map(item => 
          [`Condition,${item.name},${item.value},${item.percentage.toFixed(2)}%`]
        ),
        ...analyticsData.brands.map(item => 
          [`Brand,${item.name},${item.value},${item.percentage.toFixed(2)}%`]
        ),
        ...analyticsData.productTypes.map(item => 
          [`Product Type,${item.name},${item.value},${item.percentage.toFixed(2)}%`]
        ),
        ...analyticsData.priceTiers.map(item => 
          [`Price Tier,${item.name},${item.value},${item.percentage.toFixed(2)}%`]
        ),
        ...analyticsData.protectionPlanAdoption.map(item => 
          [`Protection Plan,${item.name},${item.value},${item.percentage.toFixed(2)}%`]
        ),
        ...analyticsData.businessVsConsumer.map(item => 
          [`Customer Type,${item.name},${item.value},${item.percentage.toFixed(2)}%`]
        ),
        ...analyticsData.leaseTermPreference.map(item => 
          [`Lease Term,${item.name},${item.value},${item.percentage.toFixed(2)}%`]
        ),
      ];

      const summaryRows = [
        `Key Metrics,Total Orders,${analyticsData.totalOrderCount},100%`,
        `Key Metrics,Total Revenue,${analyticsData.totalRevenue.toFixed(2)},100%`,
        `Key Metrics,Average Order Value,${analyticsData.avgOrderValue.toFixed(2)},-`,
        `Key Metrics,Protection Plan Rate,${analyticsData.protectionPlanRate.toFixed(2)}%,-`,
        `Key Metrics,High-End Device Rate,${analyticsData.highEndRate.toFixed(2)}%,-`,
        `Key Metrics,Refurbished Rate,${analyticsData.refurbishedRate.toFixed(2)}%,-`,
      ];

      const csvContent = `${headers}\n${rows.join('\n')}\n${summaryRows.join('\n')}`;
      
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `analytics_export_${new Date().toISOString().slice(0,10)}.csv`);
      link.style.visibility = 'hidden';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Export Successful",
        description: "Analytics data exported to CSV",
      });
    } catch (error: any) {
      console.error("Export error:", error);
      toast({
        title: "Export Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const calculateHighEndRate = () => {
    return analyticsData.highEndRate;
  };
  
  const calculateRefurbishedRate = () => {
    return analyticsData.refurbishedRate;
  };
  
  const calculateProtectionPlanRate = () => {
    return analyticsData.protectionPlanRate;
  };
  
  const calculateAverageOrderValue = () => {
    return analyticsData.avgOrderValue;
  };
  
  const deviceTierData = analyticsData.deviceTiers;
  const brandData = analyticsData.brands;
  const conditionData = analyticsData.conditions;
  const productTypeData = analyticsData.productTypes;
  const businessVsConsumerData = analyticsData.businessVsConsumer;
  const leaseTermPreferenceData = analyticsData.leaseTermPreference;

  const generateInsights = async () => {
    setInsightsDialogOpen(true);
    setIsAnalyzing(true);
    setRecommendations(null);
    
    try {
      const insightsData = {
        highEndRate: calculateHighEndRate(),
        refurbishedRate: calculateRefurbishedRate(),
        protectionPlanRate: calculateProtectionPlanRate(),
        avgOrderValue: calculateAverageOrderValue(),
        deviceTiers: deviceTierData,
        brands: brandData,
        conditions: conditionData,
        productTypes: productTypeData,
        deviceCategories: analyticsData.deviceCategories,
        businessVsConsumer: businessVsConsumerData,
        leaseTermPreference: leaseTermPreferenceData,
        totalOrderCount: analyticsData.totalOrderCount,
      };
      
      const { data, error } = await supabase.functions.invoke('analyze-insights', {
        body: { insightsData },
      });
      
      if (error) {
        console.error('Error analyzing insights:', error.message);
        setRecommendations('Error generating insights. Please try again.');
      } else {
        setRecommendations(data.recommendations);
        setReportTitle(data.title || 'AI Product Strategy Insights');
        setReportDate(data.date || new Date().toISOString());
      }
    } catch (error) {
      console.error('Error:', error);
      setRecommendations('An unexpected error occurred. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const saveReport = () => {
    if (!recommendations || !reportTitle) return;
    
    const newReport: AIReport = {
      id: uuidv4(),
      title: reportTitle,
      date: new Date(reportDate || new Date()).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      recommendations: recommendations,
    };
    
    const existingReportsJSON = localStorage.getItem('ai-reports');
    const existingReports: AIReport[] = existingReportsJSON ? JSON.parse(existingReportsJSON) : [];
    
    const updatedReports = [newReport, ...existingReports];
    
    localStorage.setItem('ai-reports', JSON.stringify(updatedReports));
    
    setInsightsDialogOpen(false);
    toast({
      title: "Report saved",
      description: "The AI insights report has been saved to your dashboard.",
    });
  };

  const discardReport = () => {
    setInsightsDialogOpen(false);
    toast({
      title: "Report discarded",
      description: "The AI insights report has been discarded.",
      variant: "destructive",
    });
  };

  const mapToDeviceCategory = (productType: string): string => {
    const lowerType = productType.toLowerCase();
    if (lowerType.includes('smartphone') || lowerType.includes('phone')) {
      return 'Smartphone';
    } else if (lowerType.includes('laptop')) {
      return 'Laptop';
    } else if (lowerType.includes('tablet')) {
      return 'Tablet';
    } else if (lowerType.includes('watch') || lowerType.includes('wearable')) {
      return 'Wearable';
    }
    return 'Other';
  };

  return (
    <div className="container mx-auto p-8 pt-24">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleGoBack}
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold">Desirability Analytics</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={exportAnalyticsToCSV}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button 
            onClick={generateInsights}
            className="relative group overflow-hidden"
            style={{
              background: "linear-gradient(to right, #8B5CF6, #C4B5FD)",
            }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-purple-300/20 opacity-0 group-hover:opacity-100 animate-pulse rounded-md transition-opacity duration-300"></span>
            <Sparkles className="mr-2 h-4 w-4 text-white animate-pulse" />
            AI Analysis
          </Button>
        </div>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="py-3 px-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-primary" />
            <CardTitle className="text-lg">Filter Data</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="py-3 px-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[180px]">
              <p className="text-xs font-medium mb-1">Date Range</p>
              <DatePickerWithRange 
                date={dateRange} 
                setDate={(range) => {
                  if (range?.from && range?.to) {
                    setDateRange({ from: range.from, to: range.to });
                  }
                }}
                className="w-full"
              />
            </div>
            <div className="w-[160px]">
              <p className="text-xs font-medium mb-1">Time Grouping</p>
              <Select 
                value={timeframe}
                onValueChange={(value) => setTimeframe(value as 'all' | 'monthly' | 'weekly')}
              >
                <SelectTrigger className="text-xs h-9">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Data</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button onClick={fetchOrders} size="sm" className="h-9 text-xs">
                Apply Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analyticsData.totalOrderCount.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              SAR {analyticsData.totalRevenue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              SAR {analyticsData.avgOrderValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Protection Plan Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analyticsData.protectionPlanRate.toFixed(1)}%
            </div>
          </CardContent>
        </Card>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading analytics data...</p>
          </div>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">No Orders Found</h3>
          <p className="text-muted-foreground">
            There are no orders in the selected date range to analyze.
          </p>
        </div>
      ) : (
        <>
          <Tabs defaultValue="product" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="product" className="flex items-center gap-1 text-xs md:text-sm">
                <PieChartIcon className="h-3 w-3 md:h-4 md:w-4" />
                Product Preferences
              </TabsTrigger>
              <TabsTrigger value="customer" className="flex items-center gap-1 text-xs md:text-sm">
                <BarChartIcon className="h-3 w-3 md:h-4 md:w-4" />
                Customer Behavior
              </TabsTrigger>
              <TabsTrigger value="trends" className="flex items-center gap-1 text-xs md:text-sm">
                <TrendingUp className="h-3 w-3 md:h-4 md:w-4" />
                Time Trends
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="product" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Device Tier Distribution</CardTitle>
                    <CardDescription>
                      High-end vs mid-range vs budget devices
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="h-80">
                      <ChartContainer config={CHART_CONFIG.deviceTier}>
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={analyticsData.deviceTiers}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {analyticsData.deviceTiers.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip content={<ChartTooltipContent />} />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Condition Preference</CardTitle>
                    <CardDescription>
                      New vs refurbished devices
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="h-80">
                      <ChartContainer config={CHART_CONFIG.condition}>
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={analyticsData.conditions}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {analyticsData.conditions.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip content={<ChartTooltipContent />} />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Price Tier Distribution</CardTitle>
                    <CardDescription>
                      Distribution by price range
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="h-80">
                      <ChartContainer config={{
                        premium: { label: "Premium", color: "#FF8042" },
                        high: { label: "High", color: "#8884d8" },
                        medium: { label: "Medium", color: "#82ca9d" },
                        low: { label: "Low", color: "#FFBB28" },
                        budget: { label: "Budget", color: "#0088FE" },
                      }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={analyticsData.priceTiers}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Bar dataKey="value" name="Number of Orders">
                              {analyticsData.priceTiers.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Brand Preference</CardTitle>
                    <CardDescription>
                      Distribution by brand
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="h-80">
                      <ChartContainer config={{
                        Apple: { label: "Apple", color: "#0088FE" },
                        Samsung: { label: "Samsung", color: "#00C49F" },
                        Huawei: { label: "Huawei", color: "#FFBB28" },
                        Lenovo: { label: "Lenovo", color: "#FF8042" },
                        Other: { label: "Other", color: "#8884d8" },
                      }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={analyticsData.brands}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Bar dataKey="value" name="Number of Orders">
                              {analyticsData.brands.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Device Category Distribution</CardTitle>
                    <CardDescription>
                      Distribution by device category
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="h-80">
                      <ChartContainer config={{
                        "Smartphone": { label: "Smartphone", color: "#0088FE" },
                        "Laptop": { label: "Laptop", color: "#00C49F" },
                        "Tablet": { label: "Tablet", color: "#FFBB28" },
                        "Wearable": { label: "Wearable", color: "#FF8042" },
                        "Other": { label: "Other", color: "#8884d8" },
                      }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={analyticsData.deviceCategories}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {analyticsData.deviceCategories.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip content={<ChartTooltipContent />} />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="customer" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Protection Plan Adoption</CardTitle>
                    <CardDescription>
                      Percentage of orders with protection plans
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="h-80">
                      <ChartContainer config={{
                        "With Protection": { label: "With Protection", color: "#0088FE" },
                        "Without Protection": { label: "Without Protection", color: "#00C49F" },
                      }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={analyticsData.protectionPlanAdoption}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              <Cell fill="#0088FE" />
                              <Cell fill="#00C49F" />
                            </Pie>
                            <Tooltip content={<ChartTooltipContent />} />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Business vs Consumer</CardTitle>
                    <CardDescription>
                      Business and consumer order distribution
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="h-80">
                      <ChartContainer config={{
                        "Business": { label: "Business", color: "#FF8042" },
                        "Consumer": { label: "Consumer", color: "#8884d8" },
                      }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={analyticsData.businessVsConsumer}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              <Cell fill="#FF8042" />
                              <Cell fill="#8884d8" />
                            </Pie>
                            <Tooltip content={<ChartTooltipContent />} />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Lease Term Preference</CardTitle>
                    <CardDescription>
                      Preferred lease duration analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="h-80">
                      <ChartContainer config={{
                        "12 Months": { label: "12 Months", color: "#0088FE" },
                        "24 Months": { label: "24 Months", color: "#00C49F" },
                        "36 Months": { label: "36 Months", color: "#FFBB28" },
                        "unknown": { label: "Unknown", color: "#8884d8" },
                      }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={analyticsData.leaseTermPreference}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Bar dataKey="value" name="Number of Orders">
                              {analyticsData.leaseTermPreference.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Product Type Distribution</CardTitle>
                    <CardDescription>
                      Phones vs laptops vs other devices
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="h-80">
                      <ChartContainer config={{
                        "smartphone": { label: "Smartphone", color: "#0088FE" },
                        "laptop": { label: "Laptop", color: "#00C49F" },
                        "other": { label: "Other", color: "#FFBB28" },
                      }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={analyticsData.productTypes}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Bar dataKey="value" name="Number of Orders">
                              {analyticsData.productTypes.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="trends" className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <Card>
                  <CardHeader className="py-4 px-4">
                    <CardTitle className="text-lg">Orders Over Time</CardTitle>
                    <CardDescription className="text-xs">
                      Order count trends over the selected time period
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 pb-4 px-4">
                    <div className="h-[300px] w-full overflow-hidden">
                      <ChartContainer config={{
                        "Orders": { label: "Orders", color: "#8884d8" },
                      }}>
                        <LineChart
                          data={analyticsData.ordersOverTime}
                          margin={{ top: 5, right: 10, left: 0, bottom: 30 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="date" 
                            tick={{ fontSize: 10 }}
                            angle={-30}
                            textAnchor="end"
                            height={50}
                            tickMargin={8}
                            scale="point"
                            interval={Math.ceil(analyticsData.ordersOverTime.length / 10)}
                          />
                          <YAxis tick={{ fontSize: 10 }} width={30} />
                          <Tooltip content={<ChartTooltipContent />} />
                          <Legend wrapperStyle={{ fontSize: '10px' }} />
                          <Line 
                            type="monotone" 
                            dataKey="count" 
                            name="Order Count" 
                            stroke="#8884d8" 
                            activeDot={{ r: 6 }} 
                            strokeWidth={1.5}
                            dot={{ r: 3 }}
                          />
                        </LineChart>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="py-4 px-4">
                    <CardTitle className="text-lg">Revenue Over Time</CardTitle>
                    <CardDescription className="text-xs">
                      Revenue trends over the selected time period
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 pb-4 px-4">
                    <div className="h-[300px] w-full overflow-hidden">
                      <ChartContainer config={{
                        "Revenue": { label: "Revenue", color: "#82ca9d" },
                      }}>
                        <LineChart
                          data={analyticsData.revenueOverTime}
                          margin={{ top: 5, right: 10, left: 0, bottom: 30 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="date" 
                            tick={{ fontSize: 10 }}
                            angle={-30}
                            textAnchor="end"
                            height={50}
                            tickMargin={8}
                            scale="point"
                            interval={Math.ceil(analyticsData.revenueOverTime.length / 10)}
                          />
                          <YAxis tick={{ fontSize: 10 }} width={40} />
                          <Tooltip content={<ChartTooltipContent />} />
                          <Legend wrapperStyle={{ fontSize: '10px' }} />
                          <Line 
                            type="monotone" 
                            dataKey="amount" 
                            name="Revenue (SAR)" 
                            stroke="#82ca9d" 
                            activeDot={{ r: 6 }} 
                            strokeWidth={1.5}
                            dot={{ r: 3 }}
                          />
                        </LineChart>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
          
          <KeyDesirabilityInsights 
            highEndRate={analyticsData.highEndRate}
            refurbishedRate={analyticsData.refurbishedRate}
            protectionPlanRate={analyticsData.protectionPlanRate}
            topBrand={analyticsData.brands[0]?.name || 'Unknown'}
            topProductType={analyticsData.productTypes[0]?.name || 'Unknown'}
            avgOrderValue={analyticsData.avgOrderValue}
            totalOrderCount={analyticsData.totalOrderCount}
          />
        </>
      )}
      
      <AIInsightsDialog
        open={insightsDialogOpen}
        onOpenChange={setInsightsDialogOpen}
        isAnalyzing={isAnalyzing}
        recommendations={recommendations}
        onSave={saveReport}
        onDiscard={discardReport}
      />
      
      <AIReportsList />
    </div>
  );
};

export default AdminAnalyticsPage;
