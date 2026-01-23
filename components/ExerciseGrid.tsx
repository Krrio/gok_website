import {
  exercises_1,
  exercises_2,
  exercises_3,
  exercises_4,
  hero_2,
  hero_6,
  hero_7,
  hero_8,
} from "@/constants";
import Image from "next/image";
import React from "react";

const ExerciseGrid = () => {
  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4">
      {/* LEFT */}
      <div className="relative w-full md:w-1/2 h-80 md:h-130 bg-primary-green rounded-2xl overflow-hidden">
        <Image
          src={exercises_3}
          alt="Hero image"
          fill
          className="object-cover pointer-events-none"
          sizes="(min-width: 768px) 50vw, 100vw"
          priority
        />
        <div className="w-full p-12 flex flex-row items-center justify-center">
          <p className="font-gothic! text-white text-3xl! md:text-5xl! uppercase">
            dla najmłodszych
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col w-full md:w-1/2 gap-4 h-80 md:h-130">
        <div className="relative w-full h-1/2 bg-primary-green rounded-2xl overflow-hidden">
          <Image
            src={exercises_1}
            alt="Hero image"
            fill
            className="object-cover pointer-events-none"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>

        <div className="flex w-full h-1/2 gap-4">
          <div className="relative w-1/2 h-full bg-primary-green rounded-2xl overflow-hidden">
            <Image
              src={exercises_4}
              alt="Hero image"
              width={324}
              height={324}
              priority
              className="object-cover pointer-events-none scale-x-[-1]"
              sizes="(min-width: 768px) 25vw, 50vw"
            />
          </div>

          <div className="relative w-1/2 h-full bg-primary-green rounded-2xl overflow-hidden">
            <Image
              src={exercises_2}
              alt="Hero image"
              width={324}
              height={324}
              priority
              className="object-cover pointer-events-none"
              sizes="(min-width: 768px) 25vw, 50vw"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseGrid;
