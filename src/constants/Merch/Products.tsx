// constants/Merch/Products.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
  category: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Sorry Mom Hoodie",
    price: 1000,
    image: "/merch/HOODIE.png",
    slug: "sorry-mom-hoodie",
    category: "Hoodies",
  },
  {
    id: "2",
    name: "Sorry Mom Shirt",
    price: 800,
    image: "/merch/SHIRT.png",
    slug: "sorry-mom-shirt",
    category: "Shirts",
  },
  {
    id: "3",
    name: "Sorry Mom Sticker Pack",
    price: 800,
    image: "/merch/STICKERPACK.png",
    slug: "sorry-mom-sticker-pack",
    category: "Accessories",
  },
  {
    id: "4",
    name: "Sorry Mom Art Prints",
    price: 800,
    image: "/merch/ART-PRINTS.png",
    slug: "sorry-mom-art-prints",
    category: "Prints",
  },
];

export const categories = [
  "All",
  ...new Set(products.map((products) => products.category)),
];

export const formatPHP = (amount: number) =>
  new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(
    amount,
  );
