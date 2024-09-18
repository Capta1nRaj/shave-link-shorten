import { ImageInterface } from '@/misc/Interfaces';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';


const CompanyTextLogo1 = ({ className, width, height }: ImageInterface) => {
    return (
        <>
            <Link href={'/'}>
                <Image className={`${className}`} width={width || 128} height={height || 128} src="/images/CompanyLogos/CompanyTextLogo1.webp" alt="shavelinks text logo" priority unoptimized={true} />
            </Link>
        </>
    );
};

export default CompanyTextLogo1;