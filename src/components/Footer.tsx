import { Link } from "react-router-dom";
import { Calculator } from "lucide-react";

const Footer = () => (
  <footer className="border-t bg-card">
    <div className="container mx-auto px-4 py-10">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2 font-heading text-lg font-bold">
            <Calculator className="h-5 w-5 text-primary" />
            Uber Earnings Calculator
          </Link>
          <p className="mt-3 text-sm text-muted-foreground">
            Free tools to help gig drivers track earnings, expenses, and maximize profit.
          </p>
        </div>
        <div>
          <h4 className="font-heading text-sm font-semibold">Calculators</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/uber-earnings-calculator" className="hover:text-primary">Uber Calculator</Link></li>
            <li><Link to="/lyft-earnings-calculator" className="hover:text-primary">Lyft Calculator</Link></li>
            <li><Link to="/doordash-earnings-calculator" className="hover:text-primary">DoorDash Calculator</Link></li>
            <li><Link to="/delivery-driver-calculator" className="hover:text-primary">Delivery Calculator</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-heading text-sm font-semibold">Resources</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/blog" className="hover:text-primary">Blog</Link></li>
            <li><Link to="/blog/is-uber-worth-it-canada-2026" className="hover:text-primary">Is Uber Worth It?</Link></li>
            <li><Link to="/blog/uber-vs-doordash" className="hover:text-primary">Uber vs DoorDash</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-heading text-sm font-semibold">Locations</h4>
          <p className="mt-3 text-sm text-muted-foreground">
            Serving drivers in Calgary, Toronto, Vancouver, New York, California, and Texas.
          </p>
        </div>
      </div>
      <div className="mt-8 border-t pt-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Uber Earnings Calculator. All rights reserved. Not affiliated with Uber, Lyft, or DoorDash.
      </div>
    </div>
  </footer>
);

export default Footer;
