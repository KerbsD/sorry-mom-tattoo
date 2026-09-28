interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
  category: string;
  preorder?: boolean;
}

interface MerchCardProps {
  product: Product;
}

export type { Product, MerchCardProps };
