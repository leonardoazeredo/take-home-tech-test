import { useEffect, useState } from "react";
import { Position, PortfolioSummary as PortfolioSummaryType } from "@/types/portfolio";
import { useToast } from "@/hooks/use-toast";
import PortfolioHeader from "@/components/PortfolioHeader";
import PositionsSection from "@/components/PositionsSection";
import PortfolioSummaryComponent from "@/components/PortfolioSummary";

const API_BASE_URL = "http://localhost:4000/api";

const Index = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [summary, setSummary] = useState<PortfolioSummaryType | null>(null);
  const [isLoadingPositions, setIsLoadingPositions] = useState(true);
  const [isLoadingSummary, setIsLoadingSummary] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchPositions();
    fetchSummary();
  }, []);

  useEffect(() => {
    // Re-fetch summary when status filter changes
    fetchSummary();
  }, [statusFilter]);

  const fetchPositions = async () => {
    try {
      setIsLoadingPositions(true);
      const response = await fetch(`${API_BASE_URL}/portfolio`);
      if (!response.ok) throw new Error("Failed to fetch positions");
      const data = await response.json();
      setPositions(data);
    } catch (error) {
      toast({
        title: "Error",
        description:
          "Failed to load portfolio positions. Make sure the backend is running.",
        variant: "destructive",
      });
      console.error("Error fetching positions:", error);
    } finally {
      setIsLoadingPositions(false);
    }
  };

  const fetchSummary = async () => {
    try {
      setIsLoadingSummary(true);
      // Construct URL with status filter if present
      const url = statusFilter
        ? `${API_BASE_URL}/portfolio/summary?status=${statusFilter}`
        : `${API_BASE_URL}/portfolio/summary`;

      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch portfolio summary");
      const data = await response.json();
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
      setIsLoadingSummary(false);
    }
  };

  const handleStatusChange = (status: string | null) => {
    setStatusFilter(status);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <PortfolioHeader />

        <div className="space-y-6">
          <PortfolioSummaryComponent
            summary={summary}
            isLoading={isLoadingSummary}
            onStatusChange={handleStatusChange}
            currentStatus={statusFilter}
          />
          <PositionsSection positions={positions} isLoadingPositions={isLoadingPositions} />
        </div>
      </div>
    </div>
  );
};

export default Index;
