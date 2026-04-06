import { AveConfig } from "@/app/app-config";
import { PageHeading } from "@/components/page-heading";
import { Metadata } from "next";
import { FaPhoneAlt } from "react-icons/fa";
import { FaAt, FaLocationPin } from "react-icons/fa6";

export const metadata: Metadata = {
  title: AveConfig.navItems.HASZNOS_CIMEK.title,
};

async function HasznosCimekPageRoute() {
  // const data = (await getHasznosLinkekContent())?;

  return (<>

    <article className="prose prose-lg lg:prose-xl prose-p:my-0 prose-h2:text-ave-gold-400-base">
      <PageHeading>{AveConfig.navItems.HASZNOS_CIMEK.title}</PageHeading>
      {/* {data && <BlocksRenderer content={data.tartalom} />} */}

      <h3 className="font-medium text-3xl font-playfairdisplay text-ave-blue mb-6 mt-12 leading-tight">
        Érvénytelenítési ügyek:
      </h3>

      <div>
        <strong>Vadász Kinga</strong>
        <div className="flex flow-row gap-2 items-center">
          <FaPhoneAlt className="text-ave-blue" />
          <a href="tel:+36202165409">06 20 216 5409</a>
        </div>
        <small>(az Eszterg.Bp-i egyh.megyében)</small>
      </div>

      <h3 className="font-medium text-3xl font-playfairdisplay text-ave-blue mb-6 mt-12 leading-tight">
        Gyászsegítő:
      </h3>

      <div>
        <strong>Tegzes Katalin</strong>
        <div className="flex flow-row gap-2 items-center">
          <FaPhoneAlt className="text-ave-blue" />
          <a href="tel:+36304629272">06 30 462 9272</a>
        </div>
        <div className="flex flow-row gap-2 items-center">
          <FaAt className="text-ave-blue" />
          <a href="mailto:tegzesk@hotmail.com" target="_blank">
            tegzesk@hotmail.com
          </a>
        </div>
      </div>

      <h3 className="font-medium text-3xl font-playfairdisplay text-ave-blue mb-6 mt-12 leading-tight">
        Gyermekpszichológus:
      </h3>

      <div>
        <strong>Nagy Judit</strong>
        <div className="flex flow-row gap-2 items-center">
          <FaPhoneAlt className="text-ave-blue" />
          <a href="tel:+36305660094">06 30 566 0094</a>
        </div>
        <div className="flex flow-row gap-2 items-center">
          <FaAt className="text-ave-blue" />
          <a href="mailto:syrupvul@yahoo.com" target="_blank">
            syrupvul@yahoo.com
          </a>
        </div>
      </div>

      <h3 className="font-medium text-3xl font-playfairdisplay text-ave-blue mb-6 mt-12 leading-tight">
        Pszichológus, pszichoterapeuta:
      </h3>

      <div>
        <strong>Madocsai Enikő</strong>
        <div className="flex flow-row gap-2 items-center">
          <FaPhoneAlt className="text-ave-blue" />
          <a href="tel:+36706059890">06 70 605 9890</a>
        </div>
        <div className="flex flow-row gap-2 items-center">
          <FaAt className="text-ave-blue" />
          <a href="mailto:eg.mad@hotmail.com" target="_blank">
            eg.mad@hotmail.com
          </a>
        </div>
      </div>

      <h3 className="font-medium text-3xl font-playfairdisplay text-ave-blue mb-6 mt-12 leading-tight">
        Mediátor/jogász:
      </h3>

      <div>
        <strong>Dencz Ákos</strong>
        <div className="flex flow-row gap-2 items-center">
          <FaPhoneAlt className="text-ave-blue" />
          <a href="tel:+36309606005">06 30 960 6005</a>
        </div>
        <div className="flex flow-row gap-2 items-center">
          <FaAt className="text-ave-blue" />
          <a href="mailto:akosdencz@gmail.com" target="_blank">
            akosdencz@gmail.com
          </a>
        </div>
      </div>

      <h3 className="font-medium text-3xl font-playfairdisplay text-ave-blue mb-6 mt-12 leading-tight">
        Gyóntató papok:
      </h3>

      <div className="flex flex-col gap-2 md:flex-row md:gap-8">
        <div>
          <strong>Horváth Zoltán</strong>
          <div className="flex flow-row gap-2 items-center">
            <FaPhoneAlt className="text-ave-blue" />
            <a href="tel:+36309606005">06 30 960 6005</a>
          </div>
          <div>Avilai Nagy Szent Teréz plébánia</div>
          <div className="flex flow-row gap-2 items-center">
            <FaLocationPin className="text-ave-blue" />
            <span>1065 Budapest, Pethő S. u. 6.</span>
          </div>
        </div>

        <div>
          <strong>Roska Péter</strong>
          <div className="flex flow-row gap-2 items-center">
            <FaPhoneAlt className="text-ave-blue" />
            <a href="tel:+36305175651">06 30 517 5651</a>
          </div>
          <div className="flex flow-row gap-2 items-center">
            <FaAt className="text-ave-blue" />
            <a href="mailto:roska.peter@katolikus.hu" target="_blank">
              roska.peter@katolikus.hu
            </a>
          </div>
        </div>
      </div>
    </article>

    <h1 className="text-ave-blue inline-flex flex-col items-start gap-1 mb-10 mt-10">
      <span className="text-[20px] font-semibold uppercase font-ibmplexsans">
        További     
      </span>
      <span className="text-4xl font-playfairdisplay font-bold">
        Támogatás, segítség
      </span>
    </h1>
    <a href="https://bizdramagad.hu/" target="_blank" rel="noopener" className="flex justify-center">
      <img
        src="/images/BRM_banner_920x110.jpg"
        alt="Bízd Rá Magad - Itt segítőkre találsz!"
        className="hidden md:block"
        width={920}
        height={110}
      />
      <img
        src="/images/BRM_kep_300x250.jpg"
        alt="Bízd Rá Magad - Itt segítőkre találsz!"
        className="block md:hidden w-[300px] h-[250px]"
      />
    </a>
    </>
  );
}

export default HasznosCimekPageRoute;
