import type { Product } from "@/types/merch";

const PRODUCTS: Product[] = [
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

const CATEGORIES = [
  "All",
  ...new Set(PRODUCTS.map((products) => products.category)),
];

export { PRODUCTS, CATEGORIES };
