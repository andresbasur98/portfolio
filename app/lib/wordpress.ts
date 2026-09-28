export type WordPressPost = {
  id: number;
  date: string;
  link: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  jetpack_featured_media_url?: string;
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url?: string;
      alt_text?: string;
    }>;
  };
};

export type Article = {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  href: string;
  image?: string;
  imageAlt?: string;
};

export type ArticlesResult =
  | { status: "success"; articles: Article[] }
  | { status: "empty"; articles: [] }
  | { status: "error"; articles: [] };

const POSTS_ENDPOINT =
  "https://public-api.wordpress.com/wp/v2/sites/andrescat2.wordpress.com/posts?_embed=wp:featuredmedia&per_page=4";

const decodeEntities = (value: string) =>
  value
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#039;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCharCode(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code: string) =>
      String.fromCharCode(Number.parseInt(code, 16)),
    );

export const cleanWordPressText = (value: string) =>
  decodeEntities(value.replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .trim();

export async function getLatestArticles(): Promise<ArticlesResult> {
  try {
    const response = await fetch(POSTS_ENDPOINT, {
      next: { revalidate: 3600, tags: ["wordpress-posts"] },
      signal: AbortSignal.timeout(6000),
      headers: { Accept: "application/json" },
    });

    if (!response.ok) return { status: "error", articles: [] };

    const posts = (await response.json()) as WordPressPost[];
    if (!Array.isArray(posts) || posts.length === 0) {
      return { status: "empty", articles: [] };
    }

    return {
      status: "success",
      articles: posts.map((post) => {
        const featured = post._embedded?.["wp:featuredmedia"]?.[0];
        return {
          id: post.id,
          title: cleanWordPressText(post.title.rendered),
          excerpt: cleanWordPressText(post.excerpt.rendered),
          date: post.date,
          href: post.link,
          image: post.jetpack_featured_media_url || featured?.source_url,
          imageAlt:
            featured?.alt_text ||
            `Imagen del artículo ${cleanWordPressText(post.title.rendered)}`,
        };
      }),
    };
  } catch {
    return { status: "error", articles: [] };
  }
}
