"use client";
import Image from "next/image";
import Link from "next/link";
import aveLogo from "../../../public/ave-logo.svg";
import MobileMenu from "./mobile-menu";
import ScrollToTop from "react-scroll-to-top";
import { StickyNav } from "../sticky-nav";
import { usePathname } from "next/navigation";
import NavLink from "../nav-link";
import { AveConfig } from "../../app/app-config";

export default function Header() {
  const pathname = usePathname();

  return (
    <StickyNav height={100}>
      <header className="absolute w-full z-30">
        <ScrollToTop
          width="20"
          smooth={true}
          top={150}
          className="flex justify-center items-center rounded-full! bg-white opacity-70 bottom-40! md:bottom-32!"
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-28">
            <div className="shrink-0 mr-4">
              <Link href="/" className="block relative w-24 h-24 md:w-[130px] md:h-[130px]" aria-label="Ave">
                <Image src={aveLogo} alt="dw" fill />
              </Link>
            </div>

            <nav className="hidden lg:flex lg:grow">
              <ul className="flex grow justify-end flex-wrap items-center gap-6">
                {Object.values(AveConfig.navItems)
                  .filter((nav) => nav.isShown == null)
                  .map((item, idx) => (
                    <li key={idx}>
                      <NavLink
                        href={item.path}
                        checkActivePath={true}
                        buttontype={
                          item.path == "/kapcsolat" ? "BASE" : undefined
                        }
                      >
                        {item.title}
                      </NavLink>
                    </li>
                  ))}
              </ul>
            </nav>

            <MobileMenu />
          </div>
        </div>
      </header>
    </StickyNav>
  );
}
