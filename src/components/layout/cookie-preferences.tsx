"use client";

import { useEffect, useState } from "react";
import { Settings } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CookiePreferences() {
  const [visible, setVisible] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => {
      setAccepted(window.localStorage.getItem("zh_cookie_preferences") === "accepted");
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  if (accepted && !visible) {
    return (
      <button
        type="button"
        className="fixed bottom-4 right-4 z-40 hidden h-10 w-10 items-center justify-center border border-white/10 bg-black/60 text-zinc-300 backdrop-blur transition hover:text-[#b9ff46] md:flex"
        onClick={() => setVisible(true)}
        aria-label="Cookie preferences"
      >
        <Settings aria-hidden size={17} />
      </button>
    );
  }

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 max-w-xl border border-white/10 bg-[#0b0f0c]/95 p-4 text-sm text-zinc-300 shadow-2xl backdrop-blur md:left-auto">
      <p>
        This site stores only local preferences such as language, audio, and cookie
        acknowledgement.
      </p>
      <div className="mt-3 flex gap-2">
        <Button
          type="button"
          size="sm"
          onClick={() => {
            window.localStorage.setItem("zh_cookie_preferences", "accepted");
            setAccepted(true);
            setVisible(false);
          }}
        >
          OK
        </Button>
        {visible ? (
          <Button type="button" size="sm" variant="ghost" onClick={() => setVisible(false)}>
            Close
          </Button>
        ) : null}
      </div>
    </div>
  );
}
