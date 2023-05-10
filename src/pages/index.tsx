import { FC } from 'react';
import { Inter } from 'next/font/google';

import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

const Home: FC = () => {
  return (
    <main className={inter.className}>
      <div>
        <Header label='Home' />
      </div>
    </main>
  );
};

export default Home;
