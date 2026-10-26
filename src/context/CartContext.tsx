"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import type {
  CartLine,
  CartItemInput,
  CartContextValue,
  StoredCartLine,
} from "@/types/cart";
import { makeKey } from "@/constants/cart";
import { clampQty, pruneUnavailable, resolveLine, sanitizeStored } from "@/lib/cart";
import { useCatalog } from "@/context/CatalogContext";

const CartContext = createContext<CartContextValue | null>(null);

// Bumped to v4 when the catalog moved from hard-coded ids to API ids, so old
// carts that point at the static constants are discarded instead of silently
// showing an empty cart.
const STORAGE_KEY = "shop-cart-v4";
const LEGACY_KEYS = ["shop-cart-v3", "shop-cart-v2"];

export function CartProvider({ children }: { children: ReactNode }) {
  const { products, designs } = useCatalog();
  const [items, setItems] = useState<StoredCartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      for (const key of LEGACY_KEYS) localStorage.removeItem(key);
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(sanitizeStored(JSON.parse(raw)));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, hydrated]);

  // Always derived from the server-provided catalog, never from storage
  const lines = useMemo<CartLine[]>(
    () =>
      items.flatMap((item) => resolveLine(item, { products, designs }) ?? []),
    [items, products, designs],
  );

  const add = useCallback((item: CartItemInput) => {
    const key = makeKey(item);
    setItems((prev) =>
      prev.some((l) => makeKey(l) === key)
        ? prev.map((l) =>
            makeKey(l) === key ? { ...l, qty: clampQty(l.qty + 1) } : l,
          )
        : [...prev, { kind: item.kind, id: item.id, qty: 1 }],
    );
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((l) => makeKey(l) !== key)
        : prev.map((l) =>
            makeKey(l) === key ? { ...l, qty: clampQty(qty) } : l,
          ),
    );
  }, []);

  const remove = useCallback(
    (key: string) => setItems((prev) => prev.filter((l) => makeKey(l) !== key)),
    [],
  );

  const clear = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      // priced items only; design lines are "price on request"
      total: lines.reduce((sum, l) => sum + (l.price ?? 0) * l.qty, 0),
      isOpen,
      add,
      setQty,
      remove,
      clear,
      openCart,
      closeCart,
    }),
    [lines, isOpen, add, setQty, remove, clear, openCart, closeCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
