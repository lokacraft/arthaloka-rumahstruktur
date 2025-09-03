import React, { ReactNode } from "react";

interface InfoSectionProps {
  title: ReactNode;
  description: ReactNode;
}

export default function InfoSection({ title, description }: InfoSectionProps) {
  return (
    <div className="w-full p-[15vh] relative  flex flex-row justify-start items-start gap-10 font-clash">
      <div className="w-[40%] h-full flex justify-start items-start">
        <h1 className=" text-[50px] font-medium leading-tight text-left">
          {title}
        </h1>
      </div>
      <div className="w-[60%] h-full mt-4 flex justify-start items-start">
        <p className=" text-[22px] font-normal leading-tight text-left">
          {description}
        </p>
      </div>
    </div>
  );
}
