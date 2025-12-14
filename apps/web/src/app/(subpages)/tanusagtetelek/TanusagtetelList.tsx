import { TanusagtetelItemComponent } from "@/app/(subpages)/tanusagtetelek/list";
import { getTanusagtetelList } from "@/utils/api-requests";


export async function TanusagtetelList() {
  const data = await getTanusagtetelList();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-20 md:gap-11 md:gap-y-20">
        {data?.data?.map((tetel) => {
          const urll = (tetel.video as unknown as any)
            .providerUid as string;

          return (
            <TanusagtetelItemComponent
              key={tetel.id}
              title={tetel.cim}
              desc={tetel.leiras}
              videoID={urll} />
          );
        })}
      </div>
    </>
  );
}
