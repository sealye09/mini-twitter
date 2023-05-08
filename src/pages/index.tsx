import { useEffect } from 'react';
import { Inter } from 'next/font/google';
import { useSession } from 'next-auth/react';

import useCurrentUser from '@/hooks/useCurrentUser';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { data } = useCurrentUser();
  useEffect(() => {
    console.log(data);
  }, []);
  const session = useSession();
  console.log(session.data);

  return (
    <main className={inter.className}>
      <div>
        <Header label='Home' />
      </div>
    </main>
  );
}
