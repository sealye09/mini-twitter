import React, { FC } from "react";
import { ClipLoader } from "react-spinners";

interface LoaderProps {
  style?: React.CSSProperties;
}

const Loader: FC<LoaderProps> = ({ style }) => {
  return (
    <div
      style={style}
      className="flex justify-center items-center h-full w-full pt-20 pb-20"
    >
      <ClipLoader
        color="lightblue"
        size={60}
      />
    </div>
  );
};

export default Loader;
