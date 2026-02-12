import { Instagram, Linkedin, Mail } from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import citrusHackLogo from "@/public/landing/citrusHack2026Logo.webp";

export const navBarLinks = [
  {
    name: "HOME",
    link: "/",
    icon: citrusHackLogo,
    isImage: true,
  },
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
