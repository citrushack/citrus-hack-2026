type config = {
  name: string;
  short_name: string;
  email: string;
  description: string;
  length: number;
  date: Date;
  end: Date;
  packet: string;
  devpost: string;
  domain: string;
  instagram: string;
  linkedin: string;
  discord: string;
  heart: string;
};

const data: config = {
  name: "CitrusHack 2026",
  short_name: "CitrusHack 2026",
  email: "citrushack@gmail.com",
  description:
    "Citrus Hack is the Association for Computing Machinery’s (ACM) 24 hour hackathon and one of the Inland Empire’s largest hackathons. Hackers can build projects to present to a panel of judges to compete for tracks and prizes! Throughout April 18-19, there will be free food, free swag, workshops, activities, and more.",
  length: 24,
  date: new Date("2026-04-18T13:20:00"),
  end: new Date("2026-04-19T13:20:00"),
  packet: "",
  devpost: "https://devpost.com/",
  domain: "https://www.citrushack.com",
  instagram: "https://www.instagram.com/citrushack_ucr/",
  linkedin: "https://www.linkedin.com/company/citrushack/",
  discord: "https://discord.gg/hKp8qzsX",
  heart: "🤎",
};

export default data;
