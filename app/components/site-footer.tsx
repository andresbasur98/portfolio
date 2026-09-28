import { socialLinks } from "../data/portfolio";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div><span className="wordmark-mark" aria-hidden="true">AB</span><p>Andrés Basurto<br /><small>Producto · SEO · Negocio</small></p></div>
      <nav aria-label="Redes sociales">
        {socialLinks.map((link) => link.href ? (
          <a key={link.label} href={link.href} target="_blank" rel="noreferrer">{link.label} <span aria-hidden="true">↗</span></a>
        ) : <span key={link.label}>{link.label} · [Añadir enlace]</span>)}
      </nav>
      <p>© {new Date().getFullYear()} · Madrid, España</p>
    </footer>
  );
}
