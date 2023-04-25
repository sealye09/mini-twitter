import Layout from '@/components/Layout';
import { log } from 'console';
import { Inter } from 'next/font/google';

import { useEffect } from 'react';
import { themeChange } from 'theme-change';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  useEffect(() => {
    themeChange(false);
    // 👆 false parameter is required for react project
  }, []);
  return (
    <main className={inter.className}>
      <Layout>
        <div>
          <button
            className='btn rounded-full'
            data-set-theme='light'
            data-act-class='ACTIVECLASS'
          >
            light
          </button>
          <button
            className='btn rounded-full'
            data-set-theme='dark'
            data-act-class='ACTIVECLASS'
          >
            dark
          </button>
          <button
            className='btn rounded-full'
            data-set-theme='cupcake'
            data-act-class='ACTIVECLASS'
          >
            cupcake
          </button>
          <button
            className='btn rounded-full'
            data-set-theme='bumblebee'
            data-act-class='ACTIVECLASS'
          >
            bumblebee
          </button>
          <button
            className='btn rounded-full'
            data-set-theme='winter'
            data-act-class='ACTIVECLASS'
          >
            winter
          </button>
        </div>
      </Layout>
    </main>
  );
}
