import { TanitasList } from "@/app/(subpages)/tanitasok/list";
import { AveConfig } from "@/app/app-config";
import { PageHeading } from "@/components/page-heading";
import Loader from "@/components/ui/loader";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: AveConfig.navItems.TANITASOK.title,
};

async function TanitasokPageRoute() {
  return (
    <>
      <PageHeading>{AveConfig.navItems.TANITASOK.title}</PageHeading>
      <Suspense fallback={<Loader />}>
        <TanitasList />
      </Suspense>
    </>
  );
}

export default TanitasokPageRoute;
