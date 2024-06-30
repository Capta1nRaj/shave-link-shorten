'use client'

import { FetchWebsiteStats } from "@/server/FetchWebsiteStats";
import React, { useState, useEffect, useRef } from 'react';

export default function WebsiteStatsLayout() {
  //! State to hold the statistics data
  const [stats, setStats] = useState({ usersCount: 0, linksCreatedCount: 0, linksTrackedCount: 0 });

  //! State to determine if the stats section is in view
  const [inView, setInView] = useState(false);

  //! Reference to the stats section
  const statsRef = useRef(null);

  //! Fetch the stats data when the component mounts
  useEffect(() => {
    async function fetchData() {
      const { usersCount, linksCreatedCount, linksTrackedCount } = await FetchWebsiteStats();
      setStats({ usersCount, linksCreatedCount, linksTrackedCount });
    }
    fetchData();
  }, []);

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
  const usersCount = useCountAnimation(stats.usersCount);
  const linksCreatedCount = useCountAnimation(stats.linksCreatedCount);
  const linksTrackedCount = useCountAnimation(stats.linksTrackedCount);

  //! Prepare the stats to display
  const statsToDisplay = [
    { name: 'Users', value: usersCount },
    { name: 'Tracked Clicks', value: linksTrackedCount },
    { name: 'Links Generated', value: linksCreatedCount },
  ];

  return (
    <div className="bg-primary-1 py-16" ref={statsRef}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">

          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              <span className="text-primary-3 underline underline-offset-4 capitalize">trusted</span> by creators worldwide
            </h2>
            <p className="mt-4 text-lg leading-8 text-white">
              {/* Working on it, to grow the numbers. */}
            </p>
          </div>

          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-3">
            {statsToDisplay.map((stat) => (
              <div key={stat.name} className="flex flex-col bg-primary-2 p-8">
                <dt className="text-sm font-semibold leading-6 text-primary-4">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-white">
                  {formatNumber(stat.value)}
                </dd>
              </div>
            ))}
          </dl>

        </div>
      </div>
    </div>
  );
}