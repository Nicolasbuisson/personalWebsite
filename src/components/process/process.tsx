"use client";
import { CSSProperties, Fragment } from "react";
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

export const Process = () => {
  return (
    <section className={styles.processContainer}>
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
      <div className={styles.processMap}>
        <svg
          className={styles.processSvg}
          viewBox="0 0 1171 653"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M 363.01 81.625 C 363.01 163.25 807.99 163.25 807.99 244.875 C 807.99 326.5 363.01 326.5 363.01 408.125 C 363.01 489.75 807.99 489.75 807.99 571.375"
            stroke-width="3"
            stroke-linecap="round"
            pathLength="1"
            stroke-dashoffset="0px"
            stroke-dasharray="1px 1px"
          ></path>
        </svg>
        {steps.map((step, index) => (
          <Fragment key={step.number}>
            <span
              className={styles.processNode}
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
