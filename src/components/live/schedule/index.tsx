import { api } from "@/utils/api";
import Events from "./events";

import Image from "next/image";
import scheduleImage from "@/public/landing/schedule.webp";

const Schedule = async () => {
  const { items } = await api({
    url: `https://www.googleapis.com/calendar/v3/calendars/${process.env.NEXT_PUBLIC_GOOGLE_CALENDAR}/events?key=${process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY}&singleEvents=true&orderBy=startTime`,
    method: "GET",
  });

  const totalDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <>
      <Image
        src={scheduleImage}
        alt="Schedule"
        className="mx-auto mb-6 mt-12 w-[30vw] md:mt-16 md:w-[15vw] lg:mt-24"
      />
      <Events events={items} totalDays={totalDays} />
    </>
  );
};

export default Schedule;
