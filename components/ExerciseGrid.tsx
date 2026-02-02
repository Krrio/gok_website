"use client";

import {
  exercises_1,
  exercises_2,
  exercises_3,
  exercises_5,
} from "@/constants";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import React, { useEffect, useRef } from "react";

const ExerciseGrid = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const tiles = gsap.utils.toArray<HTMLElement>(
        "[data-exercise-animate]"
      );
      tiles.forEach((tile) => {
        gsap.from(tile, {
          opacity: 0,
          y: 16,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: tile,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true,
          },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="w-full flex flex-col md:flex-row items-center justify-center gap-4"
    >
      {/* LEFT */}
      <div
        data-exercise-animate
        className="relative w-full md:w-1/2 h-80 md:h-130 bg-primary-green rounded-2xl overflow-hidden"
      >
        <Image
          src={exercises_3}
          alt="Hero image"
          fill
          className="object-cover pointer-events-none z-10"
          sizes="(min-width: 768px) 50vw, 100vw"
          priority
        />
        <div className="relative z-0 w-full p-12 flex flex-row items-center justify-center">
          <p className="font-gothic! text-white text-3xl! md:text-5xl! uppercase">
            dla najmłodszych
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col w-full md:w-1/2 gap-4 h-80 md:h-130">
        <div
          data-exercise-animate
          className="relative w-full h-1/2 bg-primary-green rounded-2xl overflow-hidden"
        >
          <Image
            src={exercises_1}
            alt="Hero image"
            fill
            className="object-cover pointer-events-none z-10"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
          <div className="relative z-0 w-full p-8 flex flex-row items-center justify-start">
            <p className="font-gothic! text-white text-3xl! md:text-5xl! uppercase">
              i tych starszych
            </p>
          </div>
        </div>

        <div className="flex w-full h-1/2 gap-4">
          <div
            data-exercise-animate
            className="relative w-1/2 h-full bg-primary-green rounded-2xl overflow-hidden"
          >
            <Image
              src={exercises_5}
              alt="Hero image"
              fill
              priority
              className="object-cover pointer-events-none scale-x-[-1] z-10"
              sizes="(min-width: 768px) 25vw, 50vw"
            />
            <div className="relative z-0 w-full p-8 flex flex-row items-center justify-center">
              <p className="font-gothic! text-white text-3xl! md:text-5xl! uppercase">
                taniec
              </p>
            </div>
          </div>

          <div
            data-exercise-animate
            className="relative w-1/2 h-full bg-primary-green rounded-2xl overflow-hidden"
          >
            <Image
              src={exercises_2}
              alt="Hero image"
              width={324}
              height={216}
              priority
              className="object-cover pointer-events-none z-10"
              sizes="(min-width: 768px) 25vw, 50vw"
            />
            <div className="relative z-0 w-full p-8 flex flex-row items-center justify-start">
              <p className="font-gothic! text-white text-3xl! md:text-5xl! uppercase">
                bliskość
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseGrid;
