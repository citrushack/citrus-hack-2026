"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import citrusHackLogo from "@/public/landing/citrusHack2026Logo.webp";
import { navBarLinks } from "@/data/navBarLinks";

const NavBar = () => {
  const pathName = usePathname();

  return (
    <div className="mx-auto mt-10 flex w-2/3 items-center justify-between rounded-full border-2 border-white bg-citrushack-brown p-6 text-white shadow-[0_0_15px_2px_rgba(255,255,255,0.3)] md:w-1/2">
      <div className="flex items-center">
        <Link href="/">
          <Image
            src={citrusHackLogo}
            alt="CitrusHack Logo"
            className="h-10 w-10 md:h-14 md:w-14"
            priority
          />
        </Link>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        {navBarLinks.map(({ link, icon: Icon }, index) => {
          const isActive = pathName === link;

          return (
            <Link
              key={index}
              href={link}
              target={link.startsWith("http") ? "_blank" : "_self"}
              className={`transition-opacity hover:opacity-70 ${
                isActive ? "text-citrushack-orange" : "text-white"
              }`}
            >
              <Icon className="size-8 md:size-10" />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default NavBar;
