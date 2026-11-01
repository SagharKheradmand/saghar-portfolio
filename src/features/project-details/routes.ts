export function findProjectRoute(pathname: string): string | null {
  const match = pathname.match(/^\/projects\/([^/]+)\/?$/);
  if (!match) return null;

  try {
    return decodeURIComponent(match[1]);
  } catch {
    return match[1];
  }
}
