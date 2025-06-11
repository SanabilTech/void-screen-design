
import React from "react";
import { RefreshCw } from "lucide-react";

const ProductLoadingState: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen pt-24 md:pt-28">
      <div className="container-wide flex items-center justify-center py-20">
        <RefreshCw className="h-10 w-10 animate-spin text-primary" />
      </div>
    </div>
  );
};

export default ProductLoadingState;
