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
import folderNewspaperMobile from "@/public/landing/folderNewspaperMobile.webp";
import madeWithLove from "@/public/landing/madeWithLove.webp";
import NavBar from "@/components/live/NavBar";
import { formLinks } from "@/data/formLinks";

const sharedUnitStyle = {
  background:
    "bg-citrushack-brown rounded-xl md:rounded-2xl lg:rounded-3xl border-2 border-white w-[12vw] h-[8vh] sm:w-[10vw] sm:h-[10vh] md:w-[8vw] md:h-[10vh] lg:w-[6vw] lg:h-[10vh] shadow-md shadow-white ",
};

const Landing = () => {
  return (
    <>
      <NavBar />
      <Image
        src={mlhBadge}
        alt="MLH Badge"
        className="absolute right-8 top-0 z-50 w-[12vw] sm:right-12 md:right-16"
      />

      <div className="relative mt-28 flex w-full flex-col items-center justify-between text-white md:mt-32 md:flex-row">
        <div className="hidden md:absolute md:flex">
          <Image
            src={folderCoffeeNewspaper}
            alt="Folder Coffee Newspaper"
            className="-z-10 w-[45vw] xl:w-[40vw] xl:translate-y-1/4"
          />
        </div>

        <div className="ml-auto flex w-full flex-col items-center md:mr-12 md:mt-20 md:w-1/2 lg:mr-16 lg:mt-32 xl:mr-60">
          <div className="flex justify-center gap-7">
            <Image
              src={citrusHackLogo}
              alt="Citrus Hack 2026 Logo"
              className="h-auto w-[22vw] translate-y-2 object-contain sm:w-[20vw] md:w-[15vw] lg:w-[10vw]"
            />
            <div className="mt-7">
              <p className="mb-5 text-xl sm:text-2xl xl:text-3xl">
                ACM PRESENTS...
                <br />
              </p>
              <p className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl">
                CITRUS HACK
              </p>
            </div>
          </div>

          <p className="mt-4 text-xl sm:text-2xl xl:text-4xl">
            APRIL 18-19, 2026 • UC RIVERSIDE
          </p>

          <div className="mt-4 md:mt-6">
            <Countdown
              classNames={{
                days: sharedUnitStyle,
                hours: sharedUnitStyle,
                minutes: sharedUnitStyle,
                seconds: sharedUnitStyle,
              }}
            />
          </div>

          <div className="mt-12 flex flex-col items-center md:mt-16 lg:mt-24">
            <Image
              src={apply}
              alt="Apply Sticky"
              className="w-[30vw] md:w-[15vw]"
            />

            <div className="relative hidden flex-wrap items-center justify-center gap-x-4 gap-y-4 md:flex">
              {formLinks.map((fl, i) => (
                <Link
                  href={fl.link}
                  key={i}
                  className="rounded-full border-2 border-white bg-citrushack-brown p-4 text-center font-bold shadow-lg shadow-white hover:scale-105 md:text-xl lg:w-[14vw] lg:text-2xl xl:w-[12vw]"
                >
                  {fl.title}
                </Link>
              ))}
            </div>

            <div className="relative z-10 grid w-full grid-cols-2 gap-x-16 gap-y-5 px-6 md:hidden md:gap-4 md:gap-x-10">
              {formLinks.map((fl, i) => (
                <Link
                  href={fl.link}
                  key={i}
                  className={`sm:text-md rounded-full border-2 border-white bg-citrushack-brown p-4 text-center text-sm font-bold shadow-lg shadow-white hover:scale-105 md:text-lg ${
                    i === formLinks.length - 1 ? "col-span-2 mx-auto w-2/3" : ""
                  }`}
                >
                  {fl.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-12 md:flex-row xl:mt-44 md:mt-20">
        <Image
          src={aboutUs}
          alt="About Us"
          className="mt-10 md:translate-x-10 xl:ml-40"
        />

        <Image
          src={detectiveItems}
          alt="Detective Items"
          className="hidden md:block lg:-translate-y-20 xl:-translate-y-36"
        />
      </div>

      <Image
        src={folderNewspaperMobile}
        alt="Folder Newspaper Mobile"
        className="mt-16 w-full md:hidden"
      />
      <Image
        src={madeWithLove}
        alt="Made with Love"
        className="mx-auto w-1/2 md:w-1/3"
      />
    </>
  );
};

export default Landing;
