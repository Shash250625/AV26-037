import { createFileRoute } from "@tanstack/react-router";

// Splits text into <=180 char chunks at sentence/word boundaries (Google TTS limit ~200).
function chunk(text: string, max = 180): string[] {
  const out: string[] = [];
  let s = text.trim();
  while (s.length > max) {
    let cut = s.lastIndexOf(" ", max);
    const punct = Math.max(s.lastIndexOf(". ", max), s.lastIndexOf("। ", max), s.lastIndexOf("? ", max), s.lastIndexOf("! ", max));
    if (punct > max * 0.5) cut = punct + 1;
    if (cut <= 0) cut = max;
    out.push(s.slice(0, cut).trim());
    s = s.slice(cut).trim();
  }
  if (s) out.push(s);
  return out;
}

async function fetchChunk(text: string, lang: string): Promise<Uint8Array> {
  const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=${encodeURIComponent(lang)}&client=tw-ob&ttsspeed=1&total=1&idx=0&textlen=${text.length}`;
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      "Referer": "https://translate.google.com/",
      "Accept": "audio/mpeg, */*",
    },
  });
  if (!res.ok) throw new Error(`tts fetch failed: ${res.status}`);
  return new Uint8Array(await res.arrayBuffer());
}

export const Route = createFileRoute("/api/public/tts")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const u = new URL(request.url);
        const text = (u.searchParams.get("text") ?? "").slice(0, 2000);
        const lang = (u.searchParams.get("lang") ?? "en").slice(0, 8);
        if (!text) return new Response("missing text", { status: 400 });
        try {
          const parts = chunk(text);
          const buffers = await Promise.all(parts.map((p) => fetchChunk(p, lang)));
          const total = buffers.reduce((n, b) => n + b.length, 0);
          const merged = new Uint8Array(total);
          let off = 0;
          for (const b of buffers) { merged.set(b, off); off += b.length; }
          return new Response(merged, {
            status: 200,
            headers: {
              "Content-Type": "audio/mpeg",
              "Cache-Control": "public, max-age=86400",
              "Access-Control-Allow-Origin": "*",
            },
          });
        } catch (e) {
          return new Response(`tts error: ${(e as Error).message}`, { status: 502 });
        }
      },
    },
  },
});