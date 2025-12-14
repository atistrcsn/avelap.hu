import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/accordion/accordion";
import { APIResponseData } from "@/types/types";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

type AccordionProps = {
  data: APIResponseData<"api::gyakori-kerdes.gyakori-kerdes">[];
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
                <BlocksRenderer content={gyik.valasz} />
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  );
}
