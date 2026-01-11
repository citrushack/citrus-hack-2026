import Countdown from "../ui/countdown";
import Image from "next/image";
import citrusHackLogo from "@/public/landing/citrusHack2026Logo.webp";
import countdownBG from "@/public/landing/countdownBG.webp";

const Landing = () => {
  return (
    <div className="flex w-full flex-col items-end p-10 text-white">
      <div className="flex gap-7">
        <Image src={citrusHackLogo} alt="Citrus Hack 2026 Logo" />
        <div className="mt-7">
          <p className="mb-5 text-3xl">
            ACM PRESENTS...
            <br />
          </p>
          <p className="text-6xl">CITRUS HACK</p>
        </div>
      </div>
      <p className="mt-4 text-4xl">APRIL 18-19, 2026 • UC RIVERSIDE</p>

      <div className="relative flex h-[250px] w-[700px] translate-x-12 items-center justify-center">
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
    </div>
  );
};

export default Landing;
