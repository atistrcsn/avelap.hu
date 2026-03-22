import EventListComponent from "@/components/events/EventListComponent";
import QuotesComponent from "@/components/quotes/quotesComponent";
import Loader from "@/components/ui/loader";
import {
  getAllEvents,
  getEventListQueryParams,
} from "@/utils/api-requests";
import Image from "next/image";
import { Suspense } from "react";
import { ImQuotesLeft } from "react-icons/im";
import bgImage from "./dicsoites-fentrol-nezve.webp";

export default async function Home() {
  const eventListResponse = await getAllEvents(getEventListQueryParams());

  return (
    <div id="fooldal" className="mb-10">
      <div id="keiemelt-kep" className="relative h-[40vh] md:h-[500px]">
        <Image
          className="z-0"
          fill={true}
          style={{ objectFit: "cover", objectPosition: "center" }}
          alt="Iz."
          src={bgImage}
        />
        <div className="absolute z-1 bg-linear-to-r from-white from-15% h-full w-full"></div>

        <div className="relative z-2 flex flex-col justify-center h-full ml-8">
          <h1 className="text-3xl md:text-4xl text-ave-blue leading-10 md:leading-10">
            <span className="[text-shadow:2px_0_3px_var(--tw-shadow-color)] shadow-white">
              "Ne félj, <br />
              én megsegítelek!" <br />
            </span>
            <span className="text-2xl">Iz. 41,13</span>
          </h1>
        </div>
      </div>

      <div id="idezetek" className="flex flex-col items-center bg-ave-blue">
        <div className="flex flex-row justify-center gap-8 items-center w-full pt-6">
          <div className="h-0.5 bg-white w-32"></div>
          <div className="rounded-full bg-ave-gold-400-base p-3">
            <ImQuotesLeft size={20} color="white" />
          </div>
          <div className="h-0.5 bg-white w-32"></div>
        </div>

        <div className="px-6 pb-6 pt-3 w-full">
          <Suspense fallback={<Loader />}>
            <QuotesComponent />
          </Suspense>
        </div>
      </div>

      <div
        id="kovetkezo-esemenyek"
        className="mx-6 lg:mx-0 mt-6 flex flex-col "
      >
        <h1 className="text-ave-blue inline-flex flex-col items-start gap-1 mb-10 mt-5">
          <span className="text-[20px] font-semibold uppercase font-ibmplexsans">
            Következő
          </span>
          <span className="text-4xl font-playfairdisplay font-bold">
            Események
          </span>
        </h1>
        <Suspense fallback={<Loader />}>
          <EventListComponent data={eventListResponse} />
        </Suspense>
      </div>
    </div>
  );
}
