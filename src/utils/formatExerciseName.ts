export function formatImageName(input: string): string {
  return input.toLowerCase().replace(/\s+/g, '-');
}
