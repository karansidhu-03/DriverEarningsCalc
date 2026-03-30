import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const calculators = [
  { to: "/uber-earnings-calculator", label: "Uber Earnings Calculator" },
  { to: "/lyft-earnings-calculator", label: "Lyft Earnings Calculator" },
  { to: "/doordash-earnings-calculator", label: "DoorDash Earnings Calculator" },
  { to: "/delivery-driver-calculator", label: "Delivery Driver Calculator" },
];

const CrossLinks = ({ exclude }: { exclude?: string }) => (
  <section className="mt-12">
    <h3 className="font-heading text-lg font-semibold">Try Also:</h3>
    <div className="mt-4 grid gap-3 sm:grid-cols-3">
      {calculators
        .filter((c) => c.to !== exclude)
        .map((c) => (
          <Link
            key={c.to}
            to={c.to}
            className="flex items-center justify-between rounded-lg border bg-card p-4 text-sm font-medium transition-all hover:border-primary hover:shadow-md"
          >
            {c.label}
            <ArrowRight className="h-4 w-4 text-primary" />
          </Link>
        ))}
    </div>
  </section>
);

export default CrossLinks;
