"use client";
import { GoogleEvent } from "@/types/calendar";
import { useState } from "react";

interface props {
  events: GoogleEvent[];
  totalDays: string[];
}

const Events = ({ events, totalDays }: props) => {
  const [selectedDay, setSelectedDay] = useState(
    events.length > 0 && new Date() > new Date(events[0].start.dateTime)
      ? new Date().toLocaleString("en-US", {
          timeZone: "America/Los_Angeles",
          weekday: "long",
        })
      : "Monday",
  );

  const filteredEvents = events.filter(
    ({ start }) =>
      new Date(start.dateTime).toLocaleString("en-US", {
        timeZone: "America/Los_Angeles",
        weekday: "long",
      }) === selectedDay,
  );

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="grid w-10/12 grid-cols-7 items-center justify-between gap-2 text-base">
        {totalDays.map((day) => (
          <button
            key={day}
            className={`flex justify-center rounded-xl border-2 p-2 text-white ${
              selectedDay === day ? "bg-gray-300" : "bg-citrushack-brown"
            }`}
            onClick={() => setSelectedDay(day)}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="w-10/12 rounded-2xl border-2 border-white bg-citrushack-brown px-2 pb-4">
        <div className="grid w-full grid-cols-4 px-4 py-3 text-base font-semibold text-white">
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
                  className="grid w-full grid-cols-4 items-center justify-center border-b border-white px-4 py-3 text-lg text-white"
                >
                  <p>
                    {new Date(start.dateTime).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      timeZone: "America/Los_Angeles",
                    })}
                  </p>
                  <p className="flex w-full justify-center">{summary}</p>
                  <p className="flex justify-center">{location ?? ""}</p>
                  <p className="flex justify-center">
                    {(description ?? "").split("\n")[0].slice(0)}
                  </p>
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
