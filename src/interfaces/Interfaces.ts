import { ReactNode } from "react";

//! Image interface
export type ImageInterface = {
    width?: number;
    height?: number;
    customCSS?: string;
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