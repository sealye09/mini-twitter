import useSWR from 'swr';
import { User } from '@prisma/client';

import fetcher from '@/libs/fetcher';

const useUser = (username: string) => {
  const { data, error, isLoading, mutate } = useSWR<User>(username ? `/api/users/${username}` : null, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useUser;
