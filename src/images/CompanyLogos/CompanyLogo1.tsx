import { ImageInterface } from '@/misc/Interfaces';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';


const CompanyLogo1 = ({ className, width, height }: ImageInterface) => {
    return (
        <>
            <Link href={'/'}>
                <Image className={`${className}`} width={width || 128} height={height || 128} src="/images/CompanyLogos/CompanyLogo1.webp" alt="shavelinks logo" priority unoptimized={true} />
            </Link>
        </>
    );
};

export default CompanyLogo1;