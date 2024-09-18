/* eslint-disable @next/next/no-img-element */
'use client'

import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { PricingTiersConstants } from '@/constants/PricingConstantsFiles/PricingTiersConstants'
import { PricingFrequenciesListConstants } from '@/constants/PricingConstantsFiles/PricingFrequenciesListConstants'
import { CountriesListConstants } from '@/constants/PricingConstantsFiles/CountriesListConstants'
import { raleway } from '@/misc/Fonts'
import { FrequencyInterface, CountryInterface } from '@/misc/Interfaces'

export default function PricingLayout() {

    const [frequency, setFrequency] = useState<FrequencyInterface>(PricingFrequenciesListConstants[1])
    const [country, setCountry] = useState<CountryInterface>(CountriesListConstants[0])

    return (
        <>
            <div className={`bg-custom-dark py-16`} id='pricing'>
                <div className="max-width">

                    <div className={`mx-auto max-w-4xl text-center ${raleway.className}`}>
                        <h2 className={`text-7xl font-bold flex items-center justify-center text-custom-white gap-x-1`}> Our Pricing </h2>

                        <div className={`font-bold tracking-tight text-white sm:text-5xl teeny:text-4xl text-2xl`}>
                            <p className={`flex items-center justify-center gap-x-2`}>
                                Find Your <span className='underline underline-offset-4 text-custom-blue whitespace-nowrap tracking-[0.8px]'>Perfect Plan</span> Today
                            </p>
                        </div>

                        <p className={`mt-2 flex justify-center items-center text-xl gap-x-1 font-normal text-custom-white`}>
                            Choose a plan that suits your business needs.
                        </p>
                    </div>

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

                    <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 md:max-w-2xl md:grid-cols-2 lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-4">
                        {PricingTiersConstants.map((tier, index) => (
                            <div key={tier.id}
                                className={`${tier.featured ? 'ring-2 ring-custom-blue' : 'ring-1 ring-gray-200'} rounded-3xl p-8`}>
                                <h3 id={tier.id} className={`${tier.featured ? 'text-custom-blue' : 'text-custom-white'} text-lg font-semibold leading-8`}>
                                    {tier.name}
                                </h3>
                                <p className="mt-4 text-sm leading-6 text-custom-white">{tier.description}</p>
                                <p className="mt-6 flex items-baseline gap-x-1">
                                    <span className="text-4xl font-bold tracking-tight text-custom-white">
                                        {country.value === 'in'
                                            ? (frequency.value === 'annually' ? tier.priceInr!.annualEquivalent : tier.priceInr!.monthly)
                                            : (frequency.value === 'annually' ? tier.price.annualEquivalent : tier.price.monthly)
                                        }
                                    </span>
                                    {index !== 3 &&
                                        <span className="text-sm font-semibold leading-6 text-custom-white">{frequency.priceSuffix}</span>
                                    }
                                </p>

                                {index === 0 ? (
                                    <p className='mt-2 h-5 capitalize text-custom-white'>free forever</p>
                                ) : index === 3 ? (
                                    <p className='mt-2 h-5 capitalize'></p>
                                ) : (
                                    <p className={`text-sm capitalize mt-2 text-custom-white`}>
                                        {frequency.value === 'annually' ? 'billed yearly' : 'billed monthly'}
                                    </p>
                                )}

                                {tier.name === "Free Forever" ?
                                    <Link href={`${tier.href}`} aria-describedby={tier.id}
                                        className={`${tier.featured
                                            ? 'bg-custom-blue border border-custom-blue text-white shadow-sm hover:bg-custom-dark hover:border-custom-blue'
                                            : 'text-custom-blue hover:bg-custom-5 ring-1 ring-inset ring-custom-white hover:ring-custom-blue'} mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 defaultTransitionCSS capitalize`}>
                                        get started
                                    </Link>
                                    :
                                    <Link href={`${tier.href}&frequency=${frequency.value}&country=${country.value}`} aria-describedby={tier.id}
                                        className={`${tier.featured
                                            ? 'bg-custom-blue border border-custom-blue text-white shadow-sm hover:bg-custom-dark hover:border-custom-blue'
                                            : 'text-custom-blue hover:bg-custom-5 ring-1 ring-inset ring-custom-white hover:ring-custom-blue'} mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 defaultTransitionCSS capitalize`}>
                                        {tier.name === 'Enterprise' ? 'contact us' : (tier.name === 'Free Forever' ? 'get started' : tier.name === 'Startup' ? 'get started with startup' : 'get started with pro')}
                                    </Link>
                                }
                                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-custom-white">
                                    {tier.features.map((feature) => (
                                        <li key={feature} className="flex gap-x-3">
                                            <CheckIcon className="h-6 w-5 flex-none text-custom-blue" aria-hidden="true" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <Link href={'/pricing'} className={`${raleway.className} font-bold md:text-2xl text-base flex mt-10 bg-custom-blue text-custom-white w-fit mx-auto px-20 py-4 rounded-full drop-shadow-none hover:drop-shadow-[0_0px_5px_rgba(255,255,255,0.25)] border border-custom-blue hover:bg-custom-5 capitalize defaultTransitionCSS`}>
                        compare plans
                    </Link>
                </div>
            </div>
        </>
    )
}