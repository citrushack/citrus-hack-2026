"use client";

import Image from "next/image";
import Link from "next/link";
import { navBarLogo, navBarTextLinks, navBarIcons } from "@/data/navBarLinks";

const NavBar = () => {
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
      }
    }
  };

  return (
    <div className="fixed left-1/2 top-4 z-50 flex w-[65%] -translate-x-1/2 items-center justify-between rounded-full border-2 border-white bg-citrushack-brown px-3 py-1.5 shadow-md shadow-white sm:w-[50%] sm:px-4 sm:py-2 md:w-[40%] lg:w-[35%] xl:w-[68%] 2xl:w-[75%] 2xl:max-w-[1200px] 2xl:px-8 2xl:py-3">
      <Link
        href={navBarLogo.link}
        onClick={(e) => handleScroll(e, navBarLogo.link)}
        className="flex flex-shrink-0 transition-opacity hover:opacity-70"
      >
        <Image
          src={navBarLogo.icon}
          alt="Citrus Hack Logo"
          className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-9 lg:w-9 xl:h-10 xl:w-10 2xl:h-14 2xl:w-14"
          priority
        />
      </Link>

      <div className="hidden items-center gap-6 xl:flex 2xl:gap-10">
        <Link
          href="https://citrushack.com/user/participants"
          target="_blank"
          className="rounded-full border-2 border-white px-5 py-1.5 text-sm font-bold text-white shadow-[0_0_15px_rgba(255,255,255,0.6)] transition-all hover:scale-105 2xl:px-8 2xl:py-2.5 2xl:text-lg"
        >
          Register
        </Link>
        {navBarTextLinks.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            onClick={(e) => handleScroll(e, item.link)}
            className="text-xs font-semibold text-white transition-colors hover:text-citrushack-orange 2xl:text-lg"
          >
            {item.name}
          </Link>
        ))}
      </div>

      <div className="contents xl:flex xl:items-center xl:gap-4 2xl:gap-6">
        {navBarIcons.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            target={item.link.startsWith("http") ? "_blank" : "_self"}
            className="text-white transition-opacity hover:text-citrushack-orange hover:opacity-70"
          >
            <item.icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-9 lg:w-9 xl:h-5 xl:w-5 2xl:h-8 2xl:w-8" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavBar;
