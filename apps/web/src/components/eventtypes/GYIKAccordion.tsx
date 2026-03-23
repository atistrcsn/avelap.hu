import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/accordion/accordion";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { Data } from "@strapi/strapi";

type AccordionProps = {
  data: Data.ContentType<"api::gyakori-kerdes.gyakori-kerdes">[];
};

export default function GYIKAccordion({ data }: AccordionProps) {
  return (
    <>
      <Accordion type="single" collapsible>
        {data?.map((gyik) => {
          return (
            <AccordionItem key={gyik.id} value={`${gyik.id}`}>
              <AccordionTrigger>{gyik.kerdes}</AccordionTrigger>
              <AccordionContent className="">
                {gyik.valasz && <BlocksRenderer content={gyik.valasz} />}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  );
}
