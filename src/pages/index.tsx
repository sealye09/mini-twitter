import { FC } from "react";
import { Inter } from "next/font/google";

import Header from "@/components/Header";
import PostCreator from "@/components/PostCreator";

const inter = Inter({ subsets: ["latin"] });

const Home: FC = () => {
  return (
    <main className={inter.className}>
      <div>
        <Header label="Home" />
        <PostCreator placeholder="What's happening?" />
      </div>
    </main>
  );
};

export default Home;
