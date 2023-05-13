import { useEffect } from "react";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { themeChange } from "theme-change";
import { Toaster } from "react-hot-toast";

import Layout from "@/components/layout/Layout";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";

import "@/styles/globals.css";
import EditModal from "@/components/modals/EditModal";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    themeChange(false);
    // 👆 false parameter is required for react project
  }, []);

  return (
    <SessionProvider session={pageProps}>
      <Toaster />
      <Layout>
        <LoginModal />
        <RegisterModal />
        <EditModal />
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
