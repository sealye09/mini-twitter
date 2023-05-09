import { useRouter } from 'next/router';
// import { ClipLoader } from 'react-spinners';

import useUser from '@/hooks/useUser';

import Header from '@/components/Header';
import UserHero from '@/components/user/UserHero';
import UserBio from '@/components/user/UserBio';

const UserView = () => {
  const router = useRouter();
  const { username } = router.query;

  const { data: fetchedUser, isLoading } = useUser(username as string);

  if (isLoading || !fetchedUser) {
    return (
      <div className='flex justify-center items-center h-full'>
        {/* <ClipLoader
          color='lightblue'
          size={80}
        /> */}
      </div>
    );
  }

  return (
    <>
      <Header
        showBackArrow
        label={fetchedUser?.name}
      />
      <UserHero username={username as string} />
      <UserBio username={username as string} />
      {/* <PostFeed userId={userId as string} /> */}
    </>
  );
};

export default UserView;
