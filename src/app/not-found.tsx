import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-x flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="eyebrow">404</p>
      <h1>This page has gone dormant.</h1>
      <p className="mt-3 max-w-md text-algaeo-text-mid">
        The page you&apos;re looking for doesn&apos;t exist — or it may have moved during our migration.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/shop" className="btn-outline">Browse the shop</Link>
        <Link href="/" className="btn-primary">Back home</Link>
      </div>
    </div>
  );
}
