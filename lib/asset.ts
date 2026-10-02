/**
 * Prefix for files in /public. Empty for local dev and root-domain hosting; set to the
 * repository path (e.g. "/murugan-website") when building for GitHub Pages, where the
 * site is served from https://<user>.github.io/<repo>/.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const asset = (path: string) => `${BASE_PATH}${path}`;
