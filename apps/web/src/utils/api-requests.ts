import { APIResponseCollection, APIResponse } from "@/types/types";
import { logger } from "@/utils/logger";
import { format } from "date-fns";
import qs from "qs";
import { strapi } from '@strapi/client';


const backendBaseURL = process.env.apiBaseURL as string;
const apiURL = (backendBaseURL + "/api") as string;

const client = strapi({
  baseURL: apiURL
});


type QueryType = {
  [name: string]: string | number;
};

const createURL = (path: string, qStrings?: QueryType) => {
  const query = qs.stringify(
    { ...qStrings },
    { charset: "utf-8", encode: false, arrayFormat: "brackets" }
  );

  return apiURL + path + ((qStrings && "?" + query) || "");
};

const createPaginatedURL = (
  path: string,
  page: number,
  limit: number,
  qStrings?: QueryType
) => {
  return createURL(path, {
    "pagination[page]": page,
    "pagination[pageSize]": limit,
    ...qStrings,
  });
};

export async function getEvents(qStrings?: QueryType) {
  const url = createURL("/events", { populate: "*", ...qStrings });
  const res = await fetch(url, { next: { tags: ["events"] } }).catch((e) => {
    logger.error(e);
  });
  return (await res?.json()) as APIResponseCollection<"api::event.event">;
}

export const getEventListQueryParams = (date: number = Date.now()) => ({
  publicationState: "live",
  "sort[0]": "eventstart:asc",
  "filters[eventstart][$gte]": format(date, "yyyy-MM-dd"),
});

export async function getPaginatedEvents(
  page: number,
  limit: number,
  qStrings?: QueryType
) {
  const url = createPaginatedURL("/events", page, limit, {
    populate: "*",
    ...qStrings,
  });
  const res = await fetch(url, { next: { tags: ["events"] } });
  return (await res.json()) as APIResponseCollection<"api::event.event">;
}

export async function getAppSettings() {
  const url = createURL(`/setting`, { populate: "*" });
  const response = await fetch(url, { next: { tags: ["setting"] } }).then(
    (res) => res.json()
  );

  return response.data as APIResponse<"api::setting.setting">;
}

export async function getHasznosLinkekContent() {
  const url = createURL(`/hasznos-cimek-oldal`);
  const response = await fetch(url, {
    next: { tags: ["hasznos-cimek-oldal"] },
  }).then((res) => res.json());

  return response.data as APIResponse<"api::hasznos-cimek-oldal.hasznos-cimek-oldal"> | null;
}

export async function getQuoteList() {
  const url = createURL(`/quotes`, {
    publicationState: "live",
    "sort[0]": "rank:asc",
  });
  const response = await fetch(url, { next: { tags: ["quotes"] } }).then(
    (res) => res.json()
  );

  return response as APIResponseCollection<"api::quote.quote">;
}

export async function getOneEvent(slug: string) {
  const url = createURL(`/events`, {
    populate: "*",
    "filters[slug][$eq]": slug,
  });
  const res = await fetch(url, { next: { tags: ["events"] } });
  const coll = (await res.json()) as APIResponseCollection<"api::event.event">;

  if (coll.meta.pagination.total == 1) {
    return coll.data[0] as unknown as APIResponse<"api::event.event">;
  } else Promise.reject();
}

export async function getEventTypeList(qStrings?: QueryType) {
  const queryParams = {
    populate: "*",
    publicationState: "live",
    "sort[0]": "rank:asc",
    ...qStrings,
  };
  const url = createPaginatedURL("/eventtypes", 1, 100, queryParams);
  const res = await fetch(url, { next: { tags: ["eventtypes"] } });
  return (await res.json()) as APIResponseCollection<"api::eventtype.eventtype">;
}

export async function getOneEventType(slug: string) {
  const url = createURL(`/eventtypes`, {
    populate: "*",
    publicationState: "live",
    "filters[slug][$eq]": slug,
  });
  const res = await fetch(url, { next: { tags: ["eventtypes"] } });
  const coll =
    (await res.json()) as APIResponseCollection<"api::eventtype.eventtype">;

  if (coll.meta.pagination.total == 1) {
    return coll.data[0] as unknown as APIResponse<"api::eventtype.eventtype">;
  } else Promise.reject();
}

export async function getTanitasList(qStrings?: QueryType) {
  const url = createURL("/tanitasok", {
    populate: "*",
    publicationState: "live",
    "sort[0]": "rank:asc",
    ...qStrings,
  });
  const res = await fetch(url, { next: { tags: ["tanitasok"] } }).catch((e) => {
    logger.error(e);
  });
  return (await res?.json()) as APIResponseCollection<"api::tanitas.tanitas">;
}

export async function getTanusagtetelList(qStrings?: QueryType) {
  const url = createURL("/tanusagtetelek", {
    populate: "*",
    publicationState: "live",
    "sort[0]": "rank:asc",
    ...qStrings,
  });
  const res = await fetch(url, { next: { tags: ["tanusagtetelek"] } }).catch(
    (e) => {
      logger.error(e);
    }
  );
  return (await res?.json()) as APIResponseCollection<"api::tanusagtetel.tanusagtetel">;
}

export { apiURL, backendBaseURL };
