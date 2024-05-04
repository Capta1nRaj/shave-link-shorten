import { raleway } from '@/fonts/Fonts'
import { DownFinger3DIcon1 } from '@/images/ImagesExport'
import { CheckIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'

const tiers = [
    {
        name: 'Free Forever',
        id: 'tier-hobby',
        href: '/signUp',
        priceMonthly: '$0',
        description: 'Open Doors to Opportunity with Our Free Offering.',
        features: [
            '25 new links/month',
            'Unlimited links clicks',
            '30 days analytics retention',
            '5 QR Codes/month',
            '1 Custom Logo',
            'And more',
            // 'App Opener',
        ],
        buttonCSS: "",
        button: "Get started today"
    },
    {
        name: 'Coming soon',
        id: 'tier-team',
        href: '#',
        priceMonthly: '$1-99',
        description: 'Take Your Business to the Next Level with Our Professional Paid Plan.',
        features: [
            'Working on it - Fitz (Ref. Agents Of Shield)',
        ],
        buttonCSS: "pointer-events-none opacity-50",
        button: "Coming soon"
    },
]

export default function PricingLayout() {
    return (
        <div id='pricing' className={"isolate overflow-hidden bg-primary-1"}>
            <div className="mx-auto max-width text-center sm:pt-32 pt-24 pb-96">
                <div className="mx-auto max-w-4xl">
                    <h2 className={`titleCSS text-primary-4 ${raleway.className}`}>Pricing</h2>
                    <div className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                        <p> Your <span className='underline underline-offset-4 text-primary-3'>Perfect Plan</span> Awaits </p>
                        <p className={`mt-2 flex justify-center items-center text-2xl gap-1 font-normal`}> Find it Here <DownFinger3DIcon1 customCSS='w-7' /> </p>
                    </div>
                </div>
                <div className="relative mt-6">
                    <svg
                        viewBox="0 0 1208 1024"
                        className="absolute -top-10 left-1/2 -z-10 h-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:-top-12 md:-top-20 lg:-top-12 xl:top-0"
                    >
                        <ellipse cx={604} cy={512} fill="url(#6d1bd035-0dd1-437e-93fa-59d316231eb0)" rx={604} ry={512} />
                        <defs>
                            <radialGradient id="6d1bd035-0dd1-437e-93fa-59d316231eb0">
                                <stop stopColor="#7775D6" />
                                <stop offset={1} stopColor="#E935C1" />
                            </radialGradient>
                        </defs>
                    </svg>
                </div>
            </div>
            <div className="flow-root pb-24 sm:pb-32">
                <div className="-mt-80">
                    <div className="mx-auto max-width">
                        <div className="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-2">
                            {tiers.map((tier) => (
                                <div
                                    key={tier.id}
                                    className="flex flex-col justify-between rounded-3xl bg-primary-2 p-8 shadow-xl ring-1 ring-gray-900/10 sm:p-10"
                                >
                                    <div>
                                        <h3 id={tier.id} className="text-base font-semibold leading-7 text-primary-3">
                                            {tier.name}
                                        </h3>
                                        <div className="mt-4 flex items-baseline gap-x-2">
                                            <span className="text-5xl font-bold tracking-tight text-primary-4">{tier.priceMonthly}</span>
                                            <span className="text-base font-semibold leading-7 text-primary-4">/month</span>
                                        </div>
                                        <p className="mt-6 text-base leading-7 text-primary-3">{tier.description}</p>
                                        <ul role="list" className="mt-10 space-y-4 text-sm leading-6 text-primary-4">
                                            {tier.features.map((feature) => (
                                                <li key={feature} className="flex gap-x-3">
                                                    <CheckIcon className="h-6 w-5 flex-none text-primary-3" aria-hidden="true" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <Link
                                        href={tier.href}
                                        aria-describedby={tier.id}
                                        className={`${tier.buttonCSS} defaultTransitionCSS mt-8 block rounded-md bg-primary-1 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                                    >
                                        {tier.button}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
