import { logger } from "@/utils/logger";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  if (
    req.headers.get("authorization") !==
    `Bearer ${process.env.NEXT_PRIVATE_CACHEBUSTER_TOKEN}`
  )
    return Response.json({ message: "Invalid token" }, { status: 401 });

  try {
    const { model } = await req.json();
    let tag;

    switch (model) {
      case "event":
        tag = "events";
        break;
      case "gyakori-kerdes":
      case "eventtype":
        tag = "eventtypes";
        break;
      case "hasznos-cimek-oldal":
        tag = "hasznos-cimek-oldal";
        break;
      // case "api::kapcsolat-oldal.kapcsolat-oldal":
      case "quote":
        tag = "quotes";
        break;
      // case "api::setting.setting":
      case "tanitas":
        tag = "tanitasok";
        break;
      case "tanusagtetel":
        tag = "tanusagtetelek";
        break;

      default:
        logger.error(`Invalid model ${model}`);
        return NextResponse.json(`Invalid uid ${model}`, { status: 500 });
    }

    revalidateTag(tag);
    logger.info({ revalidated: model, tag: tag });

    return NextResponse.json({ revalidated: model, tag: tag });
  } catch (err) {
    return NextResponse.json(`Error revalidating`, { status: 500 });
  }
}
