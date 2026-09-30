export type RadarSource = "reddit" | "youtube" | "linkedin" | "propio" | "twitter";

export type RadarItem = {
  source: RadarSource;
  title: string;
  href: string;
  meta: string;
};

export const radarSources: Record<
  RadarSource,
  { label: string; icon: string }
> = {
  reddit: { label: "Reddit", icon: "/radar/reddit.svg" },
  youtube: { label: "YouTube", icon: "/radar/youtube.svg" },
  linkedin: { label: "LinkedIn", icon: "/radar/linkedin.svg" },
  propio: { label: "Artículo propio", icon: "/radar/propio-v2.png" },
  twitter: { label: "X / Twitter", icon: "/radar/twitter.svg" },
};

// Añade aquí las recomendaciones, siempre con la más reciente primero.
export const radarItems: RadarItem[] = [
  {
    source: "propio",
    title: "Cómo crear un portfolio con IA, Next.js y WordPress: guía paso a paso con prompts",
    href: "/articulos/crear-portfolio-ia-nextjs-wordpress",
    meta: "Portfolio · Artículo",
  },
    {
    source: "youtube",
    title: "The Most Valuable YouTube Training You'll Ever Watch",
    href: "https://www.youtube.com/watch?v=Ar2DXQorEm4&t=1345s",
    meta: "Youtube · Video",
  },
      {
    source: "youtube",
    title: "No te Hace Falta Dinero para Empezar un Negocio...",
    href: "https://www.youtube.com/watch?v=ex7m5bKGL8E",
    meta: "Youtube · Video",
  },
        {
    source: "linkedin",
    title: "Posicionando una web de 0 en 3 meses utilizando Search Console",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7494026120351096832/",
    meta: "LinkedIn · Post",
  },
          {
    source: "reddit",
    title: "I connected Google Search Console to AI via MCP",
    href: "https://www.reddit.com/r/microsaas/comments/1wrv5kn/i_connected_google_search_console_to_ai_via_mcp/",
    meta: "Reddit · Post",
  },
        {
    source: "youtube",
    title: "La psicología de los ganchos irresistibles",
    href: "https://www.youtube.com/watch?v=hvDfbYFeznQ",
    meta: "Youtube · Video",
  },
          {
    source: "twitter",
    title: "Ideas locas para monetizar tu visibilidad",
    href: "https://x.com/marclou/status/2100923868257169808",
    meta: "twitter · post · Marc Lou",
  },
];
