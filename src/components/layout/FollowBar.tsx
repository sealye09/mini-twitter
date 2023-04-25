// import useUsers from '@/hooks/useUsers';
//
// import Avatar from '../Avatar';

const FollowBar = () => {
  //   const { data: users = [] } = useUsers();
  //
  //   if (users.length === 0) {
  //     return null;
  //   }

  return (
    <div className='card w-auto my-8 h-fit bg-neutral shadow-xl text-primary-content hidden lg:block'>
      <div className='card-body'>
        <h2 className='card-title text-base-100'>推荐关注</h2>
        <div className='flex flex-row'>
          <div className='flex flex-col items-start justify-between pr-4'>
            <p className='text-base-100 font-semibold text-sm'>user.name</p>
            <p className='text-neutral-400 text-sm'>@user.username</p>
          </div>
          <div className='card-actions justify-end'></div>
          <button className='btn btn-primary rounded-full'>关注</button>
        </div>
      </div>
    </div>
  );
};

export default FollowBar;
