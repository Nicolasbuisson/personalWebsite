"use client";
import styles from "./slidingText.module.css";
import { useLayoutEffect, useRef } from "react";
import {
  useScroll,
  useMotionValueEvent,
  useVelocity,
  useTransform,
} from "framer-motion";

export const SlidingText = () => {
  const textSliderRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  const ANIMATION_DURATION = 10000; // 10 seconds

  const animationTextSlideRight = [
    { transform: "translateX(0%)" },
    { transform: "translateX(-100%)" },
  ];

  const animationTextSlideLeft = [
    { transform: "translateX(0%)" },
    { transform: "translateX(100%)" },
  ];

  const animationTiming = {
    duration: ANIMATION_DURATION,
    iterations: Infinity,
  };

  const containerAnimations: Animation[] = [];
  const paragraphAnimations: Animation[] = [];

  useLayoutEffect(() => {
    const pContainers = textSliderRef.current?.querySelectorAll(
      ".text-slider-p-container",
    );
    pContainers?.forEach((p) => {
      // add animation to paragraph container
      const containerAnimation = p.animate(animationTextSlideLeft, {
        duration: ANIMATION_DURATION,
        iterations: Infinity,
      });
      // initialize playback rate to 2 to get overlapping animations
      // but one runs twice as fast as the other resulting in movement
      containerAnimation.updatePlaybackRate(2);
      containerAnimations.push(containerAnimation);
      // add animation to paragraph
      const paragraphAnimation = p
        .querySelector("p")
        ?.animate(animationTextSlideRight, animationTiming);
      if (paragraphAnimation) paragraphAnimations.push(paragraphAnimation);
    });
  }, []);

  const containerPlaybackRate = useTransform(scrollVelocity, [0, 1000], [2, 4]);
  const paragraphPlaybackRate = useTransform(
    scrollVelocity,
    [-1000, 0],
    [4, 2],
  );

  useMotionValueEvent(scrollVelocity, "change", (latestVelocity) => {
    if (latestVelocity === 0) {
      // reset to equilibrium values depending on scroll direction
      const previous = scrollY.getPrevious();
      const diff = scrollY.get() - (previous ?? 0);
      if (diff > 0) {
        // positive diff means scrolling down reset to:
        // containerPlaybackRate: 2
        // paragraphPlaybackRate: 1
        containerAnimations.forEach((anim) => anim.updatePlaybackRate(2));
        paragraphAnimations.forEach((anim) => anim.updatePlaybackRate(1));
      } else if (diff < 0) {
        // negative diff means scrolling up reset to:
        // containerPlaybackRate: 1
        // paragraphPlaybackRate: 2
        containerAnimations.forEach((anim) => anim.updatePlaybackRate(1));
        paragraphAnimations.forEach((anim) => anim.updatePlaybackRate(2));
      }
    } else if (latestVelocity > 0) {
      // scrolling downwards, increase container playback rate
      const containerPlaybackRateValue = containerPlaybackRate.get();
      paragraphAnimations.forEach((anim) => anim.updatePlaybackRate(0));
      containerAnimations.forEach((anim) =>
        anim.updatePlaybackRate(containerPlaybackRateValue),
      );
    } else if (latestVelocity < 0) {
      // scrolling upwards, increase paragraph playback rate
      const paragraphPlaybackRateValue = paragraphPlaybackRate.get();
      containerAnimations.forEach((anim) => anim.updatePlaybackRate(0));
      paragraphAnimations.forEach((anim) =>
        anim.updatePlaybackRate(paragraphPlaybackRateValue),
      );
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
