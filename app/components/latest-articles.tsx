import Image from "next/image";
import { getLatestArticles, type Article } from "../lib/wordpress";

const dateFormatter = new Intl.DateTimeFormat("es-ES", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

function ArticleCard({ article, index }: { article: Article; index: number }) {
  return (
    <article className="article-card">
      <a href={article.href} target="_blank" rel="noreferrer">
        <div className="article-media">
          {article.image ? (
            <Image
              src={article.image}
              alt={article.imageAlt ?? ""}
              fill
              sizes="(min-width: 900px) 30vw, 100vw"
            />
          ) : (
            <div className="article-placeholder" aria-hidden="true"><span>AB—{String(index + 1).padStart(2, "0")}</span></div>
          )}
        </div>
        <div className="article-meta"><time dateTime={article.date}>{dateFormatter.format(new Date(article.date))}</time><span>Artículo ↗</span></div>
        <h3>{article.title}</h3>
        <p>{article.excerpt}</p>
      </a>
    </article>
  );
}

export function ArticlesSkeleton() {
  return (
    <div className="articles-grid" aria-label="Cargando artículos">
      {[0, 1, 2].map((item) => <div className="article-skeleton" key={item}><i /><i /><i /></div>)}
    </div>
  );
}

export async function LatestArticles() {
  const result = await getLatestArticles();

  if (result.status !== "success") {
    return (
      <div className="articles-state" role="status">
        <span>{result.status === "empty" ? "Sin publicaciones todavía" : "Fuente temporalmente no disponible"}</span>
        <p>{result.status === "empty" ? "Los próximos artículos aparecerán aquí." : "La página sigue operativa. Puedes visitar el archivo directamente en WordPress."}</p>
        <a className="text-link" href="https://andrescat2.wordpress.com/" target="_blank" rel="noreferrer">Abrir archivo de artículos <span aria-hidden="true">↗</span></a>
      </div>
    );
  }

  return <div className="articles-grid">{result.articles.slice(0, 3).map((article, index) => <ArticleCard key={article.id} article={article} index={index} />)}</div>;
}
