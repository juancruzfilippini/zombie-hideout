"use client";

import { Play } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export function VideoCard({
  title,
  youtubeId,
  placeholder,
}: {
  title: string;
  youtubeId?: string;
  placeholder: string;
}) {
  const [loaded, setLoaded] = useState(false);

  if (!youtubeId) {
    return (
      <div className="flex aspect-video items-center justify-center border border-white/10 bg-black/40 text-sm text-zinc-500">
        {placeholder}
      </div>
    );
  }

  if (!loaded) {
    return (
      <div className="flex aspect-video items-center justify-center border border-white/10 bg-black/40">
        <Button type="button" onClick={() => setLoaded(true)}>
          <Play aria-hidden size={16} />
          {title}
        </Button>
      </div>
    );
  }

  return (
    <iframe
      className="aspect-video w-full border border-white/10"
      src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
      title={title}
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
}
