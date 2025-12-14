import { clsx, type ClassValue } from "clsx";
import { format, parse } from "date-fns";
import { startOfDay } from "date-fns/fp";
import { hu } from "date-fns/locale";
import { twMerge } from "tailwind-merge";

export function cn(...args: ClassValue[]) {
  return twMerge(clsx(args));
}

const dateParsePattern = "yyyy-MM-dd";
const dateFormatPattern = "yyyy. MMMM dd.";

export const formatDateRange = (start?: string, endDate?: string) => {
  const eventstart =
    start &&
    parse(start, dateParsePattern, new Date(), {
      locale: hu,
    });

  const eventend =
    endDate &&
    parse(endDate, dateParsePattern, new Date(), {
      locale: hu,
    });

  const dateRangeStr =
    eventstart &&
    eventend &&
    new Intl.DateTimeFormat("hu", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    }).formatRange(eventstart, eventend);

  return {
    startDate:
      eventstart &&
      format(eventstart, dateFormatPattern, {
        locale: hu,
      }),
    endDate:
      eventend &&
      format(eventend, dateFormatPattern, {
        locale: hu,
      }),
    range: dateRangeStr,
  };
};
