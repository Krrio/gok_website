"use client";

import React, { useEffect, useRef } from "react";
import EventCard from "./EventCard";
import {
  events_1,
  events_2,
  events_3,
  events_4,
  events_5,
  hero_8,
} from "@/constants";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Events = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-events-animate]");
      cards.forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 16,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
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
    <div ref={rootRef} className="h-full w-full p-4 flex flex-col md:-mt-16">
      <div className="w-full flex flex-col items-start space-y-4 md:space-y-8 mb-8">
        <h1 className="text-5xl! lg:text-6xl! font-semibold text-left">
          Nadchodzące wydarzenia
        </h1>
        <p className="md:text-[24px]! text-[20px]! text-gray-600">
          Wydarzenia organizowane przez{" "}
          <span className="px-1 bg-gray-300/40 rounded-[5px]">GOK Gorzyce</span>{" "}
          w najbliższym czasie:
        </p>
      </div>
      <div className="flex flex-col space-y-6">
        <EventCard
          title={"Koncert Noworoczny"}
          description={
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas quia iste veniam deserunt labore iusto accusamus vero rem, eos id officia! Mollitia sed provident dolorum veniam numquam deleniti, aspernatur libero."
          }
          photo={events_1}
          href={""}
          direction={"left"}
          date="01.08.2026"
        />
        <EventCard
          title={"Spotkanie z autorem"}
          description={
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas quia iste veniam deserunt labore iusto accusamus vero rem, eos id officia! Mollitia sed provident dolorum veniam numquam deleniti, aspernatur libero."
          }
          photo={events_2}
          href={""}
          direction={"right"}
          date="01.08.2026"
        />
        <EventCard
          title={"Występ teateralny"}
          description={
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas quia iste veniam deserunt labore iusto accusamus vero rem, eos id officia! Mollitia sed provident dolorum veniam numquam deleniti, aspernatur libero."
          }
          photo={events_5}
          href={""}
          direction={"left"}
          date="01.08.2026"
        />
      </div>
    </div>
  );
};

export default Events;
