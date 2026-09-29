import { youtubeVideos } from "../data/youtube";

type ParsedYoutubeVideo = {
  id: string;
  originalUrl: string;
  embedUrl: string;
};

const youtubeHosts = new Set([
  "youtube.com",
  "www.youtube.com",
  "m.youtube.com",
  "youtu.be",
  "www.youtu.be",
]);

function parseStartTime(value: string | null) {
  if (!value) return 0;
  if (/^\d+$/.test(value)) return Number(value);

  const match = value.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/i);
  if (!match) return 0;

  return (
    Number(match[1] ?? 0) * 3600 +
    Number(match[2] ?? 0) * 60 +
    Number(match[3] ?? 0)
  );
}

function parseYoutubeUrl(value: string): ParsedYoutubeVideo | null {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || !youtubeHosts.has(url.hostname)) {
      return null;
    }

    const pathParts = url.pathname.split("/").filter(Boolean);
    let id: string | null = null;

    if (url.hostname.endsWith("youtu.be")) {
      id = pathParts[0] ?? null;
    } else if (url.pathname === "/watch") {
      id = url.searchParams.get("v");
    } else if (["shorts", "embed", "live"].includes(pathParts[0] ?? "")) {
      id = pathParts[1] ?? null;
    }

    if (!id || !/^[a-zA-Z0-9_-]{11}$/.test(id)) return null;

    const start = parseStartTime(
      url.searchParams.get("t") ?? url.searchParams.get("start"),
    );
    const params = new URLSearchParams({ rel: "0" });
    if (start > 0) params.set("start", String(start));

    return {
      id,
      originalUrl: value,
      embedUrl: `https://www.youtube-nocookie.com/embed/${id}?${params}`,
    };
  } catch {
    return null;
  }
}

export function LatestVideos() {
  const videos = youtubeVideos
    .map(parseYoutubeUrl)
    .filter((video): video is ParsedYoutubeVideo => video !== null);

  if (videos.length === 0) return null;

  return (
    <section
      className="section videos-section"
      id="videos"
      aria-labelledby="videos-title"
    >
      <div className="section-heading compact">
        <div>
          <p className="eyebrow">En vídeo</p>
          <h2 id="videos-title">Últimos vídeos</h2>
        </div>
        <p>
          Ideas, procesos y aprendizajes contados desde la experiencia de
          construir productos digitales.
        </p>
      </div>

      <div className="videos-grid">
        {videos.map((video, index) => (
          <article className="video-card" key={`${video.id}-${index}`}>
            <div className="video-card-top">
              <span>YouTube</span>
              <span>{String(index + 1).padStart(2, "0")}</span>
            </div>
            <div className="video-frame">
              <iframe
                src={video.embedUrl}
                title={`Vídeo de YouTube ${index + 1}`}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <a
              className="text-link video-link"
              href={video.originalUrl}
              target="_blank"
              rel="noreferrer"
            >
              Abrir en YouTube <span aria-hidden="true">↗</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
