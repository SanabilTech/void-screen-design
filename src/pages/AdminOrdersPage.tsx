import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { formatDistanceToNow, parseISO } from "date-fns";
import { PieChart, Pie, BarChart, Bar, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Filter, Calendar, ShoppingBag, CircleDollarSign, Smartphone, Laptop, ChevronDown, ChevronRight, Download, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import SARSymbol from "@/components/ui/SARSymbol";
import DocumentLink from "@/components/admin/DocumentLink";
import { Badge } from "@/components/ui/badge";

type Order = Tables<"orders">;
type OrderWithDetails = Order & { device_type?: string; brand_category?: string; product_type?: string };

type OrderGroup = {
  key: string; // Email or phone
  user_name: string;
  user_email: string;
  user_phone: string;
  totalOrders: number;
  totalValue: number;
  orders: OrderWithDetails[];
  isExpanded: boolean;
  latestOrderDate: string;
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
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

const AdminOrdersPage: React.FC = () => {
  const { user, isAdmin } = useAdminAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [orders, setOrders] = useState<OrderWithDetails[]>([]);
  const [orderGroups, setOrderGroups] = useState<OrderGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statsData, setStatsData] = useState({
    conditions: [] as { name: string, value: number }[],
    brands: [] as { name: string, value: number }[],
    deviceTypes: [] as { name: string, value: number }[],
    productTypes: [] as { name: string, value: number }[]
  });

  useEffect(() => {
    if (!user || !isAdmin) {
      navigate("/admin");
      return;
    }
    
    fetchOrders();
  }, [user, isAdmin, navigate]);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      const enhancedOrders = data.map(order => {
        const deviceType = categorizeDeviceType(order.product_name);
        const productType = categorizeProductType(order.product_name);
        
        return {
          ...order,
          device_type: deviceType,
          product_type: productType
        };
      });

      setOrders(enhancedOrders);
      groupOrdersByUser(enhancedOrders);
      calculateStats(enhancedOrders);
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

  const groupOrdersByUser = (ordersData: OrderWithDetails[]) => {
    const groupMap = new Map<string, OrderGroup>();
    
    ordersData.forEach(order => {
      const key = order.user_email || order.user_phone;
      
      if (key) {
        if (!groupMap.has(key)) {
          groupMap.set(key, {
            key,
            user_name: order.user_name,
            user_email: order.user_email,
            user_phone: order.user_phone,
            totalOrders: 0,
            totalValue: 0,
            orders: [],
            isExpanded: false,
            latestOrderDate: order.created_at
          });
        }
        
        const group = groupMap.get(key)!;
        group.orders.push(order);
        group.totalOrders += 1;
        group.totalValue += Number(order.total_monthly_price || 0);
        
        // Update the latest order date if this order is more recent
        if (order.created_at && (!group.latestOrderDate || order.created_at > group.latestOrderDate)) {
          group.latestOrderDate = order.created_at;
        }
      }
    });
    
    // Sort groups by the most recent order date (newest first)
    const groups = Array.from(groupMap.values()).sort((a, b) => {
      // Sort by latest order date in descending order (newest first)
      return new Date(b.latestOrderDate).getTime() - new Date(a.latestOrderDate).getTime();
    });
    
    setOrderGroups(groups);
  };

  const toggleGroupExpansion = (groupKey: string) => {
    setOrderGroups(prevGroups => 
      prevGroups.map(group => 
        group.key === groupKey 
          ? { ...group, isExpanded: !group.isExpanded } 
          : group
      )
    );
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
    if (
      lowerName.includes("phone") || 
      lowerName.includes("iphone") || 
      lowerName.includes("samsung") || 
      lowerName.includes("android") || 
      lowerName.includes("huawei")
    ) {
      return "smartphone";
    } else if (
      lowerName.includes("macbook") || 
      lowerName.includes("laptop") || 
      lowerName.includes("lenovo") || 
      lowerName.includes("windows")
    ) {
      return "laptop";
    }
    return "other";
  };

  const calculateStats = (ordersData: OrderWithDetails[]) => {
    const conditionCounts: Record<string, number> = {};
    const brandCounts: Record<string, number> = {};
    const deviceTypeCounts: Record<string, number> = {};
    const productTypeCounts: Record<string, number> = {};

    ordersData.forEach(order => {
      const condition = order.selected_condition || "unknown";
      conditionCounts[condition] = (conditionCounts[condition] || 0) + 1;

      const brand = getBrandFromProductName(order.product_name);
      brandCounts[brand] = (brandCounts[brand] || 0) + 1;

      const deviceType = order.device_type || "unknown";
      deviceTypeCounts[deviceType] = (deviceTypeCounts[deviceType] || 0) + 1;

      const productType = order.product_type || "unknown";
      productTypeCounts[productType] = (productTypeCounts[productType] || 0) + 1;
    });

    setStatsData({
      conditions: Object.entries(conditionCounts).map(([name, value]) => ({ name, value })),
      brands: Object.entries(brandCounts).map(([name, value]) => ({ name, value })),
      deviceTypes: Object.entries(deviceTypeCounts).map(([name, value]) => ({ name, value })),
      productTypes: Object.entries(productTypeCounts).map(([name, value]) => ({ name, value }))
    });
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

  const formatDate = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (e) {
      console.error("Error formatting date:", e, dateString);
      return dateString;
    }
  };

  const exportOrdersToCSV = () => {
    try {
      console.log(`Exporting ${orders.length} orders to CSV`);
      
      const headers = [
        'ID',
        'Customer Name',
        'Email',
        'Phone',
        'Business',
        'Product',
        'Condition',
        'Color',
        'Storage',
        'Lease Term',
        'Has Protection',
        'Protection Price',
        'Monthly Price',
        'Total Price',
        'Order Date'
      ].join(',');
      
      const rows = orders.map(order => {
        let colorName = 'N/A';
        let storageCapacity = 'N/A';
        let leaseTermName = 'N/A';

        try {
          let colorData;
          if (typeof order.selected_color === 'string') {
            colorData = JSON.parse(order.selected_color);
          } else {
            colorData = order.selected_color;
          }
          if (colorData && typeof colorData === 'object' && 'name' in colorData) {
            colorName = String(colorData.name);
          }
        } catch (e) {
          console.error("Error parsing color:", e);
        }
        
        try {
          let storageData;
          if (typeof order.selected_storage === 'string') {
            storageData = JSON.parse(order.selected_storage);
          } else {
            storageData = order.selected_storage;
          }
          if (storageData && typeof storageData === 'object' && 'capacity' in storageData) {
            storageCapacity = String(storageData.capacity);
          }
        } catch (e) {
          console.error("Error parsing storage:", e);
        }
        
        try {
          let leaseTermData;
          if (typeof order.selected_lease_term === 'string') {
            leaseTermData = JSON.parse(order.selected_lease_term);
          } else {
            leaseTermData = order.selected_lease_term;
          }
          if (leaseTermData && typeof leaseTermData === 'object' && 'name' in leaseTermData) {
            leaseTermName = String(leaseTermData.name);
          }
        } catch (e) {
          console.error("Error parsing lease term:", e);
        }

        return [
          `"${order.id || ''}"`,
          `"${(order.user_name || '').replace(/"/g, '""')}"`,
          `"${(order.user_email || '').replace(/"/g, '""')}"`,
          `"${(order.user_phone || '').replace(/"/g, '""')}"`,
          `"${(order.business_name || '').replace(/"/g, '""')}"`,
          `"${(order.product_name || '').replace(/"/g, '""')}"`,
          `"${(order.selected_condition || '').replace(/"/g, '""')}"`,
          `"${colorName.replace(/"/g, '""')}"`,
          `"${storageCapacity.replace(/"/g, '""')}"`,
          `"${leaseTermName.replace(/"/g, '""')}"`,
          order.has_protection_plan ? 'Yes' : 'No',
          order.protection_plan_price || 0,
          order.monthly_price || 0,
          order.total_monthly_price || 0,
          `"${order.created_at || ''}"`
        ].join(',');
      });

      const csvContent = `${headers}\n${rows.join('\n')}`;
      
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `orders_export_${new Date().toISOString().slice(0,10)}.csv`);
      link.style.visibility = 'hidden';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Export Successful",
        description: `${orders.length} orders exported to CSV`,
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

  return (
    <div className="min-h-screen pt-24 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Orders Dashboard</h1>
          <Button onClick={() => navigate("/admin/dashboard")} variant="outline">
            Back to Dashboard
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center gap-1">
                <SARSymbol className="h-5 w-5 mr-1" />
                {orders.reduce((sum, order) => sum + Number(order.total_monthly_price || 0), 0).toFixed(2)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Business Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {orders.filter(order => order.is_business_order).length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Protection Plans
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {orders.filter(order => order.has_protection_plan).length}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Condition Distribution</CardTitle>
              <CardDescription>
                Distribution of new vs refurbished devices
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statsData.conditions}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {statsData.conditions.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Device Tier Distribution</CardTitle>
              <CardDescription>
                High-end vs mid-range vs budget devices
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={statsData.deviceTypes}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" name="Number of Orders">
                      {statsData.deviceTypes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Brand Distribution</CardTitle>
              <CardDescription>
                Distribution by brand
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statsData.brands}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {statsData.brands.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Product Type Distribution</CardTitle>
              <CardDescription>
                Phones vs Laptops vs Other devices
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={statsData.productTypes}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" name="Number of Orders">
                      {statsData.productTypes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>All Orders</CardTitle>
                <CardDescription>
                  Grouped by customer contact information
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={fetchOrders}>
                  Refresh
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={exportOrdersToCSV}
                  className="flex items-center gap-1"
                >
                  <Download size={16} /> 
                  Export CSV
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">Loading orders...</div>
            ) : orderGroups.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">No orders found</div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Total Orders</TableHead>
                      <TableHead>Total Value</TableHead>
                      <TableHead>Latest Order</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orderGroups.map((group) => (
                      <React.Fragment key={group.key}>
                        <TableRow 
                          isCollapsible 
                          isExpanded={group.isExpanded}
                          onClick={() => toggleGroupExpansion(group.key)}
                        >
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {group.isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                              <div>
                                <div className="font-medium">{group.user_name}</div>
                                <div className="text-sm text-muted-foreground">{group.user_email}</div>
                                <div className="text-xs text-muted-foreground">{group.user_phone}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{group.totalOrders}</div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium flex items-center">
                              SAR {group.totalValue.toFixed(2)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">{formatDate(group.orders[0].created_at)}</div>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  Actions
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={(e) => {
                                  e.stopPropagation();
                                  toggleGroupExpansion(group.key);
                                }}>
                                  {group.isExpanded ? "Collapse" : "Expand"}
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                        
                        {group.isExpanded && group.orders.map(order => (
                          <TableRow key={order.id} className="bg-muted/20">
                            <TableCell className="pl-10">
                              <div className="font-medium">{order.product_name}</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                Condition: {order.selected_condition}
                              </div>
                              <div className="text-xs flex gap-1 mt-1">
                                <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/10">
                                  {order.device_type}
                                </span>
                                <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                  {order.product_type}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm">
                                Color: {typeof order.selected_color === 'object' && 
                                       order.selected_color !== null && 
                                       'name' in order.selected_color ? 
                                       String(order.selected_color.name) : 'N/A'}
                              </div>
                              <div className="text-sm">
                                Storage: {typeof order.selected_storage === 'object' && 
                                         order.selected_storage !== null && 
                                         'capacity' in order.selected_storage ? 
                                         String(order.selected_storage.capacity) : 'N/A'}
                              </div>
                              <div className="text-sm">
                                Lease: {typeof order.selected_lease_term === 'object' && 
                                       order.selected_lease_term !== null && 
                                       'name' in order.selected_lease_term ? 
                                       String(order.selected_lease_term.name) : 'N/A'}
                              </div>
                              
                              {/* Verification Documents Section */}
                              <div className="mt-3 pt-2 border-t">
                                <div className="flex flex-col gap-2">
                                  <DocumentLink 
                                    documentPath={order.national_id_path} 
                                    label="National ID" 
                                    orderId={order.id}
                                  />
                                  <DocumentLink 
                                    documentPath={order.salary_certificate_path} 
                                    label="Salary Certificate" 
                                    orderId={order.id}
                                  />
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium flex items-center">
                                SAR {order.total_monthly_price}
                              </div>
                              <div className="text-xs text-muted-foreground flex items-center">
                                Base: SAR {order.monthly_price}
                              </div>
                              {order.has_protection_plan && (
                                <div className="text-xs mt-1 inline-flex items-center rounded-full bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10 gap-1">
                                  Protection: SAR {order.protection_plan_price}
                                </div>
                              )}
                              
                              {/* Order Status Badge */}
                              <div className="mt-3">
                                <Badge variant={
                                  order.status === 'approved' ? 'success' : 
                                  order.status === 'rejected' ? 'destructive' : 
                                  'outline'
                                }>
                                  {order.status === 'pending_review' ? 'Pending Review' : 
                                   order.status === 'approved' ? 'Approved' : 
                                   order.status === 'rejected' ? 'Rejected' : 
                                   String(order.status)}
                                </Badge>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm">{formatDate(order.created_at)}</div>
                            </TableCell>
                            <TableCell>
                              {order.is_business_order && order.business_name && (
                                <div className="text-xs inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                                  Business: {order.business_name}
                                </div>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminOrdersPage;
