import { logo } from "@/constants";
import Image from "next/image";
import React from "react";
import { Separator } from "./ui/separator";

const Footer = () => {
  return (
    <div className="w-full px-3 sm:px-4">
      <div className="h-87.5 w-full rounded-t-4xl bg-primary-green p-8 flex flex-col items-start justify-start">
        <div className="flex flex-row space-x-4 w-full items-end">
          <Image
            src={logo}
            alt="Logo"
            width={52}
            height={52}
            className="invert"
          />
          <p className="text-lg! leading-tight">
            <span
              className="
                bg-secondary-green
                px-1
                rounded-[4px]
                inline
                [box-decoration-break:clone]
                [-webkit-box-decoration-break:clone]
              "
            >
              {(() => {
                const words = "Gminny Ośrodek Kultury w Gorzycach".split(" ");
                if (words.length === 1) return words[0];
                return (
                  <>
                    {words[0]}
                    <br className="md:hidden" />
                    <span className="hidden md:inline"> </span>
                    {words.slice(1).join(" ")}
                  </>
                );
              })()}
            </span>
          </p>
        </div>
        <Separator className="bg-secondary-green w-full md:w-1/3! mt-4" />
        <div className=""></div>
      </div>
    </div>
  );
};

export default Footer;
