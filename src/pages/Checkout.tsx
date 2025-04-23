
import Navbar from "@/components/Navbar";
import CheckoutForm from "@/components/CheckoutForm";

const Checkout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 fade-in">
            <a href="/" className="text-art-lightGray hover:text-white flex items-center space-x-2 group">
              <span className="transform group-hover:-translate-x-1 transition-transform">←</span>
              <span>Back to product</span>
            </a>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-light mb-10 fade-in" style={{animationDelay: "0.05s"}}>Checkout: Motion Without Escape</h1>
          
          <CheckoutForm />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
