import "server-only";

import type { Root } from "hast";
import rehypeParse from "rehype-parse";
import rehypeSanitize, {
  defaultSchema,
  type Options as SanitizeSchema,
} from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import { unified } from "unified";
import { visit } from "unist-util-visit";

const WORDPRESS_ORIGIN = "https://andrescat2.wordpress.com";
const WORDPRESS_HOSTS = new Set([
  "andrescat2.wordpress.com",
  "www.andrescat2.wordpress.com",
]);
const EMBED_HOSTS = new Set([
  "andrescat2.wordpress.com",
  "player.vimeo.com",
  "videopress.com",
  "www.youtube.com",
  "www.youtube-nocookie.com",
]);

const schema: SanitizeSchema = {
  ...defaultSchema,
  tagNames: [
    ...(defaultSchema.tagNames ?? []),
    "audio",
    "figcaption",
    "figure",
    "iframe",
    "video",
  ],
  attributes: {
    ...defaultSchema.attributes,
    "*": [
      ...(defaultSchema.attributes?.["*"] ?? []),
      ["className", /^[\w-]+$/],
      "ariaHidden",
      "ariaLabel",
    ],
    a: [
      ...(defaultSchema.attributes?.a ?? []),
      "name",
      "rel",
      "target",
      "title",
    ],
    audio: ["controls", "loop", "muted", "preload", "src"],
    img: [
      ...(defaultSchema.attributes?.img ?? []),
      "alt",
      "decoding",
      "height",
      "loading",
      "sizes",
      "srcSet",
      "title",
      "width",
    ],
    iframe: [
      "allow",
      "allowFullScreen",
      "height",
      "loading",
      "referrerPolicy",
      "src",
      "title",
      "width",
    ],
    ol: [...(defaultSchema.attributes?.ol ?? []), "reversed", "type"],
    source: ["media", "sizes", "src", "srcSet", "type"],
    td: ["colSpan", "headers", "rowSpan"],
    th: ["abbr", "colSpan", "headers", "rowSpan", "scope"],
    video: [
      "autoPlay",
      "controls",
      "height",
      "loop",
      "muted",
      "playsInline",
      "poster",
      "preload",
      "src",
      "width",
    ],
  },
  protocols: {
    ...defaultSchema.protocols,
    href: ["http", "https", "mailto", "tel"],
    poster: ["https"],
    src: ["https"],
    srcSet: ["https"],
  },
  strip: [...(defaultSchema.strip ?? []), "form", "style", "template"],
};

function rewriteWordPressUrl(href: string) {
  if (!href || href.startsWith("#")) return href;

  try {
    const url = new URL(href, WORDPRESS_ORIGIN);
    if (!WORDPRESS_HOSTS.has(url.hostname)) return href;

    const match = url.pathname.match(
      /^\/\d{4}\/\d{2}\/\d{2}\/([^/]+)\/?$/,
    );
    if (!match) return url.toString();

    return `/articulos/${encodeURIComponent(decodeURIComponent(match[1]))}${url.hash}`;
  } catch {
    return href;
  }
}

function isExternalUrl(href: string) {
  return /^(?:https?:)?\/\//i.test(href);
}

function prepareWordPressNodes() {
  return (tree: Root) => {
    visit(tree, "element", (node) => {
      if (node.tagName === "h1") node.tagName = "h2";

      if (node.tagName === "iframe") {
        try {
          const src = new URL(String(node.properties.src ?? ""));
          if (src.protocol !== "https:" || !EMBED_HOSTS.has(src.hostname)) {
            node.tagName = "span";
            node.properties = {};
          }
        } catch {
          node.tagName = "span";
          node.properties = {};
        }
      }
    });
  };
}

function enhanceWordPressNodes() {
  return (tree: Root) => {
    visit(tree, "element", (node) => {
      if (node.tagName === "a") {
        const href =
          typeof node.properties.href === "string" ? node.properties.href : "";

        if (!href) {
          delete node.properties.target;
          delete node.properties.rel;
          return;
        }

        const rewrittenHref = rewriteWordPressUrl(href);
        node.properties.href = rewrittenHref;

        if (rewrittenHref.startsWith("/")) {
          delete node.properties.target;
          delete node.properties.rel;
        } else if (isExternalUrl(rewrittenHref)) {
          node.properties.target = "_blank";
          node.properties.rel = ["noopener", "noreferrer"];
        }
      }

      if (node.tagName === "img") {
        node.properties.loading ??= "lazy";
        node.properties.decoding ??= "async";
      }

      if (node.tagName === "iframe") {
        node.properties.loading ??= "lazy";
        node.properties.referrerPolicy ??= "strict-origin-when-cross-origin";
      }
    });
  };
}

export function sanitizeWordPressHtml(html: string) {
  const file = unified()
    .use(rehypeParse, { fragment: true })
    .use(prepareWordPressNodes)
    .use(rehypeSanitize, schema)
    .use(enhanceWordPressNodes)
    .use(rehypeStringify)
    .processSync(html);

  return String(file);
}
