import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { resources } from "../data/resources";

const title = "Recursos gratuitos para tu negocio | Andrés Basurto";
const description =
  "Plantillas y recursos prácticos para mejorar la presencia digital de tu negocio. Descarga ejemplos y adáptalos a tu proyecto.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/recursos" },
  openGraph: {
    title,
    description,
    url: "/recursos",
    siteName: "Andrés Basurto",
    locale: "es_ES",
    type: "website",
  },
  twitter: { card: "summary_large_image", title, description },
};

export default function ResourcesPage() {
  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <SiteHeader />
      <div className="page-grid">
        <main className="main-column resources-index-page" id="contenido">
          <header className="resources-page-header">
            <Link className="text-link article-back" href="/">
              <span aria-hidden="true">←</span> Volver al portfolio
            </Link>
            <p className="eyebrow">Recursos · acceso libre</p>
            <h1>Ideas útiles, listas para adaptar.</h1>
            <p>
              Materiales prácticos para ayudarte a comunicar, construir y mejorar
              la presencia digital de tu negocio.
            </p>
          </header>

          <section aria-labelledby="resources-list-title">
            <div className="resources-list-heading">
              <h2 id="resources-list-title">Recursos disponibles</h2>
              <span>{String(resources.length).padStart(2, "0")}</span>
            </div>
            {resources.map((resource) => (
              <article className="resource-index-card" key={resource.slug}>
                <Link href={resource.href} aria-label={`Ver ${resource.title}`}>
                  <div className="resource-card-visual" aria-hidden="true">
                    <div className="mini-email mini-email-yellow">
                      <i />
                      <strong>SONORA</strong>
                      <span />
                      <span />
                    </div>
                    <div className="mini-email mini-email-green">
                      <i />
                      <strong>NORTE</strong>
                      <span />
                      <span />
                    </div>
                    <div className="mini-email mini-email-coral">
                      <i />
                      <strong>TRAZO</strong>
                      <span />
                      <span />
                    </div>
                  </div>
                  <div className="resource-index-copy">
                    <div className="resource-card-meta">
                      <span>Plantillas HTML</span>
                      <span>Descarga gratuita</span>
                    </div>
                    <h2>{resource.title}</h2>
                    <p>{resource.shortDescription}</p>
                    <span className="text-link resource-card-link">
                      Ver el recurso <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </section>
          <SiteFooter />
        </main>
      </div>
    </>
  );
}
