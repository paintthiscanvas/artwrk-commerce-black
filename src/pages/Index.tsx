
import { useState } from "react";
import Navbar from "@/components/Navbar";
import ProductImage from "@/components/ProductImage";
import ProductDetails from "@/components/ProductDetails";

const Index = () => {
  // We can toggle this to demonstrate both states
  const [isSold, setIsSold] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <div className="w-full">
            <ProductImage 
              imageUrl="/lovable-uploads/14e7f7e2-07d6-4229-97b5-aea750064733.png" 
              altText="Motion Without Escape - Artwork" 
            />
          </div>
          
          <div>
            <ProductDetails isSold={isSold} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
