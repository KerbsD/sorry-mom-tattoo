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

interface ZoomableImageProps {
  src: string;
  alt: string;
  className?: string;
  zoomScale?: number;
  sizes?: string;
}


export type { PortfolioImageProps, PortfolioModalContentProps, ZoomableImageProps };
