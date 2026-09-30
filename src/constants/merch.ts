import type { Product } from "@/types/merch";

const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Sorry Mom Hoodie",
    price: 1000,
    image: "/merch/HOODIE.png",
    slug: "sorry-mom-hoodie",
    category: "Hoodies",
    preorder: true,
  },
  {
    id: "2",
    name: "Sorry Mom Shirt",
    price: 500,
    image: "/merch/SHIRT.png",
    slug: "sorry-mom-shirt",
    category: "Shirts",
    preorder: true,
  },
  {
    id: "3",
    name: "Sorry Mom Shirt - White",
    price: 500,
    image: "/merch/SHIRT-WHITE.png",
    slug: "sorry-mom-shirt-white",
    category: "Shirts",
    preorder: true,
  },
  {
    id: "4",
    name: "Sorry Mom Sticker Pack",
    price: 100,
    image: "/merch/STICKERPACK.png",
    slug: "sorry-mom-sticker-pack",
    category: "Accessories",
  },
];

const CATEGORIES = [
  "All",
  ...new Set(PRODUCTS.map((products) => products.category)),
];

export { PRODUCTS, CATEGORIES };
