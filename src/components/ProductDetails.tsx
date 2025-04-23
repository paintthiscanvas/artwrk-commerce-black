
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface ProductDetailsProps {
  isSold: boolean;
}

const ProductDetails = ({ isSold = false }: ProductDetailsProps) => {
  const navigate = useNavigate();
  
  const handleOrder = () => {
    navigate("/checkout");
  };

  return (
    <div className="flex flex-col space-y-8">
      <h1 className="text-3xl md:text-4xl font-light">Motion Without Escape</h1>
      
      <div className="text-2xl">$12</div>
      
      <div className="space-y-2">
        <div className="text-sm text-art-lightGray">Delivery Info</div>
        <p>Included delivery fee worldwide</p>
        <p>Standard Shipping DHL (Tracked)</p>
      </div>
      
      <div className="space-y-4">
        <p className="text-art-offWhite leading-relaxed">
          A reflection on the threshold between motion and restraint. This piece captures 
          the tension of something meant to move, yet held—an instinct for flight pressing 
          against the weight of the unseen.
        </p>
        
        <p className="text-art-offWhite leading-relaxed">
          Brushstrokes stretch and clash like fractured momentum, echoing the shape of wings 
          caught in hesitation. Texture becomes turbulence. The surface resists, as if air 
          itself were a barrier.
        </p>
        
        <p className="text-art-offWhite leading-relaxed">
          There is no sky here, only the suggestion of it. Freedom is not denied, but delayed—hovering 
          somewhere just beyond reach. In this space, struggle becomes form. Movement exists 
          not in escape, but in the will to rise against what cannot be seen.
        </p>
      </div>
      
      {isSold ? (
        <Button disabled className="w-full py-6 bg-art-mediumGray hover:bg-art-mediumGray text-art-lightGray cursor-not-allowed">
          Sold Out
        </Button>
      ) : (
        <Button onClick={handleOrder} className="w-full py-6 bg-white hover:bg-art-offWhite text-black hover:text-art-black">
          Order Now (10–14 days)
        </Button>
      )}
    </div>
  );
};

export default ProductDetails;
