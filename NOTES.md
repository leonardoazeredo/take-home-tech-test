# Implementation Notes

## Bug Fix in computeSummary Function

The original implementation had an incorrect calculation for the averagePricePerTonne. It was calculating `totalValue / positions.length` instead of the correct weighted average `totalValue / totalTonnes`. This has been fixed to properly calculate the weighted average price per tonne, which is essential for accurate portfolio summaries.

## Design Decisions

- Used a ternary operator in `backend/src/services/portfolioSummary.ts` for conciseness and readability in a single assignment. The ternary operation (`totalTonnes !== 0 ? totalValue / totalTonnes : 0`) keeps the logic inline with the variable declaration, making the code more compact while preventing division by zero.
- Broke down the monolithic Index.tsx into smaller, composable components: PortfolioHeader (in `src/components/PortfolioHeader.tsx`), PositionsSection (in `src/components/PositionsSection.tsx`), and integrated PortfolioSummary (in `src/components/PortfolioSummary.tsx`)
- Extracted the PositionsTable into PositionsTable and PositionRow components (in `src/components/PositionRow.tsx`) for better reusability. PositionRow was extracted as a separate component since it represents a distinct, potentially reusable entity (a single position row).
- Created a dedicated PortfolioSummary component with internal sub-components (SummaryItem, SummaryCard, MessageDisplay) to eliminate repetition. These sub-components remain internal to PortfolioSummary since they represent tightly coupled UI elements that serve a single purpose.
- Moved formatting functions to a shared utils.ts file (`src/lib/utils.ts`) to promote reusability across components
- Applied DRY (Don't Repeat Yourself) principles by identifying and eliminating code duplication
- Used sub-components pattern to keep related functionality together while maintaining separation of concerns
