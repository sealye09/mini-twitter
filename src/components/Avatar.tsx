import React, { FC } from 'react';
import Image from 'next/image';

import DefaultAvatar from '@/../../public/images/avatar.png';

interface AvatartProps {
  className: string;
  src: any;
}

const Avatar: FC<AvatartProps> = ({ className, src }) => {
  return (
    <>
      <Image
        className={`rounded-full bg-primary ${className}`}
        src={!!src ? src : DefaultAvatar}
        width={100}
        height={100}
        alt={'avatar image'}
      />
    </>
  );
};

export default Avatar;
