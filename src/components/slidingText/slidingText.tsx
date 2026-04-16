"use client";
import styles from "./slidingText.module.css";
import { useLayoutEffect, useRef } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

export const SlidingText = () => {
  const textSliderRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const ANIMATION_DURATION = 10000; // 10 seconds

  const animation = [
    { transform: "translateX(0%)" },
    { transform: "translateX(-100%)" },
  ];

  const animationTiming = {
    duration: ANIMATION_DURATION,
    iterations: Infinity,
  };

  const containerAnimations: Animation[] = [];

  useLayoutEffect(() => {
    const pContainers = textSliderRef.current?.querySelectorAll(
      ".text-slider-p-container",
    );
    pContainers?.forEach((p) => {
      // add animation to paragraph container
      const containerAnimation = p.animate(animation, {
        direction: "reverse",
        playbackRate: 1,
        duration: ANIMATION_DURATION / 2,
        iterations: Infinity,
        //easing:
      });
      containerAnimations.push(containerAnimation);
      // add animation to paragraph
      p.querySelector("p")?.animate(animation, animationTiming);
    });

    //console.log(textSliderRef.current?.querySelectorAll(".text-slider-p"));
  }, []);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious();
    const diff = current - (previous ?? 0);

    // Positive difference means scrolling down, negative means up
    if (diff > 0) {
      if (containerAnimations[0].playbackRate === 0) {
        containerAnimations.forEach((anim) => anim.updatePlaybackRate(1));
      }
    } else if (diff < 0) {
      if (containerAnimations[0].playbackRate === 1) {
        containerAnimations.forEach((anim) => anim.updatePlaybackRate(0));
      }
    }
  });

  return (
    <div className={styles.textSliderContainer} ref={textSliderRef}>
      <div className="text-slider-p-container">
        <p>Nicolas Buisson -&nbsp;</p>
      </div>
      <div className="text-slider-p-container">
        <p>Nicolas Buisson -&nbsp;</p>
      </div>
      <div className="text-slider-p-container">
        <p>Nicolas Buisson -&nbsp;</p>
      </div>
    </div>
  );
};
