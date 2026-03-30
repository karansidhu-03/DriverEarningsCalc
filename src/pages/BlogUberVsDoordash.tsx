import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import AdPlacement from "@/components/AdPlacement";

const BlogUberVsDoordash = () => (
  <Layout>
    <SEOHead
      title="Uber vs DoorDash: Which Pays More in 2026? Driver Comparison"
      description="Side-by-side comparison of Uber and DoorDash driver earnings in 2026. Find out which gig platform pays more in Canada and the USA."
    />
    <article className="container mx-auto max-w-3xl px-4 py-10">
      <p className="text-sm text-muted-foreground">March 5, 2026</p>
      <h1 className="mt-2 font-heading text-3xl font-bold md:text-4xl">Uber vs DoorDash: Which Pays More in 2026?</h1>

      <div className="mt-8 space-y-4 text-muted-foreground leading-relaxed">
        <p>Two of the biggest names in the gig economy — Uber and DoorDash — offer different earning opportunities for drivers. But which one actually puts more money in your pocket? We compare both platforms side by side.</p>

        <h2 className="font-heading text-xl font-bold text-foreground">Earnings Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full rounded-lg border text-sm">
            <thead>
              <tr className="border-b bg-muted">
                <th className="p-3 text-left font-semibold text-foreground">Factor</th>
                <th className="p-3 text-left font-semibold text-foreground">Uber</th>
                <th className="p-3 text-left font-semibold text-foreground">DoorDash</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b"><td className="p-3">Avg Gross/hr</td><td className="p-3">$20–$30</td><td className="p-3">$15–$25</td></tr>
              <tr className="border-b"><td className="p-3">Tips</td><td className="p-3">Variable</td><td className="p-3">Usually higher %</td></tr>
              <tr className="border-b"><td className="p-3">Expenses/km</td><td className="p-3">Higher (longer trips)</td><td className="p-3">Lower (shorter trips)</td></tr>
              <tr className="border-b"><td className="p-3">Flexibility</td><td className="p-3">High</td><td className="p-3">Very High</td></tr>
              <tr><td className="p-3">Net/hr (avg)</td><td className="p-3">$13–$19</td><td className="p-3">$10–$16</td></tr>
            </tbody>
          </table>
        </div>

        <h2 className="font-heading text-xl font-bold text-foreground">Key Differences</h2>
        <p><strong>Trip length:</strong> Uber rideshare trips tend to be longer, meaning more km/miles per trip but also higher fuel costs. DoorDash deliveries are typically shorter but involve more frequent stops.</p>
        <p><strong>Tips:</strong> DoorDash drivers often receive tips on a higher percentage of orders compared to Uber rideshare. However, Uber Eats tips can be competitive with DoorDash.</p>
        <p><strong>Wear and tear:</strong> The frequent stopping and starting of delivery driving can be harder on your vehicle compared to rideshare highway driving.</p>

        <AdPlacement position="inline" />

        <h2 className="font-heading text-xl font-bold text-foreground">The Verdict</h2>
        <p>For pure earning potential, Uber rideshare generally offers higher gross and net earnings in most markets. However, DoorDash offers more flexibility (no passengers, choose orders) and can be better in smaller markets. Many successful gig workers use both platforms.</p>

        <p>Calculate your earnings for each platform:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><Link to="/uber-earnings-calculator" className="text-primary underline">Uber Earnings Calculator</Link></li>
          <li><Link to="/doordash-earnings-calculator" className="text-primary underline">DoorDash Earnings Calculator</Link></li>
          <li><Link to="/lyft-earnings-calculator" className="text-primary underline">Lyft Earnings Calculator</Link></li>
        </ul>
      </div>
    </article>
  </Layout>
);

export default BlogUberVsDoordash;
