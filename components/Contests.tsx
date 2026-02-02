import { curved_line_7, curved_line_8, items, star } from "@/constants";
import Image from "next/image";
import React from "react";
import Slider from "./Slider";

const Contests = () => {
  return (
    <div className="h-full w-full p-4 flex flex-col">
      {/* HEADER */}
      <div className="w-full flex flex-col items-start space-y-4 md:space-y-8 mb-8">
        <h1 className="text-5xl! lg:text-6xl! font-semibold text-left">
          Konkursy
        </h1>
        <p className="md:text-[24px]! text-[20px]! text-gray-600">
          Aktualne{" "}
          <span className="px-1 bg-gray-300/40 rounded-[5px]">konkursy</span>{" "}
          organizowane przez GOK oraz ich wyniki
        </p>
      </div>

      <div className="w-full relative flex flex-col justify-center mb-16">
        <Slider />
      </div>

      {/* TIMELINE WRAPPER */}
      <div className="w-full relative flex flex-col justify-center gap-17.5">
        {/* CURVED LINE */}
        <div
          className="hidden md:flex pointer-events-none absolute inset-0 z-100
          -translate-x-6 -translate-y-4
          md:-translate-x-24 md:-translate-y-6
          lg:-translate-x-32 lg:-translate-y-8.5
          xl:-translate-x-31.5 xl:-translate-y-8"
        >
          <Image
            src={curved_line_7}
            alt=""
            fill
            className="object-contain scale-75"
            priority
          />
        </div>
        <div
          className="flex md:hidden pointer-events-none absolute inset-0 z-100
          -translate-x-34.5 -translate-y-17 scale-105"
        >
          <Image
            src={curved_line_8}
            alt="line"
            fill
            className="object-contain scale-75"
            priority
          />
        </div>

        {/* CARDS */}
        <div className="relative z-10 flex flex-col gap-16">
          {items.map((item, i) => (
            <div
              key={i}
              className={[
                "md:w-3/5 w-full h-58 flex flex-row gap-9.75",
                i % 2 === 0 ? "self-start" : "self-end",
              ].join(" ")}
            >
              {/* YEAR */}
              <div className="w-fit flex-col items-start justify-start py-6 hidden md:flex">
                <p className="text-[42px]! whitespace-nowrap">{item.year}</p>
                <p className="text-[28px]!">{item.description}</p>
              </div>

              {/* GREEN CARD */}
              <div className="w-150 h-full bg-primary-green rounded-[45px] relative md:py-10 py-8 md:pl-34.5 pl-28 flex flex-col items-start justify-start md:gap-5 gap-4">
                {/* STAR */}
                <div className="absolute md:top-12 top-9 left-12">
                  <Image
                    src={star}
                    alt="star"
                    width={36}
                    height={36}
                    priority
                  />
                </div>

                {/* TEXT */}
                <h3 className="md:text-[30px] text-[26px] font-semibold">
                  <span
                    className="
      bg-secondary-green
      px-2
      rounded-[7px]
      inline
      [box-decoration-break:clone]
      [-webkit-box-decoration-break:clone]
    "
                  >
                    {(() => {
                      const words = item.title.split(" ");
                      if (words.length === 1) {
                        return words[0];
                      }
                      return (
                        <>
                          {words[0]}
                          <br className="md:hidden" />
                          <span className="hidden md:inline"> </span>
                          {words.slice(1).join(" ")}
                        </>
                      );
                    })()}
                  </span>
                </h3>

                <p className="text-[18px]! leading-6! max-w-130 md:pr-40">
                  {item.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contests;
