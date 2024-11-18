import { LoaderIcon } from "lucide-react";
import React from "react";

const LoadingPage = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <LoaderIcon className="size-6 text-blue-500 animate-spin" />
    </div>
  );
};

export default LoadingPage;
