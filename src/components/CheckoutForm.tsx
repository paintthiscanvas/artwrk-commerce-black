
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// US states for dropdown
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStateChange = (value: string) => {
    setFormData(prev => ({ ...prev, state: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would validate and process the form
    navigate("/confirmation");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="bg-secondary border-none focus-visible:ring-white"
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
            className="bg-secondary border-none focus-visible:ring-white"
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
          className="bg-secondary border-none focus-visible:ring-white"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="apartment">Apartment / Unit / Bldg. (optional)</Label>
        <Input
          id="apartment"
          name="apartment"
          value={formData.apartment}
          onChange={handleChange}
          className="bg-secondary border-none focus-visible:ring-white"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="city">City</Label>
        <Input
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
          className="bg-secondary border-none focus-visible:ring-white"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Select onValueChange={handleStateChange} value={formData.state}>
            <SelectTrigger className="bg-secondary border-none focus-visible:ring-white">
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
          <Label htmlFor="zipCode">ZIP Code</Label>
          <Input
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            required
            className="bg-secondary border-none focus-visible:ring-white"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Mobile Phone (+ country code)</Label>
        <Input
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="bg-secondary border-none focus-visible:ring-white"
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
          className="bg-secondary border-none focus-visible:ring-white"
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
            className="bg-secondary border-none focus-visible:ring-white"
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
            className="bg-secondary border-none focus-visible:ring-white"
          />
        </div>
      </div>

      <Button type="submit" className="w-full py-6 bg-white hover:bg-art-offWhite text-black hover:text-art-black">
        Complete Order
      </Button>
    </form>
  );
};

export default CheckoutForm;
