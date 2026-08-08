import { BUSINESS } from "@/lib/constants";

const BADGES = [
  { label: `${BUSINESS.rating}★ (${BUSINESS.reviewCount} reviews)`, icon: "star" },
  { label: "Licensed & Insured", icon: "shield" },
  { label: "Family Owned & Operated", icon: "home" },
  { label: "Mon-Fri 7am-6pm", icon: "clock" },
];

function Icon({ name }: { name: string }) {
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "currentColor" };
  switch (name) {
    case "star":
      return (
        <svg {...common} fill="currentColor">
          <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common} fill="currentColor">
          <path d="M12 2l8 3v6c0 5-3.4 9.4-8 11-4.6-1.6-8-6-8-11V5z" />
        </svg>
      );
    case "home":
      return (
        <svg {...common} fill="currentColor">
          <path d="M3 11L12 3l9 8h-2v10h-6v-6H11v6H5V11z" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common} fill="currentColor">
          <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 5v5l4 2.4-.8 1.3-5-3V7z" />
        </svg>
      );
    default:
      return null;
  }
}

export function TrustBar() {
  return (
    <div className="border-y border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-4 py-5">
        {BADGES.map((b) => (
          <div
            key={b.label}
            className="flex items-center gap-2 text-sm font-semibold text-brand-dark"
          >
            <span className="text-accent">
              <Icon name={b.icon} />
            </span>
            {b.label}
          </div>
        ))}
      </div>
    </div>
  );
}
