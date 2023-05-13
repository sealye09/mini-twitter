import React, { FC, useCallback } from "react";
import { useRouter } from "next/router";
import { IconType } from "react-icons";

interface SideBarItemProps {
  label: string;
  icon: IconType;
  href?: string;
  onClick?: () => void;
  auth: boolean;
  alert?: boolean;
}

const SideBarItem: FC<SideBarItemProps> = ({ label, icon: Icon, href, onClick, auth, alert }) => {
  const router = useRouter();

  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick();
    }
    if (href) {
      router.push(href);
    }
  }, [router, href, auth, onClick]);

  if (auth) {
    return <></>;
  }
  return (
    <li
      onClick={handleClick}
      className="flex items-start rounded-full w-full min-w-fit"
    >
      <div className="relative rounded-full h-14 w-14 flex items-center justify-center lg:hidden">
        <Icon size={28} />
      </div>
      <div className={"relative hidden lg:flex gap-4 p-4 rounded-full items-center"}>
        <Icon
          size={24}
          className={`${alert && "text-primary"}`}
        />
        {label !== "" && <p className="hidden lg:block text-xl">{label}</p>}
      </div>
    </li>
  );
};

export default SideBarItem;
