
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

interface ProductDetailsProps {
  isSold?: boolean;
}

const ProductDetails = ({ isSold = false }: ProductDetailsProps) => {
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('product_name', 'Motion Without Escape')
          .single();
        
        if (error) throw error;
        setProduct(data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load product details"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  const handleNotifyInterest = () => {
    toast({
      title: "Coming Soon",
      description: "We'll notify you if a similar piece becomes available."
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-pulse text-art-lightGray">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-8 fade-in">
      <h1 className="text-3xl md:text-4xl font-light tracking-wider line-through opacity-50">{product?.product_name}</h1>
      
      <div className="text-2xl font-light line-through opacity-50">${product?.price?.toLocaleString()}</div>
      
      <div className="space-y-2">
        <div className="text-xs tracking-wider text-art-lightGray">YEAR</div>
        <p className="text-art-offWhite text-sm opacity-50">2025</p>
      </div>

      <div className="space-y-2">
        <div className="text-xs tracking-wider text-art-lightGray">SIZE</div>
        <p className="text-art-offWhite text-sm opacity-50">66 cm x 3 cm x 36 cm</p>
      </div>

      <div className="space-y-2">
        <div className="text-xs tracking-wider text-art-lightGray">MATERIALS</div>
        <p className="text-art-offWhite text-sm opacity-50">Acrylic on canvas</p>
      </div>
      
      <div className="space-y-2">
        <div className="text-xs tracking-wider text-art-lightGray">INCLUDED DELIVERY FEE WORLDWIDE</div>
        <p className="text-art-offWhite opacity-50">Standard Shipping (DHL Tracked)</p>
      </div>
      
      <div className="space-y-5">
        <p className="text-art-lightGray leading-relaxed opacity-50">
          Amid darkness, light cuts through — not as clarity, but as disruption. "Fragmented Silence" explores the tension between stillness and movement, peace and chaos.
        </p>
        <p className="text-art-lightGray leading-relaxed opacity-50">
          Created without formal training, this piece is raw, instinctive, and unfiltered. It is not an homage to tradition, but a confrontation with it.
        </p>
        <p className="text-sm italic text-art-lightGray opacity-50">
          *Certificate of authenticity included. Private inquiries welcome.*
        </p>
      </div>
      
      <div className="bg-red-900/20 border border-red-900/50 p-4 rounded-lg text-center">
        <h2 className="text-xl font-semibold text-red-400 mb-2">SOLD OUT</h2>
        <p className="text-art-lightGray mb-4">This piece is no longer available for purchase.</p>
        <Button 
          onClick={handleNotifyInterest} 
          variant="outline" 
          className="w-full py-6"
        >
          Notify Me of Similar Works
        </Button>
      </div>
    </div>
  );
};

export default ProductDetails;
