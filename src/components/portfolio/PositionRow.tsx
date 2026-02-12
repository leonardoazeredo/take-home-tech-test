import { Position } from "@/types/portfolio";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  TableCell,
  TableRow,
} from "@/components/ui/table";

interface PositionRowProps {
  position: Position;
}

export function PositionRow({ position }: PositionRowProps) {
  return (
    <TableRow key={position.id}>
      <TableCell className="font-medium">{position.projectName}</TableCell>
      <TableCell className="text-right">{formatNumber(position.tonnes)}</TableCell>
      <TableCell className="text-right">{formatCurrency(position.pricePerTonne)}</TableCell>
      <TableCell className="text-right">
        {formatCurrency(position.tonnes * position.pricePerTonne)}
      </TableCell>
      <TableCell className="text-center">
        <Badge variant={position.status === 'available' ? 'default' : 'secondary'}>
          {position.status}
        </Badge>
      </TableCell>
      <TableCell className="text-center">{position.vintage}</TableCell>
    </TableRow>
  );
}