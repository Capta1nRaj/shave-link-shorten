import { TimerReset, ChartNoAxesCombined, QrCodeIcon, ShieldCheckIcon, Link2, TrendingUpDown } from 'lucide-react';
import React from 'react';

const customTitleCSS = `md:text-7xl sm:text-6xl text-4xl text-center font-black lg:leading-7xl md:leading-6xl sm:leading-5xl leading-3xl tracking-tight`;

const KeyFeaturesOfShavelinks = () => {

    const features = [
        {
            icon: <ChartNoAxesCombined className="h-16 w-16 text-custom-icon-color" />,
            title: 'Link Shortening & Analytics',
            description: 'Shorten links and get detailed analytics to track performance efficiently.',
        },
        {
            icon: <QrCodeIcon className="h-16 w-16 text-custom-icon-color" />,
            title: 'Customizable QR Codes',
            description: 'Create, customize, and track QR codes for your links easily.',
        },
        {
            icon: <Link2 className="h-16 w-16 text-custom-icon-color" />,
            title: 'UTM Builder',
            description: 'Add custom URL parameters for comprehensive campaign tracking.',
        },
        {
            icon: <TimerReset className="h-16 w-16 text-custom-icon-color" />,
            title: 'Custom Link Expiration',
            description: 'Set link expiration by date or clicks for precise control.',
        },
        {
            icon: <ShieldCheckIcon className="h-16 w-16 text-custom-icon-color" />,
            title: 'Password-Protected Links',
            description: 'Secure links with password protection for enhanced privacy.',
        },
        {
            icon: <TrendingUpDown className="h-16 w-16 text-custom-icon-color" />,
            title: 'Seamless App Redirection',
            description: 'Guide users smoothly to targeted apps with seamless redirection.',
        },
    ];

    return (
        <section className="py-32 relative overflow-hidden bg-custom-medium text-custom-white" id="features">
            {/* Background decorative elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,171,240,0.03),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,171,240,0.03),transparent_50%)]"></div>

            <section className="max-width relative">
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 mb-4 px-6 py-2 bg-custom-blue/10 rounded-full border border-custom-blue/20">
                        <span className="w-2 h-2 bg-custom-blue rounded-full animate-pulse"></span>
                        <span className="text-custom-blue font-semibold">FEATURES</span>
                    </div>
                    <h2 className={`${customTitleCSS} mb-8`}>
                        Why Choose <span className="relative">
                            <span className="text-custom-blue">ShaveLinks</span>
                        </span>
                    </h2>
                    <p className="text-xl text-custom-white/80 max-w-3xl mx-auto leading-relaxed">
                        Your All-in-One Solution to Empower and Grow Your Business
                    </p>
                </div>

                <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 mx-auto">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group relative flex flex-col items-start p-8 rounded-2xl
                                     bg-custom-dark/80 backdrop-blur-sm border border-custom-blue/10
                                     transition-all duration-500 hover:translate-y-[-5px] hover:bg-custom-dark
                                     hover:border-custom-blue/30 hover:shadow-[0_0_30px_rgba(0,171,240,0.1)]"
                        >
                            {/* Decorative corner accent */}
                            <div className="absolute top-0 right-0 w-24 h-24 bg-custom-blue/5 rounded-bl-[100px] 
                                          transition-all duration-500 group-hover:bg-custom-blue/10"></div>

                            <div className="relative mb-6 p-4 bg-custom-blue/5 rounded-xl 
                                          group-hover:bg-custom-blue/10 transition-all duration-500">
                                {feature.icon}
                            </div>

                            <h3 className="text-2xl font-bold mb-4 text-custom-white group-hover:text-custom-blue 
                                         transition-colors duration-300">
                                {feature.title}
                            </h3>

                            <p className="text-custom-white/70 group-hover:text-custom-white/90 
                                       transition-colors duration-300 leading-relaxed">
                                {feature.description}
                            </p>

                            {/* Hover effect line */}
                            <div className="absolute bottom-0 left-0 w-0 h-1 bg-custom-blue 
                                          transition-all duration-500 group-hover:w-full"></div>
                        </div>
                    ))}
                </div>
            </section>
        </section>
    );
};

export default KeyFeaturesOfShavelinks;