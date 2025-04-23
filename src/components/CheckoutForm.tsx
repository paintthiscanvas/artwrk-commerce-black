
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", 
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", 
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", 
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", 
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", 
  "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", 
  "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

const CheckoutForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSold, setIsSold] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    streetAddress: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    email: "",
    paypalName: "",
    paypalEmail: ""
  });

  useEffect(() => {
    const checkProductStatus = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('is_sold')
        .single();
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to check product status"
        });
        return;
      }
      
      setIsSold(data?.is_sold || false);
    };

    checkProductStatus();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStateChange = (value: string) => {
    setFormData(prev => ({ ...prev, state: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('checkout_submissions')
        .insert([{
          first_name: formData.firstName,
          last_name: formData.lastName,
          street_address: formData.streetAddress,
          apartment: formData.apartment,
          city: formData.city,
          state: formData.state,
          zip_code: formData.zipCode,
          phone_number: formData.phone,
          email: formData.email,
          paypal_name: formData.paypalName,
          paypal_email: formData.paypalEmail
        }]);

      if (error) throw error;
      
      navigate("/confirmation");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit checkout information"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-2xl mx-auto fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            autoComplete="off"
            disabled={isSold || isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            autoComplete="off"
            disabled={isSold || isLoading}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="streetAddress">Street Address</Label>
        <Input
          id="streetAddress"
          name="streetAddress"
          value={formData.streetAddress}
          onChange={handleChange}
          required
          autoComplete="off"
          disabled={isSold || isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="apartment">Apartment / Unit / Bldg. (optional)</Label>
        <Input
          id="apartment"
          name="apartment"
          value={formData.apartment}
          onChange={handleChange}
          autoComplete="off"
          disabled={isSold || isLoading}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            autoComplete="off"
            disabled={isSold || isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="zipCode">ZIP Code</Label>
          <Input
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            required
            autoComplete="off"
            disabled={isSold || isLoading}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="state">State</Label>
        <Select onValueChange={handleStateChange} value={formData.state} disabled={isSold || isLoading}>
          <SelectTrigger className="h-11 bg-secondary border-none focus-visible:ring-white rounded-md transition-all duration-150 ease-in-out">
            <SelectValue placeholder="Select State" />
          </SelectTrigger>
          <SelectContent className="bg-secondary text-white">
            {US_STATES.map(state => (
              <SelectItem key={state} value={state}>{state}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Mobile Phone (+ country code)</Label>
        <Input
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          autoComplete="off"
          disabled={isSold || isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          autoComplete="off"
          disabled={isSold || isLoading}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="paypalName">PayPal Name</Label>
          <Input
            id="paypalName"
            name="paypalName"
            value={formData.paypalName}
            onChange={handleChange}
            required
            autoComplete="off"
            disabled={isSold || isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="paypalEmail">PayPal Email</Label>
          <Input
            id="paypalEmail"
            name="paypalEmail"
            type="email"
            value={formData.paypalEmail}
            onChange={handleChange}
            required
            autoComplete="off"
            disabled={isSold || isLoading}
          />
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full py-6"
        disabled={isSold || isLoading}
      >
        {isLoading ? "Processing..." : "Complete Order"}
      </Button>
    </form>
  );
};

export default CheckoutForm;
