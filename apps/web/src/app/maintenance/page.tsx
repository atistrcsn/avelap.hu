import { getAppSettings } from "@/utils/api-requests";
import { Metadata } from "next";
import Image from "next/image";
import { FaScrewdriverWrench } from "react-icons/fa6";
import aveLogo from "@/components/ui/AVE logo_vegleges.svg";

export const metadata: Metadata = {
  title: "Karbantartás alatt",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function MaintenancePage() {
  const karbantartasData = (await getAppSettings())?.karbantartas;
  return (
    <div className="prose prose-md min-h-[calc(100vh-300px)] px-8 mx-auto grid place-items-center text-center relative ">
      <div className="absolute w-screen -mt-4 md:-mt-3 z-0">
        <Image
          src={aveLogo}
          fill
          alt=""
          style={{
            opacity: 0.05,
            objectPosition: "center",
            objectFit: "fill",
          }}
        />
      </div>
      <div className="text-ave-text-black">
        <FaScrewdriverWrench className="h-20 w-20 mx-auto" />
        <h1 className="mt-7 md:text-3xl max-w-xl mx-auto leading-snug! text-ave-blue">
          {karbantartasData?.title ||
            "Jelenleg az oldal karbantartás alatt áll!"}
        </h1>
        <p className="mt-4! md:max-w-2xl font-normal">
          {karbantartasData?.desc ||
            "Nagy erőkkel dolgozunk a helyreállításon vagy az esetleges módosításokon. Türelmét kérjük!"}
        </p>
      </div>
    </div>
  );
}
