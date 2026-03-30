import { Link } from "react-router-dom";
import { ArrowRight, Calculator, DollarSign, Clock, TrendingUp } from "lucide-react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";

const Index = () => (
  <Layout>
    <SEOHead
      title="Free Driver Earnings Calculator — Uber, Lyft & DoorDash | 2026"
      description="Calculate your real profit as an Uber, Lyft, or DoorDash driver. Free earnings calculators for gig drivers in Canada and the USA. Track expenses, hourly rate, and net income."
    />

    {/* Hero */}
    <section className="gradient-hero px-4 py-20 text-center text-primary-foreground">
      <div className="container mx-auto max-w-3xl">
        <h1 className="font-heading text-4xl font-bold leading-tight md:text-5xl">
          Free Driver Earnings Calculator for Uber, Lyft & Delivery Drivers
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg opacity-90">
          Know exactly how much you're making after gas, expenses, and time. Built for gig drivers in Canada and the USA.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <CalcLink to="/uber-earnings-calculator" label="Uber Calculator" />
          <CalcLink to="/lyft-earnings-calculator" label="Lyft Calculator" />
          <CalcLink to="/doordash-earnings-calculator" label="DoorDash Calculator" />
          <CalcLink to="/delivery-driver-calculator" label="Delivery Calculator" />
        </div>
      </div>
    </section>

    {/* Benefits */}
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-center font-heading text-3xl font-bold">Why Use Our Calculator?</h2>
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        <BenefitCard icon={<DollarSign />} title="Track Your Profit" desc="See your real net income after all expenses. Stop guessing and start knowing exactly what you earn per trip." />
        <BenefitCard icon={<Clock />} title="Optimize Your Hours" desc="Find out your true hourly rate. Compare different shifts and strategies to maximize your time on the road." />
        <BenefitCard icon={<TrendingUp />} title="Save More Money" desc="Identify hidden costs eating into your earnings. Lower your expenses and keep more of what you make." />
      </div>
    </section>

    {/* SEO Content */}
    <section className="container mx-auto max-w-3xl px-4 py-12">
      <h2 className="font-heading text-2xl font-bold">How Much Do Gig Drivers Really Make?</h2>
      <div className="mt-4 space-y-4 text-muted-foreground">
        <p>Whether you drive for Uber, Lyft, or deliver with DoorDash, understanding your true earnings is essential. Many drivers look at their gross pay and assume that's what they're making — but after fuel, vehicle maintenance, insurance, and other costs, your actual hourly rate could be significantly lower.</p>
        <p>Our free earnings calculators are designed specifically for rideshare and delivery drivers across Canada (Calgary, Toronto, Vancouver) and the United States (New York, California, Texas). Simply enter your earnings, hours, distance, and expenses to instantly see your net profit, hourly rate, and cost-per-mile or kilometer.</p>
        <p>In 2026, the gig economy continues to grow with over 5 million active drivers in North America. Whether you're a full-time Uber driver in Toronto or a part-time DoorDash courier in Texas, knowing your numbers is the first step to driving smarter and earning more.</p>
      </div>
    </section>

    {/* Locations */}
    <section className="gradient-surface px-4 py-12">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="font-heading text-2xl font-bold">Available for Drivers Across North America</h2>
        <p className="mt-3 text-muted-foreground">
          Our calculators work for drivers in <strong>Calgary, Toronto, Vancouver, New York, Los Angeles, Houston, Chicago,</strong> and every city where gig driving is available. Whether you measure in kilometers or miles, we've got you covered.
        </p>
      </div>
    </section>
  </Layout>
);

const CalcLink = ({ to, label }: { to: string; label: string }) => (
  <Link
    to={to}
    className="inline-flex items-center gap-2 rounded-lg bg-card px-6 py-3 font-heading text-sm font-semibold text-foreground shadow-md transition-transform hover:scale-105"
  >
    <Calculator className="h-4 w-4 text-primary" />
    {label}
    <ArrowRight className="h-4 w-4" />
  </Link>
);

const BenefitCard = ({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) => (
  <div className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-primary">{icon}</div>
    <h3 className="mt-4 font-heading text-lg font-semibold">{title}</h3>
    <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
  </div>
);

export default Index;
