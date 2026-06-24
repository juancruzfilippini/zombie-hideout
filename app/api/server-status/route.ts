import { queryServerStatus } from "@/lib/server-query/status";
import type { ServerStatusResponse } from "@/lib/server-query/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

let cache: { data: ServerStatusResponse; expiresAt: number } | null = null;

export async function GET() {
  const now = Date.now();
  if (cache && cache.expiresAt > now) {
    return Response.json(cache.data, {
      headers: { "Cache-Control": "public, s-maxage=45, stale-while-revalidate=30" },
    });
  }

  const data = await queryServerStatus();
  cache = { data, expiresAt: now + 45_000 };
  return Response.json(data, {
    headers: { "Cache-Control": "public, s-maxage=45, stale-while-revalidate=30" },
  });
}
