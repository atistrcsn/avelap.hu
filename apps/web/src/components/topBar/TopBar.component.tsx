"use client";

import { FC } from "react";
import { FaChevronRight } from "react-icons/fa6";
import "../../utils/string.extensions";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog/dialog";
type TopBarProps = {
  isVisible?: boolean;
  title?: string;
  linkPath?: string;
  linkTitle?: string;
};

export const TopBar: FC<TopBarProps> = ({
  isVisible = false,
  title = "",
  linkPath,
  linkTitle,
}: TopBarProps) => {
  return (
    <>
      {isVisible && (
        <div className="p-4 text-center bg-ave-gold-400-base min-h-fit font-ibmplexserif font-medium border-b border-ave-gold-600">
          <div className="container">
            <Dialog>
              <h4 className="mb-0">{title || " "}</h4>
              <DialogTrigger asChild>
                {linkPath?.IsNotNullOrBlank() && (
                  <span style={{ whiteSpace: "nowrap" }}>
                    <a
                      href={"#"}
                      className="ms-2 text-ave-blue underline font-playfairdisplay font-bold"
                    >
                      {(linkTitle?.IsNotNullOrBlank() && linkTitle) ||
                        "Részletek"}
                    </a>
                    <FaChevronRight className="text-sm px-1.5 text-ave-blue" />
                  </span>
                )}
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}
    </>
  );
};
