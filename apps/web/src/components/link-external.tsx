"use client";
import Link, { LinkProps } from "next/link";
import { AnchorHTMLAttributes, FC, ReactNode } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

type AveInlineLinkExternalProps = {
  children?: ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

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

type AveInlineLinkProps = {
  children?: ReactNode;
} & LinkProps;

export const AveInlineLink: FC<AveInlineLinkProps> = ({ children, ...props }) => {
  return (
    <Link {...props} className="text-ave-blue hover:text-ave-blue-500">
      {children}
    </Link>
  );
};
