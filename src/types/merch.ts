interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
  category: string;
}

interface MerchCardProps {
  product: Product;
}

export type { Product, MerchCardProps };
