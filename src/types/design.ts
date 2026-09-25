interface Design {
  id: string;
  title: string;
  description: string;
  style: string;
  placement: string;
  image: string;
  category: string;
  price: 0;
}

interface DesignCardProps {
  design: Design;
}


export type { Design, DesignCardProps };
