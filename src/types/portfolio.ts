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
  /** How much to scale the image when zoomed in. */
  zoomScale?: number;
  sizes?: string;
}


export type { PortfolioImageProps, PortfolioModalContentProps, ZoomableImageProps };
