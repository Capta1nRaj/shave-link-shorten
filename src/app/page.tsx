import 'react-toastify/dist/ReactToastify.css';
import IntroLayout from "@/layouts/IntroLayout";
import WhatWeOfferLayout from '@/layouts/WhatWeOfferLayout';

export default function Home() {
  return (
    <>
      <IntroLayout />
      <WhatWeOfferLayout />
    </>
  );
}