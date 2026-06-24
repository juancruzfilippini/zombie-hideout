import { z } from "zod";

export const contactMessageSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  steamId: z.string().trim().max(64).optional().or(z.literal("")),
  subject: z.string().trim().min(3).max(120),
  message: z.string().trim().min(10).max(2_000),
  locale: z.enum(["es", "en"]),
  website: z.string().max(0),
});

export type ContactMessageInput = z.infer<typeof contactMessageSchema>;
