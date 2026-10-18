import routes from './routes.json';

/**
 * Single source of truth for per-route SEO metadata.
 *
 * Both the React pages (via react-helmet-async) and the build-time prerender
 * script (`scripts/prerender.mjs`) read this file, so the static HTML and the
 * client-rendered HTML can never drift apart.
 */
export interface RouteMeta {
  path: string;
  title: string;
  description: string;
  changefreq: string;
  priority: string;
}

export const SITE_URL = routes.site;

const byPath = new Map<string, RouteMeta>(
  (routes.routes as RouteMeta[]).map((route) => [route.path, route]),
);

/** Metadata for a route path, or undefined when the route is not SEO-managed. */
export function metaFor(path: string): RouteMeta | undefined {
  return byPath.get(path);
}
