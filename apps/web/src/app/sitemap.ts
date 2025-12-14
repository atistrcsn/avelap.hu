import { AveConfig } from "@/app/app-config";
import { getEvents, getEventTypeList } from "@/utils/api-requests";
import type { MetadataRoute } from "next";

const baseurl: string = process.env.BASEURL || "https://avelap.hu";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const links = [
    {
      url: baseurl,
      lastModified: new Date(),
      priority: 1,
      changeFrequency: "daily",
    },
  ] as MetadataRoute.Sitemap;

  [
    AveConfig.navItems.KIKVAGYUNK,
    AveConfig.navItems.PROGRAMJAINK,
    AveConfig.navItems.TANITASOK,
    AveConfig.navItems.TANUSAGTETELEK,
    AveConfig.navItems.HASZNOS_CIMEK,
    AveConfig.navItems.KAPCSOLAT,
  ].forEach((item) => {
    links.push({
      url: `${baseurl}${item.path}`,
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: "weekly",
    });
  });

  const [events, programs] = await Promise.all([
    getEvents(),
    getEventTypeList(),
  ]);

  events?.data?.map((evt) => {
    const url = `${baseurl}${AveConfig.navItems.ESEMENYEK.path}/${evt?.slug}`;
    links.push({
      url: url,
      lastModified: evt.updatedAt,
      priority: 0.8,
      changeFrequency: "weekly",
    });
  });

  programs?.data?.map((item) => {
    const url = `${baseurl}${AveConfig.navItems.PROGRAMJAINK.path}/${item?.slug}`;
    links.push({
      url: url,
      lastModified: item.updatedAt,
      priority: 0.8,
      changeFrequency: "daily",
    });
  });

  return links;
}
