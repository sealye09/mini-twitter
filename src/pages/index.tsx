import { FC } from "react";
import { Inter } from "next/font/google";

import Header from "@/components/Header";
import PostCreator from "@/components/posts/PostCreator";
import PostFeed from "@/components/posts/PostFeed";
import usePosts from "@/hooks/usePosts";

const inter = Inter({ subsets: ["latin"] });

const Home: FC = () => {
  const { data: posts = [] } = usePosts();
  return (
    <main className={`min-h-screen ${inter.className}`}>
      <div>
        <Header label="Home" />
        <PostCreator placeholder="What's happening?" />
        <PostFeed posts={posts} />
      </div>
    </main>
  );
};

export default Home;
