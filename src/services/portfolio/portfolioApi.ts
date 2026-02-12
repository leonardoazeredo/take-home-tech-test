const API_BASE_URL = "http://localhost:4000/api";

export interface PortfolioSummaryResponse {
  totalTonnes: number;
  totalValue: number;
  averagePricePerTonne: number;
}

export const fetchPortfolioSummary = async (statusFilter?: string): Promise<PortfolioSummaryResponse> => {
  const url = statusFilter 
    ? `${API_BASE_URL}/portfolio/summary?status=${statusFilter}`
    : `${API_BASE_URL}/portfolio/summary`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch portfolio summary: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
};

export const fetchPortfolioPositions = async (): Promise<any[]> => {
  const response = await fetch(`${API_BASE_URL}/portfolio`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch portfolio positions: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
};