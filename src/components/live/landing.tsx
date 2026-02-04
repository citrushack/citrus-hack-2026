import Countdown from "../ui/countdown";
import Image from "next/image";
import citrusHackLogo from "@/public/landing/citrusHack2026Logo.webp";
import countdownBG from "@/public/landing/countdownBG.webp";
import coffee from "@/public/landing/Coffee.webp";
import folder from "@/public/landing/Folder.webp";
import newsletter from "@/public/landing/Newsletter.webp";
import about from "@/public/landing/About.webp";
import apply from "@/public/landing/webp Note.webp";
import items from "@/public/landing/items.webp";
import Link from "next/link";

type FormLink = {
  title: string;
  link: string;
};

const FORM_LINKS: FormLink[] = [
  {
    title: "Hack",
    link: "/apply/participant",
  },
  {
    title: "Sponsor",
    link: "/apply/sponsor",
  },
  {
    title: "Judge",
    link: "/apply/panel",
  },
  {
    title: "Volunteer",
    link: "/apply/volunteer",
  },
  {
    title: "Mentor",
    link: "/apply/mentor",
  },
];

const Landing = () => {
  return (
    <div className="flex w-full flex-col items-center gap-10 pt-20 text-white lg:flex-row-reverse lg:items-start lg:justify-between">
      <div className="flex w-full flex-col items-center lg:-translate-x-1/4 lg:items-end">
        <div className="-translate-x-24">
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
          <Image src={about} alt="About background" priority />
        </div>
        <div className="translate-x-[40%]">
          <Image src={items} alt="Items" priority />
        </div>
      </div>

      <div className="relative flex h-[1600px] w-full max-w-[1000px] flex-col self-center lg:self-auto">
        <div className="h-[1400px]">
          <Image
            src={newsletter}
            alt="Newsletter clipping"
            className="absolute top-[52vh]"
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
            className="absolute left-[6.5vw] top-[62vh] scale-110"
            priority
          />
        </div>
        <div className="relative left-1/4 flex flex-col items-center">
          <Image src={apply} alt="Apply Sticky" priority />
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-4">
            {FORM_LINKS.map((fl, i) => (
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
  );
};

export default Landing;
