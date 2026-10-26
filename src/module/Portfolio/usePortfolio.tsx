import { getPortfolio } from "@/lib/api";
import type { PortfolioImageProps } from "@/types/portfolio";

async function usePortfolio() {
  const items: PortfolioImageProps[] | undefined = await getPortfolio();

  return { items };
}

export default usePortfolio;
