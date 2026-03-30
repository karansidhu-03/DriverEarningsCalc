import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import EarningsCalculator from "@/components/EarningsCalculator";
import CrossLinks from "@/components/CrossLinks";
import FAQSection from "@/components/FAQSection";
import AdPlacement from "@/components/AdPlacement";

const DoorDashEarningsCalculator = () => (
  <Layout>
    <SEOHead
      title="DoorDash Earnings Calculator 2026 — Delivery Driver Profit"
      description="Free DoorDash earnings calculator. Calculate your real delivery driver profit after gas and expenses. For dashers in Canada and the USA."
    />
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <h1 className="font-heading text-3xl font-bold md:text-4xl">DoorDash Earnings Calculator</h1>
      <p className="mt-2 text-muted-foreground">See your real DoorDash delivery driver income after gas and expenses.</p>

      <div className="mt-8">
        <EarningsCalculator platform="doordash" distanceUnit="miles" />
      </div>

      <AdPlacement position="inline" />

      <section className="mt-12 max-w-3xl space-y-4 text-muted-foreground">
        <h2 className="font-heading text-2xl font-bold text-foreground">How Much Do DoorDash Drivers Make?</h2>
        <p>DoorDash drivers (known as Dashers) earn money through base pay, tips, and promotions. Average gross earnings range from $15–$25 per hour, but this varies significantly based on your market, time of day, and whether you're strategic about which orders you accept.</p>
        <p>Unlike rideshare, delivery driving involves more short trips with frequent stops, which can increase fuel consumption and wear on your vehicle. Many experienced Dashers recommend tracking your cost-per-mile carefully and setting minimum order thresholds to maintain profitability.</p>
        <p>In Canadian cities like Calgary, Toronto, and Vancouver, DoorDash has grown rapidly. Canadian Dashers should factor in higher fuel costs and seasonal weather impacts when calculating their true earnings. Use our calculator above to see your actual numbers.</p>
      </section>

      <FAQSection faqs={[
        { question: "How much do DoorDash drivers make per hour?", answer: "DoorDash drivers typically earn $15–$25/hour gross including tips. After expenses, net earnings are usually $10–$16/hour depending on your market and strategy." },
        { question: "Is DoorDash worth it for delivery drivers?", answer: "DoorDash can be worth it if you're strategic about which orders to accept and when to drive. Peak meal times (lunch and dinner) typically offer the best earnings potential." },
        { question: "How does DoorDash pay work?", answer: "DoorDash pays base pay ($2–$10+ per delivery) plus 100% of customer tips. You can also earn extra through Peak Pay promotions and challenges." },
        { question: "DoorDash vs Uber Eats: which pays more?", answer: "It depends on your market. In some cities DoorDash offers better base pay, while Uber Eats may have more consistent demand. Many drivers use both platforms." },
      ]} />

      <CrossLinks exclude="/doordash-earnings-calculator" />
    </div>
  </Layout>
);

export default DoorDashEarningsCalculator;
