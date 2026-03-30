import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";

const posts = [
  {
    slug: "is-uber-worth-it-canada-2026",
    title: "Is Uber Worth It in Canada in 2026?",
    excerpt: "We break down the real numbers behind driving Uber in Canada — from Calgary to Toronto. Find out if it's still a good side hustle.",
    date: "March 15, 2026",
  },
  {
    slug: "how-much-uber-drivers-make-calgary",
    title: "How Much Do Uber Drivers Make in Calgary?",
    excerpt: "A detailed look at Uber driver earnings in Calgary, Alberta. Real data on hourly rates, expenses, and seasonal patterns.",
    date: "March 10, 2026",
  },
  {
    slug: "uber-vs-doordash",
    title: "Uber vs DoorDash: Which Pays More in 2026?",
    excerpt: "Comparing Uber rideshare and DoorDash delivery earnings side by side. Which platform gives drivers better profit?",
    date: "March 5, 2026",
  },
];

const Blog = () => (
  <Layout>
    <SEOHead
      title="Gig Driver Blog — Uber, Lyft & DoorDash Tips | 2026"
      description="Expert tips, earnings reports, and guides for Uber, Lyft, and DoorDash drivers in Canada and the USA."
    />
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-heading text-3xl font-bold md:text-4xl">Gig Driver Blog</h1>
      <p className="mt-2 text-muted-foreground">Tips, insights, and earnings guides for rideshare and delivery drivers.</p>

      <div className="mt-8 space-y-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="block rounded-xl border bg-card p-6 shadow-sm transition-all hover:border-primary hover:shadow-md"
          >
            <p className="text-xs text-muted-foreground">{post.date}</p>
            <h2 className="mt-1 font-heading text-xl font-semibold">{post.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
              Read more <ArrowRight className="h-3 w-3" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  </Layout>
);

export default Blog;
