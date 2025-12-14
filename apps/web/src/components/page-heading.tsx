import { cn } from "@/utils";
import React, { FC, HtmlHTMLAttributes, PropsWithChildren } from "react";

type HeadingProps =
  PropsWithChildren & {} & HtmlHTMLAttributes<HTMLHeadingElement>;

export const PageHeading: FC<HeadingProps> = ({ children, ...props }) => {
  return (
    <h1
      {...props}
      className={cn(
        "font-playfairdisplay font-semibold text-[2.7em] text-ave-blue mb-12 leading-tight",
        props.className
      )}
    >
      {children}
    </h1>
  );
};

export const PageSubHeading: FC<HeadingProps> = ({ children, ...props }) => {
  return (
    <span
      {...props}
      className={cn(
        "font-ibmplexsans font-semibold uppercase text-2xl text-ave-blue mb-12",
        props.className
      )}
    >
      {children}
    </span>
  );
};
