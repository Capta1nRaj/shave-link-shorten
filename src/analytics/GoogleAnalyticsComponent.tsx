import React from 'react'
import { GoogleAnalytics } from "@next/third-parties/google";

export default function GoogleAnalyticsComponent() {
  return (
    <GoogleAnalytics gaId={`${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_CODE}`} />
  )
}
