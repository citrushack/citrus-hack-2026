import Image from "next/image";

import tracks from "@/public/tracks/tracks.webp";
import track1 from "@/public/tracks/track1.webp";
import track2 from "@/public/tracks/track2.webp";
import track3 from "@/public/tracks/track3.webp";
import track4 from "@/public/tracks/track4.webp";
import track5 from "@/public/tracks/track5.webp";
import track6 from "@/public/tracks/track6.webp";
import track7 from "@/public/tracks/track7.webp";
import track8 from "@/public/tracks/track8.webp";
import track9 from "@/public/tracks/track9.webp";
import track10 from "@/public/tracks/track10.webp";
import track11 from "@/public/tracks/track11.webp";
import track12 from "@/public/tracks/track12.webp";
import track13 from "@/public/tracks/track13.webp";
import track14 from "@/public/tracks/track14.webp";
import track15 from "@/public/tracks/track15.webp";

const Tracks = () => {
  const trackImages = [
    track1,
    track2,
    track3,
    track4,
    track5,
    track6,
    track7,
    track8,
    track9,
    track10,
    track11,
    track12,
    track14,
    track13,
    track15,
  ];

  const trackImagesMobile = [
    track2,
    track1,
    track3,
    track4,
    track5,
    track6,
    track7,
    track8,
    track9,
    track10,
    track11,
    track12,
    track14,
    track13,
    track15,
  ];

  return (
    <div className="flex w-full flex-col items-center justify-center py-10">
      <div className="lg:mb-20">
        <Image
          src={tracks}
          alt="tracks title"
          className="w-[30vw] md:w-[15vw]"
        />
      </div>

      <div className="mt-10 hidden w-full max-w-4xl items-start gap-x-4 gap-y-2 px-4 lg:grid lg:grid-cols-3">
        {trackImages.map((src, index) => {
          if (!src) return <div key={index} className="hidden lg:block" />;

          const isCenterColumn = index % 3 === 1;

          return (
            <div
              key={index}
              className={` ${`mx-auto ${isCenterColumn ? "translate-y-0 lg:-translate-y-24" : ""}`}`}
            >
              <Image
                src={src}
                alt={`Track ${index + 1}`}
                width={280}
                height={180}
                className="duration-200 hover:scale-105"
              />
            </div>
          );
        })}
      </div>

      <div className="mt-10 grid w-full max-w-4xl grid-cols-1 items-start gap-x-4 gap-y-2 px-4 md:grid-cols-2 lg:hidden">
        {trackImagesMobile.map((src, index) => {
          if (!src) return <div key={index} className="hidden lg:block" />;

          const isCenterColumn = index % 3 === 1;

          return (
            <div
              key={index}
              className={` ${`mx-auto ${isCenterColumn ? "translate-y-0 lg:-translate-y-24" : ""}`}`}
            >
              <Image
                src={src}
                alt={`Track ${index + 1}`}
                width={280}
                height={180}
                className="duration-200 hover:scale-105"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tracks;
