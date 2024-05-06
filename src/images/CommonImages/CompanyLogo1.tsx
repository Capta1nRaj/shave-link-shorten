import { ImageInterface } from '@/interfaces/Interfaces';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';


const CompanyLogo1 = ({ customCSS, width, height }: ImageInterface) => {
    return (
        <>
            <Link href={'/'}>
                <Image className={`${customCSS}`} width={width || 80} height={height || 80} src="/images/CommonImages/CompanyLogo1.png" alt="CompanyLogo1" priority />
            </Link>
        </>
    );
};

export default CompanyLogo1;