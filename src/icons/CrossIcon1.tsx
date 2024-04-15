import React from 'react'

const CrossIcon1 = ({ width, height }: { width?: number, height?: number }) => {
    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={width || 32} height={height || 32}
                viewBox="0 0 24 24"><path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="m4.5 19.5l15-15m-15 0l15 15" /></svg>
        </>
    )
}

export default CrossIcon1