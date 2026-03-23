"use client";
import { PageHeading } from "@/components/page-heading";
import { SubHeading, SubHeadingType } from "@/components/ui/typography";
import { FaPhoneAlt } from "react-icons/fa";
import { FaAt, FaEnvelope } from "react-icons/fa6";

function KapcsolatPage() {
  return (
    <>
      <PageHeading>Kapcsolat</PageHeading>
      <p>
        Nem vagy egyedül. Ha szeretnél beszélgetni, vagy csak megosztanád velünk
        történetedet, írj egy e-mailt, és itt vagyunk, hogy meghallgassunk.
      </p>
      
      <div className="flex flex-col md:flex-row md:gap-16">
        <div>
          <SubHeading type={SubHeadingType.H3}>
            <FaPhoneAlt size={16} /> <span>AVE telefonszámok:</span>
          </SubHeading>
          <p>
            <strong>
              <a href="tel:06204364243">06 20 4364-243</a>
            </strong>
          </p>
        </div>
        <div>
          <SubHeading type={SubHeadingType.H3}>
            <FaAt size={16} /> <span>E-mail cím:</span>
          </SubHeading>
          <p>
            <a
              href="mailto:avekurzus@gmail.com"
              target="_blank"
              title="Kattintson ide az alapértelmezett levelező program megnyitásához."
              className="font-mono" rel="noreferrer"
            >
              avekurzus [kukac] gmail.com
            </a>
          </p>
        </div>
      </div>

      <SubHeading type={SubHeadingType.H2}>
        <span>AVE-kurzus információk, jelentkezés:</span>
      </SubHeading>
      <div className="flex flex-col md:flex-row md:gap-16">
        <div className="">
          <SubHeading type={SubHeadingType.H3}>
            <FaPhoneAlt size={16} /> <span>Telefon:</span>
          </SubHeading>
          <p className="inline-flex flex-row gap-3">
            <a href="tel:06304540939">
              <strong>06 30 454-0939</strong>
            </a>
          </p>
        </div>
        <div>
          <SubHeading type={SubHeadingType.H3}>
            <FaAt size={16} /> <span>E-mail cím:</span>
          </SubHeading>
          <p>
            <a
              href="mailto:avekurzus@gmail.com"
              target="_blank"
              title="Kattintson ide az alapértelmezett levelező program megnyitásához."
              className="font-mono" rel="noreferrer"
            >
              avekurzus [kukac] gmail.com
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default KapcsolatPage;
