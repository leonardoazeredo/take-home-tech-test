import { PortfolioSummary as PortfolioSummaryType } from "@/types/portfolio";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatNumber } from "@/lib/utils";

interface PortfolioSummaryProps {
  summary: PortfolioSummaryType | null;
  isLoading?: boolean;
}

// Define the summary items to avoid repetition
const SUMMARY_ITEMS = [
  { label: "Total Tonnes", valueKey: "totalTonnes", formatter: formatNumber },
  { label: "Total Value", valueKey: "totalValue", formatter: formatCurrency },
  { label: "Avg Price/Tonne", valueKey: "averagePricePerTonne", formatter: formatCurrency },
];

// Sub-component: SummaryItem
const SummaryItem = ({ label, value }: { label: string; value: string | number }) => (
  <div className="text-center">
    <h3 className="text-lg font-semibold text-muted-foreground">{label}</h3>
    <p className="text-3xl font-bold mt-2">{value}</p>
  </div>
);

// Sub-component: SummaryCard
const SummaryCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      {children}
    </CardContent>
  </Card>
);

// Sub-component: MessageDisplay
const MessageDisplay = ({ message }: { message: string }) => (
  <div className="text-center py-4 text-muted-foreground">{message}</div>
);

const PortfolioSummaryComponent = ({ summary, isLoading = false }: PortfolioSummaryProps) => {
  if (isLoading) {
    return (
      <SummaryCard title="Portfolio Summary">
        <MessageDisplay message="Loading summary..." />
      </SummaryCard>
    );
  }

  if (!summary) {
    return (
      <SummaryCard title="Portfolio Summary">
        <MessageDisplay message="No summary data available" />
      </SummaryCard>
    );
  }

  return (
    <SummaryCard title="Portfolio Summary">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SUMMARY_ITEMS.map(({ label, valueKey, formatter }) => (
          <SummaryItem 
            key={label} 
            label={label} 
            value={formatter(summary[valueKey as keyof PortfolioSummaryType] as number)} 
          />
        ))}
      </div>
    </SummaryCard>
  );
};

export default PortfolioSummaryComponent;