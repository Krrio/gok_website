"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { project_1, project_2, project_3 } from "@/constants";

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
    isHero: true, // ✅ HERO = project_3
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

      const heroEl = section.querySelector<HTMLElement>("[data-hero='true']");
      const restEls = scatter.filter((el) => el !== heroEl);

      const introP = section.querySelector<HTMLElement>(
        "[data-projects-intro]",
      );
      const introWrapper = section.querySelector<HTMLElement>(
        "[data-projects-intro-wrap]",
      );

      const heroTitle = section.querySelector<HTMLElement>("[data-hero-title]");
      const heroBody = section.querySelector<HTMLElement>("[data-hero-body]");
      const heroCta = section.querySelector<HTMLElement>("[data-hero-cta]");

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

      // "karta" (pierwszy etap hero)
      const getCardW = () => Math.min(section.clientWidth * 0.7, 680);
      const getCardH = () => window.innerHeight * 0.42;

      const getHeroW2 = () => Math.min(section.clientWidth * 0.78, 980);
      const getHeroH2 = () => window.innerHeight * 0.56;

      // rest mają zjechać “za dół” — dużo dalej niż tylko 0.28h
      const getRestDropY = () =>
        section.clientHeight * 1.25 + window.innerHeight * 0.9;

      // ----------------------------
      // SplitType (lines)
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
        gsap.set(scatter, {
          clearProps:
            "width,height,opacity,transform,borderRadius,filter,boxShadow",
        });

        gsap.set(scatter, { xPercent: -50, yPercent: -50 });

        // start sizes in px
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

        gsap.set([heroTitle, heroBody, heroCta], { opacity: 0, y: 24 });
      };

      setInitialStates();

      // rest: kolejność zjazdu = najniższy pierwszy (blue -> red)
      // zamiast dataset y możesz podmienić na getBoundingClientRect().top jeśli wolisz
      const restByBottomFirst = [...restEls].sort(
        (a, b) => getOffset(b, "y") - getOffset(a, "y"),
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => `+=${window.innerHeight * 2.4}`,
          scrub: true,
          pin: pin,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefreshInit: setInitialStates,
        },
      });

      // ----------------------------
      // Intro reveal + PAUZA
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

        // ✅ "pauza" – dodatkowy scroll zanim zacznie się fadeout
        // Im większa duration, tym dłuższa pauza (więcej scrolla).
        tl.to(
          {},
          {
            duration: 0.15, // <-- to jest Twoje "jedno scrollnięcie" (dostrój 0.4–0.9)
            ease: "none",
          },
          ">", // start zaraz po zakończeniu poprzedniego tweena
        );

        // Fade out intro dopiero po pauzie
        tl.to(
          introWrapper,
          {
            opacity: 0,
            duration: 0.25,
            ease: "power1.out",
          },
          ">",
        );
      }

      // ----------------------------
      // Scatter IN (spread)
      // ----------------------------
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

      /**
       * KLUCZ do efektu jak w oryginale:
       * - REST zaczyna "rosnąć + spadać" wcześniej,
       *   więc pierwszy (najniższy) szybciej znika za dolną krawędź,
       *   a drugi dopiero potem.
       * - HERO rusza wolniej i trochę później, żeby nie najeżdżał.
       */

      // ----------------------------
      // REST: rosną do MAX i spadają za dół (bez opacity 0)
      // ----------------------------
      if (restByBottomFirst.length) {
        tl.to(
          restByBottomFirst,
          {
            // wracają do osi (żeby finalnie były "na środku" zanim spadną)
            x: 0,
            // najważniejsze: lecą za dół
            y: () => getRestDropY(),
            // rosną do tej samej MAX wielkości
            width: () => getHeroW2(),
            height: () => getHeroH2(),
            borderRadius: 18,
            opacity: 1,
            scale: 1,
            duration: 1.25, // ✅ wolniej
            stagger: 0.22, // ✅ wyraźny odstęp: najpierw najniższy, potem kolejny
            ease: "power2.inOut",
          },
          0.62,
        );
      }

      // ----------------------------
      // HERO: wolniejszy morph do karty w centrum (żeby nie najeżdżał)
      // ----------------------------
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
            duration: 1.1, // ✅ wolniej
            ease: "power2.inOut",
          },
          0.78, // ✅ start później niż rest
        );
      }

      // ----------------------------
      // HERO: dopiero potem ekspansja do MAX (jak w oryginale)
      // ----------------------------
      if (heroEl) {
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
      // UI reveal (title/body/cta)
      // ----------------------------
      tl.to(
        heroTitle,
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
        1.75,
      );
      tl.to(
        heroBody,
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
        1.82,
      );
      tl.to(
        heroCta,
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
        1.9,
      );

      return () => {
        introSplit?.revert();
      };
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

      {/* PINNED SECTION */}
      <div
        ref={pinRef}
        className="relative w-full min-h-screen flex items-center justify-center"
      >
        <div
          ref={sectionRef}
          className="relative w-full min-h-[70vh] md:min-h-[85vh] rounded-[32px] bg-[#12110d] overflow-hidden px-6 md:px-12 lg:px-16"
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
              Pracujemy nad przyspieszeniem zmian we wszystkich źródłach emisji,
              zmieniając pięć sektorów globalnej gospodarki w{" "}
              <span className="text-[#b8f34d]">
                krajobraz nowych możliwości.
              </span>
            </p>
          </div>

          {/* Scatter Images */}
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
                  className={`absolute left-1/2 top-1/2 overflow-hidden rounded-xl shadow-[0_12px_30px_rgba(0,0,0,0.35)] ${image.className}`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 1400px, 92vw"
                    quality={100}
                    priority={image.isHero || index === 0}
                    draggable={false}
                  />
                </div>
              );
            })}
          </div>

          {/* HERO UI Overlay */}
          <div className="absolute inset-0 z-30 pointer-events-none">
            <div className="absolute left-6 top-10 md:left-12 md:top-12 lg:left-16">
              <div
                data-hero-title
                className="text-[clamp(56px,7vw,120px)] font-semibold leading-none text-white"
              >
                <span className="block">Produkcja</span>
                <span className="block text-[#d9ff5b]">przemysłowa</span>
              </div>

              <div
                data-hero-body
                className="mt-5 max-w-[560px] text-white/80 text-base md:text-lg leading-relaxed"
              >
                Rewolucja przemysłowa zaczyna się od zmiany sposobu wytwarzania
                — od stali i cementu po produkty codziennego użytku.
              </div>
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:bottom-10">
              <button
                data-hero-cta
                className="pointer-events-auto rounded-full bg-[#d9ff5b] px-6 py-3 text-sm font-semibold text-black shadow-[0_10px_25px_rgba(0,0,0,0.3)]"
              >
                Zobacz projekty
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
