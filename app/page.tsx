import { Suspense } from "react";
import { Capabilities } from "./components/capabilities";
import { ContactCTA } from "./components/contact-cta";
import { HeroSection } from "./components/hero-section";
import { ArticlesSkeleton, LatestArticles } from "./components/latest-articles";
import { ProjectGrid } from "./components/project-grid";
import { LeftRail, RightRail } from "./components/rails";
import { Results } from "./components/results";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import { TestimonialsSection } from "./components/testimonials-section";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const jsonLd = [
  {
    "@context": "https://schema.org", "@type": "Person", name: "Andrés Basurto", url: siteUrl,
    jobTitle: "Frontend Team Lead",
    address: { "@type": "PostalAddress", addressLocality: "Madrid", addressCountry: "ES" },
    knowsAbout: ["Next.js", "React", "TypeScript", "SEO técnico", "GEO", "Ecommerce", "Inteligencia artificial"],
  },
  { "@context": "https://schema.org", "@type": "WebSite", name: "Portfolio de Andrés Basurto", url: siteUrl, inLanguage: "es-ES" },
];

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <SiteHeader />
      <div className="page-grid">
        <LeftRail />
        <main className="main-column" id="contenido">
          <HeroSection />
          <div className="mobile-context"><LeftRail mobile /></div>
          <ProjectGrid />
          <Capabilities />
          <Results />
          <TestimonialsSection />
          <div className="mobile-context"><RightRail mobile /></div>
          <section className="section articles-section" id="articulos" aria-labelledby="articles-title">
            <div className="section-heading compact">
              <div><p className="eyebrow">Ideas en abierto</p><h2 id="articles-title">Últimos artículos</h2></div>
              <a className="text-link" href="https://andrescat2.wordpress.com/" target="_blank" rel="noreferrer">Ver archivo <span aria-hidden="true">↗</span></a>
            </div>
            <Suspense fallback={<ArticlesSkeleton />}><LatestArticles /></Suspense>
          </section>
          <section className="about-strip" id="sobre-mi" aria-labelledby="about-title">
            <p className="eyebrow">Sobre mí</p>
            <h2 id="about-title">Trabajo en la intersección entre lo que el usuario necesita, lo que la tecnología permite y lo que el negocio debe conseguir.</h2>
            <p>Desde Madrid, lidero frontend y desarrollo productos propios. Mi forma de trabajar conecta implementación, posicionamiento y operación para evitar que cada disciplina avance por separado.</p>
          </section>
          <ContactCTA />
          <SiteFooter />
        </main>
        <RightRail />
      </div>
    </>
  );
}
