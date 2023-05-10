import { FC, useMemo } from 'react';
import { BiCalendar } from 'react-icons/bi';
import { format } from 'date-fns';

import useCurrentUser from '@/hooks/useCurrentUser';
import useUser from '@/hooks/useUser';
import useEditModal from '@/hooks/useEditModal';
// import useFollow from '@/hooks/useFollow';

interface UserBioProps {
  username: string;
}

const UserBio: FC<UserBioProps> = ({ username }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedUser } = useUser(username);

  const editModal = useEditModal();

  // const { isFollowing, toggleFollow } = useFollow(username);

  const createdAt = useMemo(() => {
    if (!fetchedUser?.createdAt) {
      return null;
    }

    return format(new Date(fetchedUser.createdAt), 'MMMM yyyy');
  }, [fetchedUser?.createdAt]);

  return (
    <div className='border-b-[1px] border-neutral-800 pb-4'>
      <div className='flex justify-end p-2'>
        {currentUser?.username === username ? (
          <button
            className='btn btn-secondary capitalize rounded-full'
            onClick={() => {
              editModal.onOpen();
            }}
          >
            Edit
          </button>
        ) : (
          <button className='btn btn-secondary capitalize rounded-full'>Follow</button>
        )}
      </div>
      <div className='mt-8 px-4'>
        <div className='flex flex-col'>
          <p className='text-2xl font-semibold'>{fetchedUser?.name}</p>
          <p className='text-md text-neutral-500'>@{fetchedUser?.username}</p>
        </div>
        <div className='flex flex-col mt-4'>
          <p className='text-white'>{fetchedUser?.bio}</p>
          <div className='flex flex-row items-center gap-2 mt-4 text-neutral-500'>
            <BiCalendar size={24} />
            <p>Joined {createdAt}</p>
          </div>
        </div>
        <div className='flex flex-row items-center mt-4 gap-6'>
          <div className='flex flex-row items-center gap-1'>
            <p className=''>{fetchedUser?.followingIds?.length}</p>
            <p className='text-neutral-500'>Following</p>
          </div>
          <div className='flex flex-row items-center gap-1'>
            {/* TODO FOLOWERS COUNTS */}
            <p className=''>{fetchedUser?.followingIds.length || 0}</p>
            <p className='text-neutral-500'>Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBio;
