import React, { ReactNode } from "react";
import Link from "next/link";

interface BottomBannerProps {
  title: ReactNode;
  description: ReactNode;
  buttonText?: string;
  buttonHref?: string;
}

const BottomBanner: React.FC<BottomBannerProps> = ({
  title,
  description,
  buttonText = "Mulai Proyek Anda",
  buttonHref = "",
}) => {
  return (
    <div className="w-full px-6 sm:px-10 md:px-[10vh] lg:px-[15vh] py-12 md:py-[10vh] bg-[#2F4F4F]/20 font-clash">
      <div className="flex flex-col lg:flex-row lg:justify-between justify-center items-start lg:items-center w-full h-full gap-2 xl:gap-0 lg:gap-5">
        
        {/* Kiri: Title */}
        <div className="text-left w-full lg:w-[54%]">
          <h1 className="text-[28px] sm:text-[36px] md:text-[44px] lg:text-[46px] xl:text-[54px] leading-tight font-medium">
            {title}
          </h1>
        </div>

        {/* Kanan: Description + Button */}
        <div className="text-left w-full lg:w-[47%] flex flex-col gap-y-6 md:gap-y-8 items-start mt-6 lg:mt-0">
          <p className="text-[18px] sm:text-[22px] md:text-[28px] lg:text-[30px] xl:text-[34px] text-black leading-tight">
            {description}
          </p>
          <Link
            href={buttonHref}
            className="font-instrument font-light text-[16px] sm:text-[20px] md:text-[26px] lg:text-[34px] text-center bg-[#008080] text-[#EAEAEA] px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl w-fit"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BottomBanner;
