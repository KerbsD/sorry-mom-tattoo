import { useCatalog } from "@/context/CatalogContext";

function useDesign() {
  const { designs, designCategories } = useCatalog();

  return { designs, designCategories };
}

export default useDesign;
