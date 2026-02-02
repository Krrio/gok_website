"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { project_1, project_2, project_3 } from "@/constants";

/**
 * STAGE 1 (scatter)
 * project_3 = HERO (jak ustaliłeś)
 */
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
    isHero: true,
  },
] as const;

/**
 * STAGE 2 (ref style)
 * duży tytuł + opis + button + dots + przełączanie slajdów
 * (pierwszy slajd = project_3, żeby „wyjechał” z Twojego hero)
 */
const projectSlides = [
  {
    src: project_3,
    titleA: "Produkcja",
    titleB: "przemysłowa",
    pill: "30% emisji",
    desc: "Rewolucja przemysłowa zaczyna się od zmiany sposobu wytwarzania — od stali i cementu po produkty codziennego użytku.",
    cta: "29 firm produkcyjnych",
  },
  {
    src: project_2,
    titleA: "Energia",
    titleB: "i sieci",
    pill: "25% emisji",
    desc: "Modernizacja sieci i źródeł energii przyspiesza transformację, poprawiając niezawodność i dostępność.",
    cta: "17 inicjatyw energetycznych",
  },
  {
    src: project_1,
    titleA: "Rozwój",
    titleB: "społeczny",
    pill: "15% wpływu",
    desc: "Projekty społecznościowe, które wzmacniają lokalne inicjatywy i poprawiają jakość życia mieszkańców.",
    cta: "12 projektów społecznych",
  },
];

