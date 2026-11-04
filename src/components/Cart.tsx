"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

export type CartLine = { slug: string; qty: number };
type Ctx = { lines: CartLine[]; count: number; add: (slug: string, qty?: number) => void; set: (slug: string, qty: number) => void; clear: () => void };
const CartCtx = createContext<Ctx>({ lines: [], count: 0, add: () => {}, set: () => {}, clear: () => {} });
const KEY = "plant-e-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  useEffect(() => {
    try { const raw = localStorage.getItem(KEY); if (raw) setLines(JSON.parse(raw)); } catch { /* storage unavailable */ }
  }, []);
  const persist = useCallback((next: CartLine[]) => {
    setLines(next);
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* storage unavailable */ }
  }, []);
  const add = (slug: string, qty = 1) => {
    const found = lines.find((l) => l.slug === slug);
    persist(found ? lines.map((l) => (l.slug === slug ? { ...l, qty: Math.min(99, l.qty + qty) } : l)) : [...lines, { slug, qty }]);
  };
  const set = (slug: string, qty: number) => persist(qty <= 0 ? lines.filter((l) => l.slug !== slug) : lines.map((l) => (l.slug === slug ? { ...l, qty: Math.min(99, qty) } : l)));
  const clear = () => persist([]);
  const count = lines.reduce((s, l) => s + l.qty, 0);
  return <CartCtx.Provider value={{ lines, count, add, set, clear }}>{children}</CartCtx.Provider>;
}

export const useCart = () => useContext(CartCtx);
