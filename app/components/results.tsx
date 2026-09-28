import Image from "next/image";

import { metrics } from "../data/portfolio";

export function Results() {
  return (
    <section className="section results-section" id="resultados" aria-labelledby="results-title">
      <div className="results-intro">
        <div>
          <p className="eyebrow">Resultados, no decorado</p>
          <h2 id="results-title">La prueba vive en los datos.</h2>
        </div>
        <p>
          Capturas reales de proyectos en los que he trabajado. Abre cada
          evidencia para verla a tamaño completo.
        </p>
      </div>

      <div className="metric-grid">
        {metrics.map((metric, index) => (
          <article className="metric-card" key={metric.label}>
            <a
              className="metric-media"
              href={metric.image}
              target="_blank"
              rel="noreferrer"
              aria-label={`Ver captura completa de ${metric.label}`}
            >
              <Image
                src={metric.image}
                alt={metric.imageAlt}
                fill
                sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"
              />
              <span className="metric-media-action" aria-hidden="true">
                Ver captura
              </span>
            </a>

            <div className="metric-body">
              <div className="metric-top">
                <span>{metric.label}</span>
                <span>0{index + 1}</span>
              </div>
              <strong>{metric.value}</strong>
              <p>{metric.context}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
