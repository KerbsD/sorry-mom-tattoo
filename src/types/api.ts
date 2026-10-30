/**
 * Raw shapes returned by the public smt-be endpoints (/portfolio, /merch, /design).
 * These mirror the database rows, so they use `imageUrl` and numeric ids while the
 * UI types use `image` and string ids. The mapping lives in `src/lib/api.ts`.
 */

export interface ApiPortfolioItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  style: string;
  artist: string;
  duration: string;
  /** Calendar date in YYYY-MM-DD form, or null. */
  date: string | null;
  sortOrder: number;
  published: boolean;
}

export interface ApiMerchProduct {
  id: number;
  name: string;
  slug: string;
  /** Whole Philippine pesos. */
  price: number;
  imageUrl: string;
  category: string;
  preorder: boolean;
  sortOrder: number;
  published: boolean;
}

export interface ApiDesignItem {
  id: number;
  title: string;
  description: string;
  style: string;
  placement: string;
  imageUrl: string;
  category: string;
  sortOrder: number;
  published: boolean;
}

export interface ApiEnvelope<T> {
  success: true;
  data: T;
}

export interface ApiPagination {
  limit: number;
  offset: number;
  total: number;
  hasMore: boolean;
}

export interface ApiPaginatedEnvelope<T> {
  success: true;
  data: T[];
  pagination: ApiPagination;
}
