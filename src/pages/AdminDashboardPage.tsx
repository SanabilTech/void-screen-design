import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, UserCheck, Users, ShoppingBag, BarChart, FileText, LineChart } from "lucide-react";
import SARSymbol from "@/components/ui/SARSymbol";
import { AIReportCard, AIReport } from "@/components/analytics/AIReportCard";

const newAdminSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type AdminUser = {
  id: string;
  email: string;
  created_at: string;
};

const AdminDashboardPage: React.FC = () => {
  const { user, isAdmin, signOut } = useAdminAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAdmins, setIsLoadingAdmins] = useState(true);
  const [orderCount, setOrderCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [aiReports, setAiReports] = useState<AIReport[]>([]);

  const form = useForm<z.infer<typeof newAdminSchema>>({
    resolver: zodResolver(newAdminSchema),
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    if (!user || !isAdmin) {
      navigate("/admin");
    } else {
      fetchAdminUsers();
      fetchOrderCount();
      fetchProductCount();
      loadSavedReports();
    }
  }, [user, isAdmin, navigate]);

  const fetchAdminUsers = async () => {
    try {
      setIsLoadingAdmins(true);
      const { data, error } = await supabase
        .from("admin_users")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      setAdminUsers(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to fetch admin users: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setIsLoadingAdmins(false);
    }
  };

  const fetchOrderCount = async () => {
    try {
      const { count, error } = await supabase
        .from("orders")
        .select("*", { count: 'exact', head: true });

      if (error) {
        throw error;
      }

      setOrderCount(count || 0);
    } catch (error: any) {
      console.error("Error fetching order count:", error.message);
    }
  };

  const fetchProductCount = async () => {
    try {
      const { count, error } = await supabase
        .from("products")
        .select("*", { count: 'exact', head: true });

      if (error) {
        throw error;
      }

      setProductCount(count || 0);
    } catch (error: any) {
      console.error("Error fetching product count:", error.message);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin");
  };

  const onSubmit = async (values: z.infer<typeof newAdminSchema>) => {
    if (!isAdmin) {
      toast({
        title: "Error",
        description: "You don't have permission to add admin users",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("admin_users")
        .insert({ email: values.email })
        .select()
        .single();

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: `${values.email} has been added as an admin user`,
      });

      form.reset();

      fetchAdminUsers();
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to add admin user: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadSavedReports = () => {
    const savedReports = localStorage.getItem('ai-reports');
    if (savedReports) {
      setAiReports(JSON.parse(savedReports));
    }
  };

  const deleteReport = (id: string) => {
    const updatedReports = aiReports.filter(report => report.id !== id);
    setAiReports(updatedReports);
    localStorage.setItem('ai-reports', JSON.stringify(updatedReports));
    toast({
      title: "Report deleted",
      description: "The AI report has been removed",
    });
  };

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen pt-24 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button onClick={handleSignOut} variant="outline">Sign Out</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Welcome, {user.user_metadata.full_name || user.email}</h2>
            <p className="text-gray-600">
              You are logged in as an administrator. This dashboard allows you to manage products, 
              orders, and other aspects of the site.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary/5 p-4 rounded-md">
                <div className="text-sm text-gray-600">Orders</div>
                <div className="text-2xl font-bold">{orderCount}</div>
              </div>
              <div className="bg-primary/5 p-4 rounded-md flex flex-col items-center justify-center">
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => navigate('/admin/orders')}
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  View Orders
                </Button>
              </div>
              <div className="bg-primary/5 p-4 rounded-md">
                <div className="text-sm text-gray-600">Products</div>
                <div className="text-2xl font-bold">{productCount}</div>
              </div>
              <div className="bg-primary/5 p-4 rounded-md flex flex-col items-center justify-center">
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => navigate('/admin/products')}
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Manage Products
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <PlusCircle className="h-5 w-5 text-primary" />
                <CardTitle>Add New Admin</CardTitle>
              </div>
              <CardDescription>
                Add another user as an administrator
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="admin@example.com"
                            type="email"
                            autoComplete="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "Adding..." : "Add Admin User"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <CardTitle>Admin Users</CardTitle>
              </div>
              <CardDescription>
                All users with administrator access
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingAdmins ? (
                <div className="text-center py-4">Loading admin users...</div>
              ) : adminUsers.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground">No admin users found</div>
              ) : (
                <div className="space-y-2">
                  {adminUsers.map((admin) => (
                    <div
                      key={admin.id}
                      className="flex items-center gap-2 p-3 bg-secondary/20 rounded-md"
                    >
                      <UserCheck className="h-5 w-5 text-primary" />
                      <div className="text-sm font-medium">{admin.email}</div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <CardTitle>Orders & Analytics</CardTitle>
              </div>
              <CardDescription>
                View orders and analyze customer preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4">
              <Button 
                variant="outline"
                onClick={() => navigate('/admin/orders')}
                className="w-full flex items-center justify-center"
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Order Management
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/admin/analytics')}
                className="w-full flex items-center justify-center"
              >
                <BarChart className="mr-2 h-4 w-4" />
                Desirability Analysis
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <LineChart className="h-5 w-5 text-primary" />
                <CardTitle>Conversion Analytics</CardTitle>
              </div>
              <CardDescription>
                Track user journey and conversion funnel
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4">
              <Button 
                variant="outline"
                onClick={() => navigate('/admin/funnel-analytics')}
                className="w-full flex items-center justify-center"
              >
                <LineChart className="mr-2 h-4 w-4" />
                View Funnel Analytics
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          {aiReports.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aiReports.map(report => (
                <AIReportCard 
                  key={report.id} 
                  report={report} 
                  onDelete={deleteReport} 
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <img 
                src="/lovable-uploads/062524f7-4e6d-457a-9e06-afce507a7941.png" 
                alt="No recent activity" 
                className="w-16 h-16 mb-4"
              />
              <div className="text-gray-600">
                No recent activity to display.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
