import { useState, useEffect } from "react";
import { PortfolioSummary as PortfolioSummaryType } from "@/types/portfolio";
import { useToast } from "@/hooks/use-toast";
import { portfolioRepository } from "@/repositories/PortfolioRepository";

interface PortfolioSummaryData {
  summary: PortfolioSummaryType | null;
  isLoading: boolean;
  statusFilter: string | null;
  setStatusFilter: (status: string | null) => void;
}

export const usePortfolioSummary = (): PortfolioSummaryData => {
  const [summary, setSummary] = useState<PortfolioSummaryType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchSummary();
  }, [statusFilter]);

  const fetchSummary = async () => {
    try {
      setIsLoading(true);
      const data = await portfolioRepository.getSummary(statusFilter || undefined);
      setSummary(data);
    } catch (error) {
      toast({
        title: "Error",
        description:
          "Failed to load portfolio summary. Make sure the backend is running.",
        variant: "destructive",
      });
      console.error("Error fetching portfolio summary:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    summary,
    isLoading,
    statusFilter,
    setStatusFilter,
  };
};