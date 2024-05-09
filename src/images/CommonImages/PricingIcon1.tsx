import { ImageInterface } from '@/interfaces/Interfaces';
import Image from 'next/image';
import React from 'react';


const PricingIcon1 = ({ customCSS, width, height }: ImageInterface) => {
    return (
        <>
            <Image className={`${customCSS}`} width={width || 80} height={height || 80} src="/images/CommonImages/PricingIcon1.png" alt="PricingIcon1" priority />
        </>
    );
};

export default PricingIcon1;