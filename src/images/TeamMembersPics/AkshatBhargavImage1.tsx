import { ImageInterface } from '@/interfaces/Interfaces';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';


const AkshatBhargavImage1 = ({ customCSS, width, height }: ImageInterface) => {
    return (
        <>
            <Image className={`${customCSS}`} width={width || 35} height={height || 35} src="/images/TeamMembersPics/AkshatBhargavImage1.png" alt="AkshatBhargavImage1" unoptimized />
        </>
    );
};

export default AkshatBhargavImage1;