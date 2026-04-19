"use client";
import { GoogleEvent } from "@/types/calendar";
import { useState } from "react";

interface props {
  events: GoogleEvent[];
  totalDays: string[];
}

const DAY_SHORT: Record<string, string> = {
  Monday: "M",
  Tuesday: "T",
  Wednesday: "W",
  Thursday: "Th",
  Friday: "F",
  Saturday: "Sa",
  Sunday: "Su",
};

const getStartAndEndOfWeek = (date: Date) => {
  const start = new Date(date);
  const day = start.getDay();
  const diff = start.getDate() - day + (day === 0 ? -6 : 1);
  start.setDate(diff);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);

  return { start, end };
};

const Events = ({ events, totalDays }: props) => {
  const [selectedDay, setSelectedDay] = useState(
    events.length > 0 && new Date() > new Date(events[0].start.dateTime)
      ? new Date().toLocaleString("en-US", {
          timeZone: "America/Los_Angeles",
          weekday: "long",
        })
      : "Monday",
  );

  const { start: weekStart, end: weekEnd } = getStartAndEndOfWeek(new Date());

  const filteredEvents = events.filter(({ start }) => {
    const eventDate = new Date(start.dateTime);
    const eventDay = eventDate.toLocaleString("en-US", {
      timeZone: "America/Los_Angeles",
      weekday: "long",
    });

    return (
      eventDay === selectedDay && eventDate >= weekStart && eventDate <= weekEnd
    );
  });

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="grid w-11/12 grid-cols-7 items-center justify-between gap-1 text-base md:w-10/12 md:gap-2">
        {totalDays.map((day) => (
          <button
            key={day}
            className={`flex justify-center rounded-xl border-2 py-2 text-white ${
              selectedDay === day
                ? "bg-gray-300 text-black"
                : "bg-citrushack-brown"
            }`}
            onClick={() => setSelectedDay(day)}
          >
            <span className="block md:hidden">{DAY_SHORT[day]}</span>
            <span className="hidden md:block">{day}</span>
          </button>
        ))}
      </div>

      <div className="w-11/12 rounded-2xl border-2 border-white bg-citrushack-brown px-2 pb-4 md:w-10/12">
        <div className="hidden w-full grid-cols-4 px-4 py-3 text-base font-semibold text-white sm:grid">
          <p>Time</p>
          <p className="flex justify-center">Event</p>
          <p className="flex justify-center">Location</p>
          <p className="flex justify-center">About</p>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="flex flex-row justify-center p-10 text-lg font-semibold text-white">
            No Events Available
          </div>
        ) : (
          <>
            {filteredEvents.map(
              ({ start, summary, location, description }, index) => (
                <div
                  key={index}
                  className="border-b border-white px-4 py-3 text-white last:border-b-0"
                >
                  <div className="flex flex-col justify-center gap-1 text-center md:hidden">
                    <p className="text-base font-semibold">
                      {new Date(start.dateTime).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        timeZone: "America/Los_Angeles",
                      })}
                    </p>
                    <p className="text-lg font-semibold">{summary}</p>
                    {location && (
                      <p className="text-sm text-white/70">{location}</p>
                    )}
                    {description && (
                      <p className="text-sm text-white/70">
                        {description.split("\n")[0].slice(0)}
                      </p>
                    )}
                  </div>

                  <div className="hidden w-full grid-cols-4 items-center justify-center text-lg md:grid">
                    <p>
                      {new Date(start.dateTime).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        timeZone: "America/Los_Angeles",
                      })}
                    </p>
                    <p className="flex w-full justify-center text-center">
                      {summary}
                    </p>
                    <p className="flex justify-center text-center">
                      {location ?? ""}
                    </p>
                    <p className="flex justify-center text-center">
                      {description?.split("\n")[0].slice(0) ?? ""}
                    </p>
                  </div>
                </div>
              ),
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Events;
