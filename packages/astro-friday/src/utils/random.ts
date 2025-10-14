/**
 * According to the weight configuration, randomly select one option.
 *
 * @example
 * ```ts
 * // dots has 1 share, plum has 2 shares, i.e., dots 33.3% probability, plum 66.7% probability
 * selectByWeight({ dots: 1, plum: 2 })
 * ```
 */
export function selectByWeight<T extends string>(weights: Record<T, number>): T | null {
  // Filter out valid configurations with weight greater than 0
  const validWeights = Object.entries<number>(weights).filter(([, weight]) => weight > 0) as Array<[T, number]>

  if (validWeights.length === 0) {
    return null
  }

  // Get total weight
  const totalShares = validWeights.reduce((sum, [, weight]) => sum + weight, 0)

  // Generate a random number between 0 and totalShares
  const randomNumber = Math.random() * totalShares

  // Accumulate the weights and find which interval the random number falls into
  let cumulativeShares = 0
  for (const [artType, shares] of validWeights) {
    cumulativeShares += shares
    if (randomNumber <= cumulativeShares) {
      return artType
    }
  }

  // Fallback due to floating point precision issues, return the last valid option
  return validWeights[validWeights.length - 1][0]
}
