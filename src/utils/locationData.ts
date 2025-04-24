
export const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", 
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", 
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", 
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", 
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", 
  "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", 
  "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

export const CANADIAN_PROVINCES = [
  "Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador",
  "Nova Scotia", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan",
  "Northwest Territories", "Nunavut", "Yukon"
];

export const UK_REGIONS = [
  "England", "Scotland", "Wales", "Northern Ireland"
];

export const COUNTRIES = [
  "United States", "Canada", "United Kingdom", "Australia", "Germany", "France", "Japan", 
  "South Korea", "China", "India", "Brazil", "Mexico", "Spain", "Italy", "Netherlands", 
  "Sweden", "Norway", "Denmark", "Finland", "Singapore", "New Zealand", "Ireland", 
  "Switzerland", "Austria", "Belgium", "Portugal", "Greece", "Poland", "Russia", 
  "South Africa", "Argentina", "Chile", "Colombia", "Peru", "Indonesia", "Malaysia", 
  "Thailand", "Vietnam", "Philippines", "Turkey", "Israel", "Saudi Arabia", "UAE", 
  "Other"
];

export const getRegionsForCountry = (country: string) => {
  switch (country) {
    case "United States":
      return US_STATES;
    case "Canada":
      return CANADIAN_PROVINCES;
    case "United Kingdom":
      return UK_REGIONS;
    default:
      return null;
  }
};
