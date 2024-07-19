import { ImageInterface } from '@/interfaces/Interfaces';
import Image from 'next/image';
import React from 'react';


const ClickIcon1 = ({ customCSS, width, height }: ImageInterface) => {
    return (
        <>
            <Image className={`${customCSS}`} width={width || 80} height={height || 80} src="/images/CommonImages/ClickIcon1.webp" alt="ClickIcon1" priority />
        </>
    );
};

export default ClickIcon1;