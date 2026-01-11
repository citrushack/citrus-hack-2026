import {
  Apple,
  Phone,
  // Crown,
  School,
  User,
  Cake,
  BookOpen,
  Clock,
  Mail,
  Shirt,
  Calendar,
  MapPin,
} from "lucide-react";

import {
  SiDevpost as Devpost,
  SiGithub as Github,
  SiFigma as Figma,
} from "@icons-pack/react-simple-icons";

export const ICONS: Record<string, JSX.Element> = {
  github: (
    <Github className="hover:text-hackathon-green-300 mr-2 text-lg hover:opacity-75" />
  ),
  devpost: (
    <Devpost className="hover:text-hackathon-green-300 mr-2 text-lg hover:opacity-75" />
  ),
  figma: (
    <Figma className="hover:text-hackathon-green-300 mr-2 text-lg hover:opacity-75" />
  ),
  phone: <Phone className="text-hackathon-primary mr-2" />,
  email: <Mail className="text-hackathon-primary mr-2 text-lg" />,
  shirt: <Shirt className="text-hackathon-primary mr-2 text-lg" />,
  diet: <Apple className="text-hackathon-primary mr-2" />,
  age: <Cake className="text-hackathon-primary mr-2 text-lg" />,
  gender: <User className="text-hackathon-primary mr-2 text-lg" />,
  grade: <School className="text-hackathon-primary mr-2 text-lg" />,
  major: <BookOpen className="text-hackathon-primary mr-2 text-lg" />,
  school: <School className="text-hackathon-primary mr-2 text-lg" />,
  country: <MapPin className="text-hackathon-primary mr-2 text-lg" />,
  eventSource: <Calendar className="text-hackathon-primary mr-2 text-lg" />,
  priorHackathons: <Clock className="text-hackathon-primary mr-2 text-lg" />,
};
