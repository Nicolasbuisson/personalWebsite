import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    // need to add ReactLenis scroll component here? or in Document.tsx
    //<ReactLenis root></ReactLenis>
    //     export const metadata: Metadata = {
    //   title: "Nicolas Buisson",
    //   description:
    //     "Personal website for Nicolas Buisson to showcase his skills and projects",
    // };
    // also see if can pass fonts directly into App or Document.tsx,
    // don't want to do it on a per-page basis...
    <AnimatePresence mode="wait">
      <Component key={router.route} {...pageProps} />
    </AnimatePresence>
  );
}
