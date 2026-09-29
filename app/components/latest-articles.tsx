import { ArticleGrid } from "./article-card";
import { getLatestArticles } from "../lib/wordpress";

export function ArticlesSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="articles-grid" aria-label="Cargando artículos">
      {Array.from({ length: count }, (_, item) => <div className="article-skeleton" key={item}><i /><i /><i /></div>)}
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

  return <ArticleGrid articles={result.articles.slice(0, 3)} />;
}
