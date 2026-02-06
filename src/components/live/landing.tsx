"use client";

import Countdown from "../ui/countdown";
import Image from "next/image";
import Link from "next/link";
import citrusHackLogo from "@/public/landing/citrusHack2026Logo.webp";
import folderCoffeeNewspaper from "@/public/landing/folderCoffeeNewspaper.webp";
import mlhBadge from "@/public/landing/mlhBadge.webp";
import apply from "@/public/landing/apply.webp";
import detectiveItems from "@/public/landing/detectiveItems.webp";
import aboutUs from "@/public/landing/aboutUs.webp";
import { formLinks } from "@/data/formLinks";

const sharedUnitStyle = {
  background:
    "bg-citrushack-brown rounded-3xl  border-2 border-white w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 shadow-[0_0_15px_2px_rgba(255,255,255,0.3)] ",
};

const Landing = () => {
  return (
    <>
      <div className="mt-32 flex w-full items-center justify-between text-white">
        <div className="absolute right-16 top-0 z-10">
          <Image src={mlhBadge} alt="MLH Badge" />
        </div>

        <div className="absolute flex h-full items-center justify-start">
          <Image
            src={folderCoffeeNewspaper}
            alt="Folder Coffee Newspaper"
            className="-z-10 translate-y-1/4"
          />
        </div>

        <div className="mb-20 ml-auto mt-36 flex w-1/2 -translate-x-28 flex-col items-center">
          <div className="flex justify-center gap-7">
            <Image src={citrusHackLogo} alt="Citrus Hack 2026 Logo" />
            <div className="mt-7">
              <p className="mb-5 text-lg sm:text-xl md:text-2xl lg:text-3xl">
                ACM PRESENTS...
                <br />
              </p>
              <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                CITRUS HACK
              </p>
            </div>
          </div>
          <p className="mt-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            APRIL 18-19, 2026 • UC RIVERSIDE
          </p>
          <div className="mt-6">
            <Countdown
              classNames={{
                days: sharedUnitStyle,
                hours: sharedUnitStyle,
                minutes: sharedUnitStyle,
                seconds: sharedUnitStyle,
              }}
            />
          </div>
          <div className="mt-28 flex flex-col items-center">
            <Image src={apply} alt="Apply Sticky" priority />
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-4">
              {formLinks.map((fl, i) => (
                <Link
                  href={fl.link}
                  key={i}
                  className="w-3/12 rounded-full border-2 border-white bg-citrushack-brown p-4 text-center text-4xl font-bold shadow-lg shadow-white transition-transform delay-75 hover:scale-105"
                >
                  {fl.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-44 flex flex-row items-center justify-center gap-24">
        <Image src={aboutUs} alt="About Us" />

        <Image
          src={detectiveItems}
          alt="Detective Items"
          className="-translate-y-36"
        />
      </div>
    </>
  );
};

export default Landing;
