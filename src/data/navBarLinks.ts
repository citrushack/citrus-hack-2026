import { Instagram, Linkedin, Mail } from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import citrusHackLogo from "@/public/landing/citrusHack2026Logo.webp";

export const navBarLogo = {
  name: "HOME",
  link: "#home",
  icon: citrusHackLogo,
};

export const navBarTextLinks = [
  { name: "About", link: "#about" },
  { name: "Tracks", link: "#tracks" },
  { name: "Schedule", link: "#schedule" },
  { name: "Sponsors", link: "#sponsors" },
  { name: "Industry", link: "#industry" },
  { name: "FAQ", link: "#faq" },
];

export const navBarIcons = [
  {
    name: "INSTAGRAM",
    link: "https://www.instagram.com/citrushack_ucr/",
    icon: Instagram,
  },
  {
    name: "DISCORD",
    link: "https://discord.gg/Pgqf8j7fF4",
    icon: FaDiscord,
  },
  {
    name: "LINKEDIN",
    link: "https://www.linkedin.com/company/citrushack",
    icon: Linkedin,
  },
  {
    name: "EMAIL",
    link: "mailto:citrushack@gmail.com",
    icon: Mail,
  },
];
