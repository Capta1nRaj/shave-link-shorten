import { ImageInterface } from '@/interfaces/Interfaces';
import Image from 'next/image';
import React from 'react';


const DashboardPreview1 = ({ customCSS, width, height }: ImageInterface) => {
    return (
        <>
            <Image className={`${customCSS} border-2 border-solid rounded-lg`} width={width || 80} height={height || 80} src="/images/CommonImages/DashboardPreview1.webp" alt="shavelinks dashboard preview" unoptimized={true} priority={true} />
        </>
    );
};

export default DashboardPreview1;