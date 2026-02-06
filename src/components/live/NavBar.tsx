"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navBarLinks } from "@/data/navBarLinks";

const NavBar = () => {
  const pathName = usePathname();

  return (
    <div className="fixed left-1/2 z-50 mt-10 flex w-1/2 -translate-x-1/2 items-center justify-between rounded-full border-2 border-white bg-citrushack-brown p-2 shadow-md shadow-white md:w-2/5 md:p-6 lg:w-2/5">
      {navBarLinks.map((item, index) => {
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
            {item.isImage ? (
              <Image
                src={item.icon}
                alt={`${item.name} Logo`}
                className="h-6 w-6 sm:h-8 sm:w-8 md:h-8 md:w-8 lg:h-10 lg:w-10 xl:h-12 xl:w-12"
                priority
              />
            ) : (
              // @ts-expect-error: Item.icon is a component here
              <item.icon className="h-6 w-6 sm:h-8 sm:w-8 md:h-8 md:w-8 lg:h-10 lg:w-10 xl:h-12 xl:w-12" />
            )}
          </Link>
        );
      })}
    </div>
  );
};

export default NavBar;
