/**
 * Compute the intersection of two arrays, meaning the elements that are present
 * in both arrays.
 *
 * @param a First array
 * @param b Second array
 * @returns The intersection of the two arrays
 */
export function intersection<T>(a: readonly T[], b: readonly T[]): T[] {
  return a.filter((v) => b.includes(v));
}

/**
 * Simple helper that check if two lists shared at least an item in common.
 *
 * @param a One list
 * @param b Another list
 * @returns `true` if one item is in common, `false` otherwise.
 */
export function oneInCommon<T>(a: readonly T[], b: readonly T[]): boolean {
  return a.some((i) => b.includes(i));
}
