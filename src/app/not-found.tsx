import { ROUTES } from "@/constants";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-background">
      <div className="text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>
        <p className="mt-2 text-muted-foreground">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <Link
          href={ROUTES.HOME}
          className="mt-6 inline-block rounded-lg bg-primary text-primary-foreground px-6 py-3 text-sm font-medium transition-opacity hover:opacity-80"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
