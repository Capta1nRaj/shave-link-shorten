import { ImageInterface } from '@/interfaces/Interfaces';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';


const LinkedinIcon1 = ({ customCSS, width, height }: ImageInterface) => {
    return (
        <>
            <Image className={`${customCSS}`} width={width || 35} height={height || 35} src="/images/SocialMediaIcons/LinkedinIcon1.png" title='LinkedinIcon1' alt="LinkedinIcon1" />
        </>
    );
};

export default LinkedinIcon1;