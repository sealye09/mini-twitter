import { FC } from "react";
import { Inter } from "next/font/google";

import Header from "@/components/Header";
import PostCreator from "@/components/posts/PostCreator";
import PostFeed from '@/components/posts/PostFeed';

const inter = Inter({ subsets: ["latin"] });

const Home: FC = () => (
  <main className={inter.className}>
    <div>
      <Header label="Home" />
      <PostCreator placeholder="What's happening?" />
      <PostFeed />
    </div>
  </main>
);

export default Home;
