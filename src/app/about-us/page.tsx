import { PriyalRajImage1 } from "@/images/ImagesExport"
import FooterLayout from "@/layouts/FooterLayout";
import NavBarLayout from "@/layouts/NavBarLayout";
import { Metadata } from "next";

const team = [
    {
        name: 'Priyal Raj',
        role: 'Full Stack Developer',
        imageUrl: <PriyalRajImage1 className="w-full rounded-2xl object-cover" />,
        location: 'Patna, Bihar',
    }
]

export const metadata: Metadata = {
    title: "Learn More About Our Mission & Team",
    description: "ShaveLinks is a URL shortener that simplifies your link management with powerful analytics, and boost your business. Meet the innovative team behind it.",
    keywords: "about us, team, mission, innovation, link management, analytics tools, digital solutions, company values, business growth, priyal raj",
    twitter: {
        card: "summary_large_image"
    },
    openGraph: {
        images: 'https://shave-links-production.s3.ap-south-1.amazonaws.com/root-images/OpenGraphImage.png',
    },
    alternates: {
        canonical: '/about-us',
    }
};

export default function AboutUsPage() {
    return (
        <>
            <NavBarLayout />
            <div className="bg-custom-dark py-20 text-white">
                <main className="relative isolate">
                    {/* Background */}
                    <div className="absolute inset-x-0 top-4 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl" aria-hidden="true">
                        <div
                            className="aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25"
                            style={{
                                clipPath:
                                    'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
                            }}
                        />
                    </div>

                    {/* Header section */}
                    <div className="lg:px-8 px-6">
                        <div className="mx-auto max-w-2xl text-center">
                            <h1 className="text-4xl font-bold tracking-tight text-custom-white sm:text-6xl"> About <span className="text-custom-blue">ShaveLinks</span> </h1>
                            <p className="mt-6 text-lg leading-8 text-custom-white">
                                <span className="text-custom-blue font-semibold">ShaveLinks</span> is a link shortener tool for effortless sharing. Create concise, custom links, track engagement seamlessly, and simplify your online presence with advanced analytics and customizable QR codes.
                            </p>
                        </div>
                    </div>

                    {/* Team section */}
                    <div className="mx-auto mt-10 max-width">
                        <div className="mx-auto max-w-2xl lg:mx-0">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl"> Our team </h2>
                        </div>
                        <ul role="list" className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4">
                            {team.map((person) => (
                                <li key={person.name}>
                                    {person.imageUrl}
                                    <h3 className="mt-2 text-lg font-semibold leading-8 tracking-tight text-white">{person.name}</h3>
                                    <p className="text-base leading-7 text-gray-300">{person.role}</p>
                                    <p className="text-sm leading-6 text-gray-400">{person.location}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </main>
            </div>
            <FooterLayout />
        </>
    )
}
