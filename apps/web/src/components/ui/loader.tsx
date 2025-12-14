import { cn } from "@/utils";
import React, { FC, HtmlHTMLAttributes } from "react";
import { FaSpinner } from "react-icons/fa6";

const Loader: FC<HtmlHTMLAttributes<HTMLOrSVGElement>> = (props) => {
  return (
    <FaSpinner
      {...props}
      className={cn("animate-spin text-ave-gold-400-base text-2xl self-center m-6", props.className)}
    />
  );
};

export default Loader;
