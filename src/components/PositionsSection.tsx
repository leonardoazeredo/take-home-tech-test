import { Position } from "@/types/portfolio";
import { PositionsTable } from "@/components/PositionsTable";

interface PositionsSectionProps {
  positions: Position[];
  isLoadingPositions: boolean;
}

const PositionsSection = ({ positions, isLoadingPositions }: PositionsSectionProps) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Positions</h2>
      {isLoadingPositions ? (
        <div className="text-center py-8 text-muted-foreground">
          Loading positions...
        </div>
      ) : positions.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No positions found
        </div>
      ) : (
        <PositionsTable positions={positions} />
      )}
    </div>
  );
};

export default PositionsSection;