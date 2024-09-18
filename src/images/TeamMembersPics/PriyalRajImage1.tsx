import { ImageInterface } from '@/misc/Interfaces';
import Image from 'next/image';
import React from 'react';


const PriyalRajImage1 = ({ className, width, height }: ImageInterface) => {
    return (
        <>
            <Image className={`${className}`} width={width || 35} height={height || 35} src="/images/TeamMembersPics/PriyalRajImage1.webp" alt="priyal raj shavelinks" unoptimized />
        </>
    );
};

export default PriyalRajImage1;