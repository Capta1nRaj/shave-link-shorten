'use client'

import { useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { SessionCheck } from "@/utils/SessionCheck";
import IntroLayout from "@/layouts/IntroLayout";

export default function Home() {

  useEffect(() => {
    // SessionCheck();
  }, [])

  return (
    <>
      <IntroLayout />
    </>
  );
}