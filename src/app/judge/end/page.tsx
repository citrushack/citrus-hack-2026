import React from "react";
import Image from "next/image";
import image1 from "@/public/engineering/hackathon/judgeAssets3.webp";
import image2 from "@/public/engineering/hackathon/judgeAssets4.webp";

const Page = () => {
  return (
    <div className="from-hackathon-primary to-hackathon-primary/70 flex w-full flex-col items-center justify-between bg-gradient-to-t">
      <Image src={image1} className="w-full md:w-1/3" alt=""></Image>
      <p className="font-poppins text-center text-4xl font-semibold text-white">
        THANK YOU FOR JUDGING!
      </p>
      <Image src={image2} className="w-full md:w-1/3" alt=""></Image>
    </div>
  );
};

export default Page;
