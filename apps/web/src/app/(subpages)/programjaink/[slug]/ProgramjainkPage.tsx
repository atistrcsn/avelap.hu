import { BackLink } from "@/app/(subpages)/esemenyek/[slug]/back-link";
import EventListComponent from "@/components/events/EventListComponent";
import GYIKAccordion from "@/components/eventtypes/GYIKAccordion";
import { PageHeading } from "@/components/page-heading";
import { APIResponse } from "@/types/types";
import { cn } from "@/utils";
import { getPaginatedEvents } from "@/utils/api-requests";
import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer";
import { Data } from "@strapi/strapi";
import Image from "next/image";
import { FaRegQuestionCircle } from "react-icons/fa";

export default async function EventTypePage({
  datas,
}: {
  datas?: Data.ContentType<"api::eventtype.eventtype">;
}) {
  const headerImgUrl = datas?.headingImage?.url;

  const relatedFutureEventList = await getPaginatedEvents(1, 30, {
    "filters[eventtype][id][$eq]": datas?.id || 0,
  });

  const faqList =
    datas?.gyakori_kerdeseks &&
    datas?.gyakori_kerdeseks?.length != 0 &&
    datas?.gyakori_kerdeseks
      .sort((a, b) => Number(a.rank) - Number(b.rank))
      .map((data) => data);

  return (
    <>
      <div className="relative flex flex-col justify-end min-h-[400px] -ml-6 -mr-6 overflow-hidden lg:rounded-t-lg lg:min-h-[550px]">
        <div className="w-full h-full absolute top-0 ">
          {headerImgUrl && (
            <Image
              src={headerImgUrl}
              fill
              style={{ objectPosition: "bottom center", objectFit: "cover" }}
              alt=""
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="-z-20"
            />
          )}
          <div
            className={cn(
              "w-full h-full bg-linear-to-t from-white from-20% -z-10"
            )}
          ></div>
        </div>

        <div className="z-10 pb-6 ml-6">
          <div className="mb-8">
            <BackLink />
          </div>
          <PageHeading className="mb-6 lg:mb-12">
            {datas?.title}
          </PageHeading>
        </div>
      </div>
      <div className="prose prose-lg lg:prose-xl">
        <BlocksRenderer
          content={datas?.descriptionLongHTML as BlocksContent}
        />
      </div>
      {relatedFutureEventList?.data?.length != 0 && (
        <>
          <h1 className="text-ave-blue inline-flex flex-col items-start gap-1 mb-10 mt-10">
            <span className="text-[20px] font-semibold uppercase font-ibmplexsans">
              Következő{" "}
              <span className="text-ave-gold-400-base">{datas?.title}</span>
            </span>
            <span className="text-4xl font-playfairdisplay font-bold">
              Események
            </span>
          </h1>
          <EventListComponent data={relatedFutureEventList} />
        </>
      )}
      {faqList && (
        <div className="prose prose-lg lg:prose-xl mb-10 mt-10">
          <h1 className="text-ave-blue inline-flex flex-col items-start gap-1 ">
            <span className="text-[20px] font-semibold uppercase font-ibmplexsans">
              <span className="text-ave-gold-400-base">{datas?.title}</span>
            </span>
            <span className="text-4xl font-playfairdisplay font-bold">
              Gyakori kérdések
            </span>
          </h1>
          <GYIKAccordion data={faqList} />
        </div>
      )}
    </>
  );
}
