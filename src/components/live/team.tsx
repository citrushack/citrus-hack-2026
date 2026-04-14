import Image from "next/image";
import Teams from "@/public/team/team.webp";
import lead1 from "@/public/team/lead1.png";

const Team = () => {
  return (
    <div className="mb-20 flex w-full flex-col items-center justify-center">
      <Image src={Teams} alt="team title" className="w-[30vw] md:w-[15vw]" />

      <div className="grid w-3/4 grid-cols-4 gap-3">
        <Image src={lead1} alt="lead1" />
        <Image src={lead1} alt="lead1" />
        <Image src={lead1} alt="lead1" />
        <Image src={lead1} alt="lead1" />
        <Image src={lead1} alt="lead1" />
        <Image src={lead1} alt="lead1" />
        <Image src={lead1} alt="lead1" />
        <Image src={lead1} alt="lead1" />
        <Image src={lead1} alt="lead1" />
        <Image src={lead1} alt="lead1" />
        <Image src={lead1} alt="lead1" />
        <Image src={lead1} alt="lead1" />
      </div>
      <div className="mt-3 grid w-[58%] grid-cols-3 gap-3">
        <Image src={lead1} alt="lead1" />
        <Image src={lead1} alt="lead1" />
        <Image src={lead1} alt="lead1" />
      </div>
    </div>
  );
};

export default Team;
