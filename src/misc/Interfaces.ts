//! Image interface
export type ImageInterface = {
    width?: number;
    height?: number;
    className?: string;
}

//! Pricing interface
export type PricingInterface = {
    name: string;
    id: string;
    href: string;
    price: { monthly: string; annually: string; annualEquivalent: string };
    priceInr?: { monthly: string; annually: string; annualEquivalent: string };
    description: string;
    features: string[];
    featured: boolean;
};

//! Monthly & Annually frequency interface
export type FrequencyInterface = {
    value: 'monthly' | 'annually';
    label: string;
    priceSuffix: string;
}

//! Country Interface
export type CountryInterface = {
    value: 'us' | 'in';
    label: string;
    flag: string;
}

// Add and export interfaces from PricingPageContent.tsx

export interface Price {
    inr: number;
    usd: number;
}

export interface PriceStructure {
    monthly: Price;
    annually: Price;
}

export interface Tier {
    name: string;
    id: string;
    href: string;
    featured: boolean;
    description: string;
    price: PriceStructure;
    isDiscountActive: boolean;
    discountPrice: PriceStructure;
    discountActiveUntil: string | null;
    mainFeatures: string[];
}

export interface FeatureTiers {
    [key: string]: string | boolean;
}

export interface Feature {
    name: string;
    tiers: FeatureTiers;
}

export interface Section {
    name: string;
    features: Feature[];
}

export interface PricingPlans {
    _id: string;
    tiers: Tier[];
    sections: Section[];
    updatedAt: string;
}