import Countdown from "../ui/countdown";
import Image from "next/image";
import citrusHackLogo from "@/public/landing/citrusHack2026Logo.webp";
import countdownBG from "@/public/landing/countdownBG.webp";
import coffee from "@/public/landing/Coffee.png";
import folder from "@/public/landing/Folder.png";
import newsletter from "@/public/landing/Newsletter.png";
import about from "@/public/landing/About.png";

const Landing = () => {
  return (
    <div className="flex w-full flex-col items-center gap-10 pt-20 text-white lg:flex-row-reverse lg:items-start lg:justify-between">
      <div className="flex w-full flex-col items-center lg:relative lg:-left-40 lg:items-end">
        <div className="flex flex-wrap items-center justify-center gap-7 lg:justify-end">
          <Image src={citrusHackLogo} alt="Citrus Hack 2026 Logo" />
          <div className="mt-4 text-center lg:text-right">
            <p className="mb-5 text-3xl">
              ACM PRESENTS...
              <br />
            </p>
            <p className="text-6xl">CITRUS HACK</p>
          </div>
        </div>
        <p className="mt-4 text-center text-4xl lg:text-right">
          APRIL 18-19, 2026 • UC RIVERSIDE
        </p>

        <div className="relative mt-6 flex h-[250px] w-full max-w-[700px] items-center justify-center lg:translate-x-12">
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

      <div>
        <Image
          src={about}
          alt="About background"
          className="absolute bottom-40 right-40"
          priority
        />
      </div>

      <div className="relative h-[560px] w-full max-w-[560px] self-center lg:self-auto">
        <Image
          src={newsletter}
          alt="Newsletter clipping"
          className="absolute top-[38vh]"
          priority
        />
        <Image
          src={folder}
          alt="Folder background"
          className="absolute left-16 scale-125"
          priority
        />
        <Image
          src={coffee}
          alt="Coffee cup"
          className="absolute left-[6.5vw] top-[46vh] scale-110"
          priority
        />
      </div>
    </div>
  );
};

export default Landing;
