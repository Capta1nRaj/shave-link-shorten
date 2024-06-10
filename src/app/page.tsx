import IntroLayout from "@/layouts/IntroLayout";
import WhatWeOfferLayout from '@/layouts/WhatWeOfferLayout';
import ScrollToTop from '@/components/ScrollToTop';
import PricingLayout from '@/layouts/PricingLayout';
import WebsiteStatsLayout from "@/layouts/WebsiteStatsLayout";

export default function Home() {
  return (
    <>
      <IntroLayout />
      <WhatWeOfferLayout />
      <PricingLayout />
      {/* <WebsiteStatsLayout /> */}
      <ScrollToTop />
    </>
  );
}