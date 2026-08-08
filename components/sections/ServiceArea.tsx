import { SERVICE_AREA, BUSINESS } from "@/lib/constants";

export function ServiceArea() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-4 text-center text-3xl font-extrabold text-brand-dark sm:text-4xl">
          Proudly Serving the Rio Grande Valley
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-gray-600">
          Fast, local service from a family-owned shop in Los Fresnos.
        </p>
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-center">
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {SERVICE_AREA.map((city) => (
              <li
                key={city}
                className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-5 py-4 font-semibold text-brand-dark shadow-sm"
              >
                <span className="text-accent">{"\u2713"}</span>
                {city}
              </li>
            ))}
          </ul>
          <a
            href={BUSINESS.mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full max-w-md rounded-2xl border border-gray-200 bg-brand-light p-8 text-center shadow-md transition-shadow hover:shadow-lg"
          >
            <span className="mb-3 block text-4xl font-extrabold text-brand">{"\u23F3"}</span>
            <span className="mb-2 block text-lg font-bold text-brand-dark">
              Gator Plumbing — Los Fresnos, TX
            </span>
            <span className="block text-sm text-gray-600">{BUSINESS.address}</span>
            <span className="mt-4 inline-block rounded-lg bg-accent px-5 py-2.5 text-sm font-bold text-white">
              Open in Google Maps
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
