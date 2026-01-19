import { arrow_icon, nav_links } from "@/constants";
import Image from "next/image";
import React from "react";
import Pill from "./Pill";

const Header = () => {
  return (
    <header className="items-center justify-center max-w-7xl mx-auto hidden md:flex mt-4">
      <div className="w-full flex items-center justify-between">
        <Pill isLogo href="/" className="shrink-0">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={80}
            height={84}
            className="pointer-events-none"
          />
        </Pill>

        <ul className="flex-1 flex items-center justify-center space-x-4">
          {nav_links.map((link) => (
            <li key={link.name}>
              <Pill href={link.href} className="px-4 py-2">
                {link.name}
              </Pill>
            </li>
          ))}
        </ul>

        <Pill
          href="/contact"
          className="shrink-0 bg-primary-green whitespace-nowrap px-4 py-2"
        >
          Kontakt
          <Image
            src={arrow_icon}
            alt="Arrow icon"
            width={16}
            height={16}
            className="ml-2 rotate-45"
          />
        </Pill>
      </div>
    </header>
  );
};

export default Header;
