"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X, Volume2, VolumeX } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { VideoCard } from "@/components/media/video-card";
import { Button } from "@/components/ui/button";
import { mediaItems, type MediaKind, type MediaTag } from "@/content/media";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";

type Filter = "all" | MediaKind | MediaTag;

export function MediaGallery({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState<number | null>(null);
  const [audioAllowed, setAudioAllowed] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const activeMediaItems = useMemo(
    () => mediaItems.filter((item) => item.authorized),
    [],
  );
  const hasMusic = useMemo(
    () => activeMediaItems.some((item) => item.kind === "music"),
    [activeMediaItems],
  );

  useEffect(() => {
    const id = window.setTimeout(() => {
      setAudioAllowed(window.localStorage.getItem("zh_audio_allowed") === "true");
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  const filters = useMemo(() => {
    const next: [Filter, string][] = [["all", dict.common.all]];
    if (activeMediaItems.some((item) => item.kind === "screenshot")) {
      next.push(["screenshot", dict.common.screenshots]);
    }
    if (activeMediaItems.some((item) => item.kind === "video")) {
      next.push(["video", dict.common.videos]);
    }
    if (activeMediaItems.some((item) => item.kind === "music")) {
      next.push(["music", dict.common.music]);
    }
    if (activeMediaItems.some((item) => item.tags.includes("community"))) {
      next.push(["community", dict.common.community]);
    }
    if (activeMediaItems.some((item) => item.tags.includes("updates"))) {
      next.push(["updates", dict.nav.updates]);
    }
    if (activeMediaItems.some((item) => item.tags.includes("counter-strike-source"))) {
      next.push(["counter-strike-source", dict.common.css]);
    }
    if (activeMediaItems.some((item) => item.tags.includes("counter-strike-2"))) {
      next.push(["counter-strike-2", dict.common.cs2]);
    }
    return next;
  }, [activeMediaItems, dict]);

  const visibleItems = useMemo(() => {
    if (filter === "all") return activeMediaItems;
    return activeMediaItems.filter(
      (item) => item.kind === filter || item.tags.includes(filter as MediaTag),
    );
  }, [activeMediaItems, filter]);

  const item = active === null ? null : visibleItems[active];

  useEffect(() => {
    if (active !== null) closeRef.current?.focus();

    function handleKey(event: KeyboardEvent) {
      if (active === null) return;
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive((value) => nextIndex(value, visibleItems.length));
      if (event.key === "ArrowLeft") setActive((value) => previousIndex(value, visibleItems.length));
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [active, visibleItems.length]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2" role="tablist" aria-label="Media filters">
        {filters.map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setFilter(id)}
            className={cn(
              "border px-3 py-2 text-xs font-bold uppercase tracking-[0.08em] transition",
              filter === id
                ? "border-[#b9ff46] bg-[#b9ff46] text-black"
                : "border-white/10 bg-white/[0.03] text-zinc-300 hover:border-white/25",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {hasMusic ? (
        <div className="mb-6 flex items-center justify-between border border-white/10 bg-white/[0.03] px-4 py-3">
          <span className="text-sm text-zinc-400">{dict.common.music}</span>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => {
              const next = !audioAllowed;
              setAudioAllowed(next);
              window.localStorage.setItem("zh_audio_allowed", String(next));
            }}
          >
            {audioAllowed ? <Volume2 aria-hidden size={16} /> : <VolumeX aria-hidden size={16} />}
            {audioAllowed ? "Audio ON" : "Audio OFF"}
          </Button>
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visibleItems.map((media, index) => (
          <button
            key={media.id}
            type="button"
            onClick={() => setActive(index)}
            className="group overflow-hidden border border-white/10 bg-[#111611] text-left transition hover:border-[#b9ff46]/50"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={media.src}
                alt={media.alt[locale]}
                fill
                loading="lazy"
                className="object-cover transition group-hover:scale-[1.03]"
              />
            </div>
            <div className="p-4">
              <p className="text-sm font-black uppercase text-zinc-50">{media.title[locale]}</p>
              <p className="mt-2 line-clamp-2 text-sm text-zinc-400">{media.description[locale]}</p>
            </div>
          </button>
        ))}
      </div>

      {item ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={item.title[locale]}
          className="fixed inset-0 z-50 grid place-items-center bg-black/85 p-4"
        >
          <div className="max-h-[90svh] w-full max-w-5xl overflow-auto border border-white/10 bg-[#0a0d0b] p-4">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="text-xl font-black uppercase text-zinc-50">{item.title[locale]}</h3>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setActive(null)}
                className="flex h-10 w-10 items-center justify-center border border-white/10 text-zinc-300"
                aria-label="Close media"
              >
                <X aria-hidden size={18} />
              </button>
            </div>
            {item.kind === "video" ? (
              <VideoCard
                title={item.title[locale]}
                youtubeId={item.youtubeId}
                placeholder={dict.common.configuredSoon}
              />
            ) : (
              <div className="relative aspect-video">
                <Image src={item.src} alt={item.alt[locale]} fill className="object-contain" />
              </div>
            )}
            <p className="mt-4 text-sm leading-6 text-zinc-300">{item.description[locale]}</p>
            {visibleItems.length > 1 ? (
              <div className="mt-4 flex justify-between">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setActive((value) => previousIndex(value, visibleItems.length))}
                >
                  <ChevronLeft aria-hidden size={16} />
                  Prev
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setActive((value) => nextIndex(value, visibleItems.length))}
                >
                  Next
                  <ChevronRight aria-hidden size={16} />
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function nextIndex(value: number | null, length: number): number {
  if (value === null) return 0;
  return (value + 1) % length;
}

function previousIndex(value: number | null, length: number): number {
  if (value === null) return 0;
  return (value - 1 + length) % length;
}
