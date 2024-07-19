import { ImageInterface } from '@/interfaces/Interfaces';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';


const CompanyTextLogo1 = ({ customCSS, width, height }: ImageInterface) => {
    return (
        <>
            <Link href={'/'}>
                <Image className={`${customCSS}`} width={width || 80} height={height || 80} src="/images/CompanyLogos/CompanyTextLogo1.webp" alt="CompanyTextLogo1" priority unoptimized={true} />
            </Link>
        </>
    );
};

export default CompanyTextLogo1;