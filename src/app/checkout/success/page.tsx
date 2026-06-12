import Link from "next/link";
import { ClearCart } from "@/components/shop/ClearCart";

export const metadata = { title: "Order Confirmed" };

export default function SuccessPage() {
  return (
    <div className="container-x flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <ClearCart />
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-algaeo-green-pale text-3xl text-algaeo-green-dark">
        ✓
      </div>
      <h1 className="mt-6">Order confirmed</h1>
      <p className="mt-3 max-w-md text-algaeo-text-mid">
        Thank you. Your live cultures ship from Knoxville, TN within 2 business days. A receipt is on
        its way to your email.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/shop" className="btn-outline">Keep shopping</Link>
        <Link href="/" className="btn-primary">Back home</Link>
      </div>
    </div>
  );
}
