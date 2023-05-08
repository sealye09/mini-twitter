import Header from '@/components/Header';
import LoginModal from '@/components/modals/LoginModal';
import useCurrentUser from '@/hooks/useCurrentUser';
import { useSession } from 'next-auth/react';
import { Inter } from 'next/font/google';

import { useEffect } from 'react';

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
