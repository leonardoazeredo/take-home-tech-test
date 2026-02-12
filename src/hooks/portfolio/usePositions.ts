import { useState, useEffect } from "react";
import { Position } from "@/types/portfolio";
import { useToast } from "@/hooks/use-toast";
import { portfolioRepository } from "@/repositories/PortfolioRepository";

interface PositionsData {
  positions: Position[];
  isLoading: boolean;
}

export const usePositions = (): PositionsData => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPositions();
  }, []);

  const fetchPositions = async () => {
    try {
      setIsLoading(true);
      const data = await portfolioRepository.getPositions();
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
      setIsLoading(false);
    }
  };

  return {
    positions,
    isLoading,
  };
};