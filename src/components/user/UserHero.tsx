import { FC } from 'react';
import Image from 'next/image';

import useUser from '@/hooks/useUser';

import Avatar from '../Avatar';

interface UserHeroProps {
  username: string;
}

const UserHero: FC<UserHeroProps> = ({ username }) => {
  const { data: fetchedUser } = useUser(username);

  return (
    <div>
      <div className='bg-base-200 h-44 relative'>
        {fetchedUser && fetchedUser?.coverImageUrl && (
          <Image
            src={fetchedUser.coverImageUrl}
            fill
            alt='Cover Image'
            style={{ objectFit: 'cover' }}
          />
        )}
        <div className='absolute -bottom-16 left-4'>
          <Avatar
            className='w-32 h-32'
            src={fetchedUser?.avatarUrl}
          />
        </div>
      </div>
    </div>
  );
};

export default UserHero;
