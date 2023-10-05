import React, { FC } from "react";
import Image from "next/image";

import DefaultAvatar from "@/../../public/images/avatar.png";
import { cn } from "@/libs/utils";

interface AvatartProps {
  className?: string;
  src: any;
}

const Avatar: FC<AvatartProps> = ({ className, src }) => {
  return (
    <>
      <Image
        className={cn("rounded-full bg-primary h-8 w-8", className)}
        src={src ? src : DefaultAvatar}
        width={100}
        height={100}
        alt={"avatar image"}
      />
    </>
  );
};

export default Avatar;
