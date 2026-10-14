export type EmailTemplate = {
  id: "primera-venta" | "servicio-complementario" | "retencion";
  name: string;
  objective: string;
  structure: string;
  fileUrl: string;
  previewTitle: string;
};

export type ResourceExtras = {
  youtube?: {
    url: string;
    title: string;
    posterUrl: string;
  };
  schema?: {
    url: string;
    format: "PNG" | "PDF";
  };
  excalidrawUrl?: string;
  githubUrl?: string;
};

export type Resource = {
  slug: "plantillas-email";
  title: string;
  shortDescription: string;
  description: string;
  href: string;
  zipUrl: string;
  extras: ResourceExtras;
  templates: readonly EmailTemplate[];
};

const emailTemplates = [
  {
    id: "primera-venta",
    name: "Primera venta",
    objective: "Para personas que conocen tu negocio pero aún no han comprado.",
    structure:
      "Beneficio principal, imagen del producto, ventajas, resolución de dudas y llamada a la acción.",
    fileUrl: "/recursos/plantillas-email/primera-venta.html",
    previewTitle: "Vista previa de la plantilla Primera venta",
  },
  {
    id: "servicio-complementario",
    name: "Servicio complementario",
    objective: "Para ofrecer un servicio adicional a un cliente existente.",
    structure:
      "Relación previa, oportunidad, alcance del servicio y un siguiente paso claro.",
    fileUrl: "/recursos/plantillas-email/servicio-complementario.html",
    previewTitle: "Vista previa de la plantilla Servicio complementario",
  },
  {
    id: "retencion",
    name: "Retención",
    objective: "Para mostrar novedades y recordar el valor de un servicio.",
    structure:
      "Contenido destacado, novedades y una llamada a la acción para volver.",
    fileUrl: "/recursos/plantillas-email/retencion.html",
    previewTitle: "Vista previa de la plantilla Retención",
  },
] as const satisfies readonly EmailTemplate[];

export const resources = [
  {
    slug: "plantillas-email",
    title: "3 plantillas de email para tu negocio",
    shortDescription:
      "Ejemplos para conseguir una primera venta, ofrecer un servicio complementario y mantener la relación con tus clientes.",
    description:
      "Tres ejemplos en HTML para adaptar el mensaje, el diseño y la llamada a la acción al objetivo de tu email.",
    href: "/recursos/plantillas-email",
    zipUrl:
      "/recursos/plantillas-email/plantillas-email-gratuitas-andres-basurto.zip",
    extras: {} as ResourceExtras,
    templates: emailTemplates,
  },
] as const satisfies readonly Resource[];

export const emailTemplatesResource = resources[0];
