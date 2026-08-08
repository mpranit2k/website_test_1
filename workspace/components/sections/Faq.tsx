import { FAQS } from "@/lib/constants";
import { Accordion } from "@/components/ui/Accordion";

export function Faq() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="mb-4 text-center text-3xl font-extrabold text-brand-dark sm:text-4xl">
          Frequently Asked Questions
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-center text-gray-600">
          Quick answers before you call.
        </p>
        <Accordion items={FAQS.map((f) => ({ question: f.question, answer: f.answer }))} />
      </div>
    </section>
  );
}
