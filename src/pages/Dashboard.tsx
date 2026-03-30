import { FinancialProvider } from "@/context/FinancialContext";
import InputController from "@/components/InputController";
import VisualDashboard from "@/components/VisualDashboard";
import PriorityRoadmap from "@/components/PriorityRoadmap";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calculator } from "lucide-react";

const Dashboard = () => (
  <>
    <SEOHead
      title="MoneyFlow — Free Salary Calculator & Lifestyle Profit Tool"
      description="Calculate your real take-home pay, daily budget, and financial health score. Free salary calculator, gig income tracker, and lifestyle profit simulator for smart earners."
      canonical="https://moneyflow.app/"
    />

    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="px-4 pt-12 pb-6 text-center gradient-mesh">
        <div className="container mx-auto max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-3xl md:text-4xl font-bold text-foreground leading-tight"
          >
            Your Financial{" "}
            <span className="neon-text-green">Momentum</span> Engine
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-sm md:text-base text-muted-foreground max-w-lg mx-auto"
          >
            Slide. Simulate. Strategize. See your real daily budget, burn rate, and personalized financial roadmap — instantly.
          </motion.p>
        </div>
      </section>

      {/* Calculator */}
      <FinancialProvider>
        <section className="flex-1 px-4 py-6">
          <div className="container mx-auto max-w-5xl">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-6">
                <InputController />
              </div>
              <div className="space-y-6">
                <VisualDashboard />
              </div>
            </div>

            <div className="mt-8">
              <PriorityRoadmap />
            </div>
          </div>
        </section>
      </FinancialProvider>

      {/* Cross-links to legacy calculators */}
      <section className="px-4 py-10 border-t border-border">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-xl font-bold text-foreground mb-4">
            Gig Driver Calculators
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Drive for Uber, Lyft, or DoorDash? Try our specialized calculators.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { to: "/mortgage-calculator", label: "Mortgage Planner" },
              { to: "/uber-earnings-calculator", label: "Uber" },
              { to: "/lyft-earnings-calculator", label: "Lyft" },
              { to: "/doordash-earnings-calculator", label: "DoorDash" },
              { to: "/delivery-driver-calculator", label: "Delivery" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="inline-flex items-center gap-2 glass-card px-4 py-2.5 text-sm font-medium text-foreground hover:neon-glow-green transition-shadow"
              >
                <Calculator className="h-3.5 w-3.5 text-primary" />
                {link.label}
                <ArrowRight className="h-3 w-3 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="px-4 py-10 gradient-mesh">
        <div className="container mx-auto max-w-2xl">
          <h2 className="font-heading text-xl font-bold text-foreground mb-4">
            The Smartest Way to Understand Your Money
          </h2>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              Whether you earn a salary, freelance on the side, or drive for gig platforms — MoneyFlow gives you
              instant clarity on your real financial picture. No spreadsheets, no guesswork.
            </p>
            <p>
              Our Financial Momentum Engine calculates your daily safe-to-spend budget, flags high burn rates,
              auto-reserves taxes on gig income, and generates a personalized priority roadmap — all in real time
              as you drag the sliders.
            </p>
            <p>
              Built for earners in the US and Canada. Whether you're a salaried professional in Toronto, a
              freelancer in California, or a delivery driver in Calgary — the numbers work the same.
              Know your money. Move your money. Build momentum.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  </>
);

export default Dashboard;
