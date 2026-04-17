import Image from "next/image";
import Teams from "@/public/team/team.webp";
import lead1 from "@/public/team/lead1.webp";
import lead2 from "@/public/team/lead2.webp";
import lead3 from "@/public/team/lead3.webp";
import lead4 from "@/public/team/lead4.webp";
import lead5 from "@/public/team/lead5.webp";
import lead6 from "@/public/team/lead6.webp";
import lead7 from "@/public/team/lead7.webp";
import lead8 from "@/public/team/lead8.webp";
import lead9 from "@/public/team/lead9.webp";
import lead10 from "@/public/team/lead10.webp";
import lead11 from "@/public/team/lead11.webp";
import lead12 from "@/public/team/lead12.webp";
import lead13 from "@/public/team/lead13.webp";
import lead14 from "@/public/team/lead14.webp";
import lead15 from "@/public/team/lead15.webp";

const Team = () => {
  return (
    <div className="mb-20 flex w-full flex-col items-center justify-center">
      <Image src={Teams} alt="team title" className="w-[30vw] md:w-[15vw]" />

      <div className="hidden w-3/4 grid-cols-4 gap-3 lg:grid">
        <Image
          src={lead1}
          alt="Headshot of Allison Pham"
          className="duration-200 hover:scale-105"
        />
        <Image
          src={lead2}
          alt="Headshot of Cristian Roberts"
          className="duration-200 hover:scale-105"
        />
        <Image
          src={lead3}
          alt="Headshot of Christopher Zaldivar"
          className="duration-200 hover:scale-105"
        />
        <Image
          src={lead4}
          alt="Headshot of Corven Neal"
          className="duration-200 hover:scale-105"
        />
        <Image
          src={lead5}
          alt="Headshot of Grace Hernandez"
          className="duration-200 hover:scale-105"
        />
        <Image
          src={lead6}
          alt="Headshot of Vishra Thakkar"
          className="duration-200 hover:scale-105"
        />
        <Image
          src={lead7}
          alt="Headshot of Ahad Hassan"
          className="duration-200 hover:scale-105"
        />
        <Image
          src={lead8}
          alt="Headshot of Karina Flores"
          className="duration-200 hover:scale-105"
        />
        <Image
          src={lead9}
          alt="Headshot of Cindy Be"
          className="duration-200 hover:scale-105"
        />
        <Image
          src={lead10}
          alt="Headshot of Gaby Newgen"
          className="duration-200 hover:scale-105"
        />
        <Image
          src={lead11}
          alt="Headshot of Charlette O'Connor"
          className="duration-200 hover:scale-105"
        />
        <Image
          src={lead12}
          alt="Headshot of Ray Wong"
          className="duration-200 hover:scale-105"
        />
      </div>
      <div className="mt-3 hidden w-[58%] grid-cols-3 gap-3 lg:grid">
        <Image
          src={lead13}
          alt="Headshot of Taaha Sayed"
          className="duration-200 hover:scale-105"
        />
        <Image
          src={lead14}
          alt="Headshot of Wesley Wu"
          className="duration-200 hover:scale-105"
        />
        <Image
          src={lead15}
          alt="Headshot of Yubin Zhen"
          className="duration-200 hover:scale-105"
        />
      </div>

      <div className="grid w-1/2 grid-cols-1 gap-3 md:w-3/4 md:grid-cols-2 lg:hidden">
        <Image
          src={lead1}
          alt="Headshot of Allison Pham"
          className="duration-200 hover:scale-105"
        />
        <Image
          src={lead2}
          alt="Headshot of Cristian Roberts"
          className="duration-200 hover:scale-105"
        />
        <Image
          src={lead3}
          alt="Headshot of Christopher Zaldivar"
          className="duration-200 hover:scale-105"
        />
        <Image
          src={lead4}
          alt="Headshot of Corven Neal"
          className="duration-200 hover:scale-105"
        />
        <Image
          src={lead5}
          alt="Headshot of Grace Hernandez"
          className="duration-200 hover:scale-105"
        />
        <Image
          src={lead6}
          alt="Headshot of Vishra Thakkar"
          className="duration-200 hover:scale-105"
        />
        <Image
          src={lead7}
          alt="Headshot of Ahad Hassan"
          className="duration-200 hover:scale-105"
        />
        <Image
          src={lead8}
          alt="Headshot of Karina Flores"
          className="duration-200 hover:scale-105"
        />
        <Image
          src={lead9}
          alt="Headshot of Cindy Be"
          className="duration-200 hover:scale-105"
        />
        <Image
          src={lead10}
          alt="Headshot of Gaby Newgen"
          className="duration-200 hover:scale-105"
        />
        <Image
          src={lead11}
          alt="Headshot of Charlette O'Connor"
          className="duration-200 hover:scale-105"
        />
        <Image
          src={lead12}
          alt="Headshot of Ray Wong"
          className="duration-200 hover:scale-105"
        />
        <Image
          src={lead13}
          alt="Headshot of Taaha Sayed"
          className="duration-200 hover:scale-105"
        />
        <Image
          src={lead14}
          alt="Headshot of Wesley Wu"
          className="duration-200 hover:scale-105"
        />
        <Image
          src={lead15}
          alt="Headshot of Yubin Zhen"
          className="duration-200 hover:scale-105"
        />
      </div>
    </div>
  );
};

export default Team;
