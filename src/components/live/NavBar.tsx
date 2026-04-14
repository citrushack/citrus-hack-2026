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
      if (window.innerWidth >= 1024) setIsOpen(false);
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
      <div className="fixed left-1/2 top-4 z-50 flex w-[90%] -translate-x-1/2 items-center justify-between rounded-full border-2 border-white bg-citrushack-brown px-4 py-2 shadow-md shadow-white sm:w-[70%] md:w-[50%] md:px-6 lg:w-[45%] xl:w-[85%] 2xl:w-[70%] 2xl:max-w-[1200px]">
        <Link
          href={navBarLogo.link}
          onClick={(e) => handleScroll(e, navBarLogo.link)}
          className="hidden flex-shrink-0 transition-opacity hover:opacity-70 lg:flex"
        >
          <Image
            src={navBarLogo.icon}
            alt="Citrus Hack Logo"
            className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12"
            priority
          />
        </Link>

        <div className="hidden items-center gap-6 lg:flex 2xl:gap-8">
          <Link
            href="https://citrushack.com/user"
            target="_blank"
            className="rounded-full border-2 border-white px-5 py-1.5 text-base font-bold text-white shadow-[0_0_15px_rgba(255,255,255,0.6)] transition-all hover:scale-105 2xl:px-6 2xl:text-lg"
          >
            Register
          </Link>
          {navBarTextLinks.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              onClick={(e) => handleScroll(e, item.link)}
              className="text-sm font-semibold text-white transition-colors hover:text-citrushack-orange 2xl:text-base"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex 2xl:gap-4">
          {navBarIcons.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              target={item.link.startsWith("http") ? "_blank" : "_self"}
              className="text-white transition-opacity hover:text-citrushack-orange hover:opacity-70"
            >
              <item.icon className="h-5 w-5 2xl:h-6 2xl:w-6" />
            </Link>
          ))}
        </div>

        <button
          className="ml-auto text-white lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed inset-y-0 right-0 z-50 flex w-64 transform flex-col bg-citrushack-brown p-6 shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
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
