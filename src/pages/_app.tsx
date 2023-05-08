import Layout from '@/components/Layout';
import LoginModal from '@/components/modals/LoginModal';
import RegisterModal from '@/components/modals/RegisterModak';
import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps}>
      <Toaster />
      <Layout>
        <LoginModal />
        <RegisterModal />
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
