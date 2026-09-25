interface PortfolioImageProps {
  src: string;
  title: string;
  style: string;
  description?: string;
  artist?: string;
  duration?: string;
  date?: string;
}

interface PortfolioModalContentProps {
  tattoo: PortfolioImageProps | null;
}

export type { PortfolioImageProps, PortfolioModalContentProps };
