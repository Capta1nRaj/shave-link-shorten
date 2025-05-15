'use client'

import { useIntervalSync } from '@/hooks/useIntervalSync';
import React, { useState, useEffect, useRef } from 'react';

export default function WebsiteStatsLayout({ usersCount, linksCreatedCount, linksTrackedCount }: { usersCount: number, linksCreatedCount: number, linksTrackedCount: number }) {

  //! State to determine if the stats section is in view
  const [inView, setInView] = useState(false);

  //! Reference to the stats section
  const statsRef = useRef(null);

  //! Use Intersection Observer to detect when the stats section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 } //! Trigger when 10% of the element is visible
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (observer && statsRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  //! Custom hook to animate the count value
  function useCountAnimation(endValue: number) {
    const [value, setValue] = useState(0);

    useEffect(() => {
      if (!inView) {
        return;
      }

      const duration = 4000; //! Duration of the animation in milliseconds
      const startTime = performance.now();

      function animate(currentTime: number) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const currentValue = Math.floor(progress * endValue);
        setValue(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      }

      requestAnimationFrame(animate);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [endValue, inView]);

    return value;
  }

  //! Format the number for display
  function formatNumber(value: number) {
    if (value >= 1000) {
      return (value / 1000).toFixed(1) + 'k+';
    } else if (value >= 100) {
      return Math.floor(value / 100) * 100 + 100 + '+';
    } else if (value >= 10) {
      return Math.floor(value / 10) * 10 + 10 + '+';
    } else {
      return (value + 0) + '+';
    }
  }

  //! Use the custom hook to get animated values
  const animatedUsersCount = useCountAnimation(usersCount);
  const animatedLinksCreatedCount = useCountAnimation(linksCreatedCount);
  const animatedLinksTrackedCount = useCountAnimation(linksTrackedCount);

  //! Prepare the stats to display
  const statsToDisplay = [
    { name: 'Users', value: animatedUsersCount },
    { name: 'Tracked Clicks', value: animatedLinksTrackedCount },
    { name: 'Links Generated', value: animatedLinksCreatedCount },
  ];

  //! Sync the clicks tracking model every 5/30 seconds
  useIntervalSync({
    url: `${process.env.NEXT_PUBLIC_DOMAIN_NAME_3}/api/syncClicksTrackingModel`,
    initialInterval: 5000,
    fastInterval: 5000,
    slowInterval: 30000,
    onError: (error) => {
      console.error("Error syncing clicks tracking model:", error);
    }
  });

  return (
    <div className="bg-custom-medium py-32 relative overflow-hidden" ref={statsRef}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,171,240,0.03),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,171,240,0.03),transparent_50%)]"></div>

      <div className="max-width relative">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-6 py-2 bg-custom-blue/10 rounded-full border border-custom-blue/20">
            <span className="w-2 h-2 bg-custom-blue rounded-full animate-pulse"></span>
            <span className="text-custom-blue font-semibold">STATS</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-custom-white sm:text-4xl flex flex-col gap-2">
            <span>Join <span className="text-custom-blue">Thousands</span> Of</span>
            <span>Successful <span className="text-custom-blue">Businesses</span></span>
          </h2>
          <p className="mt-6 text-lg leading-8 text-custom-white/80">
            {/* Working on it, to grow the numbers. */}
          </p>
        </div>

        <dl className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {statsToDisplay.map((stat) => (
            <div key={stat.name}
              className="group relative flex flex-col items-center bg-custom-dark/80 backdrop-blur-sm 
                       border border-custom-blue/10 p-8 rounded-2xl
                       transition-all duration-500 hover:translate-y-[-5px] hover:bg-custom-dark
                       hover:border-custom-blue/30 hover:shadow-[0_0_30px_rgba(0,171,240,0.1)]">
              <dt className="text-sm font-semibold leading-6 text-custom-white/80 group-hover:text-custom-white 
                           transition-colors duration-300">
                {stat.name}
              </dt>
              <dd className="order-first text-4xl font-bold tracking-tight text-custom-white group-hover:text-custom-blue 
                           transition-colors duration-300">
                {formatNumber(stat.value)}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}