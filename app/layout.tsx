import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Andrés Basurto — Desarrollo, SEO/GEO y ecommerce",
  description: "Portfolio de Andrés Basurto. Desarrollo productos digitales con Next.js, SEO técnico, GEO, ecommerce y automatización orientados a resultados.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Andrés Basurto — Producto digital, SEO/GEO y ecommerce",
    description: "Tecnología, posicionamiento y negocio conectados en una misma estrategia.",
    url: "/",
    siteName: "Andrés Basurto",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Andrés Basurto — Producto digital, SEO/GEO y ecommerce",
    description: "Tecnología, posicionamiento y negocio conectados en una misma estrategia.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
