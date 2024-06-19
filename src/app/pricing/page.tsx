/* eslint-disable @next/next/no-img-element */
'use client'
import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { CountriesListConstants } from '@/constants/PricingConstantsFiles/CountriesListConstants'
import { PricingFrequenciesListConstants } from '@/constants/PricingConstantsFiles/PricingFrequenciesListConstants'
import { FrequencyInterface, CountryInterface } from '@/interfaces/Interfaces'
import { PricingTiersConstants } from '@/constants/PricingConstantsFiles/PricingTiersConstants'

const sections = [
    {
        name: 'Common Features',
        features: [
            { name: 'Monthly Links', tiers: { "Free Forever": '50/mo', Startup: '200/mo', Professional: '5000/mo', Enterprise: 'Custom' } },
            { name: 'Link clicks', tiers: { "Free Forever": "Unlimited", Startup: "Unlimited", Professional: "Unlimited", Enterprise: "Unlimited" } },
            { name: 'Tracked Clicks', tiers: { "Free Forever": '2000/mo', Startup: '5000/mo', Professional: '75,000/mo', Enterprise: 'Custom' } },
            { name: 'Analytics Retention', tiers: { "Free Forever": '30 days', Startup: '1 year', Professional: '2 years', Enterprise: 'Unlimited' } },
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
            { name: 'Custom Branding For QR', tiers: { "Free Forever": false, Startup: true, Professional: true, Enterprise: true } },
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

export default function Example() {

    const [frequency, setFrequency] = useState<FrequencyInterface>(PricingFrequenciesListConstants[0])
    const [country, setCountry] = useState<CountryInterface>(CountriesListConstants[0])

    return (
        <div className="isolate overflow-hidden">
            <div className="flow-root bg-primary-1 pb-16 pt-24 sm:pt-32 lg:pb-0">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="relative z-10">
                        <h2 className="mx-auto max-w-4xl text-center sm:text-5xl text-4xl font-bold tracking-tight text-primary-4">
                            <p> Transparent Fees </p>
                            <p className='sm:mt-4 mt-0'> Total Flexibility </p>
                        </h2>
                        <div className="mt-8 flex flex-col w-fit gap-y-4 justify-center mx-auto">
                            <fieldset aria-label="Payment frequency">
                                <RadioGroup
                                    value={frequency}
                                    onChange={setFrequency}
                                    className="grid grid-cols-2 gap-x-1 rounded-full bg-white/5 p-1 text-center text-xs font-semibold leading-5 text-primary-4"
                                >
                                    {PricingFrequenciesListConstants.map((option) => (
                                        <RadioGroup.Option
                                            key={option.value}
                                            value={option}
                                            className={({ checked }) =>
                                                classNames(checked ? 'bg-primary-3' : '', 'cursor-pointer rounded-full px-2.5 py-1')
                                            }
                                        >
                                            {option.label}
                                        </RadioGroup.Option>
                                    ))}
                                </RadioGroup>
                            </fieldset>

                            <fieldset aria-label="Country selection" className="w-[115px] mx-auto">
                                <RadioGroup
                                    value={country}
                                    onChange={setCountry}
                                    className="grid grid-cols-2 gap-x-1 rounded-full bg-white/5 p-1 text-center text-xs font-semibold leading-5 text-primary-4">
                                    {CountriesListConstants.map((option) => (
                                        <RadioGroup.Option
                                            key={option.value}
                                            value={option}
                                            className={({ checked }) =>
                                                classNames(checked ? 'bg-primary-3' : '', 'cursor-pointer rounded-full px-2.5 py-1 flex items-center justify-center')
                                            }
                                        >
                                            <img src={option.flag} alt={option.label} className="w-5 mr-1" />
                                            {option.label}
                                        </RadioGroup.Option>
                                    ))}
                                </RadioGroup>
                            </fieldset>
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
                                        ? 'z-10 bg-primary-4 shadow-xl ring-1 ring-gray-900/10'
                                        : 'bg-gray-800/80 ring-1 ring-white/10 lg:bg-transparent lg:pb-14 lg:ring-0',
                                    'relative rounded-2xl',
                                )}
                            >
                                <div className="p-8 lg:pt-12 xl:p-10 xl:pt-14">
                                    <h3
                                        id={tier.id}
                                        className={classNames(
                                            tier.featured ? 'text-primary-5' : 'text-primary-4',
                                            'text-sm font-semibold leading-6',
                                        )}
                                    >
                                        {tier.name}
                                    </h3>
                                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between lg:flex-col lg:items-stretch">
                                        <div className="mt-2 flex flex-col">

                                            <section className="top flex items-center gap-x-2">

                                                <p className={classNames(tier.featured ? 'text-primary-5' : 'text-primary-4', 'text-4xl font-bold tracking-tight')}>
                                                    {country.value === 'in'
                                                        ? (frequency.value === 'annually' ? tier.priceInr!.annualEquivalent : tier.priceInr!.monthly)
                                                        : (frequency.value === 'annually' ? tier.price.annualEquivalent : tier.price.monthly)
                                                    }
                                                </p>

                                                <span className={`text-sm font-semibold leading-6 ${index !== 2 ? "text-primary-4" : "text-primary-5"}`}>
                                                    {index !== 3 &&
                                                        <>
                                                            /month
                                                        </>
                                                    }
                                                </span>

                                            </section>

                                            {index === 0 ? (
                                                <p className='mt-2 h-5 capitalize'>free forever</p>
                                            ) : index === 3 ? (
                                                <p className='mt-2 h-5 capitalize'></p>
                                            ) : (
                                                <p className={`text-sm text-primary-4 capitalize mt-2 ${index !== 2 ? "text-primary-4" : "text-primary-5"}`}>
                                                    {frequency.value === 'annually' ? 'billed yearly' : 'billed monthly'}
                                                </p>
                                            )}

                                        </div>
                                        <Link href={tier.href} aria-describedby={tier.id}
                                            className={`${tier.featured
                                                ? 'bg-primary-3 border border-primary-3 text-white shadow-sm hover:bg-primary-1 hover:border-primary-3'
                                                : 'text-primary-3 hover:bg-primary-5 ring-1 ring-inset ring-primary-4 hover:ring-primary-3'} mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 defaultTransitionCSS capitalize`}>
                                            {tier.name === 'Enterprise' ? 'contact us' : (tier.name === 'Free Forever' ? 'get started' : 'buy plan')}
                                        </Link>
                                    </div>
                                    <div className="mt-8 flow-root sm:mt-10">
                                        <ul role="list"
                                            className={classNames(
                                                tier.featured
                                                    ? 'divide-gray-900/5 border-gray-900/5 text-primary-4   '
                                                    : 'divide-white/5 border-white/5 text-primary-4',
                                                '-my-2 divide-y border-t text-sm leading-6 lg:border-t-0',
                                            )}>

                                            {tier.features.map((mainFeature) => (
                                                <li key={mainFeature} className="flex gap-x-3 py-2">
                                                    <CheckIcon
                                                        className={classNames(
                                                            tier.featured ? 'text-primary-1' : 'text-primary-3',
                                                            'h-6 w-5 flex-none',
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                    <p className={classNames(
                                                        tier.featured ? 'text-primary-5' : 'text-primary-4'
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
            <div className="relative bg-primary-4 lg:pt-14">
                <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
                    {/* Feature comparison (up to lg) */}
                    <section aria-labelledby="mobile-comparison-heading" className="lg:hidden">
                        <h2 id="mobile-comparison-heading" className="sr-only">
                            Feature comparison
                        </h2>

                        <div className="mx-auto max-w-2xl space-y-16">
                            {PricingTiersConstants.map((tier) => (
                                <div key={tier.id} className="border-t border-primary-5">
                                    <div className={classNames(
                                        tier.featured ? 'border-primary-3 w-full' : 'border-transparent',
                                        '-mt-px w-72 border-t-2 pt-10 md:w-80')}>
                                        <h3 className={classNames(
                                            tier.featured ? 'text-primary-3' : 'text-primary-5',
                                            'text-2xl font-semibold leading-6')}>
                                            {tier.name}
                                        </h3>
                                        <p className="mt-1 text-sm leading-6 text-primary-5 w-72">{tier.description}</p>
                                    </div>

                                    <div className="mt-10 space-y-10">
                                        {sections.map((section) => (
                                            <div key={section.name}>
                                                <h4 className="text-xl font-semibold leading-6 text-primary-3">{section.name}</h4>
                                                <div className="relative mt-6">
                                                    {/* Fake card background */}
                                                    <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-1/2 rounded-lg bg-white shadow-sm sm:block" />

                                                    <div className={classNames(
                                                        tier.featured ? 'ring-2 ring-primary-3' : 'ring-1 ring-gray-900/10',
                                                        'relative rounded-lg bg-white shadow-sm sm:rounded-none sm:bg-transparent sm:shadow-none sm:ring-0')}>
                                                        <dl className="divide-y divide-gray-200 text-sm leading-6">
                                                            {section.features.map((feature) => (
                                                                <div key={feature.name}
                                                                    className="flex items-center justify-between px-4 py-3 sm:grid sm:grid-cols-2 sm:px-0">
                                                                    <dt className="pr-4 text-primary-5">{feature.name}</dt>
                                                                    <dd className="flex items-center justify-end sm:justify-center sm:px-4">
                                                                        {typeof feature.tiers[tier.name as keyof typeof feature.tiers] === 'string' ? (
                                                                            <span className={tier.featured ? 'font-semibold text-primary-3' : 'text-primary-5'}>
                                                                                {feature.tiers[tier.name as keyof typeof feature.tiers]}
                                                                            </span>
                                                                        ) : (
                                                                            <>
                                                                                {feature.tiers[tier.name as keyof typeof feature.tiers] === true ? (
                                                                                    <CheckIcon className="mx-auto h-5 w-5 text-primary-5" aria-hidden="true" />
                                                                                ) : (
                                                                                    <p className='text-primary-5'>
                                                                                        -
                                                                                        {/* <XMarkIcon className="mx-auto h-5 w-5 text-primary-5" aria-hidden="true" /> */}
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
                                                            tier.featured ? 'ring-2 ring-primary-3' : 'ring-1 ring-gray-900/10',
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

                        <div className="grid grid-cols-5 gap-x-8 border-t border-primary-5 before:block">
                            {PricingTiersConstants.map((tier) => (
                                <div key={tier.id} aria-hidden="true" className="-mt-px">
                                    <div
                                        className={classNames(
                                            tier.featured ? 'border-primary-3' : 'border-transparent',
                                            'border-t-2 pt-10',
                                        )}>
                                        <p className={classNames(
                                            tier.featured ? 'text-primary-3' : 'text-primary-5',
                                            'text-base font-semibold leading-6',
                                        )}>
                                            {tier.name}
                                        </p>
                                        <p className="mt-1 text-sm leading-6 text-primary-5">{tier.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="-mt-6 space-y-16">
                            {sections.map((section) => (
                                <div key={section.name}>
                                    <h3 className="text-xl font-semibold leading-6 text-primary-3">{section.name}</h3>
                                    <div className="relative -mx-8 mt-10">
                                        {/* Fake card backgrounds */}
                                        <div className="absolute inset-x-8 inset-y-0 grid grid-cols-5 gap-x-8 before:block" aria-hidden="true">
                                            <div className="h-full w-full rounded-lg bg-white shadow-sm" />
                                            <div className="h-full w-full rounded-lg bg-white shadow-sm" />
                                            <div className="h-full w-full rounded-lg bg-white shadow-sm" />
                                            <div className="h-full w-full rounded-lg bg-white shadow-sm" />
                                        </div>

                                        <table className="relative w-full border-separate border-spacing-x-8">
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
                                                            className="w-1/5 py-3 pr-4 text-left text-sm font-semibold leading-6 text-primary-5"
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
                                                                            className={classNames(tier.featured ? 'font-semibold text-primary-3' : 'text-primary-5', 'text-sm leading-6')}>
                                                                            {feature.tiers[tier.name as keyof typeof feature.tiers]}
                                                                        </span>
                                                                    ) : (
                                                                        <>
                                                                            {feature.tiers[tier.name as keyof typeof feature.tiers] === true ? (
                                                                                <CheckIcon className="mx-auto h-5 w-5 text-primary-5" aria-hidden="true" />
                                                                            ) : (
                                                                                <p className='text-primary-5'>
                                                                                    -
                                                                                    {/* <XMarkIcon className="mx-auto h-5 w-5 text-primary-5" aria-hidden="true" /> */}
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
                                                        tier.featured ? 'ring-2 ring-primary-3' : 'ring-1 ring-gray-900/10',
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
    )
}