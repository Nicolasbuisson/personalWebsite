"use client";
import styles from "./slidingText.module.css";
import { useRef } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

export const SlidingText = () => {
  const textSliderRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious();
    const diff = current - (previous ?? 0);

    // Positive difference means scrolling down, negative means up
    if (diff > 0) {
      if (
        getComputedStyle(textSliderRef.current!).getPropertyValue(
          "--reverse-animation-play-state",
        ) === "paused"
      ) {
        // only change if reverse animation is not set yet
        textSliderRef.current?.style.setProperty(
          "--reverse-animation-play-state",
          "running",
        );
      }
    } else if (diff < 0) {
      if (
        getComputedStyle(textSliderRef.current!).getPropertyValue(
          "--reverse-animation-play-state",
        ) === "running"
      ) {
        // only change if reverse animation is not set yet
        textSliderRef.current?.style.setProperty(
          "--reverse-animation-play-state",
          "paused",
        );
      }
    }
  });

  return (
    <div className={styles.textSliderContainer} ref={textSliderRef}>
      <div>
        <p>Nicolas Buisson -&nbsp;</p>
      </div>
      <div>
        <p>Nicolas Buisson -&nbsp;</p>
      </div>
      <div>
        <p>Nicolas Buisson -&nbsp;</p>
      </div>
    </div>
  );
};
