import React, { ReactNode } from "react";
import Image, { StaticImageData } from "next/image";

interface HeroProps {
  imageSrc: StaticImageData | string;
  title: ReactNode;
  description: ReactNode;
  buttonText?: string;
  buttonLink?: string;
}

const Hero: React.FC<HeroProps> = ({
  imageSrc,
  title,
  description,
  buttonText,
  buttonLink,
}) => {
  return (
    <div
      className="
        relative w-full min-h-[80vh] lg:h-[100vh] text-left 
        p-[4vh] md:p-[10vh] lg:p-[15vh] 
        mb-[3rem] lg:mb-[5rem] 
        flex flex-col z-0 mx-auto 
        justify-center items-start 
        font-clash overflow-hidden text-white
      "
    >
      <Image
        src={imageSrc}
        alt="background"
        fill
        className="object-cover object-center -z-10"
        priority
      />

      {/* Title */}
      <h1
        className="
          leading-none font-[500] text-left
          text-[32px] sm:text-[40px] md:text-[52px] lg:text-[82px]
          mt-[6vh] md:mt-[8vh] lg:mt-[10vh]
        "
      >
        {title}
      </h1>

      {/* Description */}
      <p
        className="
          text-left font-normal text-[#FAFAFA] leading-tight
          text-[16px] sm:text-[18px] md:text-[22px] lg:text-[30px]
          mt-6 md:mt-8 lg:mt-10
        "
      >
        {description}
      </p>

      {/* Button */}
      {buttonText && (
        <div
          className="
            px-4 py-1 md:px-5 lg:px-6 
            border border-[#FAFAFA] 
            rounded-xl md:rounded-2xl 
            mt-6 md:mt-8 lg:mt-10
          "
        >
          <a
            href={buttonLink || "#"}
            className="
              font-instrument font-normal text-center
              text-[16px] sm:text-[18px] md:text-[22px] lg:text-[30px]
            "
          >
            {buttonText}
          </a>
        </div>
      )}
    </div>
  );
};

export default Hero;
