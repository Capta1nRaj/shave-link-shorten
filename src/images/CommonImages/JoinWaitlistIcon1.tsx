import { ImageInterface } from '@/interfaces/Interfaces';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';


const JoinWaitlistIcon1 = ({ customCSS, width, height }: ImageInterface) => {
    return (
        <>
            <Link href={'/'}>
                <Image className={`${customCSS}`} width={width || 20} height={height || 20} src="/images/CommonImages/JoinWaitlistIcon1.png" alt="JoinWaitlistIcon1" />
            </Link>
        </>
    );
};

export default JoinWaitlistIcon1;