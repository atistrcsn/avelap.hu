"use client";

import EventItemComponent from "@/components/events/EventItemComponent";
import { Pagination } from "@/components/pagination/pagination";
import { APIResponseCollection } from "@/types/types";

type Props = {
  data: APIResponseCollection<"api::event.event">;
};

const EventListComponent = ({ data }: Props) => {
  return (
    <>
      <Pagination total={data?.meta.pagination.total || 6} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 sm:gap-11">
        {data?.data.map((item) => {
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
      <Pagination total={data?.meta.pagination.total || 6} />
    </>
  );
};

export default EventListComponent;
