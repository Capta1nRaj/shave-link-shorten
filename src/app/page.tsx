'use client'

import { useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { SessionCheck } from "@/utils/SessionCheck";

export default function Home() {

  useEffect(() => {
    SessionCheck();
  }, [])

  return (
    <>
    </>
  );
}