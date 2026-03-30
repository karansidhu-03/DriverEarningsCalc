import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import EarningsCalculator from "@/components/EarningsCalculator";
import CrossLinks from "@/components/CrossLinks";
import FAQSection from "@/components/FAQSection";
import AdPlacement from "@/components/AdPlacement";

const DeliveryDriverCalculator = () => (
  <Layout>
    <SEOHead
      title="Delivery Driver Profit Calculator 2026 — Free Earnings Tool"
      description="Universal delivery driver earnings calculator. Calculate profit for any gig platform — Uber Eats, DoorDash, Instacart, and more. Free for drivers in Canada and USA."
    />
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <h1 className="font-heading text-3xl font-bold md:text-4xl">Delivery Driver Profit Calculator</h1>
      <p className="mt-2 text-muted-foreground">A universal calculator for any delivery or gig driving platform.</p>

      <div className="mt-8">
        <EarningsCalculator platform="delivery" distanceUnit="km" />
      </div>

      <AdPlacement position="inline" />

      <section className="mt-12 max-w-3xl space-y-4 text-muted-foreground">
        <h2 className="font-heading text-2xl font-bold text-foreground">Calculate Your Delivery Driver Earnings</h2>
        <p>Whether you deliver for Uber Eats, DoorDash, Skip the Dishes, Instacart, or any other platform, this universal earnings calculator helps you understand your true profit. The gig economy offers flexibility, but without tracking your real numbers, you might be earning less than minimum wage.</p>
        <p>Delivery drivers in Canadian cities like Calgary, Toronto, and Vancouver face unique challenges including harsh winter conditions, higher fuel prices, and different tax obligations compared to US drivers. Our calculator works for both kilometers and miles, making it useful wherever you drive.</p>
        <p>In the United States, delivery drivers in cities like New York, Los Angeles, Houston, and Chicago can use this tool to compare earnings across platforms and optimize their driving strategy. Remember to account for all expenses including fuel, maintenance, insurance, phone data plans, and hot bags.</p>
      </section>

      <FAQSection faqs={[
        { question: "How much do delivery drivers make?", answer: "Delivery driver earnings vary by platform and city. On average, drivers earn $12–$25/hour gross. After expenses, net pay is typically $8–$16/hour." },
        { question: "What's the best delivery app to drive for?", answer: "It depends on your market. DoorDash, Uber Eats, and Skip the Dishes are popular in Canada. In the US, DoorDash, Uber Eats, and Instacart are top choices. Many drivers multi-app." },
        { question: "How do I track delivery driver expenses?", answer: "Track fuel costs, maintenance, insurance, phone plans, and supplies. Use our calculator regularly and save results to spot trends over time." },
      ]} />

      <CrossLinks exclude="/delivery-driver-calculator" />
    </div>
  </Layout>
);

export default DeliveryDriverCalculator;
