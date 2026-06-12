import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/server";

// Stripe webhook — records paid orders. Uses the service-role client so the
// insert bypasses RLS (there is no logged-in user during a webhook).
export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;
  try {
    if (!sig || !secret) throw new Error("Missing signature/secret");
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch (err) {
    console.error("Webhook signature verification failed", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const supabase = createAdminClient();
    await supabase.from("orders").insert({
      stripe_session_id: session.id,
      email: session.customer_details?.email ?? null,
      status: "paid",
      total: (session.amount_total ?? 0) / 100,
      shipping_address: session.customer_details?.address ?? null,
    });
  }

  return NextResponse.json({ received: true });
}
