"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";

import type { Design } from "@/types/design";
import type { Product } from "@/types/merch";

interface CatalogContextValue {
  products: Product[];
  designs: Design[];
  /** ["All", ...distinct merch categories] */
  merchCategories: string[];
  /** ["All Designs", ...distinct design categories] */
  designCategories: string[];
}

const CatalogContext = createContext<CatalogContextValue | null>(null);

function buildCategories(values: string[], allLabel: string): string[] {
  const categories = [allLabel];
  const seen = new Set<string>();

  for (const value of values) {
    const category = value.trim();
    if (category === "" || seen.has(category)) continue;
    seen.add(category);
    categories.push(category);
  }

  return categories;
}

interface CatalogProviderProps {
  products: Product[];
  designs: Design[];
  children: ReactNode;
}

/**
 * Server-fetched merch/design data shared by the store pages and the cart.
 * The root layout fetches it once per revalidation window, so both the initial
 * HTML and the client cart see the same catalog without a browser request.
 */
export function CatalogProvider({
  products,
  designs,
  children,
}: CatalogProviderProps) {
  const value = useMemo<CatalogContextValue>(
    () => ({
      products,
      designs,
      merchCategories: buildCategories(
        products.map((product) => product.category),
        "All",
      ),
      designCategories: buildCategories(
        designs.map((design) => design.category),
        "All Designs",
      ),
    }),
    [products, designs],
  );

  return (
    <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
  );
}

export function useCatalog() {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error("useCatalog must be used inside <CatalogProvider>");
  }
  return context;
}
