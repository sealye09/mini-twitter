import React, { FC, ReactNode } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import FollowBar from './layout/FollowBar';

interface LayoutProps {
  children: ReactNode | ReactNode[];
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className='h-screen'>
      <div className='container h-full mx-auto xl:px-30 max-w-6xl'>
        <div className='h-full flex lg:gap-12 md:gap-8 justify-center'>
          <Sidebar />
          <div className='border-x-[1px] h-full w-full lg:w-1/2'>{children}</div>
          <FollowBar />
        </div>
      </div>
    </div>
  );
};

export default Layout;
