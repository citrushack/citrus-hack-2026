import Countdown from "../ui/countdown";
import Image from "next/image";
import citrusHackLogo from "@/public/landing/citrusHack2026Logo.webp";
import countdownBG from "@/public/landing/countdownBG.webp";
import items from "@/public/landing/items.webp";

const Landing = () => {
  return (
    <div className="flex w-full flex-col items-end p-10 text-white">
      <div className="flex gap-7">
        <Image
          src={citrusHackLogo}
          alt="Citrus Hack 2026 Logo"
          className="h-auto w-24 sm:w-32 md:w-40 lg:w-48"
        />
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

      <div className="relative flex h-[160px] w-[360px] translate-x-0 items-center justify-center sm:h-[200px] sm:w-[480px] md:h-[250px] md:w-[700px] md:translate-x-12">
        <Image
          src={countdownBG}
          alt="Countdown Background"
          fill
          className="-z-10 object-contain"
          priority
        />
        <Countdown
          classNames={{
            days: {
              digit:
                "font-croissant-one text-citrushack-blueGray [-webkit-text-stroke:1px_#3A4366]",
            },
            hours: {
              digit:
                "font-eagle-lake text-white [-webkit-text-stroke:1px_#A3A3A3]",
            },
            minutes: {
              digit:
                "font-denk-one text-white [-webkit-text-stroke:1px_#A3A3A3]",
            },
            seconds: {
              digit:
                "font-dhurjati text-citrushack-beige [-webkit-text-stroke:1px_#A3A3A3]",
            },
          }}
        />
      </div>
      <Image
        src={items}
        alt="Detective Items"
        className="fixed bottom-0 right-0 w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px]"
      />
    </div>
  );
};

export default Landing;
