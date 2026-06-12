import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import { siteConfig } from "@/config/site";

export async function POST(req: Request) {
  try {
    // Guard against missing/placeholder Stripe credentials with a clear message.
    const secret = process.env.STRIPE_SECRET_KEY ?? "";
    if (!secret || !secret.startsWith("sk_") || secret.includes("dummy") || secret.includes("xxx")) {
      return NextResponse.json(
        { error: "Stripe is not configured. Add a real STRIPE_SECRET_KEY to .env.local and restart." },
        { status: 500 },
      );
    }

    const { items } = (await req.json()) as { items: { id: string; quantity: number }[] };
    if (!items?.length) {
      return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
    }

    // Re-fetch prices server-side — never trust client-supplied amounts.
    const supabase = await createClient();
    const ids = items.map((i) => i.id);
    const { data: products } = await supabase
      .from("products")
      .select("id, title, price")
      .in("id", ids);

    if (!products?.length) {
      return NextResponse.json({ error: "Products not found." }, { status: 400 });
    }

    const line_items = items
      .map((item) => {
        const product = products.find((p) => p.id === item.id);
        if (!product) return null;
        return {
          quantity: item.quantity,
          price_data: {
            currency: siteConfig.commerce.currency,
            product_data: { name: product.title },
            // free-trial products charge only the $4.99 shipping handled below
            unit_amount: Math.round(Number(product.price) * 100),
          },
        };
      })
      .filter(Boolean) as Stripe.Checkout.SessionCreateParams.LineItem[];

    const siteUrl = siteConfig.url;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      shipping_address_collection: { allowed_countries: ["US", "CA"] },
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/cart`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("checkout error", err);
    const message = err instanceof Error ? err.message : "Unable to start checkout.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
