"use client";

import ReactPlayerClient from "@/components/reactPlayer";

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

interface TanusagtetelItemProps {
  title: string | null | undefined;
  desc?: string | null | undefined;
  videoID: string;
}

export function TanusagtetelItemComponent({
  title,
  desc,
  videoID,
}: TanusagtetelItemProps) {
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
