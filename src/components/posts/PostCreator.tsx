import usePost from "@/hooks/fetcher/usePost";
import usePosts from "@/hooks/fetcher/usePosts";
import axios from "axios";
import React, { FC, useCallback, useState } from "react";
import toast from "react-hot-toast";

interface PostCreatorProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const PostCreator: FC<PostCreatorProps> = ({ postId, placeholder, isComment }) => {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: mutatePosts } = usePosts({});
  const { mutate: mutatePost } = usePost(postId as string);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      if (content === "") throw new Error();

      const url = isComment ? `/api/comments/${postId}` : "/api/posts";

      await axios.post(url, { content });

      toast.success("Tweet created");
      setContent("");
      mutatePosts();
      mutatePost();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [content, mutatePosts, isComment, postId, mutatePost]);

  return (
    <div className="w-full bg-base-100 flex flex-col justify-center">
      <textarea
        className="textarea resize-none w-full text-[20px] focus:outline-none rounded-none placeholder:text-neutral-500"
        disabled={isLoading}
        placeholder={placeholder}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <div className="mt-2 flex flex-row justify-end w-full border-b-[1px] border-base-300 pr-4">
        <button
          disabled={isLoading}
          className="btn btn-primary mb-2 capitalize rounded-full"
          onClick={onSubmit}
        >
          {isComment ? "Reply" : "Tweet"}
        </button>
      </div>
    </div>
  );
};

export default PostCreator;
