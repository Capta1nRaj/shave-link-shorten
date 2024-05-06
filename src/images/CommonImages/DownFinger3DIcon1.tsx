import { ImageInterface } from '@/interfaces/Interfaces';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';


const DownFinger3DIcon1 = ({ customCSS, width, height }: ImageInterface) => {
    return (
        <>
            <Image className={`${customCSS}`} width={width || 80} height={height || 80} src="/images/CommonImages/DownFinger3DIcon1.png" alt="DownFinger3DIcon1" />
        </>
    );
};

export default DownFinger3DIcon1;