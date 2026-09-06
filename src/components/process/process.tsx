"use client";
import { CSSProperties, Fragment, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./process.module.css";
import { IProcessSteps, ProcessStep } from "./processStep";

// Nodes of the weaving path, in the units of the processSvg viewBox below.
// Odd steps sit on the left lobe of the curve, even steps on the right one.
const VIEWBOX_WIDTH = 1171;
const VIEWBOX_HEIGHT = 653;
const NODE_X_ODD = 363.01;
const NODE_X_EVEN = 807.99;
// 653 / 8 apart, so the nodes land on 12.5% / 37.5% / 62.5% / 87.5% — the exact
// centres of the map's four equal rows.
const NODE_Y = [81.625, 244.875, 408.125, 571.375];

const steps: IProcessSteps[] = [
  {
    number: "01",
    title: "Discovery Call",
    subtitle: "30 Min",
    content:
      "A free 30-minute call. I learn about your business, your customers and what success looks like. No commitment, no sales pitch.",
  },
  {
    number: "02",
    title: "Proposal & Quote",
    subtitle: "30 Min",
    content:
      "A free 30-minute call. I learn about your business, your customers and what success looks like. No commitment, no sales pitch.",
  },
  {
    number: "03",
    title: "Design & Build",
    subtitle: "30 Min",
    content:
      "A free 30-minute call. I learn about your business, your customers and what success looks like. No commitment, no sales pitch.",
  },
  {
    number: "04",
    title: "Deploy & Handover",
    subtitle: "30 Min",
    content:
      "A free 30-minute call. I learn about your business, your customers and what success looks like. No commitment, no sales pitch.",
  },
];

// The scrubbed timeline is 1 unit long, so every position below reads as a
// percentage of the scroll animation.
const NODE_STARTS = [0.01, 0.34, 0.67, 0.99];
const POP_OUT_DURATION = 0.05; // 0% -> 130%
const POP_BACK_DURATION = 0.03; // 130% -> 100%
const STEP_DURATION = POP_OUT_DURATION + POP_BACK_DURATION;
const STEP_SLIDE_DISTANCE = 60; // px the step travels in from its own side

// for mobile, just do inView slide up processNode + processStep

export const Process = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const nodeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Below 880px the curve is hidden and the steps stack in one column, so
    // there is no path to draw and no left/right to slide in from.
    const mediaQuery = gsap.matchMedia();
    mediaQuery.add("(min-width: 880px)", () => {
      const path = pathRef.current;
      if (!path) return;

      const pathLength = path.getTotalLength();
      // pathLength="1" only exists so the server-rendered curve starts hidden.
      // Drop it now that the dashes run on the path's real user units.
      path.removeAttribute("pathLength");

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: sectionRef.current,
          // The section parks against the top of the viewport and stays there
          // for the whole draw, so the timeline no longer maps onto the
          // section's own height — it maps onto how long we hold the pin.
          start: "top top",
          end: () => "+=" + window.innerHeight * 1.5,
          pin: true,
          // ScrollTrigger inserts a pin-spacer sized to the pin's duration, so
          // whatever follows is pushed down by exactly the scroll distance the
          // timeline consumes. No hand-built sticky wrapper, no magic height.
          pinSpacing: true,
          // Fast scrolling can blow past the pin start by a frame; this lets
          // ScrollTrigger latch slightly early so the section doesn't jump.
          anticipatePin: 1,
          scrub: true,
        },
      });

      // Both numbers have to be spelled out: GSAP number-matches against the
      // dasharray already on the element ("1 1"), so a single value would only
      // replace the dash and leave a 1px gap behind — which renders as a fully
      // drawn curve with a speck travelling along it instead of a draw-on.
      timeline.fromTo(
        path,
        {
          strokeDasharray: `${pathLength} ${pathLength}`,
          strokeDashoffset: pathLength,
        },
        { strokeDashoffset: 0, duration: 1 },
        0,
      );

      NODE_STARTS.forEach((start, index) => {
        const node = nodeRefs.current[index];
        const step = stepRefs.current[index];
        if (!node || !step) return;

        timeline
          .fromTo(
            node,
            { scale: 0 },
            { scale: 1.3, duration: POP_OUT_DURATION, ease: "power2.out" },
            start,
          )
          .to(
            node,
            { scale: 1, duration: POP_BACK_DURATION, ease: "power2.inOut" },
            start + POP_OUT_DURATION,
          );

        // Odd-numbered steps sit in the left lane, even ones in the right lane;
        // each one slides in from the edge it is anchored to.
        const isOdd = index % 2 === 0;
        timeline.fromTo(
          step,
          {
            autoAlpha: 0,
            x: isOdd ? -STEP_SLIDE_DISTANCE : STEP_SLIDE_DISTANCE,
          },
          {
            autoAlpha: 1,
            x: 0,
            duration: STEP_DURATION,
            ease: "power2.out",
          },
          start,
        );
      });
    });

    return () => mediaQuery.revert();
  }, []);

  return (
    <section className={styles.processContainer} ref={sectionRef}>
      <div className={styles.processHeader}>
        <div>
          <h2>How I work</h2>
          <h3>
            <span>Four steps. </span>No surprises.
          </h3>
        </div>
        <p className={styles.processHeaderParagraph}>
          Most small businesses get burned by web projects that drag on for
          months and balloon past the original quote. My process is deliberately
          structured for clarity and efficiency. I'm always here for you in case
          anything comes up.
        </p>
      </div>
      <div className={styles.processMap} ref={mapRef}>
        <svg
          className={styles.processSvg}
          viewBox="0 0 1171 653"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          {/* pathLength + the dashes keep the curve hidden until the timeline
              takes over on hydration */}
          <path
            ref={pathRef}
            d="M 363.01 81.625 C 363.01 163.25 807.99 163.25 807.99 244.875 C 807.99 326.5 363.01 326.5 363.01 408.125 C 363.01 489.75 807.99 489.75 807.99 571.375"
            strokeWidth="3"
            strokeLinecap="round"
            pathLength={1}
            strokeDashoffset={1}
            strokeDasharray="1 1"
          ></path>
        </svg>
        {steps.map((step, index) => (
          <Fragment key={step.number}>
            <span
              className={styles.processNode}
              ref={(element) => {
                nodeRefs.current[index] = element;
              }}
              style={
                {
                  "--node-x": `${
                    ((index % 2 === 0 ? NODE_X_ODD : NODE_X_EVEN) /
                      VIEWBOX_WIDTH) *
                    100
                  }%`,
                  "--node-y": `${(NODE_Y[index] / VIEWBOX_HEIGHT) * 100}%`,
                } as CSSProperties
              }
            />
            <ProcessStep
              ref={(element) => {
                stepRefs.current[index] = element;
              }}
              number={step.number}
              title={step.title}
              subtitle={step.subtitle}
              content={step.content}
            />
          </Fragment>
        ))}
      </div>
    </section>
  );
};
