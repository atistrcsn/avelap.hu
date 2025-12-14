import QuotesCarousel, { QuoteItem } from "@/components/quotesCarousel";
import { getQuoteList } from "@/utils/api-requests";

async function QuotesComponent() {
  const data = await getQuoteList();

  return (
    <>
      <QuotesCarousel
        quotes={data?.data?.map(
          (dat) =>
            ({
              from: dat.forras,
              text: dat.idezet,
              order: dat.rank,
            } as QuoteItem)
        )}
      />
    </>
  );
}

export default QuotesComponent;
