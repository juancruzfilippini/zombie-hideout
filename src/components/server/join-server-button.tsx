"use client";

import { RadioTower } from "lucide-react";

import { Button } from "@/components/ui/button";

export function JoinServerButton({ href, label }: { href: string; label: string }) {
  return (
    <Button asChild>
      <a href={href}>
        <RadioTower aria-hidden size={16} />
        {label}
      </a>
    </Button>
  );
}
