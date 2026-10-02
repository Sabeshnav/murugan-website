"use client";

/** Phones and small tablets get the lighter 1280px encodes of the scrubbed clips. */
export function isSmallScreen() {
  return typeof window !== "undefined" && Math.min(window.innerWidth, window.innerHeight * 1.78) < 900;
}

export function scrubSrc(name: string) {
  return `/media/${name}${isSmallScreen() ? "-sm" : ""}.mp4`;
}

const cache = new Map<string, Promise<string>>();

/**
 * Download a video completely and hand back a blob: URL. Scroll-scrubbing a partially
 * buffered video stutters, so scrubbed clips are always fully in memory before use.
 */
export function preloadVideo(url: string, onProgress?: (fraction: number) => void): Promise<string> {
  const hit = cache.get(url);
  if (hit) {
    hit.then(() => onProgress?.(1));
    return hit;
  }
  const p = (async () => {
    try {
      const res = await fetch(url);
      if (!res.ok || !res.body) throw new Error(String(res.status));
      const total = Number(res.headers.get("content-length")) || 0;
      const reader = res.body.getReader();
      const chunks: BlobPart[] = [];
      let loaded = 0;
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        loaded += value.length;
        if (total) onProgress?.(Math.min(loaded / total, 1));
      }
      onProgress?.(1);
      return URL.createObjectURL(new Blob(chunks, { type: "video/mp4" }));
    } catch {
      onProgress?.(1);
      return url; // fall back to streaming the file directly
    }
  })();
  cache.set(url, p);
  return p;
}
