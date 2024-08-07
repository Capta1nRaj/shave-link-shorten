import { ImageInterface } from '@/interfaces/Interfaces';
import Image from 'next/image';
import React from 'react';


const JoinWaitlistIcon1 = ({ customCSS, width, height }: ImageInterface) => {
    return (
        <>
            <Image className={`${customCSS}`} width={width || 20} height={height || 20} src="/images/CommonImages/JoinWaitlistIcon1.webp" title='JoinWaitlistIcon1' alt="shavelinks join waitlist" />
        </>
    );
};

export default JoinWaitlistIcon1;