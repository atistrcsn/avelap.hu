import EventTypePage from "@/app/(subpages)/programjaink/[slug]/ProgramjainkPage";
import { APIResponse } from "@/types/types";
import { getEventTypeList, getOneEventType } from "@/utils/api-requests";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: {
    template: "%s | Programjaink",
    default: "Programjaink",
  },
};

export const dynamicParams = false;

export async function generateStaticParams() {
  let events = await getEventTypeList();

  return events.data
    .filter((data) => data.slug)
    .map((data) => ({ slug: data.slug as string }));
}

export default async function EventRoute(
  props: {
    params: Promise<{ slug: string }>;
  }
) {
  const params = await props.params;
  const eventType = await getOneEventType(params.slug);

  return (
    <>
      <Suspense>
        <EventTypePage datas={eventType} />
      </Suspense>
    </>
  );
}
