'use client'

import { ArrowIcon1 } from '@/images/ImagesExport';
import React, { useState, useEffect } from 'react';

const ScrollToTop = () => {

    //! set button as invisible at initial phase
    const [isVisible, setIsVisible] = useState(false);

    //! If page scrolled more than 20%, then show the button
    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const scrollY = window.scrollY;
            const scrollHeight = document.body.scrollHeight;

            // Calculate scroll percentage
            const scrollPercentage = (scrollY / (scrollHeight - windowHeight)) * 100;

            // Set visibility based on scroll percentage
            if (scrollPercentage > 20) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        //! Cleanup the code to prevent memory leaks and unwanted side effects
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    //! If onClick on the button, then, scroll to top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <section className={`-rotate-90 cursor-pointer arrow-button fixed bottom-6 right-6 bg-primary-3 rounded-full p-2 defaultTransitionCSS ${isVisible ? 'opacity-100 z-10' : 'opacity-0 -z-10'}`}
            onClick={scrollToTop}>
            <ArrowIcon1 customCSS='w-5 h-5' />
        </section>
    );
};

export default ScrollToTop;
