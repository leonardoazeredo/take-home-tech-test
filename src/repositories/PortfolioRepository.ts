import { 
  fetchPortfolioSummary as apiFetchPortfolioSummary, 
  fetchPortfolioPositions as apiFetchPortfolioPositions,
  PortfolioSummaryResponse 
} from "@/services/portfolio/portfolioApi";

export interface PortfolioRepository {
  getSummary(statusFilter?: string): Promise<PortfolioSummaryResponse>;
  getPositions(): Promise<any[]>;
}

class PortfolioRepositoryImpl implements PortfolioRepository {
  async getSummary(statusFilter?: string): Promise<PortfolioSummaryResponse> {
    return await apiFetchPortfolioSummary(statusFilter);
  }

  async getPositions(): Promise<any[]> {
    return await apiFetchPortfolioPositions();
  }
}

// Export singleton instance
export const portfolioRepository: PortfolioRepository = new PortfolioRepositoryImpl();