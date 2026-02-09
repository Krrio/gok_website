import { logo } from "@/constants";
import Image from "next/image";
import React from "react";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";

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
        <div className="w-full flex flex-col space-y-4">
          <div className="flex flex-col">
            <p className="text-lg! mt-4">
              Zapisz się do newslettera
            </p>
            <p className="text-sm! text-gray-600 w-1/2">
              i bądź na bieżąco z wydarzeniami, konkursami i projektami organizowanymi przez Gminny Ośrodek Kultury w Gorzycach.
            </p>
          </div>
          <div className="flex w-full! sm:w-1/3! flex-col gap-2 sm:flex-row sm:items-start">
            <Input
              type="email"
              autoComplete="email"
              placeholder="Twój email"
              className="border! border-secondary-green! w-full sm:w-[320px] rounded-[7px]! bg-secondary-green!"
              aria-label="Adres e-mail do newslettera"
            />
            <button
              type="button"
              className="h-9 w-full sm:w-auto rounded-[7px] border border-gray-900 bg-gray-900 px-4 text-sm font-medium text-secondary-green transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-green"
              aria-label="Potwierdź zapis do newslettera"
            >
              Potwierdź
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
