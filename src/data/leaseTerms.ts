
import { LeaseTerm } from "../types/product";

export const leaseTerms: LeaseTerm[] = [
  {
    id: "monthly",
    name: "Monthly",
    durationMonths: 1,
    description: "Flexible monthly rolling contract with no long-term commitment",
    priceMultiplier: 1.0, // Set to 1.0 to avoid additional calculations
  },
  {
    id: "12month",
    name: "12 Months",
    durationMonths: 12,
    description: "12-month contract with better monthly rates",
    priceMultiplier: 1.0, // Set to 1.0 to avoid additional calculations
  },
  {
    id: "24month",
    name: "24 Months",
    durationMonths: 24,
    description: "24-month contract with great value monthly rates",
    priceMultiplier: 1.0, // Set to 1.0 to avoid additional calculations
  },
  {
    id: "36month",
    name: "36 Months",
    durationMonths: 36,
    description: "36-month contract with our best monthly rates",
    priceMultiplier: 1.0, // Set to 1.0 to avoid additional calculations
  },
];

export const getLeaseTermById = (id: string): LeaseTerm | undefined => {
  return leaseTerms.find(term => term.id === id);
};
