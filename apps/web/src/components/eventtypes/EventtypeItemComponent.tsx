import { AveConfig } from "@/app/app-config";
import NavLink from "@/components/nav-link";
import { cn } from "@/utils";
import Image from "next/image";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

interface EventtypeItemProps {
  title?: string | null | undefined;
  description?: string | null | undefined;
  slug?: string | null | undefined;
  isEven: boolean;
  imageURL?: string;
}

function EventtypeItemComponent({
  title,
  description,
  slug,
  imageURL,
  isEven,
}: EventtypeItemProps) {
  return (
    <article
      className={cn(
        "flex flex-col col-span-1 relative -mx-6 sm:mx-0 sm:rounded-md overflow-hidden sm:border-x sm:border-y sm:border-ave-blue",
        {
          even: isEven,
        }
      )}
    >
      <div className="w-full h-full absolute top-0">
        {imageURL && (
          <Image
            src={imageURL}
            fill
            style={{ objectPosition: "center", objectFit: "cover" }}
            alt=""
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="-z-20"
          />
        )}
        <div
          className={cn("w-full h-full -z-10", {
            "bg-ave-blue/85": !isEven,
            "bg-white/85": isEven,
          })}
        ></div>
      </div>
      <div
        className={cn("flex flex-col flex-wrap grow gap-5 mx-6 my-6 z-0", {
          "text-white": !isEven,
          "text-ave-blue": isEven,
        })}
      >
        <h2 className="font-semibold text-2xl font-ibmplexserif text-justify">
          {title}
        </h2>
        <p className="leading-snug mb-0! text-left">{description}</p>
        <div className="flex-row flex justify-end mt-auto">
          <NavLink
            href={`${AveConfig.navItems.PROGRAMJAINK.path}/${encodeURIComponent(
              slug
            )}`}
            buttontype={isEven ? "OUTLINE-LIGHT" : "OUTLINE"}
            iconbefore={<FaRegArrowAltCircleRight size={21} />}
          >
            részletek
          </NavLink>
        </div>
      </div>
    </article>
  );
}

export default EventtypeItemComponent;
