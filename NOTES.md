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
- Separated concerns by creating a custom hook (`usePortfolioSummary`) for data fetching and state management because mixing these concerns in the UI component made it harder to test and maintain.
- Created a service layer (`portfolioApi.ts`) to abstract API calls because tight coupling between components and API endpoints made the code brittle and difficult to modify or test.
- Moved API logic out of the Index page to improve separation of concerns because the page was doing too many things (data fetching, state management, UI orchestration) which violated the single responsibility principle.
- Organized components by domain (portfolio components in `src/components/portfolio/`) to improve maintainability and make the codebase easier to navigate.
- Created dedicated hooks for different data concerns (`usePortfolioSummary` and `usePositions`) to separate data fetching responsibilities and make components more focused.

## Thoughts and Suggestions for Future Improvements

While completing this take-home test, I identified several areas that I would consider for future enhancement if this were a real-world application, though they fall outside the scope of this exercise:

- **Caching Strategy**: I would consider implementing caching for the portfolio summary API to reduce the impact of the slow API response while still preserving the backend functionality. This could improve user experience without removing the intentional delay.
- **Enhanced Filtering**: The current implementation supports filtering by status only. I would like to expand this to include filtering by vintage year, project name, or price range in future iterations.
- **Loading State Enhancements**: I considered adding skeleton screens or more detailed loading indicators to improve perceived performance during the 2-second API delay.
- **Error Handling**: The current error handling is basic. I would implement more sophisticated error recovery mechanisms in a production environment, such as retry logic or fallback displays.
- **Performance Optimization**: I would consider implementing pagination or virtual scrolling if the number of positions grows significantly large.
- **Testing Coverage**: I recognize that the current implementation would benefit from comprehensive unit tests for the filtering logic and integration tests for the frontend components.
- **Accessibility**: I noted that the filter controls could be enhanced with better accessibility attributes (ARIA labels, keyboard navigation) to improve usability for all users.
- **Configurability**: I noted that the API_BASE_URL lives in code files, that kind of information should be moved to a .env file.
