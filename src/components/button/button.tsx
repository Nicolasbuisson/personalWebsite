"use client";
import { ReactNode, useEffect, useRef } from "react";
import styles from "./button.module.css";
import gsap from "gsap";

interface IButtonProps {
  onClick?: () => void;
  children?: ReactNode;
  className?: string;
}

export const Button = (props: IButtonProps) => {
  const { onClick, children, className = "" } = props;

  const circle = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline>(null);
  let timeoutId: NodeJS.Timeout | null = null;

  useEffect(() => {
    timeline.current = gsap.timeline({ paused: true });
    timeline.current
      .to(
        circle.current,
        {
          top: "-25%",
          width: "150%",
          duration: 0.4,
          ease: "power3.int",
        },
        "enter",
      )
      .to(
        circle.current,
        {
          top: "-150%",
          width: "125%",
          duration: 0.25,
        },
        "exit",
      );
  }, []);

  const manageMouseEnter = (_e: any) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    timeline.current?.tweenFromTo("enter", "exit");
  };

  const manageMouseLeave = (_e: any) => {
    timeoutId = setTimeout(() => {
      // to make button stay in hovered state a bit longer
      timeline.current?.play();
    }, 300);
  };

  return (
    <button
      className={`${styles.roundedButton} ${className}`}
      onClick={onClick}
      onMouseEnter={manageMouseEnter}
      onMouseLeave={manageMouseLeave}
    >
      <div>{children}</div>
      <div ref={circle} className={styles.circle}></div>
    </button>
  );
};
