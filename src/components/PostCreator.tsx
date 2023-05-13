import useCurrentUser from "@/hooks/useCurrentUser";
import usePost from "@/hooks/usePost";
import usePosts from "@/hooks/usePosts";
import React, { FC, useState } from "react";

interface PostCreatorProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const PostCreator: FC<PostCreatorProps> = ({ postId, placeholder, isComment }) => {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts();
  const { mutate: mutatePost } = usePost(postId as string);

  return (
    <div className="w-full bg-base-100 flex flex-col justify-center">
      <textarea
        className="textarea resize-none w-full text-[20px] focus:outline-none"
        disabled={isLoading}
        placeholder={placeholder}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <div className="mt-2 flex flex-row justify-end w-full border-b-2 pr-4">
        <button
          disabled={isLoading}
          className="btn btn-primary mb-2"
          onClick={() => {
            console.log("Tweet");
          }}
        >
          Tweet
        </button>
      </div>
    </div>
  );
};

export default PostCreator;
