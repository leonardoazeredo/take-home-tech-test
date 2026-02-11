import { PortfolioSummary as PortfolioSummaryType } from "@/types/portfolio";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatNumber } from "@/lib/utils";

interface PortfolioSummaryProps {
  summary: PortfolioSummaryType | null;
  isLoading?: boolean;
  onStatusChange?: (status: string | null) => void;
  currentStatus?: string | null;
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

const PortfolioSummaryComponent = ({ summary, isLoading = false, onStatusChange, currentStatus }: PortfolioSummaryProps) => {
  if (isLoading) {
    return (
      <SummaryCard title="Portfolio Summary">
        <div className="space-y-4">
          {/* Status Filter Controls */}
          <div className="flex space-x-4">
            <button
              onClick={() => onStatusChange?.(null)}
              className={`px-4 py-2 rounded-md ${
                currentStatus === null
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              All Statuses
            </button>
            <button
              onClick={() => onStatusChange?.('available')}
              className={`px-4 py-2 rounded-md ${
                currentStatus === 'available'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              Available
            </button>
            <button
              onClick={() => onStatusChange?.('retired')}
              className={`px-4 py-2 rounded-md ${
                currentStatus === 'retired'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              Retired
            </button>
          </div>

          <MessageDisplay message="Loading summary..." />
        </div>
      </SummaryCard>
    );
  }

  if (!summary) {
    return (
      <SummaryCard title="Portfolio Summary">
        <div className="space-y-4">
          {/* Status Filter Controls */}
          <div className="flex space-x-4">
            <button
              onClick={() => onStatusChange?.(null)}
              className={`px-4 py-2 rounded-md ${
                currentStatus === null
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              All Statuses
            </button>
            <button
              onClick={() => onStatusChange?.('available')}
              className={`px-4 py-2 rounded-md ${
                currentStatus === 'available'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              Available
            </button>
            <button
              onClick={() => onStatusChange?.('retired')}
              className={`px-4 py-2 rounded-md ${
                currentStatus === 'retired'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              Retired
            </button>
          </div>

          <MessageDisplay message="No summary data available" />
        </div>
      </SummaryCard>
    );
  }

  return (
    <SummaryCard title="Portfolio Summary">
      <div className="space-y-4">
        {/* Status Filter Controls */}
        <div className="flex space-x-4">
          <button
            onClick={() => onStatusChange?.(null)}
            className={`px-4 py-2 rounded-md ${
              currentStatus === null
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            All Statuses
          </button>
          <button
            onClick={() => onStatusChange?.('available')}
            className={`px-4 py-2 rounded-md ${
              currentStatus === 'available'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            Available
          </button>
          <button
            onClick={() => onStatusChange?.('retired')}
            className={`px-4 py-2 rounded-md ${
              currentStatus === 'retired'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            Retired
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SUMMARY_ITEMS.map(({ label, valueKey, formatter }) => (
            <SummaryItem
              key={label}
              label={label}
              value={formatter(summary[valueKey as keyof PortfolioSummaryType] as number)}
            />
          ))}
        </div>
      </div>
    </SummaryCard>
  );
};

export default PortfolioSummaryComponent;