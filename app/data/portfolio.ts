import type {
  Capability,
  Metric,
  Project,
  SocialLink,
  Testimonial,
} from "../types/portfolio";

export const projects: Project[] = [
  {
    name: "AlMejorprecio",
    index: "01",
    description:
      "Ecommerce para comprar tecnología nueva, seminueva y reacondicionada con una experiencia rápida y preparada para escalar catálogo.",
    role: "Producto, frontend y estrategia orgánica",
    disciplines: [
      "Next.js",
      "Ecommerce",
      "Stripe",
      "SEO",
      "Google Shopping",
      "Automatización",
    ],
    image: "/work/almejorprecio-home.png",
    imageAlt:
      "Captura de la página principal del ecommerce AlMejorprecio",
    outcome:
      "Unifica arquitectura técnica, catálogo y adquisición orgánica en una misma base de producto.",
    featured: true,
  },
  {
    name: "Pablo de Lucas Psicólogo",
    index: "02",
    description:
      "Estrategia digital para una consulta de psicología, enfocada en captar demanda local con contenidos claros y una navegación de baja fricción.",
    role: "SEO, contenidos y conversión",
    disciplines: [
      "SEO local",
      "Arquitectura de contenidos",
      "WordPress headless",
      "CRO",
    ],
    image: "/work/pablo-de-lucas-home.png",
    imageAlt:
      "Captura de la página principal de Pablo de Lucas Psicólogo",
    outcome:
      "Una estructura preparada para responder búsquedas locales y convertirlas en primeras consultas.",
  },
  {
    name: "AndreiFit",
    index: "03",
    description:
      "Aplicación de coaching que reúne planificación, nutrición, progreso y comunicación entre entrenador y cliente.",
    role: "Dirección técnica y desarrollo de producto",
    disciplines: [
      "Next.js",
      "Stripe",
      "i18n",
      "Admin",
      "IA aplicada",
    ],
    image: "/work/andreifit-dashboard.png",
    imageAlt: "Captura del panel de nutrición de AndreiFit",
    outcome:
      "Convierte un servicio intensivo en una operativa digital consistente y preparada para varios mercados.",
    featured: true,
  },
  {
    name: "AutomatiqBlog",
    index: "04",
    description:
      "Aplicación para planificar, generar y publicar contenido SEO con inteligencia artificial, conectada con Google Search Console y WordPress.",
    role: "Producto, arquitectura y desarrollo full-stack",
    disciplines: [
      "Producto digital",
      "Next.js",
      "IA aplicada",
      "Google Search Console",
      "WordPress",
      "Automatización SEO",
    ],
    image: "/work/automatiqblog-dashboard.png",
    imageAlt:
      "Captura del panel de estrategia SEO y publicación de AutomatiqBlog",
    outcome:
      "Concentra señales de búsqueda, estrategia, calendario y publicación en un flujo editorial automatizado y supervisable.",
  },
];

export const capabilities: Capability[] = [
  {
    index: "01",
    title: "Desarrollo de producto",
    description:
      "Construyo interfaces rápidas, accesibles y mantenibles, conectadas con los sistemas que el negocio necesita para operar y crecer.",
    deliverables: ["Arquitectura", "Frontend", "Integraciones"],
  },
  {
    index: "02",
    title: "SEO y GEO",
    description:
      "Convierto la base técnica y el contenido en una ventaja de descubrimiento, tanto en buscadores como en respuestas generadas por IA.",
    deliverables: ["SEO técnico", "Contenido", "Search / AI"],
  },
  {
    index: "03",
    title: "Ecommerce y conversión",
    description:
      "Reduzco fricción entre el catálogo y la compra con decisiones de experiencia, medición y adquisición que responden al negocio.",
    deliverables: ["CRO", "Checkout", "Analítica"],
  },
  {
    index: "04",
    title: "Automatización e IA",
    description:
      "Diseño automatizaciones pragmáticas que eliminan trabajo repetitivo y mejoran cómo se crea, clasifica y distribuye la información.",
    deliverables: ["Workflows", "Agentes", "Operaciones"],
  },
];

export const metrics: Metric[] = [
  {
    label: "SEO orgánico · Pablo de Lucas",
    value: "1,92 mil clics",
    context: "177 mil impresiones en 6 meses · Google Search Console",
    image: "/work/results-gsc-pablo.png",
    imageAlt:
      "Captura de Google Search Console de Pablo de Lucas con 1,92 mil clics y 177 mil impresiones en seis meses",
  },
  {
    label: "Google Ads · AlMejorprecio",
    value: "0,16 € CPC medio",
    context: "28 clics y 2,9 mil impresiones · Campaña de Google Ads",
    image: "/work/results-google-ads-almejorprecio.png",
    imageAlt:
      "Captura de Google Ads de AlMejorprecio con 28 clics, 2,9 mil impresiones y un CPC medio de 0,16 euros",
  },
  {
    label: "PageSpeed · CBS Eléctrica",
    value: "96 / 100",
    context: "95 accesibilidad · 100 buenas prácticas · 100 SEO",
    image: "/work/results-pagespeed-cbselectrica.png",
    imageAlt:
      "Captura de PageSpeed Insights de CBS Eléctrica con 96 en rendimiento, 95 en accesibilidad y 100 en SEO",
  },
];

export const socialLinks: SocialLink[] = [
  { label: "LinkedIn", href: 'https://www.linkedin.com/in/andres-basurto/' },
  { label: "GitHub", href: 'https://github.com/andresbasur98/' },
  { label: "YouTube", href: 'https://www.youtube.com/@andresbasurto9106' },
];

export const testimonials: Testimonial[] = [
  {
    name: "Pablo de Lucas",
    project: "Pablo de Lucas Psicólogo",
    context: "Web · SEO local · Estrategia de contenidos",
    quote: "Con Andrés hemos desarrollado una estrategia de SEO y contenidos que ha llevado la web a superar las 100.000 impresiones y los 1.100 clics orgánicos en tres meses, además de posicionarnos entre los primeros resultados para búsquedas clave en Torrelodones. Destaco su implicación, capacidad de análisis y mejora constante del proyecto",
    image: "/work/testimonial-pablo.png",
    imageAlt: "Retrato de Pablo de Lucas",
  },
  {
    name: "Andrei",
    project: "AndreiFit",
    context: "Producto digital · Aplicación · Automatización",
    quote: "Andrés ha sido clave para digitalizar y escalar mi negocio de coaching. Ha transformado mi forma de trabajar en una plataforma desde la que puedo gestionar entrenamientos, nutrición, progreso y comunicación con mis clientes.",
    image: "/work/testimonial-andrei.png",
    imageAlt: "Retrato de Andrei, cliente del proyecto AndreiFit",
  },
];

export const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Tailwind CSS",
  "MySQL",
  "WordPress headless",
  "Cloudflare",
  "Vercel",
] as const;
