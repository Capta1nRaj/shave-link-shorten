import IntroLayout from "@/layouts/IntroLayout";
import WhatWeOfferLayout from '@/layouts/WhatWeOfferLayout';
import ScrollToTop from '@/components/ScrollToTop';
import WebsiteStatsLayout from "@/layouts/WebsiteStatsLayout";
import PricingLayout from "@/layouts/PricingLayout";

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