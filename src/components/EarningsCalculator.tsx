import { useState, useMemo } from "react";
import { DollarSign, Clock, MapPin, TrendingUp, TrendingDown, Save } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Props {
  platform: string;
  distanceUnit?: "km" | "miles";
}

const EarningsCalculator = ({ platform, distanceUnit = "km" }: Props) => {
  const [earnings, setEarnings] = useState(200);
  const [hours, setHours] = useState(8);
  const [distance, setDistance] = useState(120);
  const [fuelCost, setFuelCost] = useState(40);
  const [otherExpenses, setOtherExpenses] = useState(10);

  const results = useMemo(() => {
    const totalExpenses = fuelCost + otherExpenses;
    const netProfit = earnings - totalExpenses;
    const hourlyRate = hours > 0 ? netProfit / hours : 0;
    const costPerDist = distance > 0 ? totalExpenses / distance : 0;
    const profitPerDist = distance > 0 ? netProfit / distance : 0;
    return { totalExpenses, netProfit, hourlyRate, costPerDist, profitPerDist };
  }, [earnings, hours, distance, fuelCost, otherExpenses]);

  const isProfit = results.netProfit >= 0;

  const chartData = [
    { name: "Earnings", value: earnings },
    { name: "Fuel", value: fuelCost },
    { name: "Other", value: otherExpenses },
    { name: "Net Profit", value: Math.max(results.netProfit, 0) },
  ];

  const handleSave = () => {
    const key = `${platform}-results`;
    const data = { earnings, hours, distance, fuelCost, otherExpenses, ...results, date: new Date().toISOString() };
    const saved = JSON.parse(localStorage.getItem(key) || "[]");
    saved.push(data);
    localStorage.setItem(key, JSON.stringify(saved));
    toast.success("Results saved locally!");
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Inputs */}
      <div className="space-y-5 rounded-xl border bg-card p-6 shadow-sm">
        <h3 className="font-heading text-lg font-semibold">Enter Your Numbers</h3>
        <InputField icon={<DollarSign />} label="Total Earnings ($)" value={earnings} onChange={setEarnings} />
        <InputField icon={<Clock />} label="Hours Worked" value={hours} onChange={setHours} step={0.5} />
        <InputField icon={<MapPin />} label={`Distance Driven (${distanceUnit})`} value={distance} onChange={setDistance} />
        <InputField icon={<DollarSign />} label="Fuel Cost ($)" value={fuelCost} onChange={setFuelCost} />
        <InputField icon={<DollarSign />} label="Other Expenses ($)" value={otherExpenses} onChange={setOtherExpenses} />
      </div>

      {/* Results */}
      <div className="space-y-5">
        <div className={`rounded-xl border-2 p-6 shadow-sm ${isProfit ? "border-success/30 bg-success/5" : "border-destructive/30 bg-destructive/5"}`}>
          <div className="flex items-center gap-2">
            {isProfit ? <TrendingUp className="h-6 w-6 text-success" /> : <TrendingDown className="h-6 w-6 text-destructive" />}
            <h3 className="font-heading text-lg font-semibold">{isProfit ? "You're Profitable!" : "You're at a Loss"}</h3>
          </div>
          <p className={`mt-2 font-heading text-4xl font-bold ${isProfit ? "text-success" : "text-destructive"}`}>
            ${results.netProfit.toFixed(2)}
          </p>
          <p className="text-sm text-muted-foreground">Net Profit</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <MetricCard label="Hourly Rate" value={`$${results.hourlyRate.toFixed(2)}/hr`} positive={results.hourlyRate > 0} />
          <MetricCard label="Total Expenses" value={`$${results.totalExpenses.toFixed(2)}`} positive={false} />
          <MetricCard label={`Cost / ${distanceUnit}`} value={`$${results.costPerDist.toFixed(2)}`} positive={false} />
          <MetricCard label={`Profit / ${distanceUnit}`} value={`$${results.profitPerDist.toFixed(2)}`} positive={results.profitPerDist > 0} />
        </div>

        {/* Chart */}
        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <h4 className="mb-3 font-heading text-sm font-semibold">Earnings vs Expenses</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(v: number) => `$${v.toFixed(2)}`} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {chartData.map((entry, i) => (
                  <Cell key={i} fill={i === 0 || i === 3 ? "hsl(142, 71%, 45%)" : "hsl(0, 72%, 51%)"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <Button variant="outline" className="w-full" onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" /> Save Results
        </Button>
      </div>
    </div>
  );
};

const InputField = ({
  icon,
  label,
  value,
  onChange,
  step = 1,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  onChange: (v: number) => void;
  step?: number;
}) => (
  <div>
    <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-muted-foreground">
      <span className="text-primary">{icon}</span>
      {label}
    </label>
    <input
      type="number"
      value={value}
      step={step}
      onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
      className="w-full rounded-lg border bg-background px-4 py-3 text-lg font-medium transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
    />
    <input
      type="range"
      min={0}
      max={step === 0.5 ? 24 : label.includes("Distance") ? 500 : 1000}
      step={step}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="mt-2 w-full accent-primary"
    />
  </div>
);

const MetricCard = ({ label, value, positive }: { label: string; value: string; positive: boolean }) => (
  <div className="rounded-lg border bg-card p-4 shadow-sm">
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className={`mt-1 font-heading text-xl font-bold ${positive ? "text-success" : "text-destructive"}`}>{value}</p>
  </div>
);

export default EarningsCalculator;
