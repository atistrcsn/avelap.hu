"use client";

import { AveConfig } from "@/app/app-config";
import EventItemComponent from "@/components/events/EventItemComponent";
import { Pagination } from "@/components/pagination/pagination";
import { APIResponseCollection } from "@/types/types";
import { useSearchParams } from "next/navigation";

type Props = {
  data: APIResponseCollection<"api::event.event">;
};

const EventListComponent = ({ data }: Props) => {
  const searchParams = useSearchParams();

  // Read pagination state from URL params, falling back to config defaults
  const currentPage = Math.max(1, Number(searchParams.get("page") || 1));
  const pageSize = Number(searchParams.get("size")) || AveConfig.pagination.sizes[0];

  const allItems = data?.data ?? [];
  const total = allItems.length;

  // Slice the full event list to show only the current page's items
  const startIndex = (currentPage - 1) * pageSize;
  const pageItems = allItems.slice(startIndex, startIndex + pageSize);

  return (
    <>
      <Pagination total={total} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 sm:gap-11">
        {pageItems.map((item) => {
          return (
            <EventItemComponent
              title={item.title}
              desc={item.description}
              slug={item.slug || "#"}
              dateFrom={item.eventstart?.toString()}
              dateTo={item.eventend?.toString()}
              imageURL={item.headingImage?.url}
              location={item.location}
              registrationDeadline={item.registrationUntilDate?.toString()}
              registrationUrl={item.registrationUrl}
              key={item.id}
            />
          );
        })}
      </div>
      <Pagination total={total} />
    </>
  );
};

export default EventListComponent;
