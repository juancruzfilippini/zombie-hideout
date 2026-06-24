import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="section-shell min-h-[60svh]">
      <p className="font-mono text-[#ff4747]">404 / SIGNAL LOST</p>
      <h1 className="mt-4 text-5xl font-black uppercase text-zinc-50">Route unavailable</h1>
      <p className="mt-4 max-w-xl text-zinc-400">
        The requested file is missing, sealed, or not cleared for this language.
      </p>
      <Button asChild className="mt-8">
        <Link href="/es">Return to base</Link>
      </Button>
    </section>
  );
}
