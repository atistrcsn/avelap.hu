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
