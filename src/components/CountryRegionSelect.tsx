
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COUNTRIES, getRegionsForCountry } from "@/utils/locationData";

interface CountryRegionSelectProps {
  country: string;
  region: string;
  onCountryChange: (value: string) => void;
  onRegionChange: (value: string) => void;
  isDisabled?: boolean;
}

const CountryRegionSelect = ({
  country,
  region,
  onCountryChange,
  onRegionChange,
  isDisabled = false
}: CountryRegionSelectProps) => {
  const regions = country ? getRegionsForCountry(country) : null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="country">Country</Label>
        <Select 
          onValueChange={onCountryChange} 
          value={country} 
          disabled={isDisabled}
        >
          <SelectTrigger className="h-11 bg-secondary border-none focus-visible:ring-white rounded-md transition-all duration-150 ease-in-out">
            <SelectValue placeholder="Select Country" />
          </SelectTrigger>
          <SelectContent className="bg-secondary text-white">
            {COUNTRIES.map(c => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="state">
          {country === "United States" ? "State" : 
           country === "Canada" ? "Province" : 
           "Region / State"}
        </Label>
        {regions ? (
          <Select 
            onValueChange={onRegionChange} 
            value={region} 
            disabled={isDisabled}
          >
            <SelectTrigger className="h-11 bg-secondary border-none focus-visible:ring-white rounded-md transition-all duration-150 ease-in-out">
              <SelectValue placeholder={`Select ${country === "United States" ? "State" : country === "Canada" ? "Province" : "Region"}`} />
            </SelectTrigger>
            <SelectContent className="bg-secondary text-white">
              {regions.map(r => (
                <SelectItem key={r} value={r}>{r}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <Input
            id="state"
            name="state"
            value={region}
            onChange={(e) => onRegionChange(e.target.value)}
            placeholder="Enter region/state (optional)"
            disabled={isDisabled}
          />
        )}
      </div>
    </div>
  );
};

export default CountryRegionSelect;
