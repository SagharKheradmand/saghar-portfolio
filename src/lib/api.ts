export async function getJson<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(path, { signal });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${path}`);
  }

  return (await response.json()) as T;
}
