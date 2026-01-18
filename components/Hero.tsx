import { hero_2, hero_3, hero_4 } from "@/constants";
import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="h-screen w-full p-4">
      <div className="grid h-full w-full grid-cols-1 grid-rows-3 gap-2 lg:grid-cols-2 lg:grid-rows-2">
        <div className="rounded-2xl border lg:row-span-2 relative overflow-hidden border-primary-green"></div>
        <div className="rounded-2xl border relative overflow-hidden border-primary-green"></div>
        <div className="rounded-2xl border relative overflow-hidden border-primary-green"></div>
      </div>
    </div>
  );
};

export default Hero;
