"use client";
import { FC, useEffect, useState } from "react";

export const Time: FC = () => {
  const [time, setTime] = useState<string>(
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "America/Montreal",
      timeZoneName: "short",
    }),
  );

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "America/Montreal",
          timeZoneName: "short",
        }),
      );
    };

    setInterval(updateTime, 15000); // runs every 15 seconds to update the minute
  }, []);

  return <div>{time}</div>;
};
