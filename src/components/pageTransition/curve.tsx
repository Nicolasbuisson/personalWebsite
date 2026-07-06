"use client";
import styles from "./curve.module.css";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { motion, Variants } from "framer-motion";
import { useRouter } from "next/router";

// Animate `y` (compositor) instead of `top` (layout/paint), matching the SVG
// layer. `.route` is now `position: fixed` with a static `top: 40%`, so the base
// position is viewport-anchored and the transform just offsets from there.
// `x: "-50%"` keeps the horizontal centering since motion owns the transform now.
const text = (height: number): Variants => {
  // How far below its resting spot the label starts its exit. A fraction of the
  // viewport height so it scales across screen sizes; bump toward `height` for a
  // bigger sweep, lower it for a subtler lift.
  const lift = height * 0.15;

  return {
    initial: {
      opacity: 1,
      x: "-50%",
      y: 0,
    },
    enter: {
      opacity: 0,
      x: "-50%",
      y: -400, // must do a hardcoded value, because on enter, page dimensions.height will be 0 on SSR
      transition: { duration: 0.75, delay: 0.35, ease: [0.76, 0, 0.24, 1] },
      transitionEnd: { y: 0 },
    },
    // Keyframe array forces the start point: slide up from `lift` (below) to y:0
    // regardless of where the label was parked, so it lands ready for the next
    // enter. It fades in (opacity 0 -> 1) as it rises, mirroring the curtain.
    exit: {
      opacity: 1,
      x: "-50%",
      y: [lift, 0],
      transition: { duration: 0.5, delay: 0.4, ease: [0.33, 1, 0.68, 1] },
    },
  };
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

const translateContent: Variants = {
  initial: {
    y: 300,
  },
  enter: {
    y: 0,
    transition: {
      duration: 0.75,
      delay: 0.35,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const routes: { [key: string]: string } = {
  "/": "Home",
  "/work": "Work",
  "/about": "About",
  "/contact": "Contact",
};

export const Curve = ({
  children,
  backgroundColor = "var(--clr-dark)",
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

  const textVariants = useMemo(() => text(dimensions.height), [dimensions]);

  return (
    <div className={styles.curve} style={{ backgroundColor }}>
      <div
        style={
          dimensions.width === 0
            ? { zIndex: 1000, opacity: 1 }
            : { zIndex: -1, opacity: 0 }
        }
        className={styles.background}
      />
      <motion.p
        className={styles.route}
        variants={textVariants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        {routes[router.route]}
      </motion.p>
      {dimensions.width !== 0 && <SVG {...dimensions} />}
      <motion.div variants={translateContent} initial="initial" animate="enter">
        {children}
      </motion.div>
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
