import Link from "next/link";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";

export default function ArticleNotFound() {
  return (
    <>
      <SiteHeader />
      <div className="page-grid">
        <main className="main-column article-page">
          <section className="article-not-found">
            <p className="eyebrow">Error 404</p>
            <h1>Este artículo no está disponible.</h1>
            <p>
              Puede que haya cambiado de dirección o que ya no esté publicado.
            </p>
            <Link className="text-link" href="/#articulos">
              Volver a artículos <span aria-hidden="true">→</span>
            </Link>
          </section>
          <SiteFooter />
        </main>
      </div>
    </>
  );
}
