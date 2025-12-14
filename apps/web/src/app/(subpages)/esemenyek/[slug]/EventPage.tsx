import { BackLink } from "@/app/(subpages)/esemenyek/[slug]/back-link";
import AddToCalendarButton from "@/components/add-to-calendar";
import ExternalLink from "@/components/external-link";
import { PageHeading, PageSubHeading } from "@/components/page-heading";
import { APIResponse } from "@/types/types";
import { cn, formatDateRange } from "@/utils";
import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer";
import { Data } from "@strapi/strapi";
import { isNull } from "lodash";
import Image from "next/image";
import { FaGlobeEurope } from "react-icons/fa";
import { FaCalendar, FaCircleInfo, FaWpforms } from "react-icons/fa6";

export default async function EventPage({
  data,
}: {
  data?: Data.ContentType<"api::event.event">;
}) {
  const [event, eventType] = [
    data,
    data?.eventtype,
  ];
  const headerImgUrl = event?.headingImage?.url;
  const dateRange = formatDateRange(
    event?.eventstart?.toString(),
    event?.eventend?.toString()
  );

  const locationQueryString: string[] = [];
  const locationString: string[] = [];
  if (event?.location && event.location !== undefined) {
    Object.entries(event?.location).map(([k, v]) => {
      if (k == "id") return;
      if (v !== undefined && v != null) {
        locationQueryString.push(v.toString());
        locationString.push(v.toString());
      }
    });
  }
  const locationQuery = locationQueryString.join("+");
  const location = locationString.join(" ");

  return (
    <>
      <div className="relative flex flex-col justify-end min-h-[400px] -ml-6 -mr-6 overflow-hidden lg:rounded-t-lg lg:min-h-[550px]">
        <div className="w-full h-full absolute top-0 ">
          {headerImgUrl && (
            <Image
              src={headerImgUrl}
              fill
              style={{ objectPosition: "center", objectFit: "cover" }}
              alt=""
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="-z-20"
            />
          )}
          <div
            className={cn(
              "w-full h-full bg-linear-to-t from-white from-35% -z-10"
            )}
          ></div>
        </div>

        <div className="z-10 pb-6 ml-6">
          <div className="mb-8">
            <BackLink />
          </div>
          <PageSubHeading>{eventType?.title}</PageSubHeading>
          <PageHeading className="mb-6 lg:mb-12">{event?.title}</PageHeading>
        </div>
      </div>
      <div className="prose prose-lg lg:prose-xl">
        <h3 className="flex flex-row gap-3 items-center ">
          <FaCalendar className="text-ave-blue" />
          <span>Időpont</span>
        </h3>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between not-prose">
          <p className="text-2xl font-playfairdisplay text-ave-text-black font-thin italic ">
            {dateRange.range ? dateRange.range : dateRange.startDate}
          </p>
          <AddToCalendarButton
            name={event?.title}
            description={event?.description}
            startDate={event?.eventstart?.toString()}
            endDate={event?.eventend?.toString()}
            timeZone="Europe/Budapest"
            availability="busy"
            location={event?.location?.address ? location : undefined}
            options="'Apple','Google','iCal','Outlook.com'"
            listStyle="overlay"
            buttonStyle="3d"
            trigger="click"
            hideCheckmark
            label="Naptárhoz adom"
            pastDateHandling="disable"
            hideBranding={true}
          />
        </div>
        <h3 className="flex flex-row gap-3 items-center ">
          <FaCircleInfo className="text-ave-blue" />
          <span>Részletek</span>
        </h3>
        <BlocksRenderer
          content={event?.body as BlocksContent}
        />
        {event?.registrationUrl && (
          <ExternalLink
            href={event.registrationUrl}
            className="uppercase not-prose w-full sm:w-auto"
            buttontype={"BASE"}
            iconbefore={<FaWpforms />}
            target="_blank"
          >
            Jelentkezés...
          </ExternalLink>
        )}
        {event?.location && (
          <>
            <h3 className="flex flex-row gap-3 items-center ">
              <FaGlobeEurope className="text-ave-blue" />
              <span>Helyszín</span>
            </h3>
            <p>
              {event?.location?.country}
              <br />
              {event?.location?.postalcode} {event?.location?.city}{" "}
              {event?.location?.address}
            </p>
            <iframe
              width="100%"
              height="450"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_APIKEY}&q=${locationQuery}&language=hu`}
            ></iframe>
          </>
        )}
      </div>
    </>
  );
}
