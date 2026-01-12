"use client";
import { useState, useEffect } from "react";
import data from "@/data/config";

interface UnitStyle {
  digit?: string;
  background?: string;
}

interface digitProps {
  value: number;
  classNames: UnitStyle;
}

const Digits = ({ value, classNames }: digitProps) => {
  return (
    <div className="flex flex-col items-center gap-4 last:hidden sm:last:flex">
      <div className="m-3 mb-0 flex gap-1 lg:!gap-1">
        {value
          .toString()
          .padStart(2, "0")
          .split("")
          .map((digit, index) => (
            <div
              className={`flex items-center justify-center rounded font-bold ${classNames.digit || ""} mt-10 text-7xl lg:min-w-11`}
              key={index}
            >
              {digit}
            </div>
          ))}
      </div>
    </div>
  );
};

interface countdownProps {
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

const Countdown = ({ classNames }: countdownProps) => {
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
    <div className="flex -translate-y-14 items-center justify-center gap-9 font-bold">
      {Object.entries(countdown).map(([unit, value], index) => {
        const styleSource = classNames[unit as keyof typeof classNames];

        const specificStyle: UnitStyle =
          typeof styleSource === "object"
            ? styleSource
            : { digit: classNames.digit, background: classNames.background };

        return <Digits key={index} value={value} classNames={specificStyle} />;
      })}
    </div>
  );
};

export default Countdown;
