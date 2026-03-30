import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import AdPlacement from "@/components/AdPlacement";

const BlogUberCalgary = () => (
  <Layout>
    <SEOHead
      title="How Much Do Uber Drivers Make in Calgary? 2026 Earnings Guide"
      description="Detailed breakdown of Uber driver earnings in Calgary, Alberta. Real data on hourly rates, expenses, and tips to maximize your profit in 2026."
    />
    <article className="container mx-auto max-w-3xl px-4 py-10">
      <p className="text-sm text-muted-foreground">March 10, 2026</p>
      <h1 className="mt-2 font-heading text-3xl font-bold md:text-4xl">How Much Do Uber Drivers Make in Calgary?</h1>

      <div className="mt-8 space-y-4 text-muted-foreground leading-relaxed">
        <p>Calgary's growing population and sprawling layout make it an interesting market for Uber drivers. But how much can you actually earn driving in Calgary, Alberta? Let's break down the real numbers.</p>

        <h2 className="font-heading text-xl font-bold text-foreground">Average Calgary Uber Driver Earnings</h2>
        <p>Calgary Uber drivers report gross earnings of $18–$26 per hour on average. During busy periods like Stampede, weekend nights, and events at the Saddledome, surge pricing can push hourly earnings above $35.</p>

        <h2 className="font-heading text-xl font-bold text-foreground">Expenses for Calgary Drivers</h2>
        <p>Alberta has lower fuel costs compared to other provinces, which is a significant advantage. However, Calgary's cold winters mean higher maintenance costs (winter tires, battery issues, engine warm-up time). Typical monthly expenses include:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Fuel: $400–$600/month</li>
          <li>Insurance: $200–$350/month (rideshare endorsement required)</li>
          <li>Maintenance: $150–$250/month</li>
          <li>Phone/data: $60–$100/month</li>
        </ul>

        <AdPlacement position="inline" />

        <h2 className="font-heading text-xl font-bold text-foreground">Net Earnings After Expenses</h2>
        <p>After all expenses, most Calgary Uber drivers net approximately $13–$17 per hour. Full-time drivers working 40 hours/week can expect to take home $2,000–$2,800/month after costs.</p>

        <p>Want to calculate your specific situation? Try our <Link to="/uber-earnings-calculator" className="font-medium text-primary underline">Uber Earnings Calculator</Link> with your real numbers from driving in Calgary.</p>

        <p>You can also compare with other platforms: <Link to="/doordash-earnings-calculator" className="text-primary underline">DoorDash Calculator</Link> | <Link to="/delivery-driver-calculator" className="text-primary underline">Delivery Driver Calculator</Link></p>
      </div>
    </article>
  </Layout>
);

export default BlogUberCalgary;
