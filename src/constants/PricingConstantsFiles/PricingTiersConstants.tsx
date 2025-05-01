import { PricingInterface } from "@/misc/Interfaces";

export const PricingTiersConstants: PricingInterface[] = [
    {
        name: 'Free Forever',
        id: 'tier-free-forever',
        href: '/signup?referral=Captain',
        price: { monthly: '$0', annually: '$0', annualEquivalent: '$0' },
        priceInr: { monthly: '₹0', annually: '₹0', annualEquivalent: '₹0' },
        description: 'Perfect for individuals, hobbyists, and beginners.',
        features: [
            '50 new links/mo',
            '2K tracked clicks/mo',
            '30-day analytics retention',
            'Link expiration by date',
            'UTM builder',
        ],
        featured: false,
    },
    {
        name: 'Startup',
        id: 'tier-startup',
        href: `${process.env.NEXT_PUBLIC_DOMAIN_NAME_2}/payment/Startup`,
        price: { monthly: '$10', annually: '$84', annualEquivalent: '$8' },
        priceInr: { monthly: '₹749', annually: '₹7188', annualEquivalent: '₹599' },
        description: 'For startups & small businesses launching & scaling.',
        features: [
            '200 new links/month',
            '5K tracked clicks/mo',
            '1-year analytics retention',
            'Link expiration by clicks',
            'Custom QR Branding'
        ],
        featured: false,
    },
    {
        name: 'Professional',
        id: 'tier-professional',
        href: `${process.env.NEXT_PUBLIC_DOMAIN_NAME_2}/payment/Professional`,
        price: { monthly: '$29', annually: '$278', annualEquivalent: '$23' },
        priceInr: { monthly: '₹2499', annually: '₹23988', annualEquivalent: '₹1999' },
        description: 'Ideal for growing teams and expanding businesses.',
        features: [
            '5000 new links/month',
            '75K tracked clicks/mo',
            '2-year analytics retention',
            'Password protected links',
            'Discord chat support'
        ],
        featured: true,
    },
    {
        name: 'Enterprise',
        id: 'tier-enterprise',
        href: '#',
        price: { monthly: 'Custom', annually: 'Custom', annualEquivalent: 'Custom' },
        priceInr: { monthly: 'Custom', annually: 'Custom', annualEquivalent: 'Custom' },
        description: 'For large organizations and enterprises.',
        features: [
            'Custom links/month',
            'Custom tracked clicks',
            'Limitless analytics retention',
            'Instant* support F2F',
        ],
        featured: false,
    },
]