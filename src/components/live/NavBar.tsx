"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navBarLogo, navBarTextLinks, navBarIcons } from "@/data/navBarLinks";

const NavBar = () => {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathName]);

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: string,
  ) => {
    if (link.startsWith("#")) {
      e.preventDefault();
      const targetId = link.replace("#", "");
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      }
    }
  };

  return (
    <>
      <div className="fixed left-1/2 top-4 z-50 flex w-[95%] max-w-[1200px] -translate-x-1/2 items-center justify-between rounded-full border-2 border-white bg-citrushack-brown px-4 py-2 shadow-[0_0_15px_rgba(255,255,255,0.4)] md:px-6 lg:w-[90%] xl:w-[80%]">
        <Link
          href={navBarLogo.link}
          onClick={(e) => handleScroll(e, navBarLogo.link)}
          className="flex-shrink-0 transition-opacity hover:opacity-70"
        >
          <Image
            src={navBarLogo.icon}
            alt="Citrus Hack Logo"
            className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14"
            priority
          />
        </Link>

        <div className="hidden items-center gap-4 md:flex lg:gap-6 xl:gap-8">
          <Link
            href="https://citrushack.com/user"
            target="_blank"
            className="rounded-full border-2 border-white px-4 py-1.5 font-bold text-white shadow-[0_0_15px_rgba(255,255,255,0.6)] transition-all hover:scale-105 lg:px-6 lg:text-lg"
          >
            Register
          </Link>
          {navBarTextLinks.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              onClick={(e) => handleScroll(e, item.link)}
              className="text-xs font-semibold text-white transition-colors hover:text-citrushack-orange lg:text-sm xl:text-base"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex lg:gap-4">
          {navBarIcons.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              target={item.link.startsWith("http") ? "_blank" : "_self"}
              className="text-white transition-opacity hover:text-citrushack-orange hover:opacity-70"
            >
              <item.icon className="h-5 w-5 lg:h-6 lg:w-6 xl:h-7 xl:w-7" />
            </Link>
          ))}
        </div>

        <button
          className="text-white md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed inset-y-0 right-0 z-50 flex w-64 transform flex-col bg-citrushack-brown p-6 shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-8 flex justify-end">
          <button className="text-white" onClick={() => setIsOpen(false)}>
            <X className="h-8 w-8" />
          </button>
        </div>

        <div className="flex flex-col gap-6">
          <Link
            href="https://citrushack.com/user"
            target="_blank"
            className="w-full rounded-full border-2 border-white px-4 py-2 text-center font-bold text-white shadow-[0_0_10px_rgba(255,255,255,0.5)] active:scale-95"
          >
            Register
          </Link>

          <div className="flex flex-col gap-4 border-b border-white/30 pb-6">
            {navBarTextLinks.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                onClick={(e) => handleScroll(e, item.link)}
                className="text-lg font-semibold text-white"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex justify-around pt-2">
            {navBarIcons.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                target={item.link.startsWith("http") ? "_blank" : "_self"}
                className="text-white transition-opacity hover:opacity-70"
              >
                <item.icon className="h-8 w-8" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
