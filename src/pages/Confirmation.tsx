
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";

const Confirmation = () => {
  const location = useLocation();
  const [isCancelled, setIsCancelled] = useState(false);
  
  useEffect(() => {
    // Check if the URL has a cancel parameter
    const params = new URLSearchParams(location.search);
    if (params.get('status') === 'cancel') {
      setIsCancelled(true);
    } else {
      // Auto-redirect logic would go here
      // In a real app, we'd redirect to PayPal
      // For now we'll just simulate it with a console message
      console.log("Would redirect to PayPal in production");
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
        <div className="max-w-lg w-full text-center space-y-8">
          {isCancelled ? (
            <>
              <h1 className="text-2xl md:text-3xl font-light">Order Cancelled</h1>
              <p className="text-art-lightGray">
                Your order has been cancelled. No payment has been processed.
              </p>
              <a 
                href="/"
                className="inline-block mt-4 text-white hover:text-art-lightGray"
              >
                Return to product page
              </a>
            </>
          ) : (
            <>
              <h1 className="text-2xl md:text-3xl font-light">Thank You</h1>
              <p className="text-art-lightGray">
                Please complete your payment on PayPal to finalize your order.
              </p>
              <p className="text-sm text-art-lightGray mt-8">
                You will be redirected to PayPal shortly...
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
