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
    name: "LINKEDIN",
    link: "https://www.linkedin.com/company/citrushack/posts/?feedView=all",
    icon: Linkedin,
  },
  {
    name: "DISCORD",
    link: "https://discord.gg/FJhpdFG4",
    icon: FaDiscord,
  },
  {
    name: "EMAIL",
    link: "mailto:citrushack@gmail.com",
    icon: Mail,
  },
];
