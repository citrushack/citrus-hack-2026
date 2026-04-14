"use client";

import Image from "next/image";
import industryProfesionalsHeader from "@/public/judges/industryProfesionals.svg";
import { judges } from "@/data/judges";

const Judges = () => {
  return (
    <div className="pt-32">
      <div className="flex min-h-screen flex-col items-center bg-gradient-to-r from-[#1C1C1C] via-[#747474] to-[#1C1C1C]">
        <div className="flex h-[6vh] w-full items-center justify-center bg-citrushack-charcoal sm:h-[4vh] md:h-[5vh] lg:h-[8vh] 2xl:h-[10vh]">
          <div className="relative z-10 w-[60vw] -translate-y-[3vh] sm:w-[40vw] sm:-translate-y-[4vh] md:w-[25vw] md:-translate-y-[5vh] lg:w-[18vw] lg:-translate-y-[6vh] 2xl:-translate-y-20">
            <Image
              src={industryProfesionalsHeader}
              alt="Industry Professionals"
              className="h-auto w-full"
              priority
            />
          </div>
        </div>

        <div className="mx-[4vw] my-[6vh] border-[0.3vw] border-citrushack-red p-[4vw] md:p-[2vw]">
          <div className="grid grid-cols-2 justify-items-center gap-x-[3vw] gap-y-[2vh] md:grid-cols-4 lg:gap-x-[5vw] lg:gap-y-[3vh]">
            {judges.map((judge) => (
              <div
                key={judge.name}
                className="relative flex w-[42vw] flex-col items-start pb-[4vh] pt-[3vh] sm:w-[38vw] md:w-[20vw] lg:w-[18vw] 2xl:w-[15vw]"
              >
                <div className="relative z-10 -mb-0.5 ml-[1vw] self-start border-[0.15vw] border-citrushack-red bg-citrushack-maroon px-[2vw] py-[0.5vh] md:px-[1vw]">
                  <span className="whitespace-nowrap text-[2.5vw] font-bold text-white sm:text-[2vw] md:text-[1.2vw] lg:text-[1vw] 2xl:text-[0.8vw]">
                    {judge.name}
                  </span>
                </div>

                <div className="relative h-auto w-full self-center border-[0.15vw] border-citrushack-red bg-citrushack-maroon after:absolute after:-bottom-[1.5vh] after:left-1/2 after:h-[1.5vh] after:w-0 after:-translate-x-1/2 after:border-l-[0.15vw] after:border-citrushack-red after:content-['']">
                  <Image
                    src={judge.image}
                    alt={judge.name}
                    className="h-auto w-full object-cover"
                  />
                </div>

                <div className="relative mt-[1.5vh] w-full self-center border-[0.15vw] border-citrushack-red bg-citrushack-maroon px-[1.5vw] py-[1vh] text-center md:px-[1vw]">
                  <span className="block whitespace-normal text-[2vw] font-semibold text-white sm:text-[1.5vw] md:text-[0.9vw] lg:text-[0.8vw] 2xl:text-[0.6vw]">
                    {judge.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Judges;
