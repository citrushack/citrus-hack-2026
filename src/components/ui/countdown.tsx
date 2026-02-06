"use client";

import { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import data from "@/data/config";

import daysIcon from "@/public/landing/days.webp";
import hoursIcon from "@/public/landing/hours.webp";
import minutesIcon from "@/public/landing/minutes.webp";
import secondsIcon from "@/public/landing/seconds.webp";

interface UnitStyle {
  digit?: string;
  background?: string;
}

interface DigitProps {
  value: number;
  classNames: UnitStyle;
  icon?: StaticImageData;
}

const Digits = ({ value, classNames, icon }: DigitProps) => {
  return (
    <div className="flex flex-col items-center gap-5">
      <div
        className={`m-4 mb-0 flex items-center justify-center gap-2 ${classNames.background || ""}`}
      >
        {value
          .toString()
          .padStart(2, "0")
          .split("")
          .map((digit, index) => (
            <div
              key={index}
              className="mt-8 flex -translate-y-4 items-center justify-center font-allerta-stencil text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl"
            >
              {digit}
            </div>
          ))}
      </div>

      {icon && (
        <Image src={icon} alt="unit icon" className="w-20 md:w-24 lg:w-32" />
      )}
    </div>
  );
};

interface CountdownProps {
  classNames: {
    days?: UnitStyle;
    hours?: UnitStyle;
    minutes?: UnitStyle;
    seconds?: UnitStyle;
    digit?: string;
    background?: string;
    unit?: string;
  };
}

const unitIcons: Record<string, StaticImageData> = {
  days: daysIcon,
  hours: hoursIcon,
  minutes: minutesIcon,
  seconds: secondsIcon,
};

const Countdown = ({ classNames }: CountdownProps) => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!data?.end) return;

    const interval = setInterval(() => {
      const timeLeft = data.end.getTime() - new Date().getTime();

      if (timeLeft <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setCountdown({
          days: Math.floor(timeLeft / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((timeLeft % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex scale-110 items-center justify-center gap-2 font-bold">
      {Object.entries(countdown).map(([unit, value], index) => {
        const styleSource = classNames[unit as keyof typeof classNames];

        const specificStyle: UnitStyle =
          typeof styleSource === "object"
            ? styleSource
            : { digit: classNames.digit, background: classNames.background };

        return (
          <Digits
            key={index}
            value={value}
            classNames={specificStyle}
            icon={unitIcons[unit]}
          />
        );
      })}
    </div>
  );
};

export default Countdown;
