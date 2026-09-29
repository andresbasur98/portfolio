import Image from "next/image";
import Link from "next/link";
import { stack } from "../data/portfolio";
import {
  radarItems,
  radarSources,
  type RadarItem,
} from "../data/radar";

function ModuleHeader({ children, index }: { children: React.ReactNode; index: string }) {
  return <div className="module-header"><span>{children}</span><span>{index}</span></div>;
}

export function NowCard() {
  return (
    <section className="rail-module">
      <ModuleHeader index="01">Ahora</ModuleHeader>
      <div className="now-item">
        <span className="status-dot" aria-hidden="true" />
        <p><small>Construyendo</small>Portfolio headless con Next.js y WordPress.</p>
      </div>
      <div className="now-item">
        <span className="status-dot muted" aria-hidden="true" />
        <p><small>Explorando</small>SEO, GEO e inteligencia artificial aplicada.</p>
      </div>
      <div className="now-item">
        <span className="status-dot muted" aria-hidden="true" />
        <p><small>Desarrollando</small>Productos propios con recorrido orgánico.</p>
      </div>
    </section>
  );
}

export function StackList() {
  return (
    <section className="rail-module">
      <ModuleHeader index="02">Stack actual</ModuleHeader>
      <ul className="stack-list">
        {stack.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}
      </ul>
    </section>
  );
}

function StatusCard() {
  return (
    <section className="rail-module">
      <ModuleHeader index="03">Estado</ModuleHeader>
      <dl className="status-list">
        <div><dt>Ubicación</dt><dd>Madrid, España</dd></div>
        <div><dt>Trabajo</dt><dd>Frontend Team Lead</dd></div>
        <div><dt>Disponibilidad</dt><dd className="positive">Proyectos seleccionados</dd></div>
      </dl>
    </section>
  );
}

export function ContentTeaser({ teaser }: { teaser: RadarItem }) {
  const source = radarSources[teaser.source];
  const external = /^https?:\/\//i.test(teaser.href);
  const content = (
    <>
      <span className="content-source">
        <Image src={source.icon} alt="" width={24} height={24} />
        <span className="content-type">{source.label}</span>
      </span>
      <strong>{teaser.title}</strong>
      <span className="content-meta">
        {teaser.meta}
        <i aria-hidden="true">{external ? "↗" : "→"}</i>
      </span>
    </>
  );

  if (external) {
    return (
      <a
        className="content-teaser"
        href={teaser.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  return (
    <Link className="content-teaser" href={teaser.href}>
      {content}
    </Link>
  );
}

export function LeftRail({ mobile = false }: { mobile?: boolean }) {
  return (
    <aside className={mobile ? "contextual-rail" : "desktop-rail left-rail"} aria-label="Contexto profesional">
      <NowCard />
      <StackList />
      <StatusCard />
    </aside>
  );
}

export function RightRail({ mobile = false }: { mobile?: boolean }) {
  return (
    <aside className={mobile ? "contextual-rail contextual-content" : "desktop-rail right-rail"} aria-label="En el radar">
      <div className="rail-title"><span>En el radar</span><span>Actualizado</span></div>
      {radarItems.map((teaser) => <ContentTeaser key={`${teaser.source}-${teaser.href}`} teaser={teaser} />)}
      <Link className="rail-all-link" href="/articulos">Ver todos los artículos <span aria-hidden="true">→</span></Link>
    </aside>
  );
}
