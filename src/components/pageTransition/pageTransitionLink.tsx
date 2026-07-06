import { delayScrollToTop } from "@/utils/motion";
import Link from "next/link";
import { ReactNode } from "react";

interface IProps {
  href: string;
  className?: string;
  children?: ReactNode;
}

export const PageTransitionLink = (props: IProps) => {
  const { href, className = "", children } = props;
  return (
    <Link
      href={href}
      onClick={delayScrollToTop}
      scroll={false}
      className={className}
    >
      {children}
    </Link>
  );
};
