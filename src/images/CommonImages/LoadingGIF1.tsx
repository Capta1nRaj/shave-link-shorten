import React from 'react';

const LoadingGIF1 = ({ color = '#00ABF0', width = 40, height = 40 }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
            width={width}
            height={height}
            style={{ shapeRendering: "auto", display: "block", background: "transparent" }}
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            <g>
                <path
                    stroke="none"
                    fill={color}
                    d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50"
                >
                    <animateTransform
                        values="0 50 51;360 50 51"
                        keyTimes="0;1"
                        repeatCount="indefinite"
                        dur="1s"
                        type="rotate"
                        attributeName="transform"
                    />
                </path>
                <g />
            </g>
        </svg>
    );
};

export default LoadingGIF1;
