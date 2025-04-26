
import Navbar from "@/components/Navbar";
import CheckoutForm from "@/components/CheckoutForm";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PRODUCT_ID } from "@/utils/productConfig";

const Checkout = () => {
  const [productName, setProductName] = useState("Motion Without Escape");

  useEffect(() => {
    const fetchProductName = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('product_name')
          .eq('id', PRODUCT_ID)
          .single();
        
        if (data?.product_name) {
          setProductName(data.product_name);
        }
      } catch (error) {
        console.error("Error fetching product name:", error);
      }
    };

    fetchProductName();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-[600px] mx-auto">
          <div className="mb-8 fade-in">
            <a href="/" className="text-art-lightGray hover:text-white flex items-center space-x-2 group">
              <span className="transform group-hover:-translate-x-1 transition-transform">←</span>
              <span>Back to product</span>
            </a>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-light mb-10 fade-in" style={{animationDelay: "0.05s"}}>
            Checkout: {productName}
          </h1>
          
          <div className="bg-[#1C1C1C] rounded-2xl p-6 md:p-8 border border-white/5 shadow-lg fade-in" style={{animationDelay: "0.1s"}}>
            <CheckoutForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
