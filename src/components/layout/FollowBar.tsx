import Image from 'next/image';
import useUsers from '@/hooks/useUsers';
import avatar from '@/../public/images/avatar.png';
import { User } from '@prisma/client';
import { useRouter } from 'next/router';
import Avatar from '../Avatar';

const FollowBar = () => {
  const router = useRouter();
  const { data, error, isLoading, mutate } = useUsers();

  if (!data || data.length === 0) {
    return <div className='fixed'></div>;
  }
  return (
    <div className='fixed my-8 h-fit bg-base-200 shadow-xl rounded-box'>
      <div className='card'>
        <div className='card-body flex-col gap-6 justify-start'>
          <h2 className='card-title'>推荐关注</h2>
          {data.map((user: User) => (
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
                <p className='text-sm text-gray-600'>@{user.username}</p>
              </div>
              <button
                className='btn btn-primary btn-sm rounded-full'
                onClick={(event) => {
                  event.stopPropagation();
                  console.log(`Follow ${user.username}`);
                }}
              >
                关注
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default FollowBar;
