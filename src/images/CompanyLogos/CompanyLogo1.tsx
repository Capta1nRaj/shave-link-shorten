import { ImageInterface } from '@/interfaces/Interfaces';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';


const CompanyLogo1 = ({ className, width, height }: ImageInterface) => {
    return (
        <>
            <Link href={'/'}>
                <Image className={`${className}`} width={width || 80} height={height || 80} src="/images/CompanyLogos/CompanyLogo1.webp" alt="shavelinks logo" priority unoptimized={true} />
            </Link>
        </>
    );
};

export default CompanyLogo1;