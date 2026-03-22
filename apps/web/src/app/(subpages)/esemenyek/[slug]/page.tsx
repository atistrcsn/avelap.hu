import EventPage from "@/app/(subpages)/esemenyek/[slug]/EventPage";
import { getEvents, getOneEvent } from "@/utils/api-requests";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: {
    template: "%s | Események",
    default: "Események",
  }
};

export const dynamicParams = false;

export async function generateStaticParams() {
  let events = await getEvents();

  return events.data.map((data) => ({
    slug: data.slug,
  }));
}

export default async function EventRoute(
  props: {
    params: Promise<{ slug: string }>;
  }
) {
  const params = await props.params;
  const eventData = await getOneEvent(params.slug);

  return (
    <>
      <Suspense>
        <EventPage data={eventData} />
      </Suspense>
    </>
  );
}
