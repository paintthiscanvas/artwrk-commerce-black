
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Navbar from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { PRODUCT_ID } from "@/utils/productConfig";

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCancelled, setIsCancelled] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isProductSold, setIsProductSold] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [productPrice, setProductPrice] = useState<number | null>(null);
  const [productName, setProductName] = useState<string>("Motion Without Escape");
  
  const PAYPAL_CLIENT_ID = "AUIhQvQYv2b9R6qUd6PpNw09tcXH8DQaX6cdPU_GL4GdMcfTQXlGSiPDY_bWN6qDe8w32AL_Yq3hSwPV";
  
  useEffect(() => {
    const checkProductStatus = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('is_sold, price, product_name')
          .eq('id', PRODUCT_ID)
          .single();
        
        if (error) throw error;
        setIsProductSold(data?.is_sold || false);
        setProductPrice(data?.price || null);
        setProductName(data?.product_name || "Motion Without Escape");
      } catch (error) {
        console.error("Error checking product status:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to check product availability"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    const params = new URLSearchParams(location.search);
    if (params.get('status') === 'cancel') {
      setIsCancelled(true);
    }

    checkProductStatus();
  }, [location]);

  const createOrder = (data, actions) => {
    if (!productPrice) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Product price not available"
      });
      return;
    }

    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: productPrice.toString(),
            currency_code: "USD"
          },
          description: `${productName} - Art Print`
        }
      ]
    });
  };

  const onApprove = async (data, actions) => {
    try {
      const details = await actions.order.capture();
      console.log("Payment successful:", details);

      const { error } = await supabase
        .from('products')
        .update({ is_sold: true })
        .eq('id', PRODUCT_ID);

      if (error) throw error;
      
      setIsCompleted(true);
      toast({
        title: "Payment successful",
        description: "Thank you for your purchase!"
      });
    } catch (error) {
      console.error("Error completing payment:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to complete payment"
      });
    }
  };

  const onCancel = () => {
    navigate("/confirmation?status=cancel");
  };

  if (isLoading || !productPrice) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-art-lightGray">
            Loading...
          </div>
        </div>
      </div>
    );
  }

  if (isProductSold && !isCompleted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="max-w-lg w-full text-center space-y-8 fade-in">
            <h1 className="text-2xl md:text-3xl font-light">Already Sold</h1>
            <p className="text-art-lightGray">
              We're sorry, but this item has already been sold.
            </p>
            <a 
              href="/"
              className="inline-block mt-4 text-white hover:text-art-lightGray transition-colors"
            >
              Return to product page
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
        <div className="max-w-lg w-full text-center space-y-8 fade-in">
          {isCompleted ? (
            <>
              <h1 className="text-2xl md:text-3xl font-light">Thank You for Your Purchase!</h1>
              <p className="text-art-lightGray">
                Your payment has been successfully processed. We will prepare your artwork for shipping soon.
              </p>
              <p className="text-art-lightGray mt-4">
                If you have any questions, please contact us.
              </p>
              <a 
                href="/"
                className="inline-block mt-4 text-white hover:text-art-lightGray transition-colors"
              >
                Return to product page
              </a>
            </>
          ) : isCancelled ? (
            <>
              <h1 className="text-2xl md:text-3xl font-light">Order Cancelled</h1>
              <p className="text-art-lightGray">
                Your order has been cancelled. No payment has been processed.
              </p>
              <a 
                href="/"
                className="inline-block mt-4 text-white hover:text-art-lightGray transition-colors"
              >
                Return to product page
              </a>
            </>
          ) : (
            <>
              <h1 className="text-2xl md:text-3xl font-light">Complete Your Purchase</h1>
              <p className="text-art-lightGray mb-8">
                Please complete your payment to finalize your order.
              </p>
              
              <div className="mt-8">
                <PayPalScriptProvider options={{ clientId: PAYPAL_CLIENT_ID, currency: "USD" }}>
                  <PayPalButtons
                    style={{ layout: "vertical" }}
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onCancel={onCancel}
                  />
                </PayPalScriptProvider>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
