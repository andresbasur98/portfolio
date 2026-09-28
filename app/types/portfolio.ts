export type Project = {
  name: string;
  index: string;
  description: string;
  role: string;
  disciplines: string[];
  image: string;
  imageAlt: string;
  outcome: string;
  href?: string;
  featured?: boolean;
};

export type Capability = {
  index: string;
  title: string;
  description: string;
  deliverables: string[];
};

export type Metric = {
  label: string;
  value: string;
  context: string;
  image: string;
  imageAlt: string;
};

export type ContentTeaserData = {
  type: string;
  title: string;
  meta: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href?: string;
};

export type Testimonial = {
  name: string;
  project: string;
  context: string;
  quote: string;
  image: string;
  imageAlt: string;
};
