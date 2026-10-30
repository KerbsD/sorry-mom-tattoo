interface Design {
  id: string;
  title: string;
  description: string;
  style: string;
  placement: string;
  image: string;
  category: string;
}

interface DesignCardProps {
  design: Design;
}

export type { Design, DesignCardProps };
