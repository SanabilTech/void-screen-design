import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Product, DeviceType } from "@/types/product";
import { Edit, Trash2, RefreshCw, Plus, ArrowLeft, Smartphone, Laptop } from "lucide-react";
import { products } from "@/data/products";

const AdminProductsPage: React.FC = () => {
  const { user, isAdmin } = useAdminAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [dbProducts, setDbProducts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!user || !isAdmin) {
      navigate("/admin");
    } else {
      fetchProducts();
    }
  }, [user, isAdmin, navigate]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          product_features(feature),
          storage_options(id, capacity, storage_id, price_modifier),
          color_options(id, name, value, color_id, price_modifier, image_url)
        `)
        .order("updated_at", { ascending: false });

      if (error) {
        throw error;
      }

      setDbProducts(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to fetch products: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const confirmDelete = (productId: string) => {
    setProductToDelete(productId);
    setIsDeleteDialogOpen(true);
  };

  const deleteProduct = async () => {
    if (!productToDelete) return;
    
    setIsDeleting(true);
    try {
      await supabase
        .from("product_features")
        .delete()
        .eq("product_id", productToDelete);
      
      await supabase
        .from("storage_options")
        .delete()
        .eq("product_id", productToDelete);
      
      await supabase
        .from("color_options")
        .delete()
        .eq("product_id", productToDelete);
      
      await supabase
        .from("product_conditions")
        .delete()
        .eq("product_id", productToDelete);
      
      await supabase
        .from("product_pricing")
        .delete()
        .eq("product_id", productToDelete);
      
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", productToDelete);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Product deleted successfully",
      });
      
      fetchProducts();
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to delete product: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  const getDeviceTypeIcon = (type: string) => {
    return type === "smartphone" ? (
      <Smartphone className="h-4 w-4 text-primary" />
    ) : (
      <Laptop className="h-4 w-4 text-primary" />
    );
  };

  const filteredProducts = dbProducts.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    product.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-24 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => navigate('/admin/dashboard')}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-3xl font-bold">Products Management</h1>
          </div>
          <Button onClick={() => navigate('/admin/products/new')}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Product
          </Button>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Search Products</CardTitle>
            <CardDescription>Find products by name or brand</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
              />
              <Button variant="outline" onClick={() => setSearchQuery("")}>
                Clear
              </Button>
              <Button variant="outline" onClick={fetchProducts}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </CardContent>
        </Card>

        {isLoading ? (
          <div className="flex justify-center py-10">
            <div className="flex flex-col items-center">
              <RefreshCw className="h-8 w-8 animate-spin text-primary" />
              <p className="mt-4 text-muted-foreground">Loading products...</p>
            </div>
          </div>
        ) : (
          <div className="bg-background rounded-md border shadow-sm">
            <Table>
              <TableCaption>List of all products in the system</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead>Base Price</TableHead>
                  <TableHead>Storage Options</TableHead>
                  <TableHead>Color Options</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      {searchQuery ? (
                        <p className="text-muted-foreground">
                          No products matching "{searchQuery}" found
                        </p>
                      ) : (
                        <p className="text-muted-foreground">
                          No products available. Click "Add New Product" to add one.
                        </p>
                      )}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {getDeviceTypeIcon(product.type_id)}
                          <span className="capitalize">{product.type_id}</span>
                        </div>
                      </TableCell>
                      <TableCell>{product.brand}</TableCell>
                      <TableCell>${product.base_price}</TableCell>
                      <TableCell>
                        {product.storage_options?.length || 0} options
                      </TableCell>
                      <TableCell>
                        {product.color_options?.length || 0} options
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => navigate(`/admin/products/edit/${product.slug}`)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => confirmDelete(product.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Product Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this product? This action cannot be undone, and all
              associated data (features, storage options, colors, etc.) will be permanently deleted.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={deleteProduct}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete Product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProductsPage;
