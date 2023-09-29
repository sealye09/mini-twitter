import { FC, useEffect, useRef, useState } from "react";

import Header from "@/components/Header";
import PostCreator from "@/components/posts/PostCreator";
import PostFeed from "@/components/posts/PostFeed";

const Home: FC = () => {
  return (
    <main className="home min-h-screen">
      <Header label="Home" />
      <PostCreator placeholder="What's happening?" />
      <PostFeed />
    </main>
  );
};

export default Home;
