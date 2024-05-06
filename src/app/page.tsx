import 'react-toastify/dist/ReactToastify.css';
import IntroLayout from "@/layouts/IntroLayout";
import WhatWeOfferLayout from '@/layouts/WhatWeOfferLayout';
import ScrollToTop from '@/components/ScrollToTop';
import PricingLayout from '@/layouts/PricingLayout';
import { SessionCheck } from '@/utils/SessionCheck';

export default function Home() {
  return (
    <>
      <IntroLayout />
      <WhatWeOfferLayout />
      <PricingLayout />
      <ScrollToTop />
    </>
  );
}