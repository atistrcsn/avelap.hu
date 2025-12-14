"use client";

import { AnchorHTMLAttributes, FC, ReactNode } from "react";
import { cn } from "../utils";

export type ButtonType = "BASE" | "OUTLINE" | "OUTLINE-LIGHT" | undefined;

type ExternalLinkProps = {
  buttontype?: ButtonType;
  iconbefore?: React.JSX.Element;
  iconafter?: React.JSX.Element;
  children?: ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

const ExternalLink: FC<ExternalLinkProps> = ({
  ...props
}: ExternalLinkProps) => {
  return (
    <a
      {...props}
      className={cn(
        "font-ibmplexsans font-medium text-slate-800 hover:text-ave-blue inline-flex flex-row w-fit items-center",
        {
          "btn-sm text-ave-text-black bg-ave-gold-400-base hover:bg-ave-gold-200": props.buttontype == "BASE",
          "btn-sm text-white border-x border-y border-white border-opacity-50 bg-transparent hover:bg-white hover:text-ave-blue":
            props.buttontype == "OUTLINE",
          "btn-sm text-ave-blue border-x border-y border-ave-blue bg-transparent hover:bg-ave-blue hover:text-white":
            props.buttontype == "OUTLINE-LIGHT",
        },
        props.className
      )}
      href={props.href}
    >
      {props.iconbefore && (
        <div
          className={cn("-ml-1 mr-2", {
            "opacity-50": props.buttontype == "OUTLINE",
          })}
        >
          {props.iconbefore}
        </div>
      )}
      {props.children}
      {props.iconafter && <div className="ml-2 -mr-1 opacity-50"></div>}
    </a>
  );
};

export default ExternalLink;
