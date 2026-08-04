"use client";
import styles from "./preloader.module.css";
import { useEffect, useRef } from "react";
import { motion, Variants } from "framer-motion";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { useWindowSize } from "@/hooks/useWindowSize";

gsap.registerPlugin(SplitText);

const slideUp: Variants = {
  initial: {
    top: 0,
  },
  exit: {
    top: "-100vh",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
  },
};

export const Preloader = () => {
  const dimension = useWindowSize();
  const isMeasured = dimension.width > 0;

  const copyrightRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const codeByNicoRef = useRef<HTMLSpanElement>(null);
  const codeByRef = useRef<HTMLSpanElement>(null);
  const nicoRef = useRef<HTMLSpanElement>(null);
  const buissonRef = useRef<HTMLSpanElement>(null);

  // The copyright span only mounts once dimension is measured, so the timeline
  // has to wait for that render instead of running on mount.
  useEffect(() => {
    if (
      !copyrightRef.current ||
      !nameRef.current ||
      !codeByNicoRef.current ||
      !codeByRef.current ||
      !nicoRef.current ||
      !buissonRef.current
    )
      return;

    const split = SplitText.create(codeByNicoRef.current, {
      type: "chars",
      reduceWhiteSpace: false,
    });
    // The span is hidden in CSS so the text can't flash before the split runs.
    // Hand the opacity over to the individual chars now that they exist.
    gsap.set(codeByNicoRef.current, { opacity: 1 });
    gsap.set(split.chars, { opacity: 0 });
    //  Resetting to "" restores whatever the stylesheet says rather than forcing `default` over it.
    const timeline = gsap.timeline({
      onStart: () => {
        document.body.style.cursor = "wait";
      },
      onComplete: () => {
        document.body.style.cursor = "";
      },
    });
    timeline.to(
      copyrightRef.current,
      { opacity: 1, duration: 0.3, ease: "power1.out" },
      0,
    );
    timeline.to(
      copyrightRef.current,
      { x: 0, rotate: -720, duration: 1, ease: "power1.out" },
      ">0.2",
    );
    timeline.to(
      split.chars,
      {
        opacity: 1,
        duration: 0.7,
        stagger: { each: 0.04, from: "end" },
        ease: "power1.out",
      },
      "<25%",
    );
    timeline.to(
      codeByRef.current,
      { x: "-100%", duration: 0.6, ease: "power1.out" },
      ">0.35",
    );
    timeline.to(
      nicoRef.current,
      { x: "-7.5ch", duration: 0.6, ease: "power1.out" },
      "<",
    );
    timeline.to(
      buissonRef.current,
      { x: "-9ch", duration: 0.6, ease: "power1.out" },
      "<",
    );
    // The mask is only as wide as "Code by Nico", so "Buisson" would land 2ch
    // past its right edge. Grow the mask in step with the slide: the text's
    // trailing edge stays outside the clip the whole way in, then arrives flush.
    timeline.to(
      nameRef.current,
      { paddingRight: "2ch", duration: 0.6, ease: "power1.out" },
      "<",
    );
    timeline.to(
      copyrightRef.current,
      { rotate: 360, duration: 0.6, ease: "power1.out" },
      "<",
    );

    return () => {
      timeline.kill();
      split.revert();
      // kill() skips onComplete, so an unmount mid-animation would otherwise
      // leave the page stuck on the wait cursor.
      document.body.style.cursor = "";
    };
  }, [isMeasured]);

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + (dimension.width <= 500 ? 200 : 300)} 0 ${dimension.height}  L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  L0 0`;

  const curve: Variants = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 },
    },
  };

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      exit="exit"
      className={styles.introduction}
    >
      {isMeasured && (
        <>
          <p>
            <span
              className={styles.preloaderCopyrightSymbol}
              ref={copyrightRef}
            >
              ©
            </span>
            <span ref={nameRef} className={styles.preloaderName}>
              <span ref={codeByNicoRef} className={styles.preloaderCodeByNico}>
                <span ref={codeByRef}>&nbsp;Code by&nbsp;</span>
                <span ref={nicoRef}>Nico</span>
              </span>
              <span ref={buissonRef} className={styles.preloaderBuisson}>
                las Buisson
              </span>
            </span>
          </p>

          <svg>
            <motion.path
              variants={curve}
              initial="initial"
              exit="exit"
            ></motion.path>
          </svg>
        </>
      )}
    </motion.div>
  );
};
