export const INCLUDED_TRAVELERS = 2
export const MAX_TRAVELERS = 10
export const ADDITIONAL_TRAVELER_RATE = 0.15

export function calculatePackagePrice(basePrice: number, travelers: number): number {
  const additionalTravelers = Math.max(0, travelers - INCLUDED_TRAVELERS)
  return Math.round(basePrice * (1 + additionalTravelers * ADDITIONAL_TRAVELER_RATE))
}
