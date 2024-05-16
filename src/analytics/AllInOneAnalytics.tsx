import React from 'react'
import GoogleAnalyticsComponent from './GoogleAnalyticsComponent'
import MicrosoftClarityComponent from './MicrosoftClarityComponent'

export const AllInOneAnalytics = () => {
    return (
        <>
            <GoogleAnalyticsComponent />
            <MicrosoftClarityComponent />
        </>
    )
}
