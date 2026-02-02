"use client";

import { arrow_icon } from "@/constants";
import AnimatedButtonText from "@/components/AnimatedButtonText";
import Image from "next/image";
import Link from "next/link";

type EventCardProps = {
  title: string;
  description: string;
  photo: string;
  href: string;
  direction: "left" | "right";
  date: string;
};

const EventCard = ({
  title,
  description,
  photo,
  href,
  direction,
  date,
}: EventCardProps) => {
  return (
    <article
      data-events-animate
      className={`w-full h-80 flex flex-col md:flex-row relative items-stretch rounded-3xl overflow-hidden gap-0 md:gap-4 ${
        direction === "right" ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="relative w-full md:w-1/3 h-64 md:h-auto bg-primary-green rounded-t-2xl overflow-hidden frounded-b-none md:rounded-xl">
        <Image
          src={photo}
          alt={title}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover ml-8"
          priority={false}
        />
      </div>

      <div className="flex flex-col justify-between w-full md:w-2/3 p-4 md:p-8 bg-gray-300/40 rounded-b-xl rounded-t-none md:rounded-xl">
        <div className="flex items-center justify-between md:gap-4 mb-8">
          <h2 className="md:text-2xl! text-lg! font-semibold! text-gray-900">
            {title}
          </h2>

          <Link
            href={href}
            className="group inline-flex items-center gap-2 px-4 py-3 rounded-full bg-[#e9e9e9] transition-colors text-sm font-medium whitespace-nowrap"
          >
            <AnimatedButtonText text="Zobacz więcej" />
            <Image
              src={arrow_icon}
              alt=""
              width={16}
              height={16}
              className="rotate-45"
            />
          </Link>
        </div>
        <div className="bg-[#e9e9e9] h-full flex-col flex rounded-lg p-4 justify-between">
          <p className="text-gray-600 leading-relaxed text-sm! md:text-xl!">
            {description}
          </p>
          <p className="text-gray-600 leading-relaxed text-sm! md:text-xl! bg-primary-green px-1 w-fit rounded-[7px]">
            {date}
          </p>
        </div>
        {/* <div className="bg-[#e9e9e9] h-full rounded-lg p-4">
          <p className="text-gray-600 leading-relaxed text-sm! md:text-xl!">
            {date}
          </p>
        </div> */}
      </div>
    </article>
  );
};

export default EventCard;
