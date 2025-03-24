import { FC } from "react";

interface LoadingProps {
  fullScreen?: boolean;
  small?: boolean;
  text?: string;
}

const Loading: FC<LoadingProps> = ({ fullScreen, small, text }) => {
  return (
    <div
      className={
        fullScreen
          ? "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          : "flex items-center justify-center w-full h-full"
      }
    >
      <>
        {text}
        <div
          className={
            small
              ? "w-6 h-6 border-3 border-t-transparent border-palette-005 rounded-full animate-spin"
              : "w-12 h-12 border-10 border-t-transparent border-palette-005 rounded-full animate-spin"
          }
        />
      </>
    </div>
  );
};

export default Loading;
