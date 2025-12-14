"use client";

import NavLink from "@/components/nav-link";
import { useRouter } from "next/navigation";
import { FC, PropsWithChildren } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";

export const BackLink: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();

  return (
    <NavLink
      href="#"
      buttontype="OUTLINE-LIGHT"
      onClick={() => router.back()}
      iconbefore={<FaArrowAltCircleLeft />}
    >
      Vissza
    </NavLink>
  );
};
