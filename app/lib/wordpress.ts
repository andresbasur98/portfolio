import { cache } from "react";

type WordPressRendered = { rendered: string };

type WordPressYoastImage = {
  url?: string;
  width?: number;
  height?: number;
  alt?: string;
  type?: string;
};

type WordPressYoastHeadJson = {
  title?: string;
  description?: string;
  og_title?: string;
  og_description?: string;
  og_image?: WordPressYoastImage | WordPressYoastImage[];
};

export type WordPressPost = {
  id: number;
  slug: string;
  date: string;
  modified: string;
  link: string;
  status: "publish" | string;
  title: WordPressRendered;
  excerpt: WordPressRendered;
  content: WordPressRendered;
  yoast_head_json?: WordPressYoastHeadJson;
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
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  href: string;
  image?: string;
  imageAlt?: string;
};

export type ArticleDetail = Article & {
  modified: string;
  content: string;
  seoTitle?: string;
  seoDescription?: string;
  openGraphTitle?: string;
  openGraphDescription?: string;
  openGraphImage?: WordPressYoastImage & { url: string };
};

export type SitemapArticle = Pick<
  WordPressPost,
  "id" | "slug" | "date" | "modified"
>;

export type ArticlesResult =
  | { status: "success"; articles: Article[] }
  | { status: "empty"; articles: [] }
  | { status: "error"; articles: [] };

export type PaginatedArticlesResult = {
  status: "success" | "empty" | "out-of-range" | "error";
  articles: Article[];
  page: number;
  totalPages: number;
  totalArticles: number;
};

export const ARTICLES_PAGE_SIZE = 9;

const POSTS_ENDPOINT =
  "https://public-api.wordpress.com/wp/v2/sites/andrescat2.wordpress.com/posts";
const CACHE_SECONDS = 3600;

const createPostsUrl = (params: Record<string, string>) => {
  const url = new URL(POSTS_ENDPOINT);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.set(key, value),
  );
  return url.toString();
};

const fetchPosts = (params: Record<string, string>) =>
  fetch(createPostsUrl(params), {
    next: { revalidate: CACHE_SECONDS, tags: ["wordpress-posts"] },
    signal: AbortSignal.timeout(6000),
    headers: { Accept: "application/json" },
  });

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

const toArticle = (post: WordPressPost): Article => {
  const title = cleanWordPressText(post.title.rendered);
  const featured = post._embedded?.["wp:featuredmedia"]?.[0];

  return {
    id: post.id,
    slug: post.slug,
    title,
    excerpt: cleanWordPressText(post.excerpt.rendered),
    date: post.date,
    href: `/articulos/${encodeURIComponent(post.slug)}`,
    image: post.jetpack_featured_media_url || featured?.source_url,
    imageAlt: featured?.alt_text || `Imagen del artículo ${title}`,
  };
};

function getFirstValidYoastImage(
  value: WordPressYoastHeadJson["og_image"],
): ArticleDetail["openGraphImage"] {
  const candidates = Array.isArray(value) ? value : value ? [value] : [];

  for (const candidate of candidates) {
    const imageUrl = candidate.url?.trim();
    if (!imageUrl) continue;

    try {
      const parsedUrl = new URL(imageUrl);
      if (parsedUrl.protocol !== "https:" && parsedUrl.protocol !== "http:") {
        continue;
      }

      return {
        url: parsedUrl.toString(),
        width:
          typeof candidate.width === "number" && candidate.width > 0
            ? candidate.width
            : undefined,
        height:
          typeof candidate.height === "number" && candidate.height > 0
            ? candidate.height
            : undefined,
        alt: candidate.alt
          ? cleanWordPressText(candidate.alt) || undefined
          : undefined,
        type: candidate.type,
      };
    } catch {
      continue;
    }
  }

  return undefined;
}

export async function getLatestArticles(): Promise<ArticlesResult> {
  try {
    const response = await fetchPosts({
      _embed: "wp:featuredmedia",
      per_page: "4",
      status: "publish",
      orderby: "date",
      order: "desc",
    });

    if (!response.ok) return { status: "error", articles: [] };

    const posts = (await response.json()) as WordPressPost[];
    if (!Array.isArray(posts) || posts.length === 0) {
      return { status: "empty", articles: [] };
    }

    return { status: "success", articles: posts.map(toArticle) };
  } catch {
    return { status: "error", articles: [] };
  }
}

