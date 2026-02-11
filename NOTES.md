# Implementation Notes

## Bug Fix in computeSummary Function

The original implementation had an incorrect calculation for the averagePricePerTonne. It was calculating `totalValue / positions.length` instead of the correct weighted average `totalValue / totalTonnes`. This has been fixed to properly calculate the weighted average price per tonne, which is essential for accurate portfolio summaries.

## Design Decisions

- Used a ternary operator for conciseness and readability in a single assignment. The ternary operation (`totalTonnes !== 0 ? totalValue / totalTonnes : 0`) keeps the logic inline with the variable declaration, making the code more compact while preventing division by zero.
