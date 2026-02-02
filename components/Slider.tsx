"use client";

import {
  arrow_icon,
  competition_2,
  competition_3,
  competition_4,
  events_2,
  events_3,
} from "@/constants";
import AnimatedButtonText from "@/components/AnimatedButtonText";
import Image from "next/image";
import React from "react";
import Link from "next/link";

const SLIDE_DURATION = 5000;

const SLIDES = [
  {
    title: "Młodzi twórcy",
    description: 'Konkurs plastyczny o tematyce "Nadchodzi wiosna"',
    image: competition_2,
  },
  {
    title: "Konkurs filmowy",
    description: 'Krótka forma, duże emocje. "Duma narodowa"',
    image: competition_3,
  },
  {
    title: "Muzyczny flash",
    description: "Wystąp na żywo albo prześlij nagranie.",
    image: competition_4,
  },
];

const Slider = () => {
  const totalSlides = SLIDES.length;
  const [currentIndex, setCurrentIndex] = React.useState(1);
  const [transitionEnabled, setTransitionEnabled] = React.useState(true);
  const [isPaused, setIsPaused] = React.useState(false);

  const activeIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  const extendedSlides = [SLIDES[totalSlides - 1], ...SLIDES, SLIDES[0]];

  React.useEffect(() => {
    if (!transitionEnabled) {
      const id = requestAnimationFrame(() => setTransitionEnabled(true));
      return () => cancelAnimationFrame(id);
    }
  }, [transitionEnabled]);

  const handleTransitionEnd = () => {
    if (currentIndex === totalSlides + 1) {
      setTransitionEnabled(false);
      setCurrentIndex(1);
    }
  };

  const handleProgressEnd = () => {
    if (isPaused) return;
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <div className="w-full">
      <div
        className="relative w-full h-105 md:h-130 overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
      >
        <div
          className="flex h-full"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition:
              transitionEnabled ? "transform 700ms ease-in-out" : "none",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedSlides.map((slide, index) => (
            <article
              key={`${slide.title}-${index}`}
              className="relative min-w-full h-full rounded-2xl overflow-hidden group"
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 1}
                sizes="(min-width: 1024px) 960px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/25 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-3xl! md:text-4xl! font-semibold bg-primary-green p-1 rounded-[7px] w-fit">
                  {slide.title}
                </h3>
                <p className="mt-2 text-base md:text-lg text-white/90 max-w-xl">
                  {slide.description}
                </p>
              </div>

              <div className="absolute top-6 right-6 md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300">
                <Link
                  href="/"
                  className="group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/90 text-sm font-medium text-gray-900 shadow-lg backdrop-blur"
                  aria-label="Konkursy"
                >
                  <AnimatedButtonText text="Konkursy" />
                  <Image
                    src={arrow_icon}
                    alt=""
                    width={16}
                    height={16}
                    className="rotate-45"
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-3">
        {SLIDES.map((slide, index) => {
          const isActive = index === activeIndex;
          return (
            <div
              key={`${slide.title}-dot`}
              className={
                isActive ?
                  "relative w-14 h-2.5 rounded-full bg-black/20 overflow-hidden"
                : "w-2.5 h-2.5 rounded-full bg-black/30"
              }
            >
              {isActive && (
                <span
                  key={`progress-${activeIndex}`}
                  className="slider-progress absolute inset-0 rounded-full bg-black/70"
                  style={{
                    animationDuration: `${SLIDE_DURATION}ms`,
                    animationPlayState: isPaused ? "paused" : "running",
                  }}
                  onAnimationEnd={handleProgressEnd}
                />
              )}
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .slider-progress {
          animation-name: slider-progress;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
          transform-origin: left;
        }

        @keyframes slider-progress {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
      `}</style>
    </div>
  );
};

export default Slider;
