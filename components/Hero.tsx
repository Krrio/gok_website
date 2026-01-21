import AnimatedButtonText from "@/components/AnimatedButtonText";
import { arrow_icon, hero_6, hero_8 } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  const linkLabel = "Sprawdź wydarzenia";
  const kulturaLabel = "Kultura";
  const dladzieciLabel = "Dla dzieci";
  const signupLabel = "Zapisz się";

  return (
    <div className="h-screen w-full p-4 md:mt-8 flex flex-col">
      <div className="w-full flex flex-col items-start space-y-4 md:space-y-8 mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-center md:text-left">
          Poznaj nas.
        </h1>
        <p className="md:text-[24px]! text-[20px]! text-gray-600">
          Dowiedz się więcej o naszej działalności i ofercie kulturalnej.
        </p>
      </div>
      <div className="w-full flex md:flex-row flex-col h-3/5  md:space-x-4 space-y-4 md:space-y-0 relative">
        <div className="w-full md:w-1/4 h-full relative flex flex-col space-y-4 items-center justify-end md:pt-20">
          <div className="bg-[#cff29e] rounded-2xl w-full h-full">
            <div className="w-full h-full overflow-hidden flex items-end justify-center">
              <Image
                src={hero_8}
                alt="Hero image"
                width={500}
                height={500}
                className="object-cover ml-10"
                draggable={false}
              />
            </div>
          </div>

          <Link
            href="/events"
            className="group cursor-pointer select-none border bg-gray-300/20 rounded-full w-full min-h-14 flex items-center justify-center space-x-2 font-semibold flex-row px-4 border-gray-300/20 shadow-[inset_0_0px_1px_rgba(0,0,0,0.2)] hover:bg-gray-300/30 transition-colors"
          >
            <AnimatedButtonText text={linkLabel} />

            <Image
              src={arrow_icon}
              alt="Arrow icon"
              width={20}
              height={20}
              className="ml-2 rotate-45"
              draggable={false}
            />
          </Link>
        </div>

        <div className="hidden w-full md:w-1/4 h-full relative md:flex flex-col space-y-4 items-center justify-end">
          <Link
            href="/events"
            className="group cursor-pointer select-none border bg-gray-300/20 rounded-full
             w-full min-h-14 flex items-center justify-center space-x-2 font-semibold
             px-4 border-gray-300/20 shadow-[inset_0_0px_1px_rgba(0,0,0,0.2)]
             hover:bg-gray-300/30 transition-colors"
          >
            <AnimatedButtonText text={kulturaLabel} />

            <Image
              src={arrow_icon}
              alt="Arrow icon"
              width={20}
              height={20}
              className="ml-2 rotate-45"
              draggable={false}
            />
          </Link>
          <div className="bg-[#cff29e] rounded-2xl w-full h-1/2 flex flex-col justify-between px-8 py-6 space-y-4">
            <p className="p">7.</p>
            <p className="text-lg!">
              Tyle zorganizowaliśmy w Gorzycach{" "}
              <span className="font-semibold px-1 bg-secondary-green rounded-[5px]">
                Narodowych Czytań
              </span>{" "}
              we współpracy z biblioteką.
            </p>
          </div>
        </div>

        <div className="md:hidden w-full md:w-1/4 h-full relative flex flex-col space-y-4 items-center justify-end">
          <div className="bg-[#cff29e] rounded-2xl w-full h-full flex flex-col justify-between px-8 py-6 space-y-4">
            <p className="p">7.</p>
            <p className="text-lg!">
              Tyle zorganizowaliśmy w Gorzycach{" "}
              <span className="font-semibold px-1 bg-secondary-green rounded-[5px]">
                Narodowych Czytań
              </span>{" "}
              we współpracy z biblioteką.
            </p>
          </div>
          <Link
            href="/events"
            className="group cursor-pointer select-none border bg-gray-300/20 rounded-full
             w-full min-h-14 flex items-center justify-center space-x-2 font-semibold
             px-4 border-gray-300/20 shadow-[inset_0_0px_1px_rgba(0,0,0,0.2)]
             hover:bg-gray-300/30 transition-colors"
          >
            <AnimatedButtonText text={kulturaLabel} />

            <Image
              src={arrow_icon}
              alt="Arrow icon"
              width={20}
              height={20}
              className="ml-2 rotate-45"
              draggable={false}
            />
          </Link>
        </div>

        <div className="w-full md:w-1/4 h-full relative flex flex-col space-y-4 items-center justify-end md:pt-20">
          <div className="bg-[#cff29e] rounded-2xl w-full h-full md:h-[70%] px-8 py-6 space-y-4 flex flex-col justify-between">
            <p className="p">20+</p>
            <p className="text-lg! text-center">
              Lat tworzona społeczność{" "}
              <span className="font-semibold px-1 bg-secondary-green rounded-[5px]">
                Gorzyczan,
              </span>{" "}
              którzy chcą rozwijać swoje pasje i zainteresowania.
            </p>
          </div>

          <Link
            href="/events"
            className="group cursor-pointer select-none border bg-gray-300/20 rounded-full
             w-full min-h-14 flex items-center justify-center space-x-2 font-semibold
             px-4 border-gray-300/20 shadow-[inset_0_0px_1px_rgba(0,0,0,0.2)]
             hover:bg-gray-300/30 transition-colors"
          >
            <AnimatedButtonText text={signupLabel} />

            <Image
              src={arrow_icon}
              alt="Arrow icon"
              width={20}
              height={20}
              className="ml-2 rotate-45"
              draggable={false}
            />
          </Link>
        </div>

        <div className="hidden w-full md:w-1/4 h-full relative md:flex flex-col space-y-4 items-center justify-end">
          <Link
            href="/events"
            className="group cursor-pointer select-none border bg-gray-300/20 rounded-full w-full min-h-14 flex items-center justify-center space-x-2 font-semibold flex-row px-4 border-gray-300/20 shadow-[inset_0_0px_1px_rgba(0,0,0,0.2)] hover:bg-gray-300/30 transition-colors"
          >
            <AnimatedButtonText text={dladzieciLabel} />

            <Image
              src={arrow_icon}
              alt="Arrow icon"
              width={20}
              height={20}
              className="ml-2 rotate-45"
              draggable={false}
            />
          </Link>
          <div className="bg-[#cff29e] rounded-2xl w-full h-5/6 px-6 py-4 flex flex-col justify-between space-y-4">
            <div className="w-full h-full bg-primary-green rounded-xl mt-2 overflow-hidden">
              <Image
                src={hero_6}
                alt="Hero image"
                width={500}
                height={500}
                className="object-cover"
                draggable={false}
              />
            </div>
            <p className="text-lg!">
              Prowadzimy mnóstwo zajęć{" "}
              <span className="font-semibold px-1 bg-secondary-green rounded-[5px]">
                dla dzieci,
              </span>{" "}
              aby mogły się uczyć i rozwijać swoje talenty.
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/4 h-full relative md:hidden flex flex-col space-y-4 items-center justify-end">
          <div className="bg-[#cff29e] rounded-2xl w-full h-5/6 px-6 py-4 flex flex-col justify-between space-y-4">
            <div className="w-full h-full bg-primary-green rounded-xl mt-2 overflow-hidden">
              <Image
                src={hero_6}
                alt="Hero image"
                width={224}
                height={224}
                className="object-cover flexjustify-center mx-auto"
                draggable={false}
              />
            </div>
            <p className="text-lg!">
              Prowadzimy mnóstwo zajęć{" "}
              <span className="font-semibold px-1 bg-secondary-green rounded-[5px]">
                dla dzieci,
              </span>{" "}
              aby mogły się uczyć i rozwijać swoje talenty.
            </p>
          </div>
          <Link
            href="/events"
            className="group cursor-pointer select-none border bg-gray-300/20 rounded-full w-full min-h-14 flex items-center justify-center space-x-2 font-semibold flex-row px-4 border-gray-300/20 shadow-[inset_0_0px_1px_rgba(0,0,0,0.2)] hover:bg-gray-300/30 transition-colors"
          >
            <AnimatedButtonText text={dladzieciLabel} />

            <Image
              src={arrow_icon}
              alt="Arrow icon"
              width={20}
              height={20}
              className="ml-2 rotate-45"
              draggable={false}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
