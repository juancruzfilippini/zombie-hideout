import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zombie Hideout | Counter-Strike: Source Zombie Mod Server",
  description:
    "Join Zombie Hideout, a Counter-Strike: Source Zombie Mod community with custom content, updates, events and an international player base.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className="h-full bg-[#070907] text-zinc-50 antialiased"
      suppressHydrationWarning
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
