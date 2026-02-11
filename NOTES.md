# Implementation Notes

## Bug Fix in computeSummary Function

The original implementation had an incorrect calculation for the averagePricePerTonne. It was calculating `totalValue / positions.length` instead of the correct weighted average `totalValue / totalTonnes`. This has been fixed to properly calculate the weighted average price per tonne, which is essential for accurate portfolio summaries.

## Design Decisions

- Used a ternary operator in `backend/src/services/portfolioSummary.ts` to prevent division by zero errors while keeping the code concise and readable in a single assignment.
- Broke down the monolithic Index.tsx into smaller, composable components to improve maintainability, testability, and reusability. Each component now has a single responsibility.
- Extracted PositionRow as a separate component because it represents a distinct, reusable entity (a single position row) that could potentially be used in other contexts.
- Created a dedicated PortfolioSummary component with internal sub-components to encapsulate all summary-related functionality in one place, making it easier to reason about and modify.
- Moved formatting functions to a shared utils.ts file to promote reusability across components and avoid code duplication.
- Applied DRY (Don't Repeat Yourself) principles to reduce maintenance overhead and potential inconsistencies.
- Used sub-components pattern to keep related functionality together while maintaining separation of concerns, making the code more modular.
- Moved filter controls to the PortfolioSummary component because the filters are semantically related to the summary data they affect, improving component cohesion.
- Dynamically generated filter buttons from an array to make it easier to add new filter options in the future without duplicating button markup.
- Consolidated the component structure to eliminate repetitive templates, reducing cognitive load and making the component easier to maintain.
