"use client";

import { cn } from "@/utils";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "./quotes-style.css";

export interface QuoteItem {
  text: string;
  from: string;
  order?: number;
}

interface QuotesProps {
  quotes?: QuoteItem[];
}

function QuotesCarousel({ quotes = [] }: QuotesProps) {
  return (
    <Carousel
      interval={6000}
      transitionTime={100}
      centerMode={false}
      showThumbs={false}
      autoPlay={true}
      infiniteLoop={true}
      showArrows={false}
      showStatus={false}
      className={cn("text-white text-xl font-playfairdisplay")}
    >
      {quotes.map((qu, idx) => (
        <div
          key={idx}
          className="px-8 mb-3 min-h-full flex flex-col items-center justify-center gap-4"
        >
          <span className="line-clamp-3 italic">” {qu.text} „</span>
          <span className="font-ibmplexsans mb-4">{qu.from}</span>
        </div>
      ))}
    </Carousel>
  );
}

export default QuotesCarousel;
