"use client";

import { Clipboard, Check } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export function CopyServerAddressButton({
  value,
  label,
  copiedLabel,
}: {
  value: string;
  label: string;
  copiedLabel: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <Button type="button" variant="secondary" onClick={copy}>
      {copied ? <Check aria-hidden size={16} /> : <Clipboard aria-hidden size={16} />}
      {copied ? copiedLabel : label}
    </Button>
  );
}
