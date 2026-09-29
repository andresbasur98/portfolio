import Image from "next/image";
import Link from "next/link";
import type { Article } from "../lib/wordpress";

const dateFormatter = new Intl.DateTimeFormat("es-ES", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export function ArticleCard({
  article,
  index,
}: {
  article: Article;
  index: number;
}) {
  return (
    <article className="article-card">
      <Link href={article.href}>
        <div className="article-media">
          {article.image ? (
            <Image
              src={article.image}
              alt={article.imageAlt ?? ""}
              fill
              sizes="(min-width: 900px) 30vw, 100vw"
            />
          ) : (
            <div className="article-placeholder" aria-hidden="true">
              <span>AB—{String(index + 1).padStart(2, "0")}</span>
            </div>
          )}
        </div>
        <div className="article-meta">
          <time dateTime={article.date}>
            {dateFormatter.format(new Date(article.date))}
          </time>
          <span>Leer artículo →</span>
        </div>
        <h3>{article.title}</h3>
        <p>{article.excerpt}</p>
      </Link>
    </article>
  );
}

export function ArticleGrid({
  articles,
  indexOffset = 0,
}: {
  articles: Article[];
  indexOffset?: number;
}) {
  return (
    <div className="articles-grid">
      {articles.map((article, index) => (
        <ArticleCard
          key={article.id}
          article={article}
          index={indexOffset + index}
        />
      ))}
    </div>
  );
}
