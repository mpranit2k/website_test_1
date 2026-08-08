import { SERVICES } from "@/lib/constants";
import { Card } from "@/components/ui/Card";

export function Features() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-4 text-center text-3xl font-extrabold text-brand-dark sm:text-4xl">
          Plumbing Services for Every Job
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-gray-600">
          From emergencies to full remodels, Gator Plumbing has you covered across the
          Rio Grande Valley.
        </p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Card key={s.title} title={s.title} description={s.description} icon={<span>{i + 1}</span>} />
          ))}
        </div>
      </div>
    </section>
  );
}
