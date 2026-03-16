"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import AnimatedButtonText from "@/components/AnimatedButtonText";
import { arrow_icon, project_1, project_2, project_3 } from "@/constants";

type ScatterImage = {
  src: string;
  alt: string;
  x: number;
  y: number;
  xSm?: number;
  ySm?: number;
  className: string;
  isHero: boolean;
};

const scatterImages: readonly ScatterImage[] = [
  {
    src: project_1,
    alt: "Projekt 1",
    x: 0.315,
    y: 0.18,
    xSm: 0.22,
    ySm: 0.28,
    className: "sm:h-24 sm:w-36 md:h-30 md:w-44",
    isHero: false,
  },
  {
    src: project_2,
    alt: "Projekt 2",
    x: 0.15,
    y: 0,
    xSm: -0.2,
    ySm: -0.18,
    className: "sm:h-24 sm:w-36 md:h-30 md:w-44",
    isHero: false,
  },
  {
    src: project_3,
    alt: "Projekt 3",
    x: 0.32,
    y: -0.18,
    xSm: 0.18,
    ySm: -0.3,
    className: "sm:h-24 sm:w-36 md:h-30 md:w-44",
    isHero: true,
  },
];
const projectSlides = [
  {
    src: project_3,
    titleA: "Literatura",
    pill: "Czytelnictwo i spotkania",
    desc: "Cykl klubów książki, spotkań autorskich i warsztatów pisania, które budują nawyk czytania w każdym wieku.",
  },
  {
    src: project_2,
    titleA: "Produkcja",
    pill: "Rzemiosło i warsztaty",
    desc: "Pracownie i krótkie formy: fotografia, ceramika, rękodzieło i media - od pomysłu do gotowego efektu.",
  },
  {
    src: project_1,
    titleA: "Muzyka",
    pill: "Koncerty i edukacja",
    desc: "Próby otwarte, jam sessions i zajęcia instrumentalne, które łączą lokalne talenty z publicznością.",
  },
];

const projectsCtaLabel = "Zobacz projekty";

