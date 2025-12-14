import { AveConfig } from "@/app/app-config";
import ExternalLink from "@/components/external-link";
import { formatDateRange } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { FaGlobeEurope, FaRegCalendarAlt } from "react-icons/fa";
import { FaWpforms } from "react-icons/fa6";

interface EventItemProps {
  title?: string | null | undefined;
  desc?: string | null | undefined;
  imageURL?: string;
  slug: string;
  dateFrom?: string;
  dateTo?: string;
  location?: any;
  registrationDeadline?: string;
  registrationUrl?: string | null | undefined;
}

async function EventItemComponent({
  title,
  desc,
  slug,
  dateFrom,
  dateTo,
  imageURL,
  location,
  registrationDeadline,
  registrationUrl,
}: EventItemProps) {
  const dateRange = formatDateRange(dateFrom, dateTo);

  return (
    <article className="flex flex-col gap-3 grow">
      <h2 className="text-ave-text-black font-semibold text-2xl font-ibmplexserif leading-tight">
        <Link
          href={`${AveConfig.navItems.ESEMENYEK.path}/${encodeURIComponent(
            slug
          )}`}
        >
          {title}
        </Link>
      </h2>
      {dateRange.startDate && (
        <div className="inline-flex flex-row justify-start gap-2 items-center">
          <FaRegCalendarAlt
            size={18}
            className="text-ave-gold-400-base text-opacity-70"
          />
          <span className="text-ave-blue font-ibmplexserif font-semibold text-base">
            {dateRange.range ? dateRange.range : dateRange.startDate}
          </span>
        </div>
      )}
      {location?.city && (
        <div className="inline-flex flex-row justify-start gap-2 items-center -mt-2">
          <FaGlobeEurope
            size={18}
            className="text-ave-gold-400-base  text-opacity-70"
          />
          <span className="text-ave-blue font-bold uppercase text-base tracking-wider">
            {location.city}
          </span>
        </div>
      )}

      {imageURL && (
        <Link
          href={`${AveConfig.navItems.ESEMENYEK.path}/${encodeURIComponent(
            slug
          )}`}
          className="block w-full h-44 sm:h-44 relative rounded-md overflow-hidden"
        >
          <Image
            src={imageURL}
            fill
            style={{ objectPosition: "center", objectFit: "cover" }}
            alt=""
          />
        </Link>
      )}

      <p className="text-ave-text-black leading-snug mb-2!">{desc}</p>

      <div className="mt-auto flex flex-row align-middle gap-4">
        <Link
          href={`${AveConfig.navItems.ESEMENYEK.path}/${encodeURIComponent(
            slug
          )}`}
          className="bg-ave-gold-400-base text-base text-ave-text-black font-medium rounded-full px-4 py-3"
        >
          Részletek...
        </Link>
        {registrationUrl && (
          <ExternalLink
            href={registrationUrl}
            className="uppercase"
            buttontype={"OUTLINE-LIGHT"}
            iconbefore={<FaWpforms />}
            target="_blank"
          >
            Jelentkezés...
          </ExternalLink>
        )}
      </div>
    </article>
  );
}

export default EventItemComponent;
