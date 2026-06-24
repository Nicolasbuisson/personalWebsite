"use client";
import styles from "./curve.module.css";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { motion, Variants } from "framer-motion";
import { useRouter } from "next/router";

const text: Variants = {
  initial: {
    opacity: 1,
  },
  enter: {
    opacity: 0,
    top: -100,
    transition: { duration: 0.75, delay: 0.35, ease: [0.76, 0, 0.24, 1] },
    transitionEnd: { top: "47.5%" },
  },
  exit: {
    opacity: 1,
    top: "40%",
    transition: { duration: 0.5, delay: 0.4, ease: [0.33, 1, 0.68, 1] },
  },
};

const curve = (initialPath: string, targetPath: string): Variants => {
  return {
    initial: {
      d: initialPath,
    },
    enter: {
      d: targetPath,
      transition: { duration: 0.75, delay: 0.35, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: initialPath,
      transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
    },
  };
};

// Animate the layer with `y` (transform/compositor) instead of `top` (layout/paint).
// `top` on this >viewport-sized fixed layer forces a full re-layout + repaint every
// frame and lets Chromium drop stale raster tiles ("frozen frame") onto the
// transform-promoted Header/Nav/Footer siblings. Pixel values are derived from the
// viewport height we already track: -100vh === -height, 100vh === height.
const translate = (height: number): Variants => ({
  initial: {
    y: -300,
  },
  enter: {
    y: -height,
    transition: { duration: 0.75, delay: 0.35, ease: [0.76, 0, 0.24, 1] },
    transitionEnd: {
      y: height,
    },
  },
  exit: {
    y: -300,
    transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
  },
});

const routes: { [key: string]: string } = {
  "/": "Home",
  "/work": "Work",
  "/about": "About",
  "/contact": "Contact",
};

export const Curve = ({
  children,
  backgroundColor = "var(--clr-dark)", // bug here
}: {
  children?: ReactNode;
  backgroundColor?: string;
}) => {
  const router = useRouter();
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const resize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className={styles.curve} style={{ backgroundColor }}>
      <div
        style={
          dimensions.width === 0
            ? { zIndex: 1000, opacity: 1 }
            : { zIndex: -1, opacity: 0 }
        }
        className={styles.background}
        // could add this for cleanup
        // Clean up from DOM when animation ends
        //element.addEventListener("animationend", () => {
        //  element.remove();
        //});
      />
      <motion.p
        className={styles.route}
        variants={text}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        {routes[router.route]}
      </motion.p>
      {dimensions.width !== 0 && <SVG {...dimensions} />}
      {children}
    </div>
  );
};

const SVG = ({ height, width }: { height: number; width: number }) => {
  const pathVariants = useMemo(
    () =>
      curve(
        `M0 300 Q${width / 2} 0 ${width} 300 L${width} ${height + 300} Q${width / 2} ${height + 600} 0 ${height + 300} L0 0`,
        `M0 300 Q${width / 2} 0 ${width} 300 L${width} ${height} Q${width / 2} ${height} 0 ${height} L0 0`,
      ),
    [width, height],
  );

  const translateVariants = useMemo(() => translate(height), [height]);

  return (
    <motion.svg
      className={styles.pageTransitionSVG}
      variants={translateVariants}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <motion.path
        variants={pathVariants}
        initial="initial"
        animate="enter"
        exit="exit"
      />
    </motion.svg>
  );
};
