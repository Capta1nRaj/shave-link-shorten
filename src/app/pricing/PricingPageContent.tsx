/* eslint-disable @next/next/no-img-element */
'use client'
import { useState, useEffect, useRef } from 'react'
import { RadioGroup } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { CountriesListConstants } from '@/constants/PricingConstantsFiles/CountriesListConstants'
import { PricingFrequenciesListConstants } from '@/constants/PricingConstantsFiles/PricingFrequenciesListConstants'
import { PricingTiersConstants } from '@/constants/PricingConstantsFiles/PricingTiersConstants'
import { FrequencyInterface, CountryInterface } from '@/misc/Interfaces'
import NavBarLayout from '@/layouts/NavBarLayout'
import FooterLayout from '@/layouts/FooterLayout'

const sections = [
    {
        name: 'Common Features',
        features: [
            { name: 'Monthly Links', tiers: { "Free Forever": '50/mo', Startup: '200/mo', Professional: '5000/mo', Enterprise: 'Custom' } },
            { name: 'Link clicks', tiers: { "Free Forever": "Unlimited", Startup: "Unlimited", Professional: "Unlimited", Enterprise: "Custom" } },
            { name: 'Tracked Clicks', tiers: { "Free Forever": '2000/mo', Startup: '5000/mo', Professional: '75,000/mo', Enterprise: 'Custom' } },
            { name: 'Analytics Retention', tiers: { "Free Forever": '30 days', Startup: '1 year', Professional: '2 years', Enterprise: 'Custom' } },
            { name: 'Link redirects', tiers: { "Free Forever": "Unlimited", Startup: "Unlimited", Professional: "Unlimited", Enterprise: "Unlimited" } },
            { name: 'Comments', tiers: { "Free Forever": "Unlimited", Startup: "Unlimited", Professional: "Unlimited", Enterprise: "Unlimited" } },
            { name: 'UTM Builder', tiers: { "Free Forever": true, Startup: true, Professional: true, Enterprise: true } },
            { name: 'App Redirect', tiers: { "Free Forever": true, Startup: true, Professional: true, Enterprise: true } },
        ],
    },
    {
        name: 'Advance Features',
        features: [
            { name: 'Tags', tiers: { "Free Forever": '5', Startup: '20', Professional: '200', Enterprise: 'Custom' } },
            { name: 'Link expiration by date', tiers: { "Free Forever": true, Startup: true, Professional: true, Enterprise: true } },
            { name: 'Link expiration by clicks', tiers: { "Free Forever": false, Startup: true, Professional: true, Enterprise: true } },
            { name: 'Custom QR Branding', tiers: { "Free Forever": false, Startup: true, Professional: true, Enterprise: true } },
            { name: 'Password protected links', tiers: { "Free Forever": false, Startup: false, Professional: true, Enterprise: true } },
        ],
    },
    {
        name: 'Support',
        features: [
            { name: 'Discord chat support', tiers: { "Free Forever": false, Startup: true, Professional: true, Enterprise: true } },
            { name: 'Instant* support F2F', tiers: { "Free Forever": false, Startup: false, Professional: true, Enterprise: true } },
        ],
    }
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

function useCountAnimation(endValue: string) {
    const [displayValue, setDisplayValue] = useState(endValue);
    const prevValueRef = useRef(endValue);

    useEffect(() => {
        if (prevValueRef.current === endValue) return;

        const startValue = parseFloat(prevValueRef.current.replace(/[^0-9.-]+/g, ''));
        const endValueNum = parseFloat(endValue.replace(/[^0-9.-]+/g, ''));
        const prefix = endValue.match(/^[^0-9]*/)?.[0] || '';
        const suffix = endValue.match(/[^0-9]*$/)?.[0] || '';

        const duration = 1000; // Animation duration in ms
        const startTime = performance.now();

        function animate(currentTime: number) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);

            // Easing function for smooth animation
            const easeProgress = progress < 0.5
                ? 4 * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;

            const currentValue = startValue + (endValueNum - startValue) * easeProgress;
            setDisplayValue(`${prefix}${Math.round(currentValue)}${suffix}`);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setDisplayValue(endValue);
                prevValueRef.current = endValue;
            }
        }

        requestAnimationFrame(animate);
    }, [endValue]);

    return displayValue;
}

