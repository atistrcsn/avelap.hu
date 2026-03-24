"use client";
import Link, { LinkProps } from "next/link";
import { AnchorHTMLAttributes, FC, PropsWithChildren } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

type AveInlineLinkExternalProps = PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>>;

export const AveInlineLinkExternal: FC<AveInlineLinkExternalProps> = ({
  children,
  ...props
}) => {
  return (
    <a
      {...props}
      target="_blank"
      className="inline-flex flex-row items-center gap-2 text-ave-blue hover:text-ave-blue-500"
    >
      {children}
      <FaExternalLinkAlt size="14" />
    </a>
  );
};

type AveInlineLinkProps = PropsWithChildren<Omit<LinkProps, "children">>;

export const AveInlineLink: FC<AveInlineLinkProps> = ({ children, ...props }) => {
  return (
    <Link {...props} className="text-ave-blue hover:text-ave-blue-500">
      {children}
    </Link>
  );
};
