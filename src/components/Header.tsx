import { Link } from "react-router-dom";
import { Calculator, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-heading text-lg font-bold text-foreground">
          <Calculator className="h-6 w-6 text-primary" />
          <span>Uber Earnings Calculator</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <NavItem to="/uber-earnings-calculator" label="Uber" />
          <NavItem to="/lyft-earnings-calculator" label="Lyft" />
          <NavItem to="/doordash-earnings-calculator" label="DoorDash" />
          <NavItem to="/delivery-driver-calculator" label="Delivery" />
          <NavItem to="/blog" label="Blog" />
        </nav>

        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="border-t bg-card px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            <NavItem to="/uber-earnings-calculator" label="Uber Calculator" onClick={() => setOpen(false)} />
            <NavItem to="/lyft-earnings-calculator" label="Lyft Calculator" onClick={() => setOpen(false)} />
            <NavItem to="/doordash-earnings-calculator" label="DoorDash Calculator" onClick={() => setOpen(false)} />
            <NavItem to="/delivery-driver-calculator" label="Delivery Calculator" onClick={() => setOpen(false)} />
            <NavItem to="/blog" label="Blog" onClick={() => setOpen(false)} />
          </div>
        </nav>
      )}
    </header>
  );
};

const NavItem = ({ to, label, onClick }: { to: string; label: string; onClick?: () => void }) => (
  <Link to={to} onClick={onClick} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
    {label}
  </Link>
);

export default Header;
