"use client";

import { useState } from "react";

function getYoutubeId(url: string) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "youtu.be") return parsed.pathname.slice(1);
    if (parsed.pathname.startsWith("/shorts/")) return parsed.pathname.split("/")[2];
    return parsed.searchParams.get("v");
  } catch {
    return null;
  }
}

export function DeferredYoutube({
  url,
  title,
  posterUrl,
}: {
  url: string;
  title: string;
  posterUrl: string;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const videoId = getYoutubeId(url);

  if (!videoId) return null;

  return (
    <div className="resource-video">
      {isLoaded ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          className="resource-video-poster"
          style={{ backgroundImage: `url(${JSON.stringify(posterUrl).slice(1, -1)})` }}
          onClick={() => setIsLoaded(true)}
          aria-label={`Reproducir: ${title}`}
        >
          <span aria-hidden="true">▶</span>
        </button>
      )}
    </div>
  );
}
