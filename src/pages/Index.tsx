import { useEffect } from "react";
import { usePortfolioSummary } from "@/hooks/portfolio/usePortfolioSummary";
import { usePositions } from "@/hooks/portfolio/usePositions";
import PortfolioHeader from "@/components/portfolio/PortfolioHeader";
import PositionsSection from "@/components/portfolio/PositionsSection";
import PortfolioSummaryComponent from "@/components/portfolio/PortfolioSummary";

const Index = () => {
  // Use the custom hooks for portfolio data
  const {
    summary,
    isLoading: isLoadingSummary,
    statusFilter,
    setStatusFilter
  } = usePortfolioSummary();

  const {
    positions,
    isLoading: isLoadingPositions
  } = usePositions();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <PortfolioHeader />

        <div className="space-y-6">
          <PortfolioSummaryComponent
            summary={summary}
            isLoading={isLoadingSummary}
            onStatusChange={setStatusFilter}
            currentStatus={statusFilter}
          />
          <PositionsSection positions={positions} isLoadingPositions={isLoadingPositions} />
        </div>
      </div>
    </div>
  );
};

export default Index;
