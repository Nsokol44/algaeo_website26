"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/lib/format";
import { siteConfig } from "@/config/site";

export default function CartPage() {
  const { items, setQty, remove, subtotal } = useCart();
  const [loading, setLoading] = useState(false);
  const total = subtotal();

  async function checkout() {
    setLoading(true);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: items.map((i) => ({ id: i.id, quantity: i.quantity })) }),
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    else { alert(data.error ?? "Checkout failed"); setLoading(false); }
  }

  if (items.length === 0) {
    return (
      <div className="container-x flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
        <h1>Your cart is empty</h1>
        <Link href="/shop" className="btn-primary mt-6">Browse the shop</Link>
      </div>
    );
  }

  return (
    <div className="container-x py-14">
      <h1>Your Cart</h1>
      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px]">
        <div className="divide-y divide-algaeo-border">
          {items.map((i) => (
            <div key={i.id} className="flex gap-4 py-5">
              <div className="h-24 w-24 shrink-0 rounded-card bg-algaeo-green-pale" />
              <div className="flex-1">
                <Link href={`/shop/${i.slug}`} className="font-medium hover:text-algaeo-green-dark">
                  {i.title}
                </Link>
                <p className="text-sm text-algaeo-text-light">{formatPrice(i.price)}</p>
                <div className="mt-2 flex items-center gap-4">
                  <div className="flex items-center rounded-btn border border-algaeo-border">
                    <button onClick={() => setQty(i.id, i.quantity - 1)} className="px-3 py-1">−</button>
                    <span className="w-8 text-center text-sm">{i.quantity}</span>
                    <button onClick={() => setQty(i.id, i.quantity + 1)} className="px-3 py-1">+</button>
                  </div>
                  <button onClick={() => remove(i.id)} className="text-sm text-algaeo-text-light underline">
                    Remove
                  </button>
                </div>
              </div>
              <span className="font-semibold">{formatPrice(i.price * i.quantity)}</span>
            </div>
          ))}
        </div>

        <aside className="card h-fit p-6">
          <h3 className="font-display text-xl">Order Summary</h3>
          <div className="mt-4 flex justify-between text-sm">
            <span className="text-algaeo-text-mid">Subtotal</span>
            <span className="font-semibold">{formatPrice(total)}</span>
          </div>
          <div className="mt-2 flex justify-between text-sm">
            <span className="text-algaeo-text-mid">Shipping</span>
            <span>{total >= siteConfig.commerce.freeShippingThreshold ? "Free" : "Calculated at checkout"}</span>
          </div>
          <button onClick={checkout} disabled={loading} className="btn-primary mt-6 w-full justify-center disabled:opacity-60">
            {loading ? "Redirecting…" : "Proceed to Checkout"}
          </button>
          <Link href="/shop" className="mt-3 block text-center text-sm text-algaeo-text-light underline">
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}
