import { AveInlineLinkExternal } from "@/components/link-external";
import { PageHeading } from "@/components/page-heading";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kik vagyunk?",
};

async function KikVagyunkPage() {
  return (
    <article className="prose prose-lg lg:prose-xl">
      <PageHeading>Kik vagyunk?</PageHeading>
      <p>Az AVE hétvégesorozatot az Emmánuel Közösség szervezi.</p>
      <p>
        Az Emmánuel Közösség a karizmatikus megújulás gyümölcseként jött létre
        1972-ben Franciaországban. Alapítója Pierre Goursat és Martine Laffitte.
        Az Emmánuel Közösségnek ma a világ 60 országában mintegy tizenkétezer
        tagja van. Lelki központja a közép-franciaországi Paray-le-Monial,
        Alacoque Szent Margit városa, a Jézus Szíve-tisztelet központja, ahol
        évről évre sokakat vonzó, nemzetközi lelkigyakorlatokat tartanak.
      </p>
      <p>
        Hazánkba húsz évvel a megalakulása után került az Emmánuel Közösség
        Marik József és Erzsébet révén.
      </p>

      <strong>Az AVE szolgálat ágai Magyarországon:</strong>
      <ul>
        <li>AVE kurzus egyedülálló szülőknek</li>
        <li>
          AVE kurzus újraházasodottaknak
        </li>
        <li>
          AVE hétvégesorozat házaspároknak
        </li>
        <li>
          Abortusztól szenvedőknek
        </li>
      </ul>

      <p>
        Az Emmánuel Közösségről és egyéb szolgálatairól a weboldalukon
        olvashatsz: <br />
        <AveInlineLinkExternal href="https://emmanuelkozosseg.hu">
          www.emmanuelkozosseg.hu
        </AveInlineLinkExternal>
      </p>
    </article>
  );
}

export default KikVagyunkPage;
