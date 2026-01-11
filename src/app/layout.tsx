/* eslint-disable new-cap */
import "./globals.css";
import {
  Allerta_Stencil as AllertaStencil,
  Indie_Flower as IndieFlower,
} from "next/font/google";

const allertaStencil = AllertaStencil({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-allerta-stencil",
});

const indieFlower = IndieFlower({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-indie-flower",
});

type Props = {
  children: React.ReactNode;
};

export const metadata = {
  title: "CitrusHack 2026",
  description: "CitrusHack is a 24 hour hackathon hosted by ACM at UCR.",
};

const RootLayout = async ({ children }: Props) => {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${allertaStencil.variable} ${indieFlower.variable} flex h-full flex-col lg:flex-row`}
      >
        <div className="flex h-full w-full font-allerta-stencil">
          {children}
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
