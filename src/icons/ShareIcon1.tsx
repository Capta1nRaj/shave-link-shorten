import React from 'react'

const ShareIcon1 = ({ width, height }: { width?: number, height?: number }) => {
    return (
        <> < svg xmlns="http://www.w3.org/2000/svg" width={width || 32} height={height || 32} viewBox="0 0 24 24" > <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 1 1 0-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 1 0 5.367-2.684a3 3 0 0 0-5.367 2.684m0 9.316a3 3 0 1 0 5.368 2.684a3 3 0 0 0-5.368-2.684" /></svg>
        </>
    )
}

export default ShareIcon1