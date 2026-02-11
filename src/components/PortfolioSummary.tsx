import { PortfolioSummary as PortfolioSummaryType } from "@/types/portfolio";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatNumber } from "@/lib/utils";

interface PortfolioSummaryProps {
  summary: PortfolioSummaryType | null;
  isLoading?: boolean;
  onStatusChange?: (status: string | null) => void;
  currentStatus?: string | null;
}

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

// Sub-component: FilterControls
const FilterControls = ({ onStatusChange, currentStatus }: { onStatusChange?: (status: string | null) => void; currentStatus?: string | null }) => {
  const filters = [
    { value: null, label: 'All Statuses' },
    { value: 'available', label: 'Available' },
    { value: 'retired', label: 'Retired' },
  ];

  return (
    <div className="flex space-x-4">
      {filters.map((filter) => (
        <button
          key={filter.value || 'all'}
          onClick={() => onStatusChange?.(filter.value)}
          className={`px-4 py-2 rounded-md ${
            currentStatus === filter.value
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

// Sub-component: MessageDisplay
const MessageDisplay = ({ message }: { message: string }) => (
  <div className="text-center py-4 text-muted-foreground">{message}</div>
);

const PortfolioSummaryComponent = ({ summary, isLoading = false, onStatusChange, currentStatus }: PortfolioSummaryProps) => {
  // Define the summary items to avoid repetition
  const SUMMARY_ITEMS = [
    { label: "Total Tonnes", valueKey: "totalTonnes", formatter: formatNumber },
    { label: "Total Value", valueKey: "totalValue", formatter: formatCurrency },
    { label: "Avg Price/Tonne", valueKey: "averagePricePerTonne", formatter: formatCurrency },
  ];

  // Determine content based on state
  let content;

  if (isLoading) {
    content = <MessageDisplay message="Loading summary..." />;
  } else if (!summary) {
    content = <MessageDisplay message="No summary data available" />;
  } else {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SUMMARY_ITEMS.map(({ label, valueKey, formatter }) => (
          <SummaryItem
            key={label}
            label={label}
            value={formatter(summary[valueKey as keyof PortfolioSummaryType] as number)}
          />
        ))}
      </div>
    );
  }

  return (
    <SummaryCard title="Portfolio Summary">
      <div className="space-y-4">
        <FilterControls onStatusChange={onStatusChange} currentStatus={currentStatus} />
        {content}
      </div>
    </SummaryCard>
  );
};

export default PortfolioSummaryComponent;