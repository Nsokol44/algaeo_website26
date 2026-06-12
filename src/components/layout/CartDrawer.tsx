"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/store/cart";
import { siteConfig } from "@/config/site";
import { formatPrice } from "@/lib/format";

export function CartDrawer() {
  const { items, isOpen, close, setQty, remove, subtotal } = useCart();
  const [loading, setLoading] = useState(false);
  const total = subtotal();

  async function checkout() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ id: i.id, quantity: i.quantity })),
        }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else throw new Error(data.error ?? "Checkout failed");
    } catch (e) {
      alert(e instanceof Error ? e.message : "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <>
      <div
        onClick={close}
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-a-lg transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between border-b border-algaeo-border p-5">
          <h3 className="font-display text-xl">Your Cart</h3>
          <button onClick={close} aria-label="Close cart" className="rounded p-1 hover:bg-algaeo-green-pale">
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <p className="text-algaeo-text-mid">Your cart is empty.</p>
            <Link href="/shop" onClick={close} className="btn-primary">
              Browse the shop
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              {items.map((i) => (
                <div key={i.id} className="flex gap-3">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md bg-algaeo-green-pale" />
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-snug">{i.title}</p>
                    <p className="text-sm text-algaeo-text-light">{formatPrice(i.price)}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <Qty value={i.quantity} onChange={(q) => setQty(i.id, q)} />
                      <button
                        onClick={() => remove(i.id)}
                        className="text-xs text-algaeo-text-light underline hover:text-algaeo-green-dark"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <span className="text-sm font-semibold">{formatPrice(i.price * i.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-algaeo-border p-5">
              <div className="mb-3 flex justify-between text-sm">
                <span className="text-algaeo-text-mid">Subtotal</span>
                <span className="font-semibold">{formatPrice(total)}</span>
              </div>
              <p className="mb-4 text-xs text-algaeo-text-light">
                {total >= siteConfig.commerce.freeShippingThreshold ? "✓ Free shipping applied" : `Free shipping on orders over $${siteConfig.commerce.freeShippingThreshold}`}
              </p>
              <button onClick={checkout} disabled={loading} className="btn-primary w-full justify-center disabled:opacity-60">
                {loading ? "Redirecting…" : "Checkout"}
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

function Qty({ value, onChange }: { value: number; onChange: (q: number) => void }) {
  return (
    <div className="flex items-center rounded-btn border border-algaeo-border">
      <button onClick={() => onChange(value - 1)} className="px-2 py-0.5" aria-label="Decrease">−</button>
      <span className="w-7 text-center text-sm">{value}</span>
      <button onClick={() => onChange(value + 1)} className="px-2 py-0.5" aria-label="Increase">+</button>
    </div>
  );
}
