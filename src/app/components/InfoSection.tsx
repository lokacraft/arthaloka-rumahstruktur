import React, { ReactNode } from "react";

interface InfoSectionProps {
  title: ReactNode;
  description: ReactNode;
}

export default function InfoSection({ title, description }: InfoSectionProps) {
  return (
    <div className="w-full p-[4vh] lg:p-[15vh] relative flex flex-col md:flex-row justify-start items-start gap-6 md:gap-10 font-clash">
      {/* Title */}
      <div className="w-full md:w-[60%] lg:w-[40%] h-full flex justify-start items-start">
        <h1 className="text-[38px] md:text-[44px] lg:text-[50px] font-medium leading-tight text-left">
          {title}
        </h1>
      </div>

      {/* Description */}
      <div className="w-full md:w-[60%] h-full mt-2 md:mt-4 flex justify-start items-start">
        <p className="text-md md:text-lg 2xl:text-xl font-normal leading-tight text-left">
          {description}
        </p>
      </div>
    </div>
  );
}
