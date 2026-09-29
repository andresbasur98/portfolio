import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";
import {
  cleanWordPressText,
  getArticleBySlug,
  type ArticleDetail,
} from "../../lib/wordpress";
import { sanitizeWordPressHtml } from "../../lib/wordpress-html";

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

const dateFormatter = new Intl.DateTimeFormat("es-ES", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function truncateDescription(value: string) {
  if (value.length <= 160) return value;
  return `${value.slice(0, 157).replace(/\s+\S*$/, "").trim()}…`;
}

function getDescription(article: ArticleDetail) {
  return truncateDescription(
    article.seoDescription ||
      article.excerpt ||
      cleanWordPressText(article.content),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/articulos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Artículo no encontrado — Andrés Basurto",
      robots: { index: false, follow: false },
    };
  }

  const title = article.seoTitle || article.title;
  const description = getDescription(article);
  const canonicalPath = `/articulos/${encodeURIComponent(article.slug)}`;
  const articleUrl = new URL(canonicalPath, `${siteUrl}/`).toString();
  const openGraphTitle = article.openGraphTitle || title;
  const openGraphDescription =
    article.openGraphDescription || description;
  const socialImage = article.openGraphImage ??
    (article.image
      ? { url: article.image, alt: article.imageAlt || article.title }
      : undefined);
  const images = socialImage
    ? [
        {
          url: socialImage.url,
          alt: socialImage.alt || article.imageAlt || article.title,
          ...(socialImage.width ? { width: socialImage.width } : {}),
          ...(socialImage.height ? { height: socialImage.height } : {}),
          ...(socialImage.type ? { type: socialImage.type } : {}),
        },
      ]
    : undefined;

  return {
    title,
    description,
    alternates: { canonical: articleUrl },
    robots: { index: true, follow: true },
    openGraph: {
      type: "article",
      title: openGraphTitle,
      description: openGraphDescription,
      url: articleUrl,
      siteName: "Andrés Basurto",
      locale: "es_ES",
      publishedTime: article.date,
      modifiedTime: article.modified,
      images,
    },
    twitter: {
      card: socialImage ? "summary_large_image" : "summary",
      title: openGraphTitle,
      description: openGraphDescription,
      images: socialImage ? [socialImage.url] : undefined,
    },
  };
}

export default async function ArticlePage({
  params,
}: PageProps<"/articulos/[slug]">) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const description = getDescription(article);
  const articleUrl = `${siteUrl}/articulos/${encodeURIComponent(article.slug)}`;
  const content = sanitizeWordPressHtml(article.content);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description,
    url: articleUrl,
    mainEntityOfPage: articleUrl,
    datePublished: article.date,
    dateModified: article.modified,
    inLanguage: "es-ES",
    author: {
      "@type": "Person",
      name: "Andrés Basurto",
      url: siteUrl,
    },
    ...(article.image ? { image: article.image } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <SiteHeader />
      <div className="page-grid">
        <main className="main-column article-page" id="contenido">
          <article className="article-detail">
            <header className="article-detail-header">
              <Link className="text-link article-back" href="/#articulos">
                <span aria-hidden="true">←</span> Volver a artículos
              </Link>
              <p className="eyebrow">Ideas en abierto · Artículo</p>
              <h1>{article.title}</h1>
              <div className="article-detail-meta">
                <time dateTime={article.date}>
                  {dateFormatter.format(new Date(article.date))}
                </time>
                <span>Andrés Basurto</span>
              </div>
              {article.excerpt ? (
                <p className="article-detail-excerpt">{article.excerpt}</p>
              ) : null}
            </header>

            {article.image ? (
              <figure className="article-featured-image">
                <Image
                  src={article.image}
                  alt={article.imageAlt || ""}
                  fill
                  priority
                  sizes="(min-width: 1100px) 960px, (min-width: 760px) calc(100vw - 80px), calc(100vw - 32px)"
                />
              </figure>
            ) : null}

            <div
              className="article-content"
              dangerouslySetInnerHTML={{ __html: content }}
            />

            <footer className="article-detail-footer">
              <p className="eyebrow">Fin del artículo</p>
              <Link className="text-link" href="/#articulos">
                Ver más artículos <span aria-hidden="true">→</span>
              </Link>
            </footer>
          </article>
          <SiteFooter />
        </main>
      </div>
    </>
  );
}
