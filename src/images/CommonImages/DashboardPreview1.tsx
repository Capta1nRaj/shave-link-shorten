import { ImageInterface } from '@/interfaces/Interfaces';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';


const DashboardPreview1 = ({ customCSS, width, height }: ImageInterface) => {
    return (
        <>
            <Image className={`${customCSS}`} width={width || 80} height={height || 80} src="/images/CommonImages/DashboardPreview1.png" alt="DashboardPreview1" unoptimized={true} />
        </>
    );
};

export default DashboardPreview1;