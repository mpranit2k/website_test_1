import { BUSINESS } from "@/lib/constants";

export function Reviews() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="mb-4 text-3xl font-extrabold text-brand-dark sm:text-4xl">
          Rated {BUSINESS.rating}★ by {BUSINESS.reviewCount} Neighbors
        </h2>
        <p className="mx-auto mb-8 max-w-xl text-gray-600">
          We don't quote reviews — see what real customers in Los Fresnos, South Padre
          Island, Port Isabel, and Laguna Vista say about us.
        </p>
        <a
          href={BUSINESS.mapsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-lg bg-brand px-7 py-3.5 font-bold text-white transition-colors hover:bg-brand-dark"
        >
          Read Our Google Reviews
        </a>
      </div>
    </section>
  );
}
