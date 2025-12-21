"use client";

import React, { ReactNode, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { useContact } from "@/contexts/ContactContext";

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
  const [loading, setLoading] = useState(true);
  const { contactData, isLoading } = useContact();

  return (
    <div
      className="
        relative w-full min-h-[80vh] lg:h-[100vh] text-left 
        p-[4vh] md:p-[10vh] lg:p-[15vh] 
        
        flex flex-col z-0 mx-auto 
        justify-center items-start 
        font-clash overflow-hidden text-white
      "
    >
      {/* Background image */}
      <Image
        src={imageSrc}
        alt="background"
        fill
        className="object-cover object-center -z-10"
        priority
        onLoadingComplete={() => setLoading(false)}
      />

      {loading ? (
        <>
          {/* Skeleton Title */}
          <div
            className="
              bg-gray-300/50 rounded-xl animate-pulse
              w-[60%] h-[42px] sm:h-[50px] md:h-[66px] lg:h-[90px]
              mt-[6vh] md:mt-[8vh] lg:mt-[10vh]
            "
          ></div>

          {/* Skeleton Description */}
          <div
            className="
              bg-gray-300/40 rounded-lg animate-pulse
              w-[80%] h-[20px] sm:h-[24px] md:h-[28px] lg:h-[36px]
              mt-6 md:mt-8 lg:mt-10
            "
          ></div>
          <div
            className="
              bg-gray-300/40 rounded-lg animate-pulse
              w-[70%] h-[20px] sm:h-[24px] md:h-[28px] lg:h-[36px]
              mt-3
            "
          ></div>

          {/* Skeleton Button */}
          {buttonText && (
            <div
              className="
                bg-gray-300/60 rounded-xl md:rounded-2xl animate-pulse
                w-[160px] sm:w-[180px] md:w-[220px] lg:w-[280px]
                h-[36px] sm:h-[40px] md:h-[48px] lg:h-[58px]
                mt-6 md:mt-8 lg:mt-10
              "
            ></div>
          )}
        </>
      ) : (
        <>
          {/* Title */}
          <h1
            className="
              leading-none font-[500] text-left
              text-3xl md:text-4xl lg:text-6xl 2xl:text-6xl
              mt-[6vh] md:mt-[8vh] lg:mt-[10vh]
            "
          >
            {title}
          </h1>

          {/* Description */}
          <p
            className="
              text-left font-normal text-[#FAFAFA] leading-tight
              text-md md:text-xl 2xl:text-2xl
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
              {contactData && !isLoading ? (
              <a
                href={`https://wa.me/${contactData.whatsAppNumber}`}
                className="
                  font-instrument font-normal text-center
                  text-lg md:text-xl 2xl:text-2xl
                "
              >
                {buttonText}
              </a>
                
              ) : (
              <a
                href={buttonLink || "#"}
                className="
                  font-instrument font-normal text-center
                  text-lg md:text-xl 2xl:text-2xl
                "
              >
                {buttonText}
              </a>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Hero;
