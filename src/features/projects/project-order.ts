export const featuredProjectOrder = [
  "molecular-gcn-selfies-transformer",
  "real-world-kernel-learning",
  "hough-transform-image-processing",
  "covid19-severity-imbalanced-learning",
] as const;

const featuredRank = new Map(featuredProjectOrder.map((slug, index) => [slug, index]));

export function sortFeaturedProjects<T extends { slug: string }>(projects: T[]): T[] {
  return [...projects].sort(
    (left, right) =>
      (featuredRank.get(left.slug as (typeof featuredProjectOrder)[number]) ??
        Number.MAX_SAFE_INTEGER) -
      (featuredRank.get(right.slug as (typeof featuredProjectOrder)[number]) ??
        Number.MAX_SAFE_INTEGER),
  );
}
