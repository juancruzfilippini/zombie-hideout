import { getConfiguredSocialLinks } from "@/config/social-links";

export function SocialLinks({ emptyLabel }: { emptyLabel: string }) {
  const links = getConfiguredSocialLinks();

  if (!links.length) {
    return <p className="text-sm text-zinc-500">{emptyLabel}</p>;
  }

  return (
    <ul className="flex flex-wrap gap-2">
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <li key={link.id}>
            <a
              href={link.url ?? "#"}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center border border-white/10 bg-white/[0.03] text-zinc-300 transition hover:border-[#b9ff46]/50 hover:text-[#b9ff46]"
              aria-label={link.label}
            >
              <Icon aria-hidden size={18} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