const Projects = () => {
  const pinRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !pinRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const section = sectionRef.current!;
      const pin = pinRef.current!;
      if (!section || !pin) return;

      // STAGE 1 nodes
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

      // STAGE 2 nodes
      const stage2Wrap = section.querySelector<HTMLElement>("[data-stage2]");
      const stage2Title = section.querySelector<HTMLElement>(
        "[data-stage2-title]",
      );
      const stage2TitleA = section.querySelector<HTMLElement>(
        "[data-stage2-title-a]",
      );
      const stage2TitleB = section.querySelector<HTMLElement>(
        "[data-stage2-title-b]",
      );
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

      const giantTitle = section.querySelector<HTMLElement>(
        "[data-stage2-giant-title]",
      );
      const giantA = section.querySelector<HTMLElement>(
        "[data-stage2-giant-a]",
      );
      const giantB = section.querySelector<HTMLElement>(
        "[data-stage2-giant-b]",
      );

      // ----------------------------
      // Helpers
      // ----------------------------
      const getBounds = () => section.getBoundingClientRect();

      const getOffset = (el: Element, axis: "x" | "y") => {
        const bounds = getBounds();
        const value = parseFloat((el as HTMLElement).dataset[axis] ?? "0");
        const size =
          axis === "x" ? (bounds?.width ?? 0) : (bounds?.height ?? 0);
        return size * value;
      };

      // ✅ docelowo mniejszy hero (jak chciałeś)
      const getCardW = () => Math.min(section.clientWidth * 0.7, 680);
      const getCardH = () => window.innerHeight * 0.42;

      const getHeroW2 = () => Math.min(section.clientWidth * 0.78, 980);
      const getHeroH2 = () => window.innerHeight * 0.56;

      const getRestDropY = () =>
        section.clientHeight * 1.25 + window.innerHeight * 0.9;

      // ----------------------------
      // SplitType (intro lines)
      // ----------------------------
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

      const setInitialStates = () => {
        gsap.set([giantA, giantB], { opacity: 0, y: 60 });
        gsap.set(giantTitle, { opacity: 1 }); // wrapper może być widoczny, linie są ukryte

        // --- Scatter clear
        gsap.set(scatter, {
          clearProps:
            "width,height,opacity,transform,borderRadius,filter,boxShadow",
        });
        // ✅ centrowanie bez skoków
        gsap.set(scatter, { xPercent: -50, yPercent: -50 });

        // start sizes px (żeby width/height tween działał)
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

        // intro
        if (introWrapper) gsap.set(introWrapper, { opacity: 1 });
        if (introP) gsap.set(introP, { opacity: 1 });

        splitIntro();

        gsap.set(introLineInners, {
          yPercent: 130,
          opacity: 0,
          skewY: 9,
          transformOrigin: "0% 50%",
        });

        // stage2 hidden initially
        gsap.set(stage2Wrap, { opacity: 0, pointerEvents: "none" });
        gsap.set([stage2Title, stage2Meta, stage2Btn], { opacity: 0, y: 28 });
        gsap.set([stage2TitleA, stage2TitleB], { opacity: 0, y: 18 });

        gsap.set(dots, { opacity: 0.35, scale: 1 });
        gsap.set(slides, { opacity: 0, scale: 0.98, y: 18 });
      };

      setInitialStates();

      // rest: najniższy pierwszy
      const restByBottomFirst = [...restEls].sort(
        (a, b) => getOffset(b, "y") - getOffset(a, "y"),
      );

      // timeline length: stage1 + stage2 + slides
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () =>
            `+=${window.innerHeight * (2.6 + projectSlides.length * 1.25)}`,
          scrub: true,
          pin: pin,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefreshInit: setInitialStates,
        },
      });

      // ----------------------------
      // STAGE 1 — intro reveal + pause + fadeout
      // ----------------------------
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

        // pauza (scroll hold)
        tl.to(
          {},
          { duration: 0.15, ease: "none" }, // ✅ dłużej = czytelniej
          ">",
        );

        tl.to(
          introWrapper,
          { opacity: 0, duration: 0.25, ease: "power1.out" },
          ">",
        );
      }

      // Scatter IN (spread)
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

      // REST: rosną do MAX i spadają za dół (bez opacity 0)
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

      // HERO: morph do karty (wolniej, żeby nie najeżdżał)
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

        // HERO: expand do MAX
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

      // ----------------------------
      // STAGE 2 — ref style UI + slides
      // ----------------------------

      const stage2Start = 2.25;

      // pokaż stage2 wrapper
      tl.to(
        stage2Wrap,
        { opacity: 1, duration: 0.35, ease: "power2.out" },
        stage2Start,
      );

      // ----------------------------
      // GIANT TOP TITLE (jak w refce)
      // ----------------------------
      tl.to(
        [giantA, giantB],
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power3.out",
          stagger: 0.08,
        },
        stage2Start + 0.02,
      );

      // title (gigantyczny) — wchodzi lekko z dołu
      tl.to(
        [stage2TitleA, stage2TitleB],
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.06,
        },
        stage2Start + 0.08,
      );

      // meta + button
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

      // dots
      tl.to(
        dots,
        { opacity: 0.35, duration: 0.2, ease: "none" },
        stage2Start + 0.25,
      );

      // hide hero element (żeby stage2 slide 1 przejął)
      if (heroEl) {
        tl.to(
          heroEl,
          { opacity: 0, duration: 0.2, ease: "none" },
          stage2Start + 0.05,
        );
      }

      // Slides loop (jak w refce)
      let cursor = stage2Start + 0.05;

      slides.forEach((slide, index) => {
        const dot = dots[index];

        // slide in
        tl.to(
          slide,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.55,
            ease: "power2.out",
          },
          cursor,
        );

        // dot active
        if (dot) {
          tl.to(dots, { opacity: 0.35, scale: 1, duration: 0.1 }, cursor);
          tl.to(dot, { opacity: 1, scale: 1.7, duration: 0.2 }, cursor + 0.05);
        }

        // small hold (scroll distance)
        tl.to({}, { duration: 0.55, ease: "none" }, cursor + 0.35);

        // slide out (except last)
        if (index < slides.length - 1) {
          tl.to(
            slide,
            {
              opacity: 0,
              scale: 0.985,
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
    <div className="h-[820vh] w-full p-4 flex flex-col">
      {/* HEADER */}
      <div className="w-full flex flex-col items-start space-y-4 md:space-y-8 mb-8">
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

      {/* PINNED */}
      <div
        ref={pinRef}
        className="relative w-full min-h-screen flex items-center justify-center"
      >
        <div
          ref={sectionRef}
          className="relative w-full min-h-[70vh] md:min-h-[85vh] rounded-[32px] bg-[#0f0f0f] overflow-hidden px-6 md:px-12 lg:px-16"
        >
          {/* Intro Text */}
          <div
            data-projects-intro-wrap
            className="absolute left-6 top-1/2 z-20 w-[min(92%,540px)] -translate-y-1/2 text-left text-white md:left-12 lg:left-16"
          >
            <p
              data-projects-intro
              className="text-[22px]! leading-snug md:text-[34px]! md:leading-tight"
            >
              Projekty GOK Gorzyce powstają we współpracy z lokalną
              społecznością i odpowiadają{" "}
              <span className="text-[#b8f34d]">na jej realne potrzeby.</span>
            </p>
          </div>

          {/* Scatter (Stage 1) */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            {scatterImages.map((image, index) => {
              const isHero = (image as any).isHero;
              return (
                <div
                  key={image.alt}
                  data-projects-scatter
                  data-hero={isHero ? "true" : "false"}
                  data-x={String(image.x)}
                  data-y={String(image.y)}
                  className={`absolute left-1/2 top-1/2 overflow-hidden rounded-xl shadow-[0_12px_30px_rgba(0,0,0,0.35)] ${image.className}`}
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

          {/* Stage 2 (ref) */}
          <div
            data-stage2
            className="absolute inset-0 z-30 pointer-events-none isolate"
          >
            {/* STAGE 2 — GIANT TOP TITLE */}
            <div
              data-stage2-giant-title
              className="absolute left-1/2 top-6 md:top-8 -translate-x-1/2 z-40 pointer-events-none will-change-transform text-center"
            >
              <div className="text-[clamp(72px,9vw,160px)] font-bold! leading-none!">
                <span
                  data-stage2-giant-a
                  className="block text-[#d9ff5b] mix-blend-screen"
                >
                  Manufacturing
                </span>
              </div>
            </div>

            {/* Slides (image) */}
            <div className="absolute inset-0">
              {projectSlides.map((s, idx) => (
                <div
                  key={`${s.titleA}-${idx}`}
                  data-stage2-slide
                  className="absolute left-1/2 top-1/2 overflow-hidden rounded-[18px] shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
                  style={{
                    width: "min(78%, 980px)",
                    height: "56vh",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <Image
                    src={s.src}
                    alt={`${s.titleA} ${s.titleB}`}
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

            {/* Giant Title */}
            <div
              data-stage2-title
              className="absolute left-6 top-6 md:left-12 md:top-8 lg:left-16"
            >
              <div className="text-[clamp(64px,7.6vw,140px)] font-semibold leading-none text-white">
                <span data-stage2-title-a className="block text-[#d9ff5b]">
                  {projectSlides[0].titleA}
                </span>
                <span data-stage2-title-b className="block">
                  {projectSlides[0].titleB}
                </span>
              </div>
            </div>

            {/* Meta bottom-left */}
            <div
              data-stage2-meta
              className="absolute left-6 bottom-24 md:left-12 md:bottom-28 lg:left-16 max-w-[520px]"
            >
              <div className="inline-flex items-center rounded-full border border-white/25 bg-white/5 px-3 py-1 text-xs text-white/85">
                {projectSlides[0].pill}
              </div>
              <div className="mt-3 text-white/80 text-sm md:text-base leading-relaxed">
                {projectSlides[0].desc}
              </div>
            </div>

            {/* Dots right */}
            <div className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-3">
              {projectSlides.map((_, index) => (
                <span
                  key={`dot-${index}`}
                  data-stage2-dot
                  className="h-1 w-1 rounded-full border border-white/50 bg-white/10"
                />
              ))}
            </div>

            {/* CTA bottom-center */}
            <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-40">
              <button
                data-stage2-cta
                className="pointer-events-auto rounded-[14px] bg-[#d9ff5b] px-6 py-3 text-sm font-semibold text-black shadow-[0_10px_25px_rgba(0,0,0,0.3)]"
              >
                {projectSlides[0].cta}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
