import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { BsBellFill, BsHouseFill, BsTwitter } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import SiderbarItem from './SiderbarItem';

const Sidebar = () => {
  const router = useRouter();
  const items = [
    {
      icon: BsHouseFill,
      label: '主页',
      href: '/',
    },
    {
      icon: BsBellFill,
      label: '通知',
      href: '/notifications',
      auth: true,
      // alert: currentUser?.hasNotification,
    },
    {
      icon: FaUser,
      label: '个人资料',
      href: `/users/username`,
      auth: true,
    },
  ];

  return (
    <ul className='menu min-w-fit'>
      <li
        onClick={() => {
          router.push('/');
        }}
        className='items-start rounded-full'
      >
        <div className='relative rounded-full h-14 w-14 flex items-start justify-center lg:hidden'>
          <BsTwitter size={28} />
        </div>
        <div className='relative hidden lg:flex rounded-full items-center gap-4 p-4'>
          <BsTwitter size={24} />
        </div>
      </li>
      {items.map((item) => (
        <SiderbarItem
          label={item.label}
          icon={item.icon}
          href={item.href}
          auth={item.auth}
        />
      ))}
    </ul>
  );
};

export default Sidebar;
