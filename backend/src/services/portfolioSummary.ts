import { Position, PortfolioSummary, PositionStatus } from "../types";

/**
 * Computes a summary of the given positions.
 */
export function computeSummary(positions: Position[], statusFilter?: PositionStatus): PortfolioSummary {
  // Filter positions by status if a filter is provided
  const filteredPositions = statusFilter
    ? positions.filter(position => position.status === statusFilter)
    : positions;

  if (filteredPositions.length === 0) {
    return {
      totalTonnes: 0,
      totalValue: 0,
      averagePricePerTonne: 0,
    };
  }

  const totalTonnes = filteredPositions.reduce((sum, pos) => sum + pos.tonnes, 0);
  const totalValue = filteredPositions.reduce(
    (sum, pos) => sum + pos.tonnes * pos.pricePerTonne,
    0
  );

  const averagePricePerTonne = totalTonnes !== 0 ? totalValue / totalTonnes : 0;

  return {
    totalTonnes,
    totalValue,
    averagePricePerTonne,
  };
}
