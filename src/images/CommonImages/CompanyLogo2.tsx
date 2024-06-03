import { ImageInterface } from '@/interfaces/Interfaces';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';


const CompanyLogo2 = ({ customCSS, width, height }: ImageInterface) => {
    return (
        <>
            <Link href={'/'}>
                <Image className={`${customCSS}`} width={width || 80} height={height || 80} src="/images/CommonImages/CompanyLogo2.svg" alt="CompanyLogo2" priority unoptimized={true} />
            </Link>
        </>
    );
};

export default CompanyLogo2;