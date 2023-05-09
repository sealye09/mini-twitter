import { useRouter } from 'next/router';
import useUsers from '@/hooks/useUsers';
import Avatar from '../Avatar';
import { FC } from 'react';

interface FollowBarProps {}

const FollowBar: FC<FollowBarProps> = () => {
  const router = useRouter();
  const { data: users } = useUsers();

  if (!users || users.length === 0) {
    return <div className='fixed'></div>;
  }
  return (
    <div className='fixed my-8 h-fit bg-base-200 shadow-xl rounded-box'>
      <div className='card'>
        <div className='card-body flex-col gap-6 justify-start'>
          <h2 className='card-title'>New Users</h2>
          {users.map((user) => (
            <div
              className='flex items-center hover:cursor-pointer'
              key={user.username}
              onClick={() => {
                router.push(`/users/${user.username}`);
              }}
            >
              <Avatar
                src={user.avatarUrl}
                className='h-8 w-8'
              />
              <div className='flex flex-col items-start justify-between px-4 w-full'>
                <p className='font-semibold text-sm'>{user.name}</p>
                <p className='text-sm text-neutral-500'>@{user.username}</p>
              </div>
              <button
                className='btn btn-primary capitalize btn-sm rounded-full'
                onClick={(event) => {
                  event.stopPropagation();
                  console.log(`Follow ${user.username}`);
                }}
              >
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default FollowBar;
