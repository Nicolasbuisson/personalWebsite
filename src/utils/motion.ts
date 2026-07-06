import type { MouseEvent } from "react";

export const EXIT_INSTANTLY = { transition: { opacity: 0, duration: 0 } };

export const delayScrollToTop = (_e: MouseEvent<HTMLAnchorElement>): void => {
  setTimeout(() => window.scrollTo(0, 0), 1000);
};
