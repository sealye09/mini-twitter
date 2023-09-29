import React, { FC } from "react";
import { ClipLoader } from "react-spinners";

interface LoaderProps {}

const Loader: FC<LoaderProps> = ({}) => {
  return (
    <div className="flex justify-center items-center h-full w-full pt-20 pb-20">
      <ClipLoader
        color="lightblue"
        size={60}
      />
    </div>
  );
};

export default Loader;
