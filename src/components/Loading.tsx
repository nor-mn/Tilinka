import { FC } from "react";

interface LoadingProps {
  fullScreen?: boolean;
  small?: boolean;
}

const Loading: FC<LoadingProps> = ({ fullScreen, small }) => {
  return (
    <div
      className={
        fullScreen
          ? "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          : "flex items-center justify-center w-full h-full"
      }
    >
    <div
          className={
            small
              ? "w-6 h-6 border-3 border-t-transparent border-palette-005 rounded-full animate-spin"
              : "w-15 h-15 border-5 border-t-transparent border-palette-005 rounded-full animate-spin"
          }
        />
    </div>
  );
};

export default Loading;
