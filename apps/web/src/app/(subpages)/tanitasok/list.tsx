import ReactPlayerClient from "@/components/reactPlayer";
import { getTanitasList } from "@/utils/api-requests";

export async function TanitasList() {
  const data = await getTanitasList();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-20 md:gap-11">
        {data?.data.map((tanitas) => {
          const urll = (tanitas.video as unknown as any)
            .providerUid as string;

          return (
            <TanitasItemComponent
              key={tanitas.id}
              title={tanitas.cim ?? ""}
              desc={tanitas.leiras ?? undefined}
              videoID={urll}
            />
          );
        })}
      </div>
    </>
  );
}

const youtubePlayerConfig = {
  width: "100%",
  height: 150,
  youtube: {
    playerVars: {
      showinfo: 0,
      controls: 1,
      fs: 0,
      cc_load_policy: 0,
      playsinline: 1,
    },
  },
};

interface TanitasItemProps {
  title: string;
  desc?: string;
  videoID: string;
}

function TanitasItemComponent({ title, desc, videoID }: TanitasItemProps) {
  return (
    <article className="flex flex-col gap-3 mb-12">
      <h2 className="text-2xl font-playfairdisplay text-ave-blue font-bold">
        {title}
      </h2>
      <p className="text-ave-text-black leading-snug mb-2!">{desc}</p>
      <div className="mt-auto">
        <ReactPlayerClient
          url={`https://www.youtube.com/watch?v=${videoID}`}
          width={youtubePlayerConfig.width}
          height={youtubePlayerConfig.height}
          config={{
            youtube: youtubePlayerConfig.youtube,
          }}
          light={`https://img.youtube.com/vi/${videoID}/hqdefault.jpg`}
        />
      </div>
    </article>
  );
}
