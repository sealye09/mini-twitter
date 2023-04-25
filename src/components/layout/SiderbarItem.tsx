import React, { FC, useCallback } from 'react';
import { IconType } from 'react-icons';
import { useRouter } from 'next/router';

// import useLoginModal from '@/hooks/useLoginModal';
// import useCurrentUser from '@/hooks/useCurrentUser';
import { BsDot } from 'react-icons/bs';

interface SidebarItemProps {
  label: string;
  icon: IconType;
  href?: string;
  onClick?: () => void;
  auth?: boolean;
  alert?: boolean;
}

const SiderbarItem: FC<SidebarItemProps> = ({ label, icon: Icon, href, onClick, auth, alert }) => {
  const router = useRouter();
  // const loginModal = useLoginModal();

  // const { data: currentUser } = useCurrentUser();

  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick();
    }
    if (href) {
      router.push(href);
    }
    // if (auth && !currentUser) {
    //   loginModal.onOpen();
    // } else if (href) {
    //   router.push(href);
    // }
  }, [
    router,
    href,
    auth,
    // loginModal,
    onClick,
    // currentUser,
  ]);
  return (
    <li
      onClick={handleClick}
      className='flex items-start rounded-full w-full min-w-fit'
    >
      <div className='relative rounded-full h-14 w-14 flex items-center justify-center lg:hidden'>
        <Icon size={28} />
      </div>
      <div className='relative hidden lg:flex gap-4 p-4 rounded-full items-center'>
        <Icon size={24} />
        {label !== '' && <p className='hidden lg:block text-xl'>{label}</p>}
        {alert ? (
          <BsDot
            className='absolute -top-4 left-0'
            size={70}
          />
        ) : null}
      </div>
    </li>
  );
};

export default SiderbarItem;
