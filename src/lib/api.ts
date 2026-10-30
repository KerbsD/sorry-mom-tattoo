import { formatCalendarDate } from "@/utils/dates";

import type {
  ApiDesignItem,
  ApiEnvelope,
  ApiMerchProduct,
  ApiPaginatedEnvelope,
  ApiPortfolioItem,
} from "@/types/api";
import type { Design } from "@/types/design";
import type { Product } from "@/types/merch";
import type { PortfolioImageProps } from "@/types/portfolio";

/**
 * Server-side client for the public smt-be endpoints.
 *
 * Everything here is fetched during server rendering (layout/pages), so the
 * browser never talks to the API directly. That keeps the catalog in the
 * initial HTML and avoids needing CORS rules for the landing origin.
 */

const configuredApiUrl = process.env.NEXT_PUBLIC_API_URL;

if (!configuredApiUrl) {
  console.warn(
    "[smt-landing] NEXT_PUBLIC_API_URL is not set; falling back to http://localhost:3000.",
  );
}

const API_URL = (configuredApiUrl ?? "http://localhost:3000").replace(
  /\/+$/,
  "",
);

const REVALIDATE_SECONDS = 60;
/** The public list endpoints cap `limit` at 100. */
const PAGE_SIZE = 100;
const MAX_PAGES = 20;
const isDevelopment = process.env.NODE_ENV === "development";

class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

function buildFetchInit(): RequestInit {
  const init: RequestInit = {
    headers: { Accept: "application/json" },
  };

  if (isDevelopment) {
    // Skip the Data Cache in development so admin edits show up immediately.
    init.cache = "no-store";
  } else {
    init.cache = "force-cache";
    init.next = { revalidate: REVALIDATE_SECONDS };
  }

  return init;
}

async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, buildFetchInit());

  if (!response.ok) {
    throw new ApiError(`Request failed (${response.status}).`, response.status);
  }

  return (await response.json()) as T;
}

function assertEnvelope<T>(
  payload: unknown,
): asserts payload is ApiEnvelope<T> {
  if (
    typeof payload !== "object" ||
    payload === null ||
    (payload as { success?: unknown }).success !== true ||
    !Array.isArray((payload as { data?: unknown }).data)
  ) {
    throw new Error("Unexpected API response.");
  }
}

async function getAllPages<T>(path: string): Promise<T[]> {
  const items: T[] = [];
  let offset = 0;

  for (let page = 0; page < MAX_PAGES; page += 1) {
    const payload = await apiGet<ApiPaginatedEnvelope<T>>(
      `${path}?limit=${PAGE_SIZE}&offset=${offset}`,
    );

    assertEnvelope<T[]>(payload);

    items.push(...payload.data);

    if (!payload.pagination?.hasMore || payload.data.length === 0) break;
    offset += payload.data.length;
  }

  return items;
}

async function safeLoad<T>(
  label: string,
  fallback: T,
  load: () => Promise<T>,
): Promise<T> {
  try {
    return await load();
  } catch (error) {
    // A temporary API outage should not take the whole site down. The empty
    // state renders instead, and ISR retries once the revalidate window passes.
    console.error(`[smt-landing] Could not load ${label}.`, error);
    return fallback;
  }
}

function toPortfolioImage(item: ApiPortfolioItem): PortfolioImageProps {
  return {
    src: item.imageUrl,
    title: item.title,
    style: item.style,
    description: item.description || undefined,
    artist: item.artist || undefined,
    duration: item.duration || undefined,
    date: formatCalendarDate(item.date),
  };
}

function toProduct(item: ApiMerchProduct): Product {
  return {
    id: String(item.id),
    name: item.name,
    price: item.price,
    image: item.imageUrl,
    slug: item.slug,
    category: item.category,
    preorder: item.preorder,
  };
}

function toDesign(item: ApiDesignItem): Design {
  return {
    id: String(item.id),
    title: item.title,
    description: item.description,
    style: item.style,
    placement: item.placement,
    image: item.imageUrl,
    category: item.category,
  };
}

export function getPortfolio(): Promise<PortfolioImageProps[]> {
  return safeLoad("the portfolio", [], async () => {
    const payload = await apiGet<ApiEnvelope<ApiPortfolioItem[]>>("/portfolio");
    assertEnvelope<ApiPortfolioItem[]>(payload);
    return payload.data.map(toPortfolioImage);
  });
}

export function getMerchProducts(): Promise<Product[]> {
  return safeLoad("merch", [], async () => {
    const items = await getAllPages<ApiMerchProduct>("/merch");
    return items.map(toProduct);
  });
}

export function getDesignItems(): Promise<Design[]> {
  return safeLoad("designs", [], async () => {
    const items = await getAllPages<ApiDesignItem>("/design");
    return items.map(toDesign);
  });
}

/** Both public catalogs the cart and the store pages depend on. */
export async function getCatalog(): Promise<{
  products: Product[];
  designs: Design[];
}> {
  const [products, designs] = await Promise.all([
    getMerchProducts(),
    getDesignItems(),
  ]);

  return { products, designs };
}
