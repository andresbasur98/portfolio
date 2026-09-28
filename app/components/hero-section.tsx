function SignalPanel() {
  return (
    <aside className="signal-panel" aria-label="Principios de trabajo">
      <div className="signal-head">
        <span className="eyebrow">Sistema de trabajo</span>
        <span className="signal-live"><i /> En producción</span>
      </div>
      <div className="signal-visual" aria-hidden="true">
        <div className="signal-axis">
          <span>Descubrimiento</span>
          <span>Conversión</span>
        </div>
        <svg viewBox="0 0 480 122" role="presentation">
          <path className="signal-grid" d="M0 18H480M0 52H480M0 86H480M0 120H480" />
          <path className="signal-line-muted" d="M2 94C58 93 72 81 116 82S176 76 211 64s55-7 84-24 70-3 99-13 57-10 84-22" />
          <path className="signal-line" d="M2 106C52 105 72 98 111 93s62 1 94-17 58-25 91-22 53-23 88-25 51 1 94-23" />
        </svg>
      </div>
      <div className="signal-steps">
        <div><span>01</span><strong>Producto</strong></div>
        <div><span>02</span><strong>Demanda</strong></div>
        <div><span>03</span><strong>Medición</strong></div>
      </div>
    </aside>
  );
}

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
      <SignalPanel />
      <div className="credibility-line" aria-label="Experiencia destacada">
        <span><b>01</b> Frontend Team Lead</span>
        <span><b>02</b> Proyectos reales en producción</span>
        <span><b>03</b> Desarrollo, SEO y negocio</span>
      </div>
    </section>
  );
}
