"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navBarLinks } from "@/data/navBarLinks";

const NavBar = () => {
  const pathName = usePathname();

  return (
    <div className="fixed left-1/2 top-10 z-50 flex w-2/3 -translate-x-1/2 items-center justify-between rounded-full border-2 border-white bg-citrushack-brown p-6 shadow-[0_0_15px_2px_rgba(255,255,255,0.3)] md:w-1/3">
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
                className="h-10 w-10 md:h-14 md:w-14"
                priority
              />
            ) : (
              // @ts-expect-error: Item.icon is a component here
              <item.icon className="size-8 md:size-10" />
            )}
          </Link>
        );
      })}
    </div>
  );
};

export default NavBar;
