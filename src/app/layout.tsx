/* eslint-disable new-cap */
import "./globals.css";
import {
  Allerta_Stencil as AllertaStencil,
  Indie_Flower as IndieFlower,
  Croissant_One as CroissantOne,
  Eagle_Lake as EagleLake,
  Denk_One as DenkOne,
  Dhurjati,
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

const croissantOne = CroissantOne({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-croissant-one",
});

const eagleLake = EagleLake({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-eagle-lake",
});

const denkOne = DenkOne({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-denk-one",
});

const dhurjati = Dhurjati({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dhurjati",
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
    <html
      lang="en"
      className="h-full"
      style={{
        background: "linear-gradient(to right, #332E29, #A19483, #332E29)",
      }}
    >
      <body
        className={`${allertaStencil.variable} ${indieFlower.variable} ${croissantOne.variable} ${eagleLake.variable} ${denkOne.variable} ${dhurjati.variable} flex h-full flex-col lg:flex-row`}
      >
        <div className="flex h-full w-full font-allerta-stencil">
          {children}
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
