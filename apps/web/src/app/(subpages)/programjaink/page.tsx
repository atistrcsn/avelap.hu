import { AveConfig } from "@/app/app-config";
import EventtypeListComponent from "@/components/eventtypes/EventtypeListComponent";
import { PageHeading } from "@/components/page-heading";
import Loader from "@/components/ui/loader";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: {
    template: "%s | Programjaink",
    default: "Programjaink",
  },
};

export const revalidate = AveConfig.cache.revalidateAfter;

export default async function ProgramjainkPage() {
  return (
    <>
      <PageHeading>Programjaink</PageHeading>

      <Suspense fallback={<Loader />}>
        <EventtypeListComponent />
      </Suspense>
    </>
  );
}
