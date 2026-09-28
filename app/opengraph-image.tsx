import { ImageResponse } from "next/og";

export const alt = "Andrés Basurto — Producto digital, SEO/GEO y ecommerce";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#080909", color: "#f2f0ea", padding: "62px 72px", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 24 }}>
        <span>Andrés Basurto</span><span style={{ color: "#aaa89f" }}>Madrid · España</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 980 }}>
        <span style={{ color: "#caa86c", fontSize: 24, textTransform: "uppercase", letterSpacing: 3 }}>Producto · Posicionamiento · Conversión</span>
        <strong style={{ fontSize: 74, lineHeight: 1.05, letterSpacing: -4, marginTop: 22 }}>Productos digitales que cargan rápido, posicionan y convierten.</strong>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #343535", paddingTop: 24, fontSize: 22, color: "#aaa89f" }}>
        <span>Next.js · SEO/GEO · Ecommerce</span><span>Portfolio profesional</span>
      </div>
    </div>,
    size,
  );
}
