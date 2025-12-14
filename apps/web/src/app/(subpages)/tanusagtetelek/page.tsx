import { TanusagtetelList } from "./TanusagtetelList";
import { PageHeading } from "@/components/page-heading";
import Loader from "@/components/ui/loader";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Kik vagyunk?",
};

async function TanusagtetelPage() {
  return (
    <>
      <PageHeading>Tanúságtételek</PageHeading>
      <Suspense fallback={<Loader />}>
        <TanusagtetelList />
      </Suspense>
    </>
  );
}

export default TanusagtetelPage;
