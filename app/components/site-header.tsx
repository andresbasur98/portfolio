type NavigationIcon = "work" | "services" | "about" | "articles" | "contact";

const navigation: Array<{ label: string; href: string; icon: NavigationIcon }> = [
  { label: "Proyectos", href: "#proyectos", icon: "work" },
  { label: "Servicios", href: "#capacidades", icon: "services" },
  { label: "Sobre mí", href: "#sobre-mi", icon: "about" },
  { label: "Artículos", href: "#articulos", icon: "articles" },
  { label: "Contacto", href: "#contacto", icon: "contact" },
];

function NavIcon({ name }: { name: NavigationIcon }) {
  if (name === "work") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="7" height="6" rx="1" /><rect x="14" y="5" width="7" height="6" rx="1" /><rect x="3" y="15" width="7" height="4" rx="1" /><rect x="14" y="15" width="7" height="4" rx="1" /></svg>;
  }
  if (name === "services") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7.5 12 3l8 4.5-8 4.5-8-4.5Z" /><path d="m4 12 8 4.5 8-4.5M4 16.5l8 4.5 8-4.5" /></svg>;
  }
  if (name === "about") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.5" /><path d="M5 20c.7-4 3-6 7-6s6.3 2 7 6" /></svg>;
  }
  if (name === "articles") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h9l3 3v15H6V3Z" /><path d="M15 3v4h4M9 11h6M9 15h6" /></svg>;
  }
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v12H9l-5 4V5Z" /><path d="M8 9h8M8 13h5" /></svg>;
}

export function SiteHeader() {
  return (
    <>
      {/* <header className="site-header">
        <div className="header-grid">
          <a className="wordmark" href="#inicio" aria-label="Andrés Basurto, inicio">
            <span className="wordmark-mark" aria-hidden="true">AB</span>
            <span>Andrés Basurto</span>
          </a>
          <div className="availability">
            <span className="status-dot" aria-hidden="true" />
            Disponible para proyectos seleccionados
          </div>
        </div>
      </header> */}

      <nav className="floating-nav" aria-label="Navegación principal">
        <ul>
          {navigation.map((item) => (
            <li key={item.href}>
              <a href={item.href}>
                <NavIcon name={item.icon} />
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
