// Centralized JSON-LD schema builders for SteadyFocusCo.
//
// Every builder returns schema.org objects which can be joined into a
// connected graph via stable @id references, so the brand, website, pages,
// products, tools and guides all point back to the same entity instead of
// unrelated duplicates.
//
// All functions take `base` = the site origin WITHOUT trailing slash, e.g.
//   new URL("/", Astro.site).toString().replace(/\/$/, "")

import { ETSY_SHOP_URL } from "./site";

export const ORGANIZATION_ID = "steadyfocusco-org";
export const WEBSITE_ID = "steadyfocusco-website";

/** Core brand description — used for Organization, WebSite and page defaults. */
export const SITE_DESCRIPTION =
  "SteadyFocusCo is a digital planning and productivity resource providing ADHD-friendly printable planners, free productivity tools, executive-function resources, student planning resources, and practical guides designed to reduce overwhelm and make planning easier to follow.";

/** Build a path-based absolute URL from a site base origin (no trailing slash). */
export function abs(base: string, path: string): string {
  if (path === "/") return base;
  return `${base}${path}`;
}

/** The brand — the shared root of the schema graph. */
export function organizationSchema(base: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${abs(base, "/")}#${ORGANIZATION_ID}`,
    name: "SteadyFocusCo",
    url: abs(base, "/"),
    logo: abs(base, "/logo.png"),
    description: SITE_DESCRIPTION,
    // Official Etsy shop — a real, owned property of the brand.
    sameAs: [ETSY_SHOP_URL],
  };
}

/** The website node, linked to the Organization. */
export function webSiteSchema(base: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${abs(base, "/")}#${WEBSITE_ID}`,
    name: "SteadyFocusCo",
    url: abs(base, "/"),
    description: SITE_DESCRIPTION,
    publisher: { "@id": `${abs(base, "/")}#${ORGANIZATION_ID}` },
    inLanguage: "en",
  };
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

/** BreadcrumbList builder. `items` must be in top-down order (Home first). */
export function breadcrumbSchema(base: string, items: BreadcrumbItem[]) {
  const itemListElement = items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: abs(base, item.path),
  }));
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${abs(base, items[items.length - 1].path)}#breadcrumb`,
    itemListElement,
  };
}

/** A connected WebPage/CollectionPage/AboutPage wired to publisher + website. */
export function webPageSchema(
  base: string,
  opts: {
    type?: "WebPage" | "CollectionPage" | "AboutPage";
    name: string;
    description: string;
    path: string;
    breadcrumb?: ReturnType<typeof breadcrumbSchema>;
  },
) {
  const url = abs(base, opts.path);
  const page = {
    "@context": "https://schema.org",
    "@type": opts.type ?? "WebPage",
    "@id": `${url}#webpage`,
    name: opts.name,
    description: opts.description,
    url,
    inLanguage: "en",
    publisher: { "@id": `${abs(base, "/")}#${ORGANIZATION_ID}` },
    isPartOf: { "@id": `${abs(base, "/")}#${WEBSITE_ID}` },
    ...(opts.breadcrumb ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}),
  };
  return opts.breadcrumb ? [page, opts.breadcrumb] : [page];
}

/** Article schema with brand authorship (no invented individual author). */
export function articleSchema(
  base: string,
  opts: {
    headline: string;
    description: string;
    path: string;
    datePublished?: string;
    dateModified?: string;
  },
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${abs(base, opts.path)}#article`,
    headline: opts.headline,
    description: opts.description,
    url: abs(base, opts.path),
    inLanguage: "en",
    ...(opts.datePublished ? { datePublished: opts.datePublished } : {}),
    ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
    author: { "@id": `${abs(base, "/")}#${ORGANIZATION_ID}` },
    publisher: { "@id": `${abs(base, "/")}#${ORGANIZATION_ID}` },
    mainEntityOfPage: abs(base, opts.path),
    isPartOf: { "@id": `${abs(base, "/")}#${WEBSITE_ID}` },
  };
}

/** Product schema — only uses data actually present (no invented fields). */
export function productSchema(
  base: string,
  opts: {
    name: string;
    description: string;
    path: string;
    image?: string | null;
    offerUrl?: string | null;
    price?: string | null;
    currency?: string;
  },
) {
  const url = abs(base, opts.path);
  const product: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: opts.name,
    description: opts.description,
    url,
    ...(opts.image ? { image: opts.image } : {}),
    brand: { "@id": `${abs(base, "/")}#${ORGANIZATION_ID}` },
  };

  // Offer only included when a real price + purchasing URL are known.
  if (opts.offerUrl && opts.price) {
    product.offers = {
      "@type": "Offer",
      price: opts.price,
      priceCurrency: opts.currency ?? "USD",
      url: opts.offerUrl,
      availability: "https://schema.org/InStock",
      seller: { "@id": `${abs(base, "/")}#${ORGANIZATION_ID}` },
    };
  }
  return product;
}

/** WebApplication schema for the genuine interactive tools. */
export function webApplicationSchema(
  base: string,
  opts: {
    name: string;
    description: string;
    path: string;
    applicationCategory?: string;
  },
) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${abs(base, opts.path)}#webapplication`,
    name: opts.name,
    description: opts.description,
    url: abs(base, opts.path),
    inLanguage: "en",
    applicationCategory: opts.applicationCategory ?? "LifestyleApplication",
    operatingSystem: "Any",
    publisher: { "@id": `${abs(base, "/")}#${ORGANIZATION_ID}` },
    isPartOf: { "@id": `${abs(base, "/")}#${WEBSITE_ID}` },
  };
}

/** FAQPage schema — must exactly mirror visible FAQ content. */
export function faqSchema(
  base: string,
  opts: {
    path: string;
    questions: Array<{ question: string; answer: string }>;
  },
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${abs(base, opts.path)}#faq`,
    mainEntity: opts.questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  };
}
