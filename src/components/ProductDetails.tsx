
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

  const handleOrder = () => {
    navigate("/checkout");
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
      <h1 className="text-3xl md:text-4xl font-light tracking-wider">{product?.product_name}</h1>
      
      <div className="text-2xl font-light">${product?.price?.toLocaleString()}</div>
      
      <div className="space-y-2">
        <div className="text-xs tracking-wider text-art-lightGray">YEAR</div>
        <p className="text-art-offWhite text-sm">2025</p>
      </div>

      <div className="space-y-2">
        <div className="text-xs tracking-wider text-art-lightGray">SIZE</div>
        <p className="text-art-offWhite text-sm">66 cm x 3 cm x 36 cm</p>
      </div>

      <div className="space-y-2">
        <div className="text-xs tracking-wider text-art-lightGray">MATERIALS</div>
        <p className="text-art-offWhite text-sm">Acrylic on canvas</p>
      </div>
      
      <div className="space-y-2">
        <div className="text-xs tracking-wider text-art-lightGray">INCLUDED DELIVERY FEE WORLDWIDE</div>
        <p className="text-art-offWhite">Standard Shipping (DHL Tracked)</p>
      </div>
      
      <div className="space-y-5">
        <p className="text-art-lightGray leading-relaxed">
          Amid darkness, light cuts through — not as clarity, but as disruption. "Fragmented Silence" explores the tension between stillness and movement, peace and chaos.
        </p>
        <p className="text-art-lightGray leading-relaxed">
          Created without formal training, this piece is raw, instinctive, and unfiltered. It is not an homage to tradition, but a confrontation with it.
        </p>
        <p className="text-sm italic text-art-lightGray opacity-75">
          *Certificate of authenticity included. Private inquiries welcome.*
        </p>
      </div>
      
      {product?.is_sold ? (
        <Button disabled variant="outline" className="w-full py-6 cursor-not-allowed opacity-50">
          Sold Out
        </Button>
      ) : (
        <Button onClick={handleOrder} className="w-full py-6">
          Order Now (10–14 days)
        </Button>
      )}
    </div>
  );
};

export default ProductDetails;
