import { ImageInterface } from '@/interfaces/Interfaces';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';


const ArrowIcon1 = ({ customCSS, width, height }: ImageInterface) => {
    return (
        <>
            <Image className={`${customCSS}`} width={width || 40} height={height || 40} src="/images/CommonImages/ArrowIcon1.png" title='ArrowIcon1' alt="ArrowIcon1" />
        </>
    );
};

export default ArrowIcon1;