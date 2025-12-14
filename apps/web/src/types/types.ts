import type { UID, Data, Utils } from "@strapi/strapi";

type IDProperty = { id: number };


export interface APIResponseCollectionMetadata {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface APIResponse<TContentTypeUID extends UID.ContentType> {
  data: Data.ContentType<TContentTypeUID>;
}

export interface APIResponseCollection<
  TContentTypeUID extends UID.ContentType
> {
  data: Data.ContentType<TContentTypeUID>[];
  meta: APIResponseCollectionMetadata;
}
