function normalizeBasePath(value: string) {
  if (!value || value === "/") {
    return "/";
  }

  return `/${value.replace(/^\/+|\/+$/g, "")}/`;
}

export const appBasePath = normalizeBasePath(import.meta.env.BASE_URL);

export function withBasePath(path: string) {
  if (appBasePath === "/") {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${appBasePath.slice(0, -1)}${normalizedPath}`;
}
