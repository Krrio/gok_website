import React from "react";
import EventCard from "./EventCard";
import { hero_8 } from "@/constants";

const About = () => {
  return (
    <div className="h-full md:h-dvh w-full p-4 flex flex-col md:-mt-16">
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
          photo={hero_8}
          href={""}
          direction={"left"}
        />
        <EventCard
          title={"Koncert Noworoczny"}
          description={
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas quia iste veniam deserunt labore iusto accusamus vero rem, eos id officia! Mollitia sed provident dolorum veniam numquam deleniti, aspernatur libero."
          }
          photo={hero_8}
          href={""}
          direction={"right"}
        />
        <EventCard
          title={"Koncert Noworoczny"}
          description={
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas quia iste veniam deserunt labore iusto accusamus vero rem, eos id officia! Mollitia sed provident dolorum veniam numquam deleniti, aspernatur libero."
          }
          photo={hero_8}
          href={""}
          direction={"left"}
        />
      </div>
    </div>
  );
};

export default About;
