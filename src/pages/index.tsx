import { FC } from "react";

import Header from "@/components/Header";
import PostCreator from "@/components/posts/PostCreator";
import PostFeed from "@/components/posts/PostFeed";
import usePosts from "@/hooks/usePosts";
import Loader from "@/components/Loader";

const Home: FC = () => {
  const { data: posts = [], isLoading } = usePosts();

  return (
    <main className="home min-h-screen">
      <Header label="Home" />
      <PostCreator placeholder="What's happening?" />
      {!posts || isLoading ? <Loader /> : <PostFeed posts={posts} />}
    </main>
  );
};

export default Home;
