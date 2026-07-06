"use client";
import { motion } from "framer-motion";
import styles from "./flipLink.module.css";
import { delayScrollToTop, EXIT_INSTANTLY } from "@/utils/motion";
import { useRouter } from "next/router";
import { MouseEvent } from "react";

interface FlipLinkProps {
  label: string;
  href?: string;
  onClick?: () => void;
}

export const FlipLink = (props: FlipLinkProps) => {
  const DURATION = 0.25;
  const STAGGER = 0.025;
  const { href, label, onClick = () => {} } = props;
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // handle click needed because a plain <motion.a> triggers
    // a full browser-native page load, not a client-side route change like next/Link
    // the entire React app and Next.js router gets torn down and reloaded
    // the AnimatePresence wrapping the pages never gets to see the route change
    // so no exit animation can possibly play
    onClick();
    if (!href) return;
    const isModifiedClick =
      e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0;
    if (isModifiedClick) return;
    e.preventDefault();
    router.push(href, undefined, { scroll: false });
    delayScrollToTop(e);
  };

  return href ? (
    <motion.a
      initial="initial"
      whileHover="hovered"
      exit={EXIT_INSTANTLY}
      href={href}
      className={styles.flipLink}
      onClick={handleClick}
    >
      <div>
        {label.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: { y: 0 },
              hovered: { y: "-100%" },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            exit={EXIT_INSTANTLY}
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
      <div>
        {label.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: { y: "100%" },
              hovered: { y: 0 },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            exit={EXIT_INSTANTLY}
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.a>
  ) : (
    <motion.span
      initial="initial"
      whileHover="hovered"
      exit={EXIT_INSTANTLY}
      className={styles.flipLink}
      onClick={onClick}
    >
      <div>
        {label.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: { y: 0 },
              hovered: { y: "-100%" },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            exit={EXIT_INSTANTLY}
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
      <div>
        {label.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: { y: "100%" },
              hovered: { y: 0 },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            exit={EXIT_INSTANTLY}
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.span>
  );
};
