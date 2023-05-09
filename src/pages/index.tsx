import { FC, useEffect } from 'react';
import { Inter } from 'next/font/google';

import useCurrentUser from '@/hooks/useCurrentUser';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

const Home: FC = () => {
  const { data } = useCurrentUser();
  useEffect(() => {
    console.log(data);
  }, []);

  return (
    <main className={inter.className}>
      <div>
        <Header label='Home' />
      </div>
    </main>
  );
};

export default Home;
