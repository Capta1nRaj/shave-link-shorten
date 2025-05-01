import { TimerReset, ChartNoAxesCombined, QrCodeIcon, ShieldCheckIcon, Link2, TrendingUpDown } from 'lucide-react';
import React from 'react';

const customTitleCSS = `md:text-6xl sm:text-5xl text-3xl text-center uppercase font-extrabold lg:leading-7xl md:leading-6xl sm:leading-5xl leading-3xl uppercase`;

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
        <section className="py-16 bg-custom-medium text-custom-white" id="features">
            <section className="max-width">
                <div className="text-center mb-12">
                    <h2 className={`${customTitleCSS}`}> Why Choose <span className='text-custom-blue'>ShaveLinks?</span> </h2>
                    <p className="text-lg text-custom-subtitle-color max-w-2xl mx-auto">
                        Your All-in-One Solution to Empower and Grow Your Business
                    </p>
                </div>

                <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 mx-auto">
                    {features.map((feature, index) => (
                        <div key={index} className="flex flex-col items-center px-4 py-8 rounded-lg shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] cursor-default bg-custom-dark">
                            <div className="mb-4 flex items-center justify-center w-20 h-20 bg-custom-icon-bg rounded-full">
                                {feature.icon}
                            </div>
                            <h3 className="text-custom-card-heading-size font-semibold mb-2 lg:text-2xl text-lg text-custom-blue">{feature.title}</h3>
                            <p className="text-center text-custom-card-text-color">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        </section>
    );
};

export default KeyFeaturesOfShavelinks;