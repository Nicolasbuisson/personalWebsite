"use client";
import styles from "./curve.module.css";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { motion, Variants } from "framer-motion";
import { useRouter } from "next/router";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useWindowSize } from "@/hooks/useWindowSize";

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
    // Where `enter` leaves the label once its transitionEnd has run. Used as both
    // initial and animate when the entry animation is skipped, so nothing moves
    // but `exit` still has the same starting point it normally would.
    settled: {
      opacity: 0,
      x: "-50%",
      y: 0,
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
    settled: {
      d: targetPath,
    },
  };
};

// Animate the layer with `y` (transform/compositor) instead of `top` (layout/paint).
// `top` on this >viewport-sized fixed layer forces a full re-layout + repaint every
// frame and lets Chromium drop stale raster tiles ("frozen frame") onto the
// transform-promoted Header/Nav/Footer siblings. Pixel values are derived from the
// viewport height we already track: -100vh === -height, 100vh === height.
const translate = (height: number, heightOffset: number): Variants => ({
  initial: {
    y: -heightOffset,
  },
  enter: {
    y: -height,
    transition: { duration: 0.75, delay: 0.35, ease: [0.76, 0, 0.24, 1] },
    transitionEnd: {
      y: height,
    },
  },
  exit: {
    y: -heightOffset,
    transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
  },
  // Matches `enter`'s transitionEnd: parked a full viewport below, which is where
  // `exit` expects to start its sweep back up.
  settled: {
    y: height,
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
  settled: {
    y: 0,
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
  skipEnter = false,
}: {
  children?: ReactNode;
  backgroundColor?: string;
  // Render straight into the post-enter resting state instead of animating in.
  // Set on the page the preloader covered, so the two curtains don't compete.
  // `exit` is unaffected either way.
  skipEnter?: boolean;
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

  // Identical initial and animate means framer-motion runs no transition at all.
  const enterState = skipEnter ? "settled" : "enter";
  const initialState = skipEnter ? "settled" : "initial";

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
        initial={initialState}
        animate={enterState}
        exit="exit"
      >
        {routes[router.route]}
      </motion.p>
      {dimensions.width !== 0 && <SVG {...dimensions} skipEnter={skipEnter} />}
      {/* Everything on the page rides in on this wrapper's `y`, so while the
          enter animation runs the content sits 300px below where it will
          settle. Any ScrollTrigger a child sets up on mount measures against
          that offset, so its start/end land 300px late — re-measure once the
          transform is gone. */}
      <motion.div
        variants={translateContent}
        initial={initialState}
        animate={enterState}
        onAnimationComplete={() => ScrollTrigger.refresh()}
      >
        {children}
      </motion.div>
    </div>
  );
};

const SVG = ({
  height,
  width,
  skipEnter,
}: {
  height: number;
  width: number;
  skipEnter: boolean;
}) => {
  const dimensions = useWindowSize();
  const heightOffset = useMemo(
    () => (dimensions.width <= 500 ? 200 : 300),
    [dimensions.width],
  );
  const pathVariants = useMemo(
    () =>
      curve(
        `M0 ${heightOffset} Q${width / 2} 0 ${width} ${heightOffset} L${width} ${height + heightOffset} Q${width / 2} ${height + 2 * heightOffset} 0 ${height + heightOffset} L0 0`,
        `M0 ${heightOffset} Q${width / 2} 0 ${width} ${heightOffset} L${width} ${height} Q${width / 2} ${height} 0 ${height} L0 0`,
      ),
    [width, height, heightOffset],
  );

  const translateVariants = useMemo(
    () => translate(height, heightOffset),
    [height, heightOffset],
  );

  const enterState = skipEnter ? "settled" : "enter";
  const initialState = skipEnter ? "settled" : "initial";

  return (
    <motion.svg
      className={styles.pageTransitionSVG}
      variants={translateVariants}
      initial={initialState}
      animate={enterState}
      exit="exit"
    >
      <motion.path
        variants={pathVariants}
        initial={initialState}
        animate={enterState}
        exit="exit"
      />
    </motion.svg>
  );
};
