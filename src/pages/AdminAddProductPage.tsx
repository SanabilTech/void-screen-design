import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import { 
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Smartphone,
  Laptop,
  ImagePlus,
  Info
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { DeviceType } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { useAdminAuth } from "@/context/AdminAuthContext";

// Form schema
const productFormSchema = z.object({
  name: z.string().min(3, { message: "Product name must be at least 3 characters" }),
  brand: z.string().min(2, { message: "Brand name is required" }),
  type: z.enum(["smartphone", "laptop"], { 
    required_error: "Please select a device type" 
  }),
  basePrice: z.coerce.number().positive({ message: "Base price must be positive" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  description_ar: z.string().optional(),
  slug: z.string().min(3, { message: "Slug is required" })
    .regex(/^[a-z0-9-]+$/, { message: "Slug can only contain lowercase letters, numbers, and hyphens" }),
  imageUrl: z.string().url({ message: "Please enter a valid image URL" }),
  features: z.array(z.string()).min(1, { message: "At least one feature is required" }),
});

// Type for form values
type ProductFormValues = z.infer<typeof productFormSchema>;

// Color option input
interface ColorOption {
  id: string;
  name: string;
  value: string;
  priceModifier: number;
  imageUrl?: string;
}

// Storage option input
interface StorageOption {
  id: string;
  capacity: string;
  priceModifier: number;
}

// Form data persistence keys
const ADD_PRODUCT_STORAGE_KEYS = {
  FORM_DATA: "add_product_form_data",
  STORAGE_OPTIONS: "add_product_storage_options",
  COLOR_OPTIONS: "add_product_color_options",
  AVAILABLE_CONDITIONS: "add_product_available_conditions",
  ACTIVE_TAB: "add_product_active_tab"
};

const AdminAddProductPage: React.FC = () => {
  const { user, isAdmin } = useAdminAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [storageOptions, setStorageOptions] = useState<StorageOption[]>([
    { id: uuidv4(), capacity: "128GB", priceModifier: 0 }
  ]);
  const [colorOptions, setColorOptions] = useState<ColorOption[]>([
    { id: uuidv4(), name: "Black", value: "#000000", priceModifier: 0 }
  ]);
  const [availableConditions, setAvailableConditions] = useState({
    new: true,
    refurbished: true
  });
  const [activeTab, setActiveTab] = useState("basic");

  // Initialize form with default values
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      brand: "",
      type: "smartphone" as DeviceType,
      basePrice: 0,
      description: "",
      description_ar: "",
      slug: "",
      imageUrl: "",
      features: [""],
    },
  });

  // Load saved form data on component mount
  useEffect(() => {
    const savedFormData = sessionStorage.getItem(ADD_PRODUCT_STORAGE_KEYS.FORM_DATA);
    const savedStorageOptions = sessionStorage.getItem(ADD_PRODUCT_STORAGE_KEYS.STORAGE_OPTIONS);
    const savedColorOptions = sessionStorage.getItem(ADD_PRODUCT_STORAGE_KEYS.COLOR_OPTIONS);
    const savedConditions = sessionStorage.getItem(ADD_PRODUCT_STORAGE_KEYS.AVAILABLE_CONDITIONS);
    const savedTab = sessionStorage.getItem(ADD_PRODUCT_STORAGE_KEYS.ACTIVE_TAB);
    
    if (savedFormData) {
      form.reset(JSON.parse(savedFormData));
    }
    
    if (savedStorageOptions) {
      setStorageOptions(JSON.parse(savedStorageOptions));
    }
    
    if (savedColorOptions) {
      setColorOptions(JSON.parse(savedColorOptions));
    }
    
    if (savedConditions) {
      setAvailableConditions(JSON.parse(savedConditions));
    }
    
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, [form]);

  // Save form data on visibility changes and before unload
  useEffect(() => {
    const saveFormData = () => {
      const formData = form.getValues();
      sessionStorage.setItem(ADD_PRODUCT_STORAGE_KEYS.FORM_DATA, JSON.stringify(formData));
      sessionStorage.setItem(ADD_PRODUCT_STORAGE_KEYS.STORAGE_OPTIONS, JSON.stringify(storageOptions));
      sessionStorage.setItem(ADD_PRODUCT_STORAGE_KEYS.COLOR_OPTIONS, JSON.stringify(colorOptions));
      sessionStorage.setItem(ADD_PRODUCT_STORAGE_KEYS.AVAILABLE_CONDITIONS, JSON.stringify(availableConditions));
      sessionStorage.setItem(ADD_PRODUCT_STORAGE_KEYS.ACTIVE_TAB, activeTab);
    };
    
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        saveFormData();
      }
    };
    
    const handleBeforeUnload = () => {
      saveFormData();
    };
    
    // Auto-save interval
    const autoSaveInterval = setInterval(saveFormData, 30000); // 30 seconds
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      clearInterval(autoSaveInterval);
    };
  }, [form, storageOptions, colorOptions, availableConditions, activeTab]);

  // Check if user is authenticated
  useEffect(() => {
    if (!user || !isAdmin) {
      navigate("/admin");
      toast({
        title: "Unauthorized",
        description: "You must be logged in as an admin to access this page",
        variant: "destructive",
      });
    }
  }, [user, isAdmin, navigate, toast]);

  // Handle tab change with data preservation
  const handleTabChange = (value: string) => {
    // Save current state before changing tabs
    const formData = form.getValues();
    sessionStorage.setItem(ADD_PRODUCT_STORAGE_KEYS.FORM_DATA, JSON.stringify(formData));
    sessionStorage.setItem(ADD_PRODUCT_STORAGE_KEYS.STORAGE_OPTIONS, JSON.stringify(storageOptions));
    sessionStorage.setItem(ADD_PRODUCT_STORAGE_KEYS.COLOR_OPTIONS, JSON.stringify(colorOptions));
    sessionStorage.setItem(ADD_PRODUCT_STORAGE_KEYS.AVAILABLE_CONDITIONS, JSON.stringify(availableConditions));
    
    setActiveTab(value);
    sessionStorage.setItem(ADD_PRODUCT_STORAGE_KEYS.ACTIVE_TAB, value);
  };

  // Clear session storage after successful submission
  const clearSessionStorage = () => {
    sessionStorage.removeItem(ADD_PRODUCT_STORAGE_KEYS.FORM_DATA);
    sessionStorage.removeItem(ADD_PRODUCT_STORAGE_KEYS.STORAGE_OPTIONS);
    sessionStorage.removeItem(ADD_PRODUCT_STORAGE_KEYS.COLOR_OPTIONS);
    sessionStorage.removeItem(ADD_PRODUCT_STORAGE_KEYS.AVAILABLE_CONDITIONS);
    sessionStorage.removeItem(ADD_PRODUCT_STORAGE_KEYS.ACTIVE_TAB);
  };

  // Handle slug generation
  const generateSlug = () => {
    const name = form.getValues("name");
    const brand = form.getValues("brand");
    if (name && brand) {
      const slug = `${brand.toLowerCase()}-${name.toLowerCase()}`
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
      form.setValue("slug", slug);
    }
  };

  // Add a new feature field
  const addFeature = () => {
    const currentFeatures = form.getValues("features");
    form.setValue("features", [...currentFeatures, ""]);
  };

  // Remove a feature field
  const removeFeature = (index: number) => {
    const currentFeatures = form.getValues("features");
    if (currentFeatures.length > 1) {
      form.setValue("features", currentFeatures.filter((_, i) => i !== index));
    }
  };

  // Add a storage option
  const addStorageOption = () => {
    setStorageOptions([...storageOptions, { id: uuidv4(), capacity: "", priceModifier: 0 }]);
  };

  // Remove a storage option
  const removeStorageOption = (id: string) => {
    if (storageOptions.length > 1) {
      setStorageOptions(storageOptions.filter(option => option.id !== id));
    }
  };

  // Add a color option
  const addColorOption = () => {
    setColorOptions([...colorOptions, { id: uuidv4(), name: "", value: "#000000", priceModifier: 0 }]);
  };

  // Remove a color option
  const removeColorOption = (id: string) => {
    if (colorOptions.length > 1) {
      setColorOptions(colorOptions.filter(option => option.id !== id));
    }
  };

  // Handle form submission
  const onSubmit = async (data: ProductFormValues) => {
    if (storageOptions.some(option => !option.capacity)) {
      toast({
        title: "Validation Error",
        description: "All storage options must have a capacity",
        variant: "destructive",
      });
      return;
    }

    if (colorOptions.some(option => !option.name)) {
      toast({
        title: "Validation Error",
        description: "All color options must have a name",
        variant: "destructive",
      });
      return;
    }

    if (!availableConditions.new && !availableConditions.refurbished) {
      toast({
        title: "Validation Error",
        description: "At least one condition must be available",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate a unique ID for the product
      const productId = uuidv4();
      
      // Insert the product into the database
      const { error: productError } = await supabase
        .from("products")
        .insert({
          id: productId,
          name: data.name,
          brand: data.brand,
          type_id: data.type,
          base_price: data.basePrice,
          description: data.description,
          description_ar: data.description_ar || null,
          slug: data.slug,
          image_url: data.imageUrl,
        });

      if (productError) throw productError;

      // Insert features
      const features = data.features.filter(feature => feature.trim());
      if (features.length > 0) {
        const { error: featuresError } = await supabase
          .from("product_features")
          .insert(
            features.map(feature => ({
              product_id: productId,
              feature,
            }))
          );

        if (featuresError) throw featuresError;
      }

      // Insert storage options
      const { error: storageError } = await supabase
        .from("storage_options")
        .insert(
          storageOptions.map(option => ({
            product_id: productId,
            storage_id: option.id,
            capacity: option.capacity,
            price_modifier: option.priceModifier,
          }))
        );

      if (storageError) throw storageError;

      // Insert color options
      const { error: colorError } = await supabase
        .from("color_options")
        .insert(
          colorOptions.map(option => ({
            product_id: productId,
            color_id: option.id,
            name: option.name,
            value: option.value,
            price_modifier: option.priceModifier,
            image_url: option.imageUrl || null,
          }))
        );

      if (colorError) throw colorError;

      // Insert available conditions
      const conditions = [];
      if (availableConditions.new) {
        conditions.push({
          product_id: productId,
          condition: "new",
          is_available: true,
        });
      }
      if (availableConditions.refurbished) {
        conditions.push({
          product_id: productId,
          condition: "refurbished",
          is_available: true,
        });
      }

      const { error: conditionsError } = await supabase
        .from("product_conditions")
        .insert(conditions);

      if (conditionsError) throw conditionsError;

      // Success! Redirect to the products page
      toast({
        title: "Success",
        description: "Product has been added successfully!",
        variant: "default",
      });

      navigate("/admin/products");
    } catch (error: any) {
      console.error("Error adding product:", error);
      toast({
        title: "Error",
        description: error.message || "An error occurred while adding the product",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => {
              clearSessionStorage();
              navigate('/admin/products');
            }}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold">Add New Product</h1>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs 
              defaultValue={activeTab} 
              onValueChange={handleTabChange} 
              className="space-y-6"
            >
              <TabsList className="grid grid-cols-4 md:w-[400px]">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="options">Options</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="images">Images</TabsTrigger>
              </TabsList>

              {/* Basic Info Tab */}
              <TabsContent value="basic" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>
                      Enter the basic information for the product
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Name</FormLabel>
                            <FormControl>
                              <Input placeholder="iPhone 15 Pro" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="brand"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Brand</FormLabel>
                            <FormControl>
                              <Input placeholder="Apple" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Device Type</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a device type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="smartphone">
                                  <div className="flex items-center gap-2">
                                    <Smartphone className="h-4 w-4" />
                                    <span>Smartphone</span>
                                  </div>
                                </SelectItem>
                                <SelectItem value="laptop">
                                  <div className="flex items-center gap-2">
                                    <Laptop className="h-4 w-4" />
                                    <span>Laptop</span>
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="basePrice"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Base Price (SAR/month)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                min="0" 
                                step="0.01" 
                                placeholder="99.99" 
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Monthly price for base model
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description (English)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="A short description of the product in English..." 
                              className="min-h-[120px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description_ar"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description (Arabic)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="وصف المنتج باللغة العربية..." 
                              className="min-h-[120px] text-right" 
                              dir="rtl"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            This will be displayed when the site is in Arabic mode
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex flex-col md:flex-row gap-2 items-end">
                      <div className="flex-1">
                        <FormField
                          control={form.control}
                          name="slug"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-1">
                                <span>URL Slug</span>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Info className="h-3.5 w-3.5 text-muted-foreground" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p className="w-[200px] text-xs">
                                        The URL slug is used in the product URL. Use lowercase letters, numbers, and hyphens only.
                                      </p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </FormLabel>
                              <FormControl>
                                <div className="flex gap-2">
                                  <Input 
                                    placeholder="apple-iphone-15-pro" 
                                    {...field} 
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <Button 
                        type="button" 
                        variant="secondary"
                        onClick={generateSlug}
                        className="mt-2 md:mt-0"
                      >
                        Generate Slug
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Options Tab */}
              <TabsContent value="options" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Storage Options</CardTitle>
                    <CardDescription>
                      Add storage capacity options and their price modifiers
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {storageOptions.map((option, index) => (
                      <div key={option.id} className="flex items-end gap-3">
                        <div className="flex-1">
                          <Label htmlFor={`storage-${option.id}`}>Capacity</Label>
                          <Input
                            id={`storage-${option.id}`}
                            placeholder="128GB"
                            value={option.capacity}
                            onChange={(e) => {
                              const newStorageOptions = [...storageOptions];
                              newStorageOptions[index].capacity = e.target.value;
                              setStorageOptions(newStorageOptions);
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <Label htmlFor={`storage-price-${option.id}`}>Price Modifier (SAR)</Label>
                          <Input
                            id={`storage-price-${option.id}`}
                            type="number"
                            placeholder="0"
                            value={option.priceModifier}
                            onChange={(e) => {
                              const newStorageOptions = [...storageOptions];
                              newStorageOptions[index].priceModifier = parseFloat(e.target.value);
                              setStorageOptions(newStorageOptions);
                            }}
                          />
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => removeStorageOption(option.id)}
                          disabled={storageOptions.length <= 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={addStorageOption}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Storage Option
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Color Options</CardTitle>
                    <CardDescription>
                      Add color options and their price modifiers
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {colorOptions.map((option, index) => (
                      <div key={option.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                        <div className="md:col-span-1">
                          <Label htmlFor={`color-${option.id}`}>Color Name</Label>
                          <Input
                            id={`color-${option.id}`}
                            placeholder="Black"
                            value={option.name}
                            onChange={(e) => {
                              const newColorOptions = [...colorOptions];
                              newColorOptions[index].name = e.target.value;
                              setColorOptions(newColorOptions);
                            }}
                          />
                        </div>
                        <div className="md:col-span-1">
                          <Label htmlFor={`color-value-${option.id}`}>Color Value</Label>
                          <div className="flex gap-2">
                            <div 
                              className="w-10 h-10 rounded-md border"
                              style={{ backgroundColor: option.value }}
                            />
                            <Input
                              id={`color-value-${option.id}`}
                              placeholder="#000000"
                              value={option.value}
                              onChange={(e) => {
                                const newColorOptions = [...colorOptions];
                                newColorOptions[index].value = e.target.value;
                                setColorOptions(newColorOptions);
                              }}
                            />
                          </div>
                        </div>
                        <div className="md:col-span-1">
                          <Label htmlFor={`color-price-${option.id}`}>Price Modifier (SAR)</Label>
                          <Input
                            id={`color-price-${option.id}`}
                            type="number"
                            placeholder="0"
                            value={option.priceModifier}
                            onChange={(e) => {
                              const newColorOptions = [...colorOptions];
                              newColorOptions[index].priceModifier = parseFloat(e.target.value);
                              setColorOptions(newColorOptions);
                            }}
                          />
                        </div>
                        <div className="md:col-span-1">
                          <Label htmlFor={`color-image-${option.id}`}>Image URL (optional)</Label>
                          <Input
                            id={`color-image-${option.id}`}
                            placeholder="https://example.com/image.jpg"
                            value={option.imageUrl || ""}
                            onChange={(e) => {
                              const newColorOptions = [...colorOptions];
                              newColorOptions[index].imageUrl = e.target.value;
                              setColorOptions(newColorOptions);
                            }}
                          />
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => removeColorOption(option.id)}
                          disabled={colorOptions.length <= 1}
                          className="md:col-span-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={addColorOption}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Color Option
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Available Conditions</CardTitle>
                    <CardDescription>
                      Select which conditions the product is available in
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="condition-new"
                          checked={availableConditions.new}
                          onChange={(e) => {
                            setAvailableConditions({
                              ...availableConditions,
                              new: e.target.checked,
                            });
                          }}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <Label htmlFor="condition-new">New</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="condition-refurbished"
                          checked={availableConditions.refurbished}
                          onChange={(e) => {
                            setAvailableConditions({
                              ...availableConditions,
                              refurbished: e.target.checked,
                            });
                          }}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <Label htmlFor="condition-refurbished">Refurbished</Label>
                      </div>
                    </div>
                    {!availableConditions.new && !availableConditions.refurbished && (
                      <p className="text-sm text-destructive mt-2">
                        At least one condition must be selected
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Features Tab */}
              <TabsContent value="features" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Product Features</CardTitle>
                    <CardDescription>
                      Add key features that will be displayed on the product page
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {form.getValues("features").map((_, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <FormField
                          control={form.control}
                          name={`features.${index}`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input 
                                  placeholder={`Feature ${index + 1}`} 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeFeature(index)}
                          disabled={form.getValues("features").length <= 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={addFeature}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Feature
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Images Tab */}
              <TabsContent value="images" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Product Image</CardTitle>
                    <CardDescription>
                      Add the main product image
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="imageUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="space-y-4">
                              <Input 
                                placeholder="https://example.com/image.jpg" 
                                {...field} 
                              />
                              {field.value && (
                                <div className="rounded-md border p-2 w-full flex justify-center">
                                  <img 
                                    src={field.value} 
                                    alt="Product preview" 
                                    className="max-h-[300px] object-contain" 
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                                    }} 
                                  />
                                </div>
                              )}
                              {!field.value && (
                                <div className="rounded-md border border-dashed p-8 w-full flex flex-col items-center justify-center text-muted-foreground">
                                  <ImagePlus className="h-10 w-10 mb-2" />
                                  <p>Enter an image URL above to preview</p>
                                </div>
                              )}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  clearSessionStorage();
                  navigate("/admin/products");
                }}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="gap-2"
              >
                <Save className="h-4 w-4" />
                {isSubmitting ? "Saving..." : "Save Product"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AdminAddProductPage;
