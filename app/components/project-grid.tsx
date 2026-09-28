import Image from "next/image";
import { projects } from "../data/portfolio";
import type { Project } from "../types/portfolio";

function ProjectCard({ project }: { project: Project }) {
  const content = (
    <>
      <div className="project-media">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes={project.featured ? "(min-width: 1300px) 650px, (min-width: 768px) 60vw, 100vw" : "(min-width: 1300px) 380px, (min-width: 768px) 40vw, 100vw"}
        />
        <span className="project-index">{project.index}</span>
      </div>
      <div className="project-body">
        <div className="project-heading">
          <h3>{project.name}</h3>
          <span aria-hidden="true">↗</span>
        </div>
        <p>{project.description}</p>
        <dl>
          <div><dt>Mi papel</dt><dd>{project.role}</dd></div>
          <div><dt>Decisión clave</dt><dd>{project.outcome}</dd></div>
        </dl>
        <ul className="tag-list" aria-label={`Disciplinas de ${project.name}`}>
          {project.disciplines.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <span className="project-link-label">
          {project.href ? "Ver caso de estudio" : "Caso de estudio en preparación"}
        </span>
      </div>
    </>
  );

  return project.href ? (
    <a className={`project-card${project.featured ? " project-featured" : ""}`} href={project.href}>{content}</a>
  ) : (
    <article className={`project-card${project.featured ? " project-featured" : ""}`}>{content}</article>
  );
}

export function ProjectGrid() {
  return (
    <section className="section" id="proyectos" aria-labelledby="projects-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Trabajo seleccionado · Selección actual</p>
          <h2 id="projects-title">Una muestra del sistema, no solo de la superficie.</h2>
        </div>
        <p>Producto, tecnología y adquisición trabajados como partes del mismo problema.</p>
      </div>
      <div className="project-grid">
        {projects.map((project) => <ProjectCard key={project.name} project={project} />)}
      </div>
    </section>
  );
}
