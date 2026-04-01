"use client";

import Countdown from "../ui/countdown";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import citrusHackLogo from "@/public/landing/citrusHack2026Logo.webp";
import folderCoffeeNewspaper from "@/public/landing/folderCoffeeNewspaper.webp";
import mlhBadge from "@/public/landing/mlhBadge.svg";
import apply from "@/public/landing/apply.webp";
import detectiveItems from "@/public/landing/detectiveItems.webp";
import aboutUs from "@/public/landing/aboutUs.webp";
import folderNewspaperMobile from "@/public/landing/folderNewspaperMobile.webp";
import copyright from "@/public/landing/copyright.webp";
import NavBar from "@/components/live/NavBar";
import { formLinks } from "@/data/formLinks";
import { sponsors } from "@/data/sponsorData";
import sponsorsHeader from "@/public/sponsors/Sponsors.svg";

const sharedUnitStyle = {
  background:
    "bg-citrushack-brown rounded-xl md:rounded-2xl lg:rounded-3xl border-2 border-white w-[12vw] h-[8vh] sm:w-[10vw] sm:h-[10vh] md:w-[8vw] md:h-[10vh] lg:w-[6vw] lg:h-[10vh] shadow-md shadow-white ",
};

const Landing = () => {
  return (
    <>
      <NavBar />
      <Link
        href={new URL("https://www.mlh.com/seasons/2026/events")}
        target="_blank"
      >
        <Image
          src={mlhBadge}
          alt="MLH Badge"
          className="absolute right-8 top-0 z-50 w-[12vw] sm:right-12 md:right-16"
        />
      </Link>

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
              <p className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl">
                CITRUS HACK
              </p>
            </div>
          </div>

          <p className="mt-4 text-xl sm:text-2xl xl:text-4xl">
            April 18-19, 2026 • UC Riverside
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

            <div className="grid grid-cols-6 gap-x-4 gap-y-4 px-4">
              {formLinks.slice(0, 3).map((fl, i) => (
                <Link
                  href={fl.link}
                  key={i}
                  className="w-30 col-span-2 rounded-full border-2 border-white bg-citrushack-brown p-4 text-center text-[12px] font-bold shadow-lg shadow-white hover:scale-105 sm:text-base md:text-xl lg:text-2xl"
                >
                  {fl.title}
                </Link>
              ))}
              <div className="col-span-1 hidden md:block"></div>
              {formLinks.slice(3, 5).map((fl, i) => (
                <Link
                  href={fl.link}
                  key={i + 3}
                  className="col-span-3 mx-auto w-24 rounded-full border-2 border-white bg-citrushack-brown p-4 text-center text-[12px] font-bold shadow-lg shadow-white hover:scale-105 sm:w-28 sm:text-base md:col-span-2 md:w-32 md:text-lg lg:w-36 lg:text-2xl xl:w-40"
                >
                  {fl.title}
                </Link>
              ))}
              <div className="col-span-1 hidden md:block"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-12 md:mt-20 md:flex-row xl:mt-44">
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
        src={sponsorsHeader}
        alt="Sponsor Header"
        className="mx-auto mt-12 w-[30vw] md:mt-16 md:w-[15vw] lg:mt-24"
      />

      <div className="mx-auto my-4 w-full px-4 sm:w-5/6 md:px-6">
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 md:gap-12 lg:gap-24">
          {sponsors.map(
            (
              sponsor: { image: StaticImageData | string; link: string },
              index: number,
            ) => (
              <Link
                key={index}
                href={sponsor.link}
                target="_blank"
                className="duration-400 cursor-pointer transition-transform hover:scale-110"
              >
                <Image
                  src={sponsor.image}
                  alt={`Sponsor ${index + 1}`}
                  className="sm:w-18 lg:w-38 w-16 object-contain md:w-28"
                />
              </Link>
            ),
          )}
        </div>
      </div>

      <Link
        href={
          new URL(
            "https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md",
          )
        }
        target="_blank"
      >
        <Image
          src={copyright}
          alt="Copyright"
          className="mx-auto w-1/2 md:w-1/3 xl:w-1/5"
        />
      </Link>
    </>
  );
};

export default Landing;
