"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import Link from "next/link";
import { mobile_nav_links } from "@/constants";

const MobileNav = () => {
  const line1Ref = useRef<HTMLSpanElement | null>(null);
  const line2Ref = useRef<HTMLSpanElement | null>(null);
  const line3Ref = useRef<HTMLSpanElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const l1 = line1Ref.current;
    const l2 = line2Ref.current;
    const l3 = line3Ref.current;

    if (!l1 || !l2 || !l3) return;

    const set = (el: HTMLSpanElement, styles: Partial<CSSStyleDeclaration>) => {
      Object.assign(el.style, styles);
    };

    [l1, l2, l3].forEach((el) => {
      set(el, {
        transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
      });
    });

    if (isOpen) {
      set(l1, { transform: "translate(-50%, -50%) rotate(45deg)", top: "50%" });
      set(l2, { opacity: "0" });
      set(l3, {
        transform: "translate(-50%, -50%) rotate(-45deg)",
        top: "50%",
      });
    } else {
      set(l1, { transform: "translate(-50%, -50%) rotate(0deg)", top: "35%" });
      set(l2, { opacity: "1" });
      set(l3, { transform: "translate(-50%, -50%) rotate(0deg)", top: "65%" });
    }
  }, [isOpen]);

  return (
    <header className="flex items-center justify-between px-6 py-2 md:hidden">
      <Link href="/" className="flex items-center">
        <Image src="/images/logo.png" alt="Logo" width={64} height={64} />
      </Link>
      <button
        className="relative h-10 w-10 z-100 pointer-events-auto"
        aria-label="menu"
        onClick={() => setIsOpen((prev) => !prev)}
        type="button"
      >
        <span
          ref={line1Ref}
          className="absolute h-0.5 w-6 bg-black dark:bg-white transition-colors duration-300"
          style={{
            left: "50%",
            top: "35%",
            transform: "translate(-50%, -50%)",
          }}
        />
        <span
          ref={line2Ref}
          className="absolute h-0.5 w-6 bg-black dark:bg-white transition-colors duration-300"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
        <span
          ref={line3Ref}
          className="absolute h-0.5 w-6 bg-black dark:bg-white transition-colors duration-300"
          style={{
            left: "50%",
            top: "65%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </button>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          side="top"
          className="h-full pt-20"
          // Zapobiega konfliktowi, gdy klikasz w przycisk zamykania (nie pozwala Radixowi zamknąć menu "drugi raz")
          onInteractOutside={(e) => {
            const target = e.target as HTMLElement;
            if (target.closest('button[aria-label="menu"]')) {
              e.preventDefault();
            }
          }}
        >
          <SheetTitle className="hidden">Menu</SheetTitle>

          <nav className="mt-10 flex h-full flex-col items-center justify-start gap-8">
            {mobile_nav_links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[18px] font-normal uppercase hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default MobileNav;
