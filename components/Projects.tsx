"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { project_1, project_2, project_3 } from "@/constants";

const projectSlides = [
  {
    src: project_1,
    title: "Produkcja",
    highlight: "przemysłowa",
  },
  {
    src: project_2,
    title: "Energia",
    highlight: "i sieci",
  },
  {
    src: project_1,
    title: "Produkcja",
    highlight: "przemysłowa",
  },
  {
    src: project_3,
    title: "Energia",
    highlight: "i sieci",
  },
];

const scatterImages = [
  {
    src: project_1,
    alt: "Projekt 1",
    x: 0.315,
    y: 0.18,
    className: "h-24 w-36 md:h-30 md:w-44",
  },
  {
    src: project_2,
    alt: "Projekt 2",
    x: 0.15,
    y: 0,
    className: "h-24 w-36 md:h-30 md:w-44",
  },
  {
    src: project_3,
    alt: "Projekt 3",
    x: 0.32,
    y: -0.18,
    className: "h-24 w-36 md:h-30 md:w-44",
  },
];

const Projects = () => {
  const pinRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !pinRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const pin = pinRef.current;
      if (!section || !pin) return;

      const scatter = gsap.utils.toArray<HTMLElement>(
        "[data-projects-scatter]",
        section,
      );
      const introText = section.querySelector<HTMLElement>(
        "[data-projects-intro]",
      );
      const slides = gsap.utils.toArray<HTMLElement>(
        "[data-projects-slide]",
        section,
      );
      const dots = gsap.utils.toArray<HTMLElement>(
        "[data-projects-dot]",
        section,
      );
      const cta = section.querySelector<HTMLElement>("[data-projects-cta]");

      const getBounds = () => section.getBoundingClientRect();
      const getOffset = (el: Element, axis: "x" | "y") => {
        const bounds = getBounds();
        const value = parseFloat((el as HTMLElement).dataset[axis] ?? "0");
        const size =
          axis === "x" ? (bounds?.width ?? 0) : (bounds?.height ?? 0);
        return size * value;
      };

      const getIntroShift = () => section.clientWidth * -0.22;
      const getTitleOffset = () => Math.max(section.clientHeight * 0.22, 120);
      const getScatterExit = () => section.clientHeight * 0.28;

      const titles = slides
        .map((slide) =>
          slide.querySelector<HTMLElement>("[data-projects-title]"),
        )
        .filter(Boolean) as HTMLElement[];

      const setInitialStates = () => {
        gsap.set(scatter, { opacity: 0, scale: 0.6, x: 0, y: 0 });
        if (introText) {
          gsap.set(introText, { opacity: 0, x: 0 });
        }
        gsap.set(slides, { opacity: 0, y: 160, scale: 0.75 });
        gsap.set(titles, { opacity: 0, y: getTitleOffset() });
        gsap.set(dots, { opacity: 0.35, scale: 1 });
        gsap.set(cta, { opacity: 0, y: 16 });
      };

      setInitialStates();

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => `+=${window.innerHeight * (slides.length * 1.4 + 1.6)}`,
          scrub: true,
          pin: pin,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefreshInit: setInitialStates,
        },
      });

      if (introText) {
        tl.to(
          introText,
          {
            opacity: 1,
            x: getIntroShift,
            duration: 0.6,
            ease: "power2.out",
          },
          0.1,
        );
      }

      tl.to(
        scatter,
        {
          opacity: 1,
          scale: 1,
          x: (i, el) => getOffset(el, "x"),
          y: (i, el) => getOffset(el, "y"),
          duration: 0.8,
          stagger: 0.06,
          ease: "power2.out",
        },
        0,
      );

      if (introText) {
        tl.to(
          introText,
          {
            opacity: 0,
            duration: 0.3,
            ease: "power1.out",
          },
          0.65,
        );
      }

      tl.to(
        scatter,
        {
          y: (i, el) => getOffset(el, "y") + getScatterExit(),
          opacity: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: "power2.inOut",
        },
        0.65,
      );

      if (cta) {
        tl.to(
          cta,
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          },
          0.9,
        );
      }

      let cursor = 1.1;

      slides.forEach((slide, index) => {
        const title = slide.querySelector<HTMLElement>("[data-projects-title]");
        const dot = dots[index];

        tl.to(
          slide,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          cursor,
        );

        if (title) {
          tl.to(
            title,
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
            },
            cursor + 0.1,
          );
        }

        if (dot) {
          tl.to(
            dots,
            {
              opacity: 0.35,
              scale: 1,
              duration: 0.1,
            },
            cursor,
          );
          tl.to(
            dot,
            {
              opacity: 1,
              scale: 1.7,
              duration: 0.2,
            },
            cursor,
          );
        }

        cursor += 0.9;

        if (index < slides.length - 1) {
          tl.to(
            slide,
            {
              opacity: 0,
              y: -160,
              scale: 0.75,
              duration: 0.6,
              ease: "power2.inOut",
            },
            cursor,
          );

          if (title) {
            tl.to(
              title,
              {
                opacity: 0,
                y: -40,
                duration: 0.4,
                ease: "power2.inOut",
              },
              cursor,
            );
          }

          cursor += 0.7;
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="h-[500vh] w-full p-4 flex flex-col">
      {/* HEADER */}
      <div className="w-full flex flex-col items-start space-y-4 md:space-y-8 mb-12 md:mb-16">
        <h1 className="text-5xl! lg:text-6xl! font-semibold text-left">
          Projekty
        </h1>
        <p className="md:text-[24px]! text-[20px]! text-gray-600">
          Współtworzone{" "}
          <span className="px-1 bg-gray-300/40 rounded-[5px]">
            przedsięwzięcia
          </span>{" "}
          GOKU i społeczności gorzyckiej
        </p>
      </div>

      {/* PINNED INTERACTIVE SECTION */}
      <div
        ref={pinRef}
        className="relative w-full min-h-screen flex items-center justify-center"
      >
        <div
          ref={sectionRef}
          className="relative w-full min-h-[70vh] md:min-h-[85vh] rounded-[32px] bg-[#0f0f0f] overflow-hidden px-6 md:px-12 lg:px-16"
        >
          {/* Dots */}
          <div className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-3">
            {projectSlides.map((slide, index) => (
              <span
                key={`${slide.title}-${index}`}
                data-projects-dot
                className="h-2 w-2 rounded-full border border-white/50 bg-white/20"
              />
            ))}
          </div>

          {/* CTA */}
          <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-40">
            <button
              data-projects-cta
              className="rounded-full bg-[#d9ff5b] px-6 py-3 text-sm font-semibold text-black shadow-[0_10px_25px_rgba(0,0,0,0.3)]"
            >
              Zobacz projekty
            </button>
          </div>

          {/* Intro Text */}
          <div
            data-projects-intro
            className="absolute left-1/2 top-1/2 z-20 w-[min(92%,540px)] -translate-x-1/2 -translate-y-1/2 text-left text-white"
          >
            <p className="text-[22px]! leading-snug md:text-[34px]! md:leading-tight">
              Pracujemy nad przyspieszeniem zmian we wszystkich źródłach emisji,
              zmieniając pięć sektorów globalnej gospodarki w{" "}
              <span className="text-[#b8f34d]">
                krajobraz nowych możliwości.
              </span>
            </p>
          </div>

          {/* Scatter Images */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            {scatterImages.map((image, index) => (
              <Image
                key={image.alt}
                src={image.src}
                alt={image.alt}
                width={220}
                height={150}
                data-projects-scatter
                data-x={String(image.x)}
                data-y={String(image.y)}
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl object-cover shadow-[0_12px_30px_rgba(0,0,0,0.35)] ${image.className}`}
                sizes="(min-width: 768px) 240px, 180px"
                priority={index === 0}
                draggable={false}
              />
            ))}
          </div>

          {/* Slides */}
          <div className="absolute inset-0 z-30 pointer-events-none">
            {projectSlides.map((slide, index) => (
              <div
                key={`${slide.title}-${index}`}
                data-projects-slide
                className="absolute left-1/2 top-1/2 h-[56vh] w-[min(92%,980px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
              >
                <Image
                  src={slide.src}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 980px, 92vw"
                  priority={index === 0}
                />
                <div
                  data-projects-title
                  className="absolute left-1/2 top-6 -translate-x-1/2 text-center text-[clamp(36px,6vw,80px)] font-semibold leading-none text-white"
                >
                  <span className="block">{slide.title}</span>
                  <span className="block text-[#d9ff5b]">
                    {slide.highlight}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