interface AnimatedPriceProps {
    value: string;
    isFeatured: boolean;
    showMonth: boolean;
}

function AnimatedPrice({ value, isFeatured, showMonth }: AnimatedPriceProps) {
    const animatedValue = useCountAnimation(value);

    return (
        <section className="top flex items-center gap-x-2">
            <p className={classNames(isFeatured ? 'text-custom-5' : 'text-custom-white', 'text-4xl font-bold tracking-tight')}>
                {animatedValue}
            </p>
            {showMonth && (
                <span className={`text-sm font-semibold leading-6 ${!isFeatured ? "text-custom-white" : "text-custom-5"}`}>
                    /month
                </span>
            )}
        </section>
    );
}

export default function PricingPageContent() {

    const [frequency, setFrequency] = useState<FrequencyInterface>(PricingFrequenciesListConstants[0])
    const [country, setCountry] = useState<CountryInterface>(CountriesListConstants[0])

    return (
        <>
            <NavBarLayout />
            <div id='pricing-compare-plans' className="isolate overflow-hidden">
                <div className="flow-root bg-custom-dark pb-16 pt-24 sm:pt-32 lg:pb-0">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="relative z-10">
                            <h1 className="mx-auto max-w-4xl text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-custom-white">
                                <p> Pick A <span className="text-custom-blue">Plan</span> </p>
                                <p className='sm:mt-4 mt-2'> Get <span className="text-custom-blue">Ahead</span> Of Others </p>
                            </h1>
                            <div className="mt-8 flex justify-center">
                                <fieldset aria-label="Payment frequency">
                                    <RadioGroup value={frequency} onChange={setFrequency}
                                        className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-base font-semibold leading-5 ring-1 ring-inset ring-gray-200">
                                        {PricingFrequenciesListConstants.map((option) => (
                                            <RadioGroup.Option key={option.value} value={option}
                                                className={({ checked }: { checked: boolean }) =>
                                                    `${checked ? 'bg-custom-blue text-custom-white' : 'text-custom-white'} cursor-pointer rounded-full px-2.5 py-2`
                                                }>
                                                {option.label}
                                            </RadioGroup.Option>
                                        ))}
                                    </RadioGroup>
                                </fieldset>
                            </div>

                            <div className="mt-4 flex justify-center">
                                <RadioGroup value={country} onChange={setCountry} className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-sm font-semibold leading-5 ring-1 ring-inset ring-gray-200">
                                    {CountriesListConstants.map((option) => (
                                        <RadioGroup.Option key={option.value} value={option}
                                            className={({ checked }: { checked: boolean }) =>
                                                `${checked ? 'bg-custom-blue text-custom-white' : 'text-custom-white'} cursor-pointer rounded-full px-4 py-1 flex items-center justify-center`
                                            }>
                                            <img src={option.flag} alt={option.label} className="w-5 mr-1" />
                                            {option.label}
                                        </RadioGroup.Option>
                                    ))}
                                </RadioGroup>
                            </div>
                        </div>
                        <div className="relative mx-auto mt-10 grid max-w-md grid-cols-1 gap-y-8 lg:mx-0 lg:-mb-14 lg:max-w-none lg:grid-cols-4">
                            <svg
                                viewBox="0 0 1208 1024"
                                aria-hidden="true"
                                className="absolute -bottom-48 left-1/2 h-[64rem] -translate-x-1/2 translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] lg:-top-48 lg:bottom-auto lg:translate-y-0"
                            >
                                <ellipse cx={604} cy={512} fill="url(#d25c25d4-6d43-4bf9-b9ac-1842a30a4867)" rx={604} ry={512} />
                                <defs>
                                    <radialGradient id="d25c25d4-6d43-4bf9-b9ac-1842a30a4867">
                                        <stop stopColor="#7775D6" />
                                        <stop offset={1} stopColor="#E935C1" />
                                    </radialGradient>
                                </defs>
                            </svg>
                            <div
                                className="hidden lg:absolute lg:inset-x-px lg:bottom-0 lg:top-4 lg:block lg:rounded-t-2xl lg:bg-gray-800/80 lg:ring-1 lg:ring-white/10"
                                aria-hidden="true"
                            />
                            {PricingTiersConstants.map((tier, index) => (
                                <div
                                    key={tier.id}
                                    className={classNames(
                                        tier.featured
                                            ? 'z-10 bg-custom-white shadow-xl ring-1 ring-gray-900/10'
                                            : 'bg-gray-800/80 ring-1 ring-white/10 lg:bg-transparent lg:pb-14 lg:ring-0',
                                        'relative rounded-2xl',
                                    )}
                                >
                                    <div className="p-8 lg:pt-12 xl:p-10 xl:pt-14">
                                        <h3
                                            id={tier.id}
                                            className={classNames(
                                                tier.featured ? 'text-custom-5' : 'text-custom-white',
                                                'text-sm font-semibold leading-6',
                                            )}
                                        >
                                            {tier.name}
                                        </h3>
                                        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between lg:flex-col lg:items-stretch">
                                            <div className="mt-2 flex flex-col">
                                                <AnimatedPrice
                                                    value={country.value === 'in'
                                                        ? (frequency.value === 'annually' ? tier.priceInr!.annualEquivalent : tier.priceInr!.monthly)
                                                        : (frequency.value === 'annually' ? tier.price.annualEquivalent : tier.price.monthly)
                                                    }
                                                    isFeatured={tier.featured}
                                                    showMonth={index !== 3}
                                                />

                                                {index === 0 ? (
                                                    <p className='mt-2 text-sm text-custom-white/80'>free forever</p>
                                                ) : index === 3 ? (
                                                    <p className='mt-2'></p>
                                                ) : (
                                                    <p className={`mt-2 text-sm ${index === 2 ? 'text-custom-5' : 'text-custom-white/80'}`}>
                                                        {frequency.value === 'annually' ? 'billed yearly' : 'billed monthly'}
                                                    </p>
                                                )}

                                            </div>
                                            <Link href={`${tier.href}/${frequency.value}/${country.value}`} aria-describedby={tier.id}
                                                className={`${tier.featured
                                                    ? 'bg-custom-blue border border-custom-blue text-white shadow-sm hover:bg-custom-dark hover:border-custom-blue'
                                                    : 'text-custom-blue hover:bg-custom-5 ring-1 ring-inset ring-custom-white hover:ring-custom-blue'} mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 defaultTransitionCSS capitalize`}>
                                                {tier.name === 'Enterprise' ? 'contact us' : (tier.name === 'Free Forever' ? 'get started' : tier.name === 'Startup' ? 'get started with startup' : 'get started with pro')}
                                            </Link>
                                        </div>
                                        <div className="mt-8 flow-root sm:mt-10">
                                            <ul role="list"
                                                className={classNames(
                                                    tier.featured
                                                        ? 'divide-gray-900/5 border-gray-900/5 text-custom-white   '
                                                        : 'divide-white/5 border-white/5 text-custom-white',
                                                    '-my-2 divide-y border-t text-sm leading-6 lg:border-t-0',
                                                )}>

                                                {tier.features.map((mainFeature) => (
                                                    <li key={mainFeature} className="flex gap-x-3 py-2">
                                                        <CheckIcon
                                                            className={classNames(
                                                                tier.featured ? 'text-custom-dark' : 'text-custom-blue',
                                                                'h-6 w-5 flex-none',
                                                            )}
                                                            aria-hidden="true"
                                                        />
                                                        <p className={classNames(
                                                            tier.featured ? 'text-custom-5' : 'text-custom-white'
                                                        )}>
                                                            {mainFeature}
                                                        </p>
                                                    </li>
                                                ))}

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="relative bg-gray-200 lg:pt-14">
                    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
                        {/* Feature comparison (up to lg) */}
                        <section aria-labelledby="mobile-comparison-heading" className="lg:hidden">
                            <h2 id="mobile-comparison-heading" className="sr-only">
                                Feature comparison
                            </h2>

                            <div className="mx-auto max-w-2xl space-y-16">
                                {PricingTiersConstants.map((tier) => (
                                    <div key={tier.id} className="border-t border-custom-5">
                                        <div className={classNames(
                                            tier.featured ? 'border-custom-blue w-full' : 'border-transparent',
                                            '-mt-px w-72 border-t-2 pt-10 md:w-80')}>
                                            <h3 className={classNames(
                                                tier.featured ? 'text-custom-blue' : 'text-custom-5',
                                                'text-2xl font-semibold leading-6')}>
                                                {tier.name}
                                            </h3>
                                            <p className="mt-1 text-sm leading-6 text-custom-5 w-72">{tier.description}</p>
                                        </div>

                                        <div className="mt-10 space-y-10">
                                            {sections.map((section) => (
                                                <div key={section.name}>
                                                    <h4 className="text-xl font-semibold leading-6 text-custom-blue">{section.name}</h4>
                                                    <div className="relative mt-6">
                                                        {/* Fake card background */}
                                                        <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-1/2 rounded-lg bg-white shadow-sm sm:block" />

                                                        <div className={classNames(
                                                            tier.featured ? 'ring-2 ring-custom-blue' : 'ring-1 ring-gray-900/10',
                                                            'relative rounded-lg bg-white shadow-sm sm:rounded-none sm:bg-transparent sm:shadow-none sm:ring-0')}>
                                                            <dl className="divide-y divide-gray-200 text-sm leading-6">
                                                                {section.features.map((feature) => (
                                                                    <div key={feature.name}
                                                                        className="flex items-center justify-between px-4 py-3 sm:grid sm:grid-cols-2 sm:px-0">
                                                                        <dt className="pr-4 text-custom-5">{feature.name}</dt>
                                                                        <dd className="flex items-center justify-end sm:justify-center sm:px-4">
                                                                            {typeof feature.tiers[tier.name as keyof typeof feature.tiers] === 'string' ? (
                                                                                <span className={tier.featured ? 'font-semibold text-custom-blue' : 'text-custom-5'}>
                                                                                    {feature.tiers[tier.name as keyof typeof feature.tiers]}
                                                                                </span>
                                                                            ) : (
                                                                                <>
                                                                                    {feature.tiers[tier.name as keyof typeof feature.tiers] === true ? (
                                                                                        <CheckIcon className="mx-auto h-5 w-5 text-custom-5" aria-hidden="true" />
                                                                                    ) : (
                                                                                        <p className='text-custom-5'>
                                                                                            -
                                                                                            {/* <XMarkIcon className="mx-auto h-5 w-5 text-custom-5" aria-hidden="true" /> */}
                                                                                        </p>
                                                                                    )}

                                                                                    <span className="sr-only">
                                                                                        {feature.tiers[tier.name as keyof typeof feature.tiers] === true ? 'Yes' : 'No'}
                                                                                    </span>
                                                                                </>
                                                                            )}
                                                                        </dd>
                                                                    </div>
                                                                ))}
                                                            </dl>
                                                        </div>

                                                        {/* Fake card border */}
                                                        <div aria-hidden="true"
                                                            className={classNames(
                                                                tier.featured ? 'ring-2 ring-custom-blue' : 'ring-1 ring-gray-900/10',
                                                                'pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 rounded-lg sm:block',
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Feature comparison (lg+) */}
                        <section aria-labelledby="comparison-heading" className="hidden lg:block">
                            <h2 id="comparison-heading" className="sr-only">
                                Feature comparison
                            </h2>

                            <div className="grid grid-cols-5 gap-x-8 border-t border-custom-5 before:block">
                                {PricingTiersConstants.map((tier) => (
                                    <div key={tier.id} aria-hidden="true" className="-mt-px">
                                        <div
                                            className={classNames(
                                                tier.featured ? 'border-custom-blue' : 'border-transparent',
                                                'border-t-2 pt-10',
                                            )}>
                                            <p className={classNames(
                                                tier.featured ? 'text-custom-blue' : 'text-custom-5',
                                                'text-base font-semibold leading-6',
                                            )}>
                                                {tier.name}
                                            </p>
                                            <p className="mt-1 text-sm leading-6 text-custom-5">{tier.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="-mt-6 space-y-16">
                                {sections.map((section) => (
                                    <div key={section.name}>
                                        <h3 className="text-xl font-semibold leading-6 text-custom-blue">{section.name}</h3>
                                        <div className="relative -mx-8 mt-10">
                                            {/* Fake card backgrounds */}
                                            <div className="absolute inset-x-8 inset-y-0 grid grid-cols-5 gap-x-8 before:block" aria-hidden="true">
                                                <div className="h-full w-full rounded-lg bg-white shadow-sm" />
                                                <div className="h-full w-full rounded-lg bg-white shadow-sm" />
                                                <div className="h-full w-full rounded-lg bg-white shadow-sm" />
                                                <div className="h-full w-full rounded-lg bg-white shadow-sm" />
                                            </div>

                                            <table className="relative w-full border-separate border-spacing-x-8 font-semibold">
                                                <thead>
                                                    <tr className="text-left">
                                                        <th scope="col">
                                                            <span className="sr-only">Feature</span>
                                                        </th>
                                                        {PricingTiersConstants.map((tier) => (
                                                            <th key={tier.id} scope="col">
                                                                <span className="sr-only">{tier.name} tier</span>
                                                            </th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {section.features.map((feature, featureIdx) => (
                                                        <tr key={feature.name}>
                                                            <th
                                                                scope="row"
                                                                className="w-1/5 py-3 pr-4 text-left text-sm font-semibold leading-6 text-custom-5"
                                                            >
                                                                {feature.name}
                                                                {featureIdx !== section.features.length - 1 ? (
                                                                    <div className="absolute inset-x-8 mt-3 h-px bg-gray-200" />
                                                                ) : null}
                                                            </th>
                                                            {PricingTiersConstants.map((tier) => (
                                                                <td key={tier.id} className="relative w-1/5 px-4 py-0 text-center">
                                                                    <span className="relative h-full w-full py-3">
                                                                        {typeof feature.tiers[tier.name as keyof typeof feature.tiers] === 'string' ? (
                                                                            <span
                                                                                className={classNames(tier.featured ? 'font-semibold text-custom-blue' : 'text-custom-5', 'text-sm leading-6')}>
                                                                                {feature.tiers[tier.name as keyof typeof feature.tiers]}
                                                                            </span>
                                                                        ) : (
                                                                            <>
                                                                                {feature.tiers[tier.name as keyof typeof feature.tiers] === true ? (
                                                                                    <CheckIcon className="mx-auto h-5 w-5 text-custom-5" aria-hidden="true" />
                                                                                ) : (
                                                                                    <p className='text-custom-5'>
                                                                                        -
                                                                                        {/* <XMarkIcon className="mx-auto h-5 w-5 text-custom-5" aria-hidden="true" /> */}
                                                                                    </p>
                                                                                )}

                                                                                <span className="sr-only">
                                                                                    {feature.tiers[tier.name as keyof typeof feature.tiers] === true ? 'Yes' : 'No'}
                                                                                </span>
                                                                            </>
                                                                        )}
                                                                    </span>
                                                                </td>
                                                            ))}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>

                                            {/* Fake card borders */}
                                            <div
                                                className="pointer-events-none absolute inset-x-8 inset-y-0 grid grid-cols-5 gap-x-8 before:block"
                                                aria-hidden="true"
                                            >
                                                {PricingTiersConstants.map((tier) => (
                                                    <div
                                                        key={tier.id}
                                                        className={classNames(
                                                            tier.featured ? 'ring-2 ring-custom-blue' : 'ring-1 ring-gray-900/10',
                                                            'rounded-lg',
                                                        )}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <FooterLayout />
        </>
    )
}