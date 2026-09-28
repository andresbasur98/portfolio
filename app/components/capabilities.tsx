import { capabilities } from "../data/portfolio";

export function Capabilities() {
  return (
    <section className="section section-split" id="capacidades" aria-labelledby="capabilities-title">
      <div className="section-sticky-copy">
        <p className="eyebrow">Capacidades</p>
        <h2 id="capabilities-title">De la idea a un sistema que puede crecer.</h2>
        <p>No entro solo por el código o el tráfico. Busco el punto donde producto, distribución y operación se refuerzan.</p>
        <a className="text-link" href="#contacto">Plantear un proyecto <span aria-hidden="true">↗</span></a>
      </div>
      <div className="capability-list">
        {capabilities.map((capability) => (
          <article className="capability-card" key={capability.index}>
            <span className="capability-index">{capability.index}</span>
            <div>
              <h3>{capability.title}</h3>
              <p>{capability.description}</p>
              <ul>{capability.deliverables.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
