import { Curve } from "@/components/pageTransition/curve";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  return (
    <div className="template-wrapper">
      <AnimatePresence mode="wait">
        <Curve key={"curve-page-transition-" + pathName}>
          <div>{children}</div>
        </Curve>
      </AnimatePresence>
    </div>
  );
}
