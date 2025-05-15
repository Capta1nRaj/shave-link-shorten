/* eslint-disable @next/next/no-img-element */
'use client'

import { useState, useEffect, useRef } from 'react'
import { RadioGroup } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { PricingTiersConstants } from '@/constants/PricingConstantsFiles/PricingTiersConstants'
import { PricingFrequenciesListConstants } from '@/constants/PricingConstantsFiles/PricingFrequenciesListConstants'
import { CountriesListConstants } from '@/constants/PricingConstantsFiles/CountriesListConstants'
import { raleway } from '@/misc/Fonts'
import { FrequencyInterface, CountryInterface } from '@/misc/Interfaces'

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
    showSuffix: boolean;
    suffix: string;
}

function AnimatedPrice({ value, showSuffix, suffix }: AnimatedPriceProps) {
    const animatedValue = useCountAnimation(value);

    return (
        <p className="mt-6 flex items-baseline gap-x-1">
            <span className="text-4xl font-bold tracking-tight text-custom-white">
                {animatedValue}
            </span>
            {showSuffix && (
                <span className="text-sm font-semibold leading-6 text-custom-white/80">
                    {suffix}
                </span>
            )}
        </p>
    );
}

export default function PricingLayout() {
    const [frequency, setFrequency] = useState<FrequencyInterface>(PricingFrequenciesListConstants[1])
    const [country, setCountry] = useState<CountryInterface>(CountriesListConstants[0])

    return (
        <>
            <div className="bg-custom-dark py-32 relative overflow-hidden" id='pricing'>
                {/* Background decorative elements */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,171,240,0.03),transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,171,240,0.03),transparent_50%)]"></div>

                <div className="max-width relative">
                    <div className={`mx-auto max-w-4xl text-center ${raleway.className}`}>
                        <div className="inline-flex items-center gap-2 mb-4 px-6 py-2 bg-custom-blue/10 rounded-full border border-custom-blue/20">
                            <span className="w-2 h-2 bg-custom-blue rounded-full animate-pulse"></span>
                            <span className="text-custom-blue font-semibold">PRICING</span>
                        </div>
                        <h2 className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold flex flex-col items-center justify-center text-custom-white gap-y-2`}>
                            <p> Start <span className="text-custom-blue">Free</span>, Scale <span className="text-custom-blue">Smart</span> </p>
                            <p> Grow With <span className="text-custom-blue">Confidence</span> </p>
                        </h2>

                        <p className={`mt-6 text-center text-base sm:text-lg md:text-xl font-normal text-custom-white/80`}>
                            Start <span className="text-custom-crimson underline underline-offset-2">free</span>, grow powerful. Choose what works for your business.
                        </p>
                    </div>

                    <div className="mt-12 flex justify-center">
                        <fieldset aria-label="Payment frequency">
                            <RadioGroup value={frequency} onChange={setFrequency}
                                className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-base font-semibold leading-5 ring-1 ring-inset ring-custom-blue/20 bg-custom-dark/50 backdrop-blur-sm">
                                {PricingFrequenciesListConstants.map((option) => (
                                    <RadioGroup.Option key={option.value} value={option}
                                        className={({ checked }: { checked: boolean }) =>
                                            `${checked ? 'bg-custom-blue text-custom-white' : 'text-custom-white/80 hover:text-custom-white'} cursor-pointer rounded-full px-2.5 py-2 transition-all duration-300`
                                        }>
                                        {option.label}
                                    </RadioGroup.Option>
                                ))}
                            </RadioGroup>
                        </fieldset>
                    </div>

                    <div className="mt-4 flex justify-center">
                        <RadioGroup value={country} onChange={setCountry}
                            className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-sm font-semibold leading-5 ring-1 ring-inset ring-custom-blue/20 bg-custom-dark/50 backdrop-blur-sm">
                            {CountriesListConstants.map((option) => (
                                <RadioGroup.Option key={option.value} value={option}
                                    className={({ checked }: { checked: boolean }) =>
                                        `${checked ? 'bg-custom-blue text-custom-white' : 'text-custom-white/80 hover:text-custom-white'} cursor-pointer rounded-full px-4 py-1 flex items-center justify-center transition-all duration-300`
                                    }>
                                    <img src={option.flag} alt={option.label} className="w-5 mr-1" />
                                    {option.label}
                                </RadioGroup.Option>
                            ))}
                        </RadioGroup>
                    </div>

                    <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-8 md:max-w-2xl md:grid-cols-2 lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-4">
                        {PricingTiersConstants.map((tier, index) => (
                            <div key={tier.id}
                                className={`group relative rounded-3xl p-8 bg-custom-dark/80 backdrop-blur-sm border border-custom-blue/10
                                          transition-all duration-500 hover:translate-y-[-5px] hover:bg-custom-dark
                                          hover:border-custom-blue/30 hover:shadow-[0_0_30px_rgba(0,171,240,0.1)]
                                          ${tier.featured ? 'ring-2 ring-custom-blue' : ''}`}>
                                <h3 id={tier.id} className={`${tier.featured ? 'text-custom-blue' : 'text-custom-white'} text-lg font-semibold leading-8`}>
                                    {tier.name}
                                </h3>
                                <p className="mt-4 text-sm leading-6 text-custom-white/80">{tier.description}</p>
                                <AnimatedPrice
                                    value={tier.name === 'Enterprise' ? 'Custom' : (
                                        country.value === 'in'
                                            ? (frequency.value === 'annually' ? tier.priceInr!.annualEquivalent : tier.priceInr!.monthly)
                                            : (frequency.value === 'annually' ? tier.price.annualEquivalent : tier.price.monthly)
                                    )}
                                    showSuffix={index !== 3}
                                    suffix={frequency.priceSuffix}
                                />

                                {index === 0 ? (
                                    <p className='mt-2 h-5 capitalize text-custom-white/80'>free forever</p>
                                ) : index === 3 ? (
                                    <p className='mt-2 h-5 capitalize'></p>
                                ) : (
                                    <p className={`text-sm capitalize mt-2 text-custom-white/80`}>
                                        {frequency.value === 'annually' ? 'billed yearly' : 'billed monthly'}
                                    </p>
                                )}

                                {tier.name === "Free Forever" ?
                                    <Link href={`${tier.href}`} aria-describedby={tier.id}
                                        className={`${tier.featured
                                            ? 'bg-custom-blue border border-custom-blue text-white shadow-sm hover:bg-custom-dark hover:border-custom-blue'
                                            : 'text-custom-blue hover:bg-custom-5 ring-1 ring-inset ring-custom-white/20 hover:ring-custom-blue'} 
                                            mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 
                                            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
                                            defaultTransitionCSS capitalize transition-all duration-300`}>
                                        get started
                                    </Link>
                                    :
                                    <Link href={tier.name === 'Enterprise' ? '/contact-us' : `${tier.href}/${frequency.value}/${country.value}`}
                                        aria-describedby={tier.id}
                                        className={`${tier.featured
                                            ? 'bg-custom-blue border border-custom-blue text-white shadow-sm hover:bg-custom-dark hover:border-custom-blue'
                                            : 'text-custom-blue hover:bg-custom-5 ring-1 ring-inset ring-custom-white/20 hover:ring-custom-blue'} 
                                            mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 
                                            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
                                            defaultTransitionCSS capitalize transition-all duration-300`}>
                                        {tier.name === 'Enterprise' ? 'contact us' : (tier.name === 'Free Forever' ? 'get started' : tier.name === 'Startup' ? 'get started with startup' : 'get started with pro')}
                                    </Link>
                                }
                                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-custom-white/80">
                                    {tier.features.map((feature) => (
                                        <li key={feature} className="flex gap-x-3 group-hover:text-custom-white transition-colors duration-300">
                                            <CheckIcon className="h-6 w-5 flex-none text-custom-blue" aria-hidden="true" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <Link href={'/pricing'} className={`${raleway.className} font-bold md:text-2xl text-base flex mt-10 bg-custom-blue text-custom-white w-fit mx-auto px-20 py-4 rounded-full border-2 border-custom-blue hover:bg-custom-5 capitalize defaultTransitionCSS`}>
                        compare plans
                    </Link>
                </div>
            </div>
        </>
    )
}