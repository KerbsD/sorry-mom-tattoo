import { useCatalog } from "@/context/CatalogContext";

function useMerch() {
  const { products, merchCategories } = useCatalog();

  return { products, merchCategories };
}

export default useMerch