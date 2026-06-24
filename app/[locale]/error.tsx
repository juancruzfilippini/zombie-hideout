"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[ui-error]", error.digest ?? error.message);
  }, [error]);

  return (
    <section className="section-shell min-h-[60svh]">
      <p className="font-mono text-[#ff4747]">ERROR / CONTAINMENT BREACH</p>
      <h1 className="mt-4 text-5xl font-black uppercase text-zinc-50">System recovered</h1>
      <p className="mt-4 max-w-xl text-zinc-400">
        Something failed while rendering this classified file.
      </p>
      <Button type="button" className="mt-8" onClick={reset}>
        Retry
      </Button>
    </section>
  );
}
