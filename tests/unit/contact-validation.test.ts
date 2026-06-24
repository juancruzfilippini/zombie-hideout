import { describe, expect, it } from "vitest";

import { contactMessageSchema } from "@/lib/validation/contact";

describe("contact validation", () => {
  it("accepts a complete message", () => {
    const result = contactMessageSchema.safeParse({
      name: "Operator",
      email: "operator@example.com",
      steamId: "",
      subject: "Suggestion",
      message: "Please add more community events to the server.",
      locale: "en",
      website: "",
    });

    expect(result.success).toBe(true);
  });

  it("rejects honeypot submissions", () => {
    const result = contactMessageSchema.safeParse({
      name: "Operator",
      email: "operator@example.com",
      subject: "Suggestion",
      message: "Please add more community events to the server.",
      locale: "en",
      website: "bot",
    });

    expect(result.success).toBe(false);
  });
});
