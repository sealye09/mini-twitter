import useSWR from 'swr';
import { User } from '@prisma/client';

import fetcher from '@/libs/fetcher';

const useUsers = () => {
  const { data, error, isLoading, mutate } = useSWR<User[]>('/api/users', fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useUsers;
