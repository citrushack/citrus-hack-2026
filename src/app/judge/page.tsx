"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "@/utils/auth/auth-client";
import Link from "next/link";
import Image from "next/image";
import image1 from "@/public/engineering/hackathon/judgeAssets1.webp";
import image2 from "@/public/engineering/hackathon/judgeAssets2.webp";
const Page = () => {
  const { data: session } = useSession();

  const name = session?.user?.firstName;

  return (
    <div className="from-hackathon-primary to-hackathon-primary/70 flex w-full flex-col items-center justify-between bg-gradient-to-t">
      <Image src={image1} className="w-full md:w-1/3" alt="" />
      <div className="flex flex-col items-center justify-center">
        <p className="font-poppins mb-2 text-4xl font-bold text-white">
          Judging Portal
        </p>
        <p className="font-poppins text-2xl text-white">Welcome {name}</p>

        <div className="mt-10 flex flex-col gap-2 md:flex-row">
          <Button className="text-md from-hackathon-tags-green-bg to-hackathon-green-300 bg-gradient-to-r text-black">
            <Link href="/judge/register">Register</Link>
          </Button>

          <Button className="text-md from-hackathon-tags-green-bg to-hackathon-green-300 bg-gradient-to-r text-black">
            <Link href="/judge/structure">View Structure</Link>
          </Button>

          <Button className="text-md from-hackathon-tags-green-bg to-hackathon-green-300 bg-gradient-to-r text-black">
            <Link href="/judge/start">Get Started</Link>
          </Button>
        </div>
      </div>

      <Image src={image2} className="w-full md:w-1/3" alt="" />
    </div>
  );
};

export default Page;
