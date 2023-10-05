import { useEffect } from "react";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

import Layout from "@/components/layout/Layout";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import EditModal from "@/components/modals/EditModal";
import { themeInit } from "@/hooks/useTheme";

import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  // TODO 初始化时颜色会闪烁一下
  useEffect(() => {
    themeInit();
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
