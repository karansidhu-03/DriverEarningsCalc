import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import EarningsCalculator from "@/components/EarningsCalculator";
import CrossLinks from "@/components/CrossLinks";
import FAQSection from "@/components/FAQSection";
import AdPlacement from "@/components/AdPlacement";

const UberEarningsCalculator = () => (
  <Layout>
    <SEOHead
      title="Uber Earnings Calculator 2026 — Real Profit After Expenses"
      description="Calculate your real Uber driver earnings after gas, expenses, and time. Free Uber profit calculator for drivers in Canada and the USA. Know your true hourly rate."
      canonical="https://uberearningscalculator.com/uber-earnings-calculator"
    />
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <h1 className="font-heading text-3xl font-bold md:text-4xl">Uber Earnings Calculator</h1>
      <p className="mt-2 text-muted-foreground">Find out how much you really make driving for Uber after all expenses.</p>

      <div className="mt-8">
        <EarningsCalculator platform="uber" distanceUnit="km" />
      </div>

      <AdPlacement position="inline" />

      <section className="mt-12 max-w-3xl space-y-4 text-muted-foreground">
        <h2 className="font-heading text-2xl font-bold text-foreground">How Much Do Uber Drivers Make in 2026?</h2>
        <p>Uber driver earnings vary widely depending on your city, hours worked, and expenses. In Canada, Uber drivers in cities like Calgary, Toronto, and Vancouver report gross earnings between $18–$35 per hour. However, after accounting for fuel costs, vehicle depreciation, insurance, and platform fees, the real take-home pay often drops to $12–$20 per hour.</p>
        <p>In the United States, Uber drivers in New York City can earn more due to surge pricing and high demand, while drivers in smaller cities might see lower averages. Our Uber earnings calculator helps you cut through the noise and see your actual profit — not just what Uber shows on your driver dashboard.</p>
        <p>Whether you're a full-time Uber driver considering it as a career or a part-timer looking to make extra cash, understanding your cost per kilometer (or mile) and true hourly rate is crucial. Use the calculator above to input your real numbers and make data-driven decisions about your driving strategy.</p>
        <p>Pro tip: Track your results over several weeks using the Save button to identify trends in your earnings. Many drivers find that certain days of the week or times of day are significantly more profitable.</p>
      </section>

      <FAQSection faqs={[
        { question: "How much do Uber drivers make in Canada?", answer: "Uber drivers in Canada typically earn $18–$35/hour gross. After expenses like fuel, insurance, and maintenance, net earnings range from $12–$20/hour depending on your city and driving patterns." },
        { question: "Is driving Uber worth it in 2026?", answer: "It depends on your expenses and hours. Use our calculator to see your real profit. Many drivers find it worthwhile as a flexible side income, especially during peak hours." },
        { question: "How do I calculate my Uber profit?", answer: "Subtract all expenses (fuel, maintenance, insurance, phone plan) from your gross Uber earnings. Then divide by hours worked to get your true hourly rate." },
        { question: "What expenses can Uber drivers deduct?", answer: "Common deductible expenses include fuel, vehicle maintenance, car insurance, phone plans, car washes, and parking fees. Keep detailed records for tax time." },
        { question: "How much does Uber take from drivers?", answer: "Uber typically takes 20–25% of each fare as a service fee, plus a booking fee. The exact percentage varies by city and ride type." },
      ]} />

      <CrossLinks exclude="/uber-earnings-calculator" />
    </div>
  </Layout>
);

export default UberEarningsCalculator;
