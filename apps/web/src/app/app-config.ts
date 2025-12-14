import { ButtonType } from "../components/nav-link";

type NavItem = {
  path: string;
  title: string;
  buttonType?: ButtonType;
  isShown?: boolean;
};

enum NavItemEnum {
  KIKVAGYUNK,
  PROGRAMJAINK,
  ESEMENYEK,
  TANITASOK,
  HASZNOS_CIMEK,
  TANUSAGTETELEK,
  KAPCSOLAT,
}

const navItems: Record<keyof typeof NavItemEnum, NavItem> = {
  KIKVAGYUNK: { path: "/kik-vagyunk", title: "Kik vagyunk?" },
  PROGRAMJAINK: { path: "/programjaink", title: "Programjaink" },
  ESEMENYEK: { path: "/esemenyek", title: "Események", isShown: false },
  TANITASOK: { path: "/tanitasok", title: "Tanítások" },
  TANUSAGTETELEK: { path: "/tanusagtetelek", title: "Tanúságtételek" },
  HASZNOS_CIMEK: { path: "/hasznos-cimek", title: "Hasznos címek" },
  KAPCSOLAT: { path: "/kapcsolat", title: "Kapcsolat" },
};

export const AveConfig = {
  navItems: navItems,
  cache: {
    revalidateAfter: 300,
  },
  pagination: {
    sizes: [6, 12, 24, 48, 96],
  },
};