const Projects = () => {
  const pinRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const titleARef = useRef<HTMLSpanElement | null>(null);
  const titleAMaskRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !pinRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const section = sectionRef.current!;
      const pin = pinRef.current!;
      if (!section || !pin) return;

      const scatter = gsap.utils.toArray<HTMLElement>(
        "[data-projects-scatter]",
        section,
      );
      const heroEl = section.querySelector<HTMLElement>("[data-hero='true']");
      const restEls = scatter.filter((el) => el !== heroEl);

      const introP = section.querySelector<HTMLElement>(
        "[data-projects-intro]",
      );
      const introWrapper = section.querySelector<HTMLElement>(
        "[data-projects-intro-wrap]",
      );

      const stage2Wrap = section.querySelector<HTMLElement>("[data-stage2]");

      const stage2Title = section.querySelector<HTMLElement>(
        "[data-stage2-title]",
      );
      const stage2TitleMasked = section.querySelector<HTMLElement>(
        "[data-stage2-title-masked]",
      );
      const titleWrappers = [stage2Title, stage2TitleMasked].filter(Boolean);

      const stage2Meta =
        section.querySelector<HTMLElement>("[data-stage2-meta]");
      const stage2Btn = section.querySelector<HTMLElement>("[data-stage2-cta]");

      const dots = gsap.utils.toArray<HTMLElement>(
        "[data-stage2-dot]",
        section,
      );
      const slides = gsap.utils.toArray<HTMLElement>(
        "[data-stage2-slide]",
        section,
      );

      const pillEl = section.querySelector<HTMLElement>("[data-stage2-pill]");
      const descEl = section.querySelector<HTMLElement>("[data-stage2-desc]");

      const getBounds = () => section.getBoundingClientRect();
      const clamp = (min: number, value: number, max: number) =>
        Math.min(Math.max(value, min), max);

      const getOffset = (el: Element, axis: "x" | "y") => {
        const bounds = getBounds();
        const useSm = window.matchMedia("(max-width: 639px)").matches;
        const key = useSm ? `${axis}Sm` : axis;
        const value = parseFloat(
          (el as HTMLElement).dataset[key] ??
            (el as HTMLElement).dataset[axis] ??
            "0",
        );
        const size =
          axis === "x" ? (bounds?.width ?? 0) : (bounds?.height ?? 0);
        return size * value;
      };

      const getCardW = () => Math.min(section.clientWidth * 0.7, 680);
      const getCardH = () => clamp(200, window.innerHeight * 0.42, 420);

      const getSlideW = () => clamp(280, section.clientWidth * 0.92, 980);
      const getSlideH = () => clamp(240, window.innerHeight * 0.56, 520);
      const getHeroW2 = () => getSlideW();
      const getHeroH2 = () => getSlideH();

      const getRestDropY = () =>
        section.clientHeight * 1.25 + window.innerHeight * 0.9;

      let introSplit: SplitType | null = null;
      let introLineInners: HTMLElement[] = [];

      const splitIntro = () => {
        if (!introP) return;
        if (introSplit) return;

        introSplit = new SplitType(introP, {
          types: "lines",
          lineClass: "projects-line",
        });

        const introLines = Array.from(
          section.querySelectorAll<HTMLElement>(".projects-line"),
        );

        introLines.forEach((line) => {
          line.style.display = "block";
          line.style.overflow = "hidden";
        });

        introLineInners = introLines.map((line) => {
          const existingInner = line.querySelector<HTMLElement>(
            ".projects-line-inner",
          );
          if (existingInner) return existingInner;

          const inner = document.createElement("span");
          inner.className = "projects-line-inner";
          inner.style.display = "block";

          while (line.firstChild) inner.appendChild(line.firstChild);
          line.appendChild(inner);

          return inner;
        });
      };

      const setSlideText = (i: number) => {
        const data = projectSlides[i];
        if (!data) return;

        if (titleARef.current) titleARef.current.textContent = data.titleA;
        if (titleAMaskRef.current)
          titleAMaskRef.current.textContent = data.titleA;

        if (pillEl) pillEl.textContent = data.pill;
        if (descEl) descEl.textContent = data.desc;
      };

      const setInitialStates = () => {
        gsap.set(scatter, {
          clearProps:
            "width,height,opacity,transform,borderRadius,filter,boxShadow",
        });

        gsap.set(scatter, { xPercent: -50, yPercent: -50 });

        scatter.forEach((el) => {
          const r = el.getBoundingClientRect();
          gsap.set(el, { width: r.width, height: r.height, borderRadius: 12 });
        });

        gsap.set(scatter, {
          opacity: 0,
          scale: 0.6,
          x: 0,
          y: 0,
          zIndex: 10,
        });

        if (heroEl) gsap.set(heroEl, { zIndex: 20 });

        if (introWrapper) gsap.set(introWrapper, { opacity: 1 });
        if (introP) gsap.set(introP, { opacity: 1 });

        splitIntro();

        gsap.set(introLineInners, {
          yPercent: 130,
          opacity: 0,
          skewY: 9,
          transformOrigin: "0% 50%",
        });

        gsap.set(stage2Wrap, { opacity: 0, pointerEvents: "none" });

        const cardHeight = section.clientHeight;

        const titleStartY = cardHeight * 0.4;

        gsap.set(titleWrappers, { opacity: 0, y: titleStartY });

        gsap.set([stage2Meta, stage2Btn], { opacity: 0, y: 28 });

        gsap.set(dots, { opacity: 0.35, scale: 1 });

        gsap.set(slides, { opacity: 0, scale: 1, y: 18 });

        slides.forEach((slide) => {
          const img = slide.querySelector("img");
          if (img) gsap.set(img, { scale: 1.0 });
        });

        setSlideText(0);
      };

      setInitialStates();

      const restByBottomFirst = [...restEls].sort(
        (a, b) => getOffset(b, "y") - getOffset(a, "y"),
      );

      const stage2Start = 2.25;
      const slideSlot = 1.25;
      const stage2Base = stage2Start + 0.05;

      let activeIndex = -1;

      const syncTextWithTime = (tl: gsap.core.Timeline) => {
        const t = tl.time();
        if (t < stage2Base) {
          if (activeIndex !== 0) {
            activeIndex = 0;
            setSlideText(0);
          }
          return;
        }
        const idx = Math.min(
          projectSlides.length - 1,
          Math.floor((t - stage2Base) / slideSlot),
        );
        if (idx !== activeIndex) {
          activeIndex = idx;
          setSlideText(idx);
        }
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () =>
            `+=${window.innerHeight * (2.6 + projectSlides.length * 1.25)}`,
          scrub: true,
          pin: pin,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefreshInit: () => {
            setInitialStates();
            activeIndex = -1;
          },
          onUpdate: () => {
            syncTextWithTime(tl);
          },
        },
      });

      if (introP) {
        tl.to(
          introLineInners,
          {
            yPercent: 0,
            opacity: 1,
            skewY: 0,
            duration: 0.55,
            ease: "expo.out",
            stagger: 0.075,
          },
          0.06,
        );
        tl.to({}, { duration: 0.15, ease: "none" }, ">");
        tl.to(
          introWrapper,
          { opacity: 0, duration: 0.25, ease: "power1.out" },
          ">",
        );
      }
      tl.to(
        scatter,
        {
          opacity: 1,
          scale: 1,
          x: (i, el) => getOffset(el, "x"),
          y: (i, el) => getOffset(el, "y"),
          duration: 0.75,
          stagger: 0.06,
          ease: "power2.out",
        },
        0,
      );
      if (restByBottomFirst.length) {
        tl.to(
          restByBottomFirst,
          {
            x: 0,
            y: () => getRestDropY(),
            width: () => getHeroW2(),
            height: () => getHeroH2(),
            borderRadius: 18,
            opacity: 1,
            scale: 1,
            duration: 1.25,
            stagger: 0.22,
            ease: "power2.inOut",
          },
          0.62,
        );
      }
      if (heroEl) {
        tl.to(
          heroEl,
          {
            x: 0,
            y: 0,
            scale: 1,
            width: () => getCardW(),
            height: () => getCardH(),
            borderRadius: 28,
            opacity: 1,
            duration: 1.1,
            ease: "power2.inOut",
          },
          0.78,
        );
        tl.to(
          heroEl,
          {
            width: () => getHeroW2(),
            height: () => getHeroH2(),
            borderRadius: 18,
            duration: 1.0,
            ease: "power2.inOut",
          },
          1.55,
        );
      }

      tl.to(
        stage2Wrap,
        { opacity: 1, duration: 0.35, ease: "power2.out" },
        stage2Start,
      );

      tl.to(
        titleWrappers,
        { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" },
        stage2Start,
      );

      tl.to(
        stage2Meta,
        { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
        stage2Start + 0.25,
      );

      tl.to(
        stage2Btn,
        { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
        stage2Start + 0.32,
      );

      tl.to(dots, { opacity: 0.35, duration: 0.2, ease: "none" }, stage2Start);

      if (heroEl) {
        tl.to(
          heroEl,
          { opacity: 0, duration: 0.2, ease: "none" },
          stage2Start + 0.05,
        );
      }

      let cursor = stage2Start + 0.05;

      slides.forEach((slide, index) => {
        const dot = dots[index];
        const img = slide.querySelector("img");

        tl.to(
          slide,
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power2.out",
          },
          cursor,
        );

        if (img) {
          tl.fromTo(
            img,
            { scale: 1.1 },
            { scale: 1.0, duration: 0.8, ease: "power2.out" },
            cursor,
          );
        }

        if (dot) {
          tl.to(dots, { opacity: 0.35, scale: 1, duration: 0.1 }, cursor);
          tl.to(dot, { opacity: 1, scale: 1.7, duration: 0.2 }, cursor + 0.05);
        }

        tl.to({}, { duration: 0.55, ease: "none" }, cursor + 0.35);

        if (index < slides.length - 1) {
          tl.to(
            slide,
            {
              opacity: 0,
              y: -10,
              duration: 0.45,
              ease: "power2.inOut",
            },
            cursor + 0.9,
          );
        }

        cursor += 1.25;
      });

      return () => {
        introSplit?.revert();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full px-3 pt-3 sm:px-4 sm:pt-4">
      <div className="w-full flex flex-col items-start space-y-4 md:space-y-8 mb-8">
        <h1 className="text-5xl! lg:text-6xl! font-semibold text-left">
          Projekty
        </h1>
        <p className="text-[16px]! sm:text-[18px]! md:text-[24px]! text-gray-600">
          Współtworzone{" "}
          <span className="px-1 bg-gray-300/40 rounded-[5px]">
            przedsięwzięcia
          </span>{" "}
          GOKU i społeczności gorzyckiej
        </p>
      </div>

      <div
        ref={pinRef}
        className="relative flex min-h-svh w-full flex-col items-center justify-center"
      >
        <div
          ref={sectionRef}
          className="relative w-full 
            min-h-[72vh] 
            sm:min-h-[80vh] 
            md:min-h-[85vh] 
            rounded-[28px] md:rounded-[32px] bg-[#0f0f0f] overflow-hidden px-4 sm:px-6 md:px-12 lg:px-16"
        >
          <div
            data-projects-intro-wrap
            className="absolute left-4 top-1/2 z-20 w-[min(92%,520px)] -translate-y-1/2 text-left text-white sm:left-6 md:left-12 lg:left-16"
          >
            <p
              data-projects-intro
              className="text-[18px]! leading-snug sm:text-[20px]! md:text-[34px]! md:leading-tight"
            >
              Projekty GOK Gorzyce powstają we współpracy z lokalną
              społecznością i odpowiadają{" "}
              <span className="text-[#b8f34d]">na jej realne potrzeby.</span>
            </p>
          </div>

          <div className="absolute inset-0 z-10 pointer-events-none">
            {scatterImages.map((image, index) => {
              const isHero = image.isHero;
              return (
                <div
                  key={image.alt}
                  data-projects-scatter
                  data-hero={isHero ? "true" : "false"}
                  data-x={String(image.x)}
                  data-y={String(image.y)}
                  data-x-sm={String(image.xSm ?? image.x)}
                  data-y-sm={String(image.ySm ?? image.y)}
                  className={`absolute left-1/2 top-1/2 overflow-hidden rounded-xl shadow-[0_12px_30px_rgba(0,0,0,0.35)] h-20 w-28 sm:h-24 sm:w-36 md:h-30 md:w-44 ${image.className}`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 1400px, 92vw"
                    quality={100}
                    priority={isHero || index === 0}
                    draggable={false}
                  />
                </div>
              );
            })}
          </div>

          <div
            data-stage2
            className="absolute inset-0 z-30 pointer-events-none isolate"
            style={
              {
                "--slide-w": "clamp(280px, 92%, 980px)",
                "--slide-h": "clamp(240px, 56vh, 520px)",
              } as React.CSSProperties
            }
          >
            <div className="absolute inset-0 z-30">
              {projectSlides.map((s, idx) => (
                <div
                  key={`${s.titleA}-${idx}`}
                  data-stage2-slide
                  className="absolute left-1/2 top-1/2 overflow-hidden rounded-[18px] shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
                  style={{
                    width: "var(--slide-w)",
                    height: "var(--slide-h)",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <Image
                    src={s.src}
                    alt={`${s.titleA}`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 1400px, 92vw"
                    quality={100}
                    priority={idx === 0}
                    draggable={false}
                  />
                </div>
              ))}
            </div>

            <div
              data-stage2-title
              className="absolute left-1/2 top-6 z-20 -translate-x-1/2 text-center w-fit mx-auto sm:top-8 md:top-10"
            >
              <div className="text-[clamp(42px,12vw,140px)] font-semibold leading-none text-white sm:text-[clamp(56px,9vw,140px)]">
                <span
                  ref={titleARef}
                  data-stage2-title-a
                  className="block text-[#d9ff5b]"
                >
                  {projectSlides[0].titleA}
                </span>
              </div>
            </div>

            <div
              aria-hidden="true"
              data-stage2-title-masked
              className="absolute inset-0 z-[35] pointer-events-none"
              style={{
                clipPath:
                  "inset(calc(50% - (var(--slide-h) / 2)) calc(50% - (var(--slide-w) / 2)) calc(50% - (var(--slide-h) / 2)) calc(50% - (var(--slide-w) / 2)) round 18px)",
                WebkitClipPath:
                  "inset(calc(50% - (var(--slide-h) / 2)) calc(50% - (var(--slide-w) / 2)) calc(50% - (var(--slide-h) / 2)) calc(50% - (var(--slide-w) / 2)) round 18px)",
              }}
            >
              <div className="absolute left-1/2 top-6 -translate-x-1/2 text-center w-fit mx-auto sm:top-8 md:top-10">
                <div className="text-[clamp(42px,12vw,140px)] font-semibold leading-none text-white sm:text-[clamp(56px,9vw,140px)]">
                  <span ref={titleAMaskRef} className="block text-white">
                    {projectSlides[0].titleA}
                  </span>
                </div>
              </div>
            </div>

            <div className="absolute inset-0 z-40">
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ width: "var(--slide-w)", height: "var(--slide-h)" }}
              >
                <div
                  data-stage2-meta
                  className="absolute left-4 bottom-4 max-w-[440px] sm:left-6 sm:bottom-6 md:left-8 md:bottom-8 sm:max-w-[520px]"
                >
                  <div
                    data-stage2-pill
                    className="inline-flex items-center rounded-full border border-white/25 bg-white/5 px-3 py-1 text-[11px] text-white/85 sm:text-xs"
                  >
                    {projectSlides[0].pill}
                  </div>

                  <div
                    data-stage2-desc
                    className="mt-2 text-white/80 text-[13px] leading-relaxed sm:mt-3 sm:text-sm md:text-base"
                  >
                    {projectSlides[0].desc}
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute right-2 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-3 sm:right-4 md:right-6">
              {projectSlides.map((_, index) => (
                <span
                  key={`dot-${index}`}
                  data-stage2-dot
                  className="h-0.75 w-0.75 rounded-full border border-white/50 bg-white/10"
                />
              ))}
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 sm:bottom-6 md:bottom-8">
              <Link
                data-stage2-cta
                href="/projects"
                className="group cursor-pointer pointer-events-auto inline-flex items-center gap-2 rounded-full bg-[#d9ff5b] px-5 py-2.5 text-xs font-semibold text-black shadow-[0_10px_25px_rgba(0,0,0,0.3)] sm:px-6 sm:py-3 sm:text-sm"
              >
                <AnimatedButtonText text={projectsCtaLabel} />
                <Image
                  src={arrow_icon}
                  alt=""
                  width={16}
                  height={16}
                  className="rotate-45"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
