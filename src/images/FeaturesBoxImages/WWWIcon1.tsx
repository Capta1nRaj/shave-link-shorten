import { ImageInterface } from '@/interfaces/Interfaces';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';


const WWWIcon1 = ({ customCSS, width, height }: ImageInterface) => {
    return (
        <>
            <Link href={'/'}>
                <Image className={`${customCSS}`} width={width || 70} height={height || 70} src="/images/FeaturesBoxImages/WWWIcon1.png" alt="WWWIcon1" />
            </Link>
        </>
    );
};

export default WWWIcon1;