import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ArticleGrid } from "../components/article-card";
import { ArticlesSkeleton } from "../components/latest-articles";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import {
  ARTICLES_PAGE_SIZE,
  getArticlesPage,
  type PaginatedArticlesResult,
} from "../lib/wordpress";

type ArticlesPageProps = {
  searchParams: Promise<{ page?: string | string[] }>;
};

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

const archiveDescription =
  "Artículos de Andrés Basurto sobre desarrollo frontend, Next.js, SEO, GEO, ecommerce y producto digital.";

function parsePageNumber(value: string | string[] | undefined) {
  if (value === undefined) return 1;
  if (Array.isArray(value) || !/^[1-9]\d*$/.test(value)) return null;

  const page = Number(value);
  return Number.isSafeInteger(page) ? page : null;
}

function getPageHref(page: number) {
  return page <= 1 ? "/articulos" : `/articulos?page=${page}`;
}

export async function generateMetadata({
  searchParams,
}: ArticlesPageProps): Promise<Metadata> {
  const query = await searchParams;
  const parsedPage = parsePageNumber(query.page);
  const page = parsedPage ?? 1;
  const title =
    page === 1
      ? "Artículos — Andrés Basurto"
      : `Artículos — Página ${page} — Andrés Basurto`;
  const description =
    page === 1
      ? archiveDescription
      : `Página ${page} del archivo de artículos de Andrés Basurto sobre tecnología, posicionamiento y producto digital.`;
  const canonicalPath = getPageHref(page);
  const canonicalUrl = new URL(canonicalPath, `${siteUrl}/`).toString();
  const result = parsedPage ? await getArticlesPage(parsedPage) : null;
  const isIndexable = result?.status === "success";

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    robots: { index: isIndexable, follow: true },
    openGraph: {
      type: "website",
      title,
      description,
      url: canonicalUrl,
      siteName: "Andrés Basurto",
      locale: "es_ES",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

function Pagination({ result }: { result: PaginatedArticlesResult }) {
  if (result.totalPages <= 1) return null;

  const hasPrevious = result.page > 1;
  const hasNext = result.page < result.totalPages;

  return (
    <nav className="articles-pagination" aria-label="Paginación de artículos">
      {hasPrevious ? (
        <Link href={getPageHref(result.page - 1)} rel="prev">
          <span aria-hidden="true">←</span> Anterior
        </Link>
      ) : (
        <span className="is-disabled" aria-disabled="true">
          <span aria-hidden="true">←</span> Anterior
        </span>
      )}
      <span className="articles-page-count">
        Página {result.page} de {result.totalPages}
      </span>
      {hasNext ? (
        <Link href={getPageHref(result.page + 1)} rel="next">
          Siguiente <span aria-hidden="true">→</span>
        </Link>
      ) : (
        <span className="is-disabled" aria-disabled="true">
          Siguiente <span aria-hidden="true">→</span>
        </span>
      )}
    </nav>
  );
}

async function ArticlesArchive({ page }: { page: number }) {
  const result = await getArticlesPage(page);

  if (result.status === "error") {
    return (
      <div className="articles-state" role="status">
        <span>Fuente temporalmente no disponible</span>
        <p>No hemos podido cargar el archivo. Puedes volver a intentarlo.</p>
        <Link className="text-link" href={getPageHref(page)}>
          Reintentar <span aria-hidden="true">→</span>
        </Link>
      </div>
    );
  }

  if (result.status === "empty") {
    return (
      <div className="articles-state" role="status">
        <span>Sin publicaciones todavía</span>
        <p>Los próximos artículos aparecerán aquí.</p>
        <Link className="text-link" href="/">
          Volver al portfolio <span aria-hidden="true">→</span>
        </Link>
      </div>
    );
  }

  if (result.status === "out-of-range") {
    const lastPageHref = getPageHref(Math.max(1, result.totalPages));
    return (
      <div className="articles-state" role="status">
        <span>No hay artículos en la página {page}</span>
        <p>Esta página está fuera del archivo publicado actualmente.</p>
        <Link className="text-link" href={lastPageHref}>
          Volver a la última página disponible <span aria-hidden="true">→</span>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="articles-archive-summary">
        <span>
          {result.totalArticles} {result.totalArticles === 1 ? "artículo" : "artículos"}
        </span>
        <span>{ARTICLES_PAGE_SIZE} por página</span>
      </div>
      <ArticleGrid
        articles={result.articles}
        indexOffset={(result.page - 1) * ARTICLES_PAGE_SIZE}
      />
      <Pagination result={result} />
    </>
  );
}

export default async function ArticlesPage({ searchParams }: ArticlesPageProps) {
  const query = await searchParams;
  const page = parsePageNumber(query.page);

  if (page === null || query.page === "1") redirect("/articulos");

  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <SiteHeader />
      <div className="page-grid">
        <main className="main-column articles-index-page" id="contenido">
          <header className="articles-index-header">
            <Link className="text-link article-back" href="/#articulos">
              <span aria-hidden="true">←</span> Volver al portfolio
            </Link>
            <p className="eyebrow">Ideas en abierto</p>
            <h1>Todos los artículos</h1>
            <p>{archiveDescription}</p>
          </header>
          <section aria-label="Archivo de artículos">
            <Suspense
              key={page}
              fallback={<ArticlesSkeleton count={6} />}
            >
              <ArticlesArchive page={page} />
            </Suspense>
          </section>
          <SiteFooter />
        </main>
      </div>
    </>
  );
}
