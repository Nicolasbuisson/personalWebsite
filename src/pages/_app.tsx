import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Preloader } from "@/components/preloader/preloader";

const PRELOADER_DURATION = 2000;

export default function App({ Component, pageProps, router }: AppProps) {
  // need to add ReactLenis scroll component here? or in Document.tsx
  //<ReactLenis root></ReactLenis>
  //     export const metadata: Metadata = {
  //   title: "Nicolas Buisson",
  //   description:
  //     "Personal website for Nicolas Buisson to showcase his skills and projects",
  // };
  // also see if can pass fonts directly into App or Document.tsx,
  // don't want to do it on a per-page basis...

  // Both flags are seeded on App's very first render and never re-seeded: a
  // client-side navigation swaps `Component` but never remounts App. So the
  // preloader only runs on a hard load of "/", and coming back from /work gets
  // the normal Curve entry animation.
  const [isLoading, setIsLoading] = useState(() => router.route === "/");
  const [skipEnter, setSkipEnter] = useState(() => router.route === "/");

  useEffect(() => {
    if (!isLoading) return;
    const timeout = setTimeout(() => {
      setIsLoading(false);
      window.scrollTo(0, 0);
    }, PRELOADER_DURATION);
    return () => clearTimeout(timeout);
  }, [isLoading]);

  // The preloaded page is the only one that skips its entry animation; every
  // route change from here on is a normal transition.
  useEffect(() => {
    const clearSkip = () => setSkipEnter(false);
    router.events.on("routeChangeStart", clearSkip);
    return () => router.events.off("routeChangeStart", clearSkip);
  }, [router.events]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <Component key={router.route} {...pageProps} skipEnter={skipEnter} />
      </AnimatePresence>
    </>
  );
}
