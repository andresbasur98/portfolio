import type { Metadata } from "next";
import Link from "next/link";
import { DeferredYoutube } from "../../components/deferred-youtube";
import { EmailTemplatePreview } from "../../components/email-template-preview";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";
import { emailTemplatesResource as resource } from "../../data/resources";

const title = "Plantillas de email HTML gratis | Andrés Basurto";
const description =
  "Descarga 3 plantillas de email HTML gratuitas para primera venta, servicios complementarios y retención. Con vistas previas e instrucciones.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/recursos/plantillas-email" },
  openGraph: {
    title,
    description,
    url: "/recursos/plantillas-email",
    siteName: "Andrés Basurto",
    locale: "es_ES",
    type: "website",
  },
  twitter: { card: "summary_large_image", title, description },
};

export default function EmailTemplatesPage() {
  const { extras } = resource;
  const hasDownloads =
    extras.schema || extras.excalidrawUrl || extras.githubUrl;

  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <SiteHeader />
      <div className="page-grid">
        <main className="main-column resource-detail-page" id="contenido">
          <nav className="resource-breadcrumbs" aria-label="Migas de pan">
            <Link href="/">Inicio</Link>
            <span aria-hidden="true">/</span>
            <Link href="/recursos">Recursos</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Plantillas de email</span>
          </nav>

          <header className="resource-hero">
            <div className="resource-hero-copy">
              <p className="eyebrow">Recurso gratuito · 01</p>
              <h1>Plantillas de email gratuitas para tu negocio</h1>
              <p>{resource.description}</p>
              <div className="resource-hero-actions">
                <a className="button button-primary" href={resource.zipUrl} download>
                  Descargar las 3 plantillas <span aria-hidden="true">↓</span>
                </a>
                <span>HTML editable · Sin registro</span>
              </div>
            </div>
            <div className="resource-hero-mark" aria-hidden="true">
              <span>HTML</span>
              <strong>03</strong>
              <small>emails preparados para adaptar</small>
            </div>
          </header>

          {extras.youtube ? (
            <section className="resource-video-section" aria-labelledby="video-title">
              <p className="eyebrow">Vídeo relacionado</p>
              <h2 id="video-title">{extras.youtube.title}</h2>
              <DeferredYoutube {...extras.youtube} />
            </section>
          ) : null}

          <EmailTemplatePreview templates={resource.templates} />

          <section className="resource-templates" aria-labelledby="templates-title">
            <div className="resource-section-heading">
              <div>
                <p className="eyebrow">Qué incluye</p>
                <h2 id="templates-title">Tres objetivos, tres estructuras</h2>
              </div>
              <p>
                Cada archivo es un documento HTML completo con estilos pensados
                para email y comentarios que señalan qué debes personalizar.
              </p>
            </div>
            <div className="template-list">
              {resource.templates.map((template, index) => (
                <article className="template-card" key={template.id}>
                  <span className="template-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3>{template.name}</h3>
                    <p>{template.objective}</p>
                    <dl>
                      <div>
                        <dt>Bloques</dt>
                        <dd>{template.structure}</dd>
                      </div>
                    </dl>
                  </div>
                  <div className="template-actions">
                    <a href={`#tab-${template.id}`}>Ver vista previa</a>
                    <a href={template.fileUrl} download>
                      Descargar HTML <span aria-hidden="true">↓</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="resource-how-to" aria-labelledby="how-to-title">
            <div className="resource-section-heading">
              <div>
                <p className="eyebrow">Antes de enviar</p>
                <h2 id="how-to-title">Cómo utilizar las plantillas</h2>
              </div>
              <p>
                Son ejemplos ficticios para personalizar, no campañas listas para
                enviar sin revisión.
              </p>
            </div>

            <ol className="resource-steps">
              <li><span>01</span><p>Descarga el HTML.</p></li>
              <li><span>02</span><p>Sustituye marca, destinatario, textos y datos del ejemplo.</p></li>
              <li><span>03</span><p>Cambia imágenes y enlaces por URLs públicas reales.</p></li>
              <li><span>04</span><p>Envíate una prueba antes de usarlo en una campaña.</p></li>
            </ol>

            <div className="resource-notes">
              <h3>Notas de personalización</h3>
              <ul>
                <li>Las marcas, productos, prestaciones y relaciones comerciales del ejemplo son ficticios y deben adaptarse.</li>
                <li>Los enlaces <code>example.com</code> y los datos del remitente son placeholders.</li>
                <li>Configura el enlace de baja real en tu herramienta de envío.</li>
                <li>El aspecto final puede variar entre clientes de correo.</li>
                <li>Pegar el código HTML en “Redactar” de Gmail lo muestra como texto: impórtalo en una herramienta compatible o envíalo como cuerpo HTML, por ejemplo con Nodemailer.</li>
                <li>Las imágenes externas requieren conexión y el cliente de correo puede bloquearlas.</li>
              </ul>
            </div>
          </section>

          {hasDownloads ? (
            <section className="resource-related-files" aria-labelledby="related-files-title">
              <p className="eyebrow">Material relacionado</p>
              <h2 id="related-files-title">Más archivos del recurso</h2>
              <div>
                {extras.schema ? <a href={extras.schema.url}>Descargar esquema ({extras.schema.format})</a> : null}
                {extras.excalidrawUrl ? <a href={extras.excalidrawUrl}>Descargar archivo editable de Excalidraw</a> : null}
                {extras.githubUrl ? <a href={extras.githubUrl} target="_blank" rel="noreferrer">Ver en GitHub <span aria-hidden="true">↗</span></a> : null}
              </div>
            </section>
          ) : null}

          <div className="resource-final-cta">
            <div>
              <p className="eyebrow">Todo en un archivo</p>
              <h2>Descarga, personaliza y prueba.</h2>
            </div>
            <a className="button button-light" href={resource.zipUrl} download>
              Descargar las 3 plantillas <span aria-hidden="true">↓</span>
            </a>
          </div>
          <SiteFooter />
        </main>
      </div>
    </>
  );
}