async function getArticleCount() {
  const response = await fetchPosts({
    _fields: "id",
    page: "1",
    per_page: "1",
    status: "publish",
  });

  if (!response.ok) return null;

  const totalArticles = Number(response.headers.get("x-wp-total") ?? "0");
  return Number.isFinite(totalArticles) ? totalArticles : null;
}

export const getArticlesPage = cache(async (
  page: number,
): Promise<PaginatedArticlesResult> => {
  const baseResult = {
    page,
    totalPages: 0,
    totalArticles: 0,
  };

  try {
    const response = await fetchPosts({
      _embed: "wp:featuredmedia",
      page: String(page),
      per_page: String(ARTICLES_PAGE_SIZE),
      status: "publish",
      orderby: "date",
      order: "desc",
    });

    if (!response.ok) {
      if (response.status === 400 && page > 1) {
        const totalArticles = await getArticleCount();
        if (totalArticles !== null) {
          return {
            status: "out-of-range",
            articles: [],
            page,
            totalPages: Math.ceil(totalArticles / ARTICLES_PAGE_SIZE),
            totalArticles,
          };
        }
      }

      return { status: "error", articles: [], ...baseResult };
    }

    const posts = (await response.json()) as WordPressPost[];
    const totalArticles = Number(response.headers.get("x-wp-total") ?? "0");
    const totalPages = Number(response.headers.get("x-wp-totalpages") ?? "0");

    if (!Array.isArray(posts) || posts.length === 0) {
      return {
        status: page === 1 ? "empty" : "out-of-range",
        articles: [],
        page,
        totalPages: Number.isFinite(totalPages) ? totalPages : 0,
        totalArticles: Number.isFinite(totalArticles) ? totalArticles : 0,
      };
    }

    return {
      status: "success",
      articles: posts.map(toArticle),
      page,
      totalPages:
        Number.isFinite(totalPages) && totalPages > 0 ? totalPages : page,
      totalArticles: Number.isFinite(totalArticles)
        ? totalArticles
        : posts.length,
    };
  } catch {
    return { status: "error", articles: [], ...baseResult };
  }
});

export const getArticleBySlug = cache(
  async (slug: string): Promise<ArticleDetail | null> => {
    if (!slug) return null;

    const response = await fetchPosts({
      slug,
      _embed: "wp:featuredmedia",
      per_page: "1",
      status: "publish",
    });

    if (!response.ok) {
      throw new Error(`WordPress respondió con estado ${response.status}`);
    }

    const posts = (await response.json()) as WordPressPost[];
    const post = Array.isArray(posts) ? posts[0] : undefined;
    if (!post) return null;

    const article = toArticle(post);
    const yoast = post.yoast_head_json;
    const customTitle = cleanWordPressText(yoast?.title ?? "");
    const customDescription = cleanWordPressText(yoast?.description ?? "");
    const openGraphTitle = cleanWordPressText(yoast?.og_title ?? "");
    const openGraphDescription = cleanWordPressText(
      yoast?.og_description ?? "",
    );

    return {
      ...article,
      modified: post.modified,
      content: post.content.rendered,
      seoTitle: customTitle || undefined,
      seoDescription: customDescription || undefined,
      openGraphTitle: openGraphTitle || undefined,
      openGraphDescription: openGraphDescription || undefined,
      openGraphImage: getFirstValidYoastImage(yoast?.og_image),
    };
  },
);

async function getSitemapPage(page: number) {
  const response = await fetchPosts({
    _fields: "id,slug,date,modified",
    page: String(page),
    per_page: "100",
    status: "publish",
    orderby: "modified",
    order: "desc",
  });

  if (!response.ok) {
    throw new Error(`WordPress respondió con estado ${response.status}`);
  }

  return {
    posts: (await response.json()) as SitemapArticle[],
    totalPages: Number(response.headers.get("x-wp-totalpages") ?? "1"),
  };
}

export async function getPublishedArticles(): Promise<SitemapArticle[]> {
  const firstPage = await getSitemapPage(1);
  if (firstPage.totalPages <= 1) return firstPage.posts;

  const remainingPages = await Promise.all(
    Array.from({ length: firstPage.totalPages - 1 }, (_, index) =>
      getSitemapPage(index + 2),
    ),
  );

  return [firstPage.posts, ...remainingPages.map((page) => page.posts)].flat();
}
