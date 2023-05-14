import React, { FC, ReactNode } from "react";
import FollowBar from "./FollowBar";
import SideBar from "./SideBar";

interface LayoutProps {
  children: ReactNode | ReactNode[];
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="container h-full w-full mx-auto xl:px-30">
      <div className="h-full flex lg:gap-12 md:gap-8 justify-center w-full max-w-6xl mx-auto">
        <div className="w-1/6 lg:w-1/5 min-w-fit flex justify-center">
          <SideBar />
        </div>
        <div className="border-x-[1px] border-base-300 h-full w-full md:w-2/3 lg:w-1/2">
          {children}
        </div>
        <div className="hidden lg:w-1/6 lg:block">
          <FollowBar />
        </div>
      </div>
    </div>
  );
};

export default Layout;
