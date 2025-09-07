"use client";

import React from "react";
import { LoaderOne } from "../ui/loader";

interface PageLoaderProps {
  text?: string;
  subText?: string;
}

const PageLoader: React.FC<PageLoaderProps> = ({
  text = "Loading content...",
  subText = "Mohon tunggu sampai kami selesai mengambil datanya",
}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/30 backdrop-blur-sm"
    >
      <div className="flex flex-col items-center gap-4 p-6 bg-white/80 rounded-xl shadow-lg">
        {/* <div className="w-12 h-12 border-4 border-gray-600 border-t-transparent rounded-full animate-spin"></div> */}
        <LoaderOne />
        <p className="text-lg font-semibold text-gray-900">{text}</p>
        <p className="text-sm text-gray-700">{subText}</p>
      </div>
    </div>
  );
};

export default PageLoader;
