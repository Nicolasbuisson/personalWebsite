import { Nunito } from "next/font/google";

// `variable` makes next/font emit a class that declares --ff-primary; _app
// puts that class on the tree so globals.css can resolve it everywhere.
export const nunito = Nunito({
  variable: "--ff-primary",
  subsets: ["latin"],
});