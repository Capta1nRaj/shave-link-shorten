import { ImageInterface } from '@/interfaces/Interfaces';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';


const TwitterIcon1 = ({ customCSS, width, height }: ImageInterface) => {
    return (
        <>
            <Image className={`${customCSS}`} width={width || 35} height={height || 35} src="/images/SocialMediaIcons/TwitterIcon1.png" title='TwitterIcon1' alt="TwitterIcon1" />
        </>
    );
};

export default TwitterIcon1;