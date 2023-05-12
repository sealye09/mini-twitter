import React, { FC, ReactNode } from "react";
import FollowBar from "./layout/FollowBar";
import SideBar from "./layout/SideBar";

interface LayoutProps {
  children: ReactNode | ReactNode[];
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-[10000px]">
      <div className="container h-full mx-auto xl:px-30 max-w-6xl">
        <div className="h-full flex lg:gap-12 md:gap-8 justify-center">
          <div className="w-1/6 lg:w-1/5 block min-w-fit mx-auto">
            <SideBar />
          </div>
          <div className="border-x-[1px] h-full w-full md:w-2/3 lg:w-1/2">
            {children}
          </div>
          <div className="hidden lg:w-1/5 lg:block">
            <FollowBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
