import React from 'react'

const CopyIcon1 = ({ width, height }: { width?: number, height?: number }) => {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width={width || 32} height={height || 32}
                viewBox="0 0 48 48">
                <g fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="4"><path
                    strokeLinecap="round"
                    d="M17 7h-7a2 2 0 0 0-2 2v33a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-7" /><path d="M17 4h14v6H17z" /></g>
            </svg>
        </>
    )
}

export default CopyIcon1