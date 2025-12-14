"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { FC, HTMLAttributes, ReactNode, useEffect, useState } from "react";
import { cn } from "../utils";

export type ButtonType = "BASE" | "OUTLINE" | "OUTLINE-LIGHT" | undefined;

type NavLinkProps = {
  buttontype?: ButtonType;
  iconbefore?: React.JSX.Element;
  iconafter?: React.JSX.Element;
  children?: ReactNode;
  checkActivePath?: boolean;
} & LinkProps &
  HTMLAttributes<HTMLAnchorElement>;

const NavLink: FC<NavLinkProps> = ({
  checkActivePath = false,
  ...props
}: NavLinkProps) => {
  const pathname = usePathname();
  const [isActivePath, setIsActive] = useState(false);

  useEffect(() => {
    if (checkActivePath)
      setIsActive(checkIsActivePath(props.href.toString(), pathname));
    return () => {};
  }, [pathname, props.href]);

  function checkIsActivePath(path: string, currentPath: string): boolean {
    return path === currentPath;
  }

  return (
    <Link
      {...props}
      className={cn(
        "font-ibmplexsans font-medium text-slate-800 hover:text-ave-blue inline-flex flex-row w-fit",
        "",
        {
          "text-ave-blue": isActivePath,
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
    </Link>
  );
};

export default NavLink;
