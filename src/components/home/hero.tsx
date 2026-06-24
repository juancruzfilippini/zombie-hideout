import Image from "next/image";

import { CopyServerAddressButton } from "@/components/server/copy-server-address-button";
import { JoinServerButton } from "@/components/server/join-server-button";
import { LiveServerStatus } from "@/components/server/live-server-status";
import { Badge } from "@/components/ui/badge";
import { serverConfig } from "@/content/site";
import type { Dictionary } from "@/i18n/dictionaries";

export function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_20%_20%,rgba(185,255,70,0.14),transparent_28%),radial-gradient(circle_at_80%_10%,rgba(240,138,36,0.14),transparent_24%),#070907]" />
      <Image
        src="/assets/community/real-zombies-industrial-yard.jpg"
        alt=""
        fill
        priority
        className="hero-asset -z-10 object-cover opacity-45"
      />
      <div className="scanlines absolute inset-0 -z-10" />
      <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
        <div className="max-w-4xl">
          <Badge variant="green">{dict.hero.badge}</Badge>
          <p className="mt-6 text-sm font-black uppercase tracking-[0.36em] text-[#b9ff46]">
            {dict.hero.eyebrow}
          </p>
          <h1 className="glitch mt-5 max-w-4xl text-5xl font-black uppercase leading-none text-zinc-50 sm:text-7xl lg:text-8xl">
            <span>HIDEOUT GAMING</span>
          </h1>
          <p className="mt-5 max-w-3xl text-2xl font-black uppercase tracking-[0.08em] text-zinc-100 sm:text-4xl">
            {dict.hero.title}
          </p>
          <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg">{dict.hero.lead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <JoinServerButton href={serverConfig.steamConnectUrl} label={dict.common.playNow} />
            <CopyServerAddressButton
              value={serverConfig.consoleCommand}
              label={dict.common.copyIp}
              copiedLabel={dict.common.copied}
            />
          </div>
          <div className="mt-5 max-w-lg border border-white/10 bg-black/30 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">
              {dict.hero.commandLabel}
            </p>
            <code className="mt-1 block break-all font-mono text-sm text-[#b9ff46]">
              {serverConfig.consoleCommand}
            </code>
          </div>
        </div>
        <div className="lg:justify-self-end">
          <LiveServerStatus dict={dict} />
        </div>
      </div>
    </section>
  );
}
