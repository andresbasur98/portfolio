import { PresentationVideo } from "./presentation-video";

export function HeroSection() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow"><span>Frontend Lead</span><i /> SEO/GEO <i /> Ecommerce</p>
        <h1 id="hero-title">
          Construyo productos digitales que <em>cargan rápido</em>, posicionan y convierten.
        </h1>
        <p className="hero-description">
          Combino desarrollo con Next.js, SEO técnico, contenido y experimentación
          para transformar ideas y negocios en experiencias digitales con crecimiento medible.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#proyectos">Ver proyectos <span aria-hidden="true">↓</span></a>
          <a className="text-link" href="#testimonios">Ver testimonios <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <aside className="signal-panel" aria-label="Vídeo de presentación">
        <PresentationVideo />
      </aside>
      <div className="credibility-line" aria-label="Experiencia destacada">
        <span><b>01</b> Frontend Team Lead</span>
        <span><b>02</b> Proyectos reales en producción</span>
        <span><b>03</b> Desarrollo, SEO y negocio</span>
      </div>
    </section>
  );
}
