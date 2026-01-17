import { nav_links } from "@/constants";
import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <header className="flex items-center justify-center max-w-7xl mx-auto border">
      <div className="w-full border border-red-500 flex items-center justify-between">
        <Image src="/images/logo.png" alt="Logo" width={100} height={100} />
        <ul className="w-full flex items-center justify-center space-x-4">
          {nav_links.map((link) => (
            <li key={link.name} className="">
              <a href={link.href}>{link.name}</a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
