import {
  IBM_Plex_Sans,
  IBM_Plex_Serif,
  Playfair_Display,
} from "next/font/google";
import "./css/style.css";

import PageIllustration from "@/components/page-illustration";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import { cn } from "@/utils";
import { GoogleTagManager } from "@next/third-parties/google";
import { Metadata } from "next";
import { TopBar } from "../components/topBar/TopBar.component";

const ibmplexsans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-ibmplexsans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const ibmplexserif = IBM_Plex_Serif({
  subsets: ["latin"],
  variable: "--font-ibmplexserif",
  weight: ["400", "500", "600"],
  display: "swap",
});

const playfairdisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfairdisplay",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.BASEURL as string),
  title: {
    template: "%s | AVE",
    default: "AVE szolgálat - Emmanuel közösség",
  },
  description: "AVE kurzus egyedülálló szülőknek és újraházasodottaknak",
  openGraph: {
    images: "/images/AVE logo_OG.webp",
  },
  other: {
    "site-version": process.env.version as string,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn([
          ibmplexsans.variable,
          ibmplexserif.variable,
          playfairdisplay.variable,
          ibmplexsans.className,
          "antialiased",
          "bg-white",
          "text-slate-800",
          "text-lg",
          "leading-7",
          "tracking-tight",
        ])}
      >
        <TopBar
          isVisible={false}
          title="Ez teszt"
          linkPath="/"
          linkTitle="Ez a link cím"
        />

        <div className="flex flex-col min-h-screen overflow-hidden">
          <Header />
          <main className="grow">
            <PageIllustration />
            <section>
              <div className="max-w-6xl mx-auto px-6 sm:px-6 relative">
                <div
                  id="body-content"
                  className="relative pt-32 pb-10 md:pt-32 md:pb-16 -mx-6 lg:mx-0"
                >
                  {children}
                </div>
              </div>
            </section>
          </main>

          <Footer />
        </div>
        <GoogleTagManager gtmId={process.env.googleTagId as string} />
      </body>
    </html>
  );
}
