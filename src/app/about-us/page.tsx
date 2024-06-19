import { AkshatBhargavImage1, PriyalRajImage1 } from "@/images/ImagesExport"

const team = [
    {
        name: 'Priyal Raj',
        role: 'Full Stack Developer',
        imageUrl: <PriyalRajImage1 customCSS="w-full rounded-2xl object-cover" />,
        location: 'Patna, Bihar',
    },
    {
        name: 'Akshat Bhargav',
        role: 'Intern, Graphic Designer',
        imageUrl: <AkshatBhargavImage1 customCSS="w-full rounded-2xl object-cover" />,
        location: 'New Delhi, Delhi',
    }
]

export default function AboutUsPage() {

    return (
        <div className="bg-primary-1 pb-10">
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
                <div className="lg:px-8 px-6 pt-10">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-4xl font-bold tracking-tight text-primary-4 sm:text-6xl"> About ShaveLinks </h2>
                        <p className="mt-6 text-lg leading-8 text-primary-4">
                            ShaveLinks is a link shortener tool for streamlined sharing. Create concise, custom links effortlessly. Track engagement seamlessly. Simplify your online presence with ShaveLinks Shortener.
                        </p>
                    </div>
                </div>

                {/* Team section */}
                <div className="mx-auto mt-10 max-width">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Our team</h2>
                    </div>
                    <ul role="list" className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4">
                        {team.map((person) => (
                            <li key={person.name}>
                                {person.imageUrl}
                                <h3 className="mt-2 text-lg font-semibold leading-8 tracking-tight text-white">{person.name}</h3>
                                <p className="text-base leading-7 text-gray-300">{person.role}</p>
                                <p className="text-sm leading-6 text-gray-500">{person.location}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    )
}
