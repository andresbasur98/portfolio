export type RadarSource = "reddit" | "youtube" | "linkedin" | "propio";

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
};

// Añade aquí las recomendaciones, siempre con la más reciente primero.
export const radarItems: RadarItem[] = [
  {
    source: "propio",
    title: "¡Hola mundo!",
    href: "/articulos/hola-mundo",
    meta: "Portfolio · Artículo",
  },
    {
    source: "youtube",
    title: "The Most Valuable YouTube Training You'll Ever Watch",
    href: "https://www.youtube.com/watch?v=Ar2DXQorEm4&t=1345s",
    meta: "Youtube · Video",
  },
];
