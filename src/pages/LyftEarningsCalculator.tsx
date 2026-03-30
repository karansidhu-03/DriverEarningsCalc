import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import EarningsCalculator from "@/components/EarningsCalculator";
import CrossLinks from "@/components/CrossLinks";
import FAQSection from "@/components/FAQSection";
import AdPlacement from "@/components/AdPlacement";

const LyftEarningsCalculator = () => (
  <Layout>
    <SEOHead
      title="Lyft Earnings Calculator 2026 — Real Driver Profit Calculator"
      description="Free Lyft earnings calculator. See your real profit after gas and expenses. For Lyft drivers in Canada and the USA."
    />
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <h1 className="font-heading text-3xl font-bold md:text-4xl">Lyft Earnings Calculator</h1>
      <p className="mt-2 text-muted-foreground">Calculate your true Lyft driver income after all costs and expenses.</p>

      <div className="mt-8">
        <EarningsCalculator platform="lyft" distanceUnit="miles" />
      </div>

      <AdPlacement position="inline" />

      <section className="mt-12 max-w-3xl space-y-4 text-muted-foreground">
        <h2 className="font-heading text-2xl font-bold text-foreground">How Much Do Lyft Drivers Really Earn?</h2>
        <p>Lyft drivers across the United States report earnings similar to Uber, with gross pay ranging from $15–$30 per hour depending on location and demand. Cities like San Francisco, Los Angeles, and New York tend to offer higher rates, while smaller markets may see lower averages.</p>
        <p>The key difference between gross and net earnings is expenses. Fuel costs, vehicle wear and tear, insurance premiums, and self-employment taxes can significantly reduce your take-home pay. Our Lyft earnings calculator gives you the complete picture so you can make informed decisions about your driving schedule.</p>
        <p>Many experienced Lyft drivers recommend tracking earnings weekly and comparing different strategies — such as driving during peak hours, targeting airport pickups, or focusing on specific neighborhoods — to maximize your hourly rate.</p>
      </section>

      <FAQSection faqs={[
        { question: "How much do Lyft drivers make per hour?", answer: "Lyft drivers typically earn $15–$30/hour gross before expenses. Net earnings after fuel, maintenance, and taxes are usually $10–$18/hour." },
        { question: "Does Lyft pay more than Uber?", answer: "Pay varies by market. In some cities Lyft offers slightly better rates, while Uber dominates in others. Many drivers use both platforms to maximize earnings." },
        { question: "What percentage does Lyft take?", answer: "Lyft typically takes 20–25% of each ride fare as their service fee. This can vary based on your market and the type of ride." },
      ]} />

      <CrossLinks exclude="/lyft-earnings-calculator" />
    </div>
  </Layout>
);

export default LyftEarningsCalculator;
