import { call_icon, gps_icon, logo, mail_icon } from "@/constants";
import Image from "next/image";
import React from "react";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <div className="w-full px-3 sm:px-4">
      <div className="w-full rounded-t-4xl bg-primary-green p-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          <div className="flex flex-col items-start">
            <div className="flex flex-row space-x-4 items-end">
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
                    const words = "Gminny Ośrodek Kultury w Gorzycach".split(
                      " ",
                    );
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

            <Separator className="bg-secondary-green w-full md:w-1/2! mt-4" />

            <div className="w-full flex flex-col space-y-4 mt-4">
              <div className="w-full lg:max-w-[680px]">
                <p className="text-lg!">Zapisz się do newslettera</p>
                <p className="text-sm! text-gray-600 w-full lg:max-w-[640px]">
                  i bądź na bieżąco z wydarzeniami, konkursami i projektami
                  organizowanymi przez Gminny Ośrodek Kultury w Gorzycach.
                </p>
              </div>

              <div className="flex w-full lg:max-w-2/3 flex-col gap-2 sm:flex-row">
                <Input
                  type="email"
                  autoComplete="email"
                  placeholder="Twój email"
                  className="border! border-secondary-green! w-full rounded-[7px]! bg-secondary-green!"
                  aria-label="Adres e-mail do newslettera"
                />

                <button
                  type="button"
                  className="h-9 w-full sm:w-auto rounded-[7px] border border-gray-900 bg-gray-900 px-4 text-sm font-medium text-secondary-green transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-green"
                >
                  Potwierdź
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start space-y-6 lg:mt-2">
            <div className="flex flex-col space-y-2">
              <p
                className="
                  text-lg!
                  bg-secondary-green
                  px-1
                  rounded-[4px]
                  inline
                  w-fit
                  [box-decoration-break:clone]
                  [-webkit-box-decoration-break:clone]
                "
              >
                Kontakt
              </p>

              <p className="text-sm! flex items-center">
                <Image
                  src={gps_icon}
                  alt="lokalizacja"
                  width={24}
                  height={24}
                  className="scale-75 mr-1"
                />
                Plac Mieszczańskiego 1, 39-432 Gorzyce
              </p>

              <p className="text-sm! flex items-center">
                <Image
                  src={call_icon}
                  alt="telefon"
                  width={24}
                  height={24}
                  className="scale-75 mr-1"
                />
                + (48) 123-456-789
              </p>

              <p className="text-sm! flex items-center">
                <Image
                  src={mail_icon}
                  alt="email"
                  width={24}
                  height={24}
                  className="scale-75 mr-1"
                />
                gokgorzyce@gmail.com
              </p>
            </div>

            <div className="flex flex-col space-y-2">
              <p
                className="
                  text-lg!
                  bg-secondary-green
                  px-1
                  rounded-[4px]
                  inline
                  w-fit
                  [box-decoration-break:clone]
                  [-webkit-box-decoration-break:clone]
                "
              >
                Nasze social media:
              </p>
              <p className="text-sm!">Facebook</p>
            </div>
          </div>
        </div>

        <Separator className="bg-secondary-green w-full mt-10 mb-4 opacity-40" />

        <div className="flex flex-col gap-2 text-sm! text-gray-700 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm!">
            © {new Date().getFullYear()} GOK Gorzyce. Wszystkie prawa
            zastrzeżone.
          </p>

          <p className="flex items-center gap-1 text-sm!">
            Made with{" "}
            <span className="bg-secondary-green rounded-[3px] px-1">love</span>{" "}
            by
            <span className="font-medium text-gray-900">Josephic.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
