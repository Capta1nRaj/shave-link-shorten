import { ImageInterface } from '@/interfaces/Interfaces';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';


const QRCodeIcon1 = ({ customCSS, width, height }: ImageInterface) => {
    return (
        <>
            <Link href={'/'}>
                <Image className={`${customCSS}`} width={width || 80} height={height || 80} src="/images/FeaturesBoxImages/QRCodeIcon1.png" alt="QRCodeIcon1" />
            </Link>
        </>
    );
};

export default QRCodeIcon1;