import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, Wallet, Clock } from "lucide-react";
import { useFinancial } from "@/context/FinancialContext";

const MetricCard = ({
  icon,
  label,
  value,
  sub,
  positive,
  delay = 0,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  positive: boolean;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.3 }}
    className={`glass-card p-4 ${positive ? "neon-glow-green" : "neon-glow-red"}`}
  >
    <div className="flex items-center gap-2 mb-1">
      {icon}
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
    <p className={`font-heading text-2xl font-bold ${positive ? "neon-text-green" : "neon-text-red"}`}>
      {value}
    </p>
    {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
  </motion.div>
);

const COLORS = {
  safeToSpend: "hsl(160, 84%, 39%)",
  expenses: "hsl(220, 14%, 25%)",
  taxReserve: "hsl(38, 92%, 50%)",
};

const VisualDashboard = () => {
  const { metrics } = useFinancial();

  const donutData = [
    { name: "Safe to Spend", value: Math.max(0, metrics.monthlyNetProfit) },
    { name: "Fixed Costs", value: metrics.monthlyExpenses },
    ...(metrics.taxReserveMonthly > 0
      ? [{ name: "Tax Reserve", value: metrics.taxReserveMonthly }]
      : []),
  ];

  const colorArray = [
    COLORS.safeToSpend,
    COLORS.expenses,
    ...(metrics.taxReserveMonthly > 0 ? [COLORS.taxReserve] : []),
  ];

  const isProfit = metrics.monthlyNetProfit >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="space-y-4"
    >
      <h2 className="font-heading text-lg font-bold text-foreground flex items-center gap-2">
        <span className="h-1 w-1 rounded-full bg-primary" />
        Financial Snapshot
      </h2>

      {/* Donut chart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="glass-card p-5 flex flex-col items-center"
      >
        <div className="relative w-48 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={donutData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {donutData.map((_, i) => (
                  <Cell key={i} fill={colorArray[i]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xs text-muted-foreground">Daily Budget</span>
            <span className={`font-heading text-xl font-bold ${isProfit ? "neon-text-green" : "neon-text-red"}`}>
              ${metrics.safeToSpendDaily.toFixed(0)}
            </span>
          </div>
        </div>

        <div className="flex gap-4 mt-3 text-xs">
          {donutData.map((d, i) => (
            <div key={d.name} className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: colorArray[i] }} />
              <span className="text-muted-foreground">{d.name}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Metric cards grid */}
      <div className="grid grid-cols-2 gap-3">
        <MetricCard
          icon={<Wallet className="h-4 w-4 text-primary" />}
          label="Monthly Net"
          value={`${isProfit ? "+" : "-"}$${Math.abs(metrics.monthlyNetProfit).toFixed(0)}`}
          sub={`$${metrics.annualNetProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })}/yr`}
          positive={isProfit}
          delay={0.15}
        />
        <MetricCard
          icon={isProfit ? <TrendingUp className="h-4 w-4 text-primary" /> : <TrendingDown className="h-4 w-4 text-destructive" />}
          label="Burn Rate"
          value={`${metrics.burnRate.toFixed(0)}%`}
          sub={metrics.burnRate > 70 ? "High — audit expenses" : "Healthy range"}
          positive={metrics.burnRate <= 70}
          delay={0.2}
        />
        <MetricCard
          icon={<Clock className="h-4 w-4 text-blue-400" />}
          label="Savings Runway"
          value={`${metrics.monthsOfSavings.toFixed(1)} mo`}
          sub={metrics.monthsOfSavings >= 3 ? "Safety net OK" : "Build to 3+ months"}
          positive={metrics.monthsOfSavings >= 3}
          delay={0.25}
        />
        <MetricCard
          icon={<Wallet className="h-4 w-4 text-yellow-400" />}
          label="Tax Reserve"
          value={`$${metrics.taxReserveMonthly.toFixed(0)}/mo`}
          sub={metrics.hasGigIncome ? "25% of gig income" : "No gig income"}
          positive={!metrics.hasGigIncome || metrics.taxReserveMonthly < metrics.monthlyNetProfit}
          delay={0.3}
        />
      </div>
    </motion.div>
  );
};

export default VisualDashboard;
