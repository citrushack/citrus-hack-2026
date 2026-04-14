"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navBarLogo, navBarTextLinks, navBarIcons } from "@/data/navBarLinks";

const NavBar = () => {
  const pathName = usePathname();

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
    <div className="fixed left-1/2 top-4 z-50 flex w-1/2 -translate-x-1/2 items-center justify-between rounded-full border-2 border-white bg-citrushack-brown p-2 shadow-md shadow-white md:w-2/5 md:p-6 lg:w-2/5 2xl:w-[95%] 2xl:max-w-[1200px] 2xl:px-6 2xl:py-2">
      <Link
        href={navBarLogo.link}
        onClick={(e) => handleScroll(e, navBarLogo.link)}
        className="flex-shrink-0 transition-opacity hover:opacity-70"
      >
        <Image
          src={navBarLogo.icon}
          alt="Citrus Hack Logo"
          className="h-6 w-6 sm:h-8 sm:w-8 md:h-8 md:w-8 lg:h-10 lg:w-10 xl:h-12 xl:w-12 2xl:h-10 2xl:w-10"
          priority
        />
      </Link>

      <div className="hidden items-center gap-8 2xl:flex">
        <Link
          href="https://citrushack.com/user"
          target="_blank"
          className="rounded-full border-2 border-white px-6 py-1.5 text-lg font-bold text-white shadow-[0_0_15px_rgba(255,255,255,0.6)] transition-all hover:scale-105"
        >
          Register
        </Link>
        {navBarTextLinks.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            onClick={(e) => handleScroll(e, item.link)}
            className="text-base font-semibold text-white transition-colors hover:text-citrushack-orange"
          >
            {item.name}
          </Link>
        ))}
      </div>

      <div className="flex flex-1 items-center justify-evenly 2xl:flex-none 2xl:justify-end 2xl:gap-4">
        {navBarIcons.map((item, index) => {
          const isActive = pathName === item.link;

          return (
            <Link
              key={index}
              href={item.link}
              target={item.link.startsWith("http") ? "_blank" : "_self"}
              className={`transition-opacity hover:opacity-70 ${
                isActive ? "text-citrushack-orange" : "text-white"
              }`}
            >
              <item.icon className="h-6 w-6 sm:h-8 sm:w-8 md:h-8 md:w-8 lg:h-10 lg:w-10 xl:h-12 xl:w-12 2xl:h-7 2xl:w-7" />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default NavBar;
