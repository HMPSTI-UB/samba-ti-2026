export function countImages(html: string): number {
  const matches = html.match(/<img\b[^>]*>/gi);
  return matches ? matches.length : 0;
}

export function stripImages(html: string): string {
  return html.replace(/<img\b[^>]*>/gi, "");
}