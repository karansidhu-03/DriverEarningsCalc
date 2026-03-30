import { useState, useMemo, useEffect } from "react";
import { DollarSign, Clock, MapPin, TrendingUp, TrendingDown, Save, Calculator } from "lucide-react";
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
  
  // NEW: Loading state for "Playful" UX
  const [isCalculating, setIsCalculating] = useState(false);

  const results = useMemo(() => {
    const totalExpenses = fuelCost + otherExpenses;
    const netProfit = earnings - totalExpenses;
    const hourlyRate = hours > 0 ? netProfit / hours : 0;
    const costPerDist = distance > 0 ? totalExpenses / distance : 0;
    const profitPerDist = distance > 0 ? netProfit / distance : 0;
    return { totalExpenses, netProfit, hourlyRate, costPerDist, profitPerDist };
  }, [earnings, hours, distance, fuelCost, otherExpenses]);

  // Trigger a quick "calculating" animation whenever inputs change
  useEffect(() => {
    setIsCalculating(true);
    const timer = setTimeout(() => setIsCalculating(false), 400);
    return () => clearTimeout(timer);
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
    toast.success("Results saved to your browser!");
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2 fade-in-up">
      {/* Inputs - Added playful-card and hover lift */}
      <div className="playful-card space-y-6 rounded-2xl p-6">
        <div className="flex items-center gap-2 border-b pb-4">
          <Calculator className="text-primary h-5 w-5" />
          <h3 className="font-heading text-xl font-bold text-slate-800">Trip Details</h3>
        </div>
        
        <div className="space-y-5">
          <InputField icon={<DollarSign size={18}/>} label="Total Earnings ($)" value={earnings} onChange={setEarnings} />
          <InputField icon={<Clock size={18}/>} label="Hours Worked" value={hours} onChange={setHours} step={0.5} />
          <InputField icon={<MapPin size={18}/>} label={`Distance (${distanceUnit})`} value={distance} onChange={setDistance} />
          <InputField icon={<DollarSign size={18}/>} label="Fuel Cost ($)" value={fuelCost} onChange={setFuelCost} />
          <InputField icon={<DollarSign size={18}/>} label="Other Expenses ($)" value={otherExpenses} onChange={setOtherExpenses} />
        </div>
      </div>

      {/* Results Section */}
      <div className={`space-y-6 transition-opacity duration-300 ${isCalculating ? 'opacity-50' : 'opacity-100'}`}>
        
        {/* Main Profit Display - Added dynamic border and bounce effect */}
        <div className={`rounded-2xl border-b-4 p-8 shadow-sm transition-all duration-500 ${
          isProfit 
          ? "border-emerald-500 bg-emerald-50/50 shadow-emerald-100" 
          : "border-rose-500 bg-rose-50/50 shadow-rose-100"
        }`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${isProfit ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"}`}>
              {isProfit ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
            </div>
            <h3 className="font-heading text-lg font-bold text-slate-700">
              {isProfit ? "Nice Work! You're Profitable" : "Heads up: You're at a Loss"}
            </h3>
          </div>
          <p className={`mt-4 font-heading text-5xl font-black tracking-tight ${isProfit ? "text-emerald-600" : "text-rose-600"}`}>
            ${results.netProfit.toFixed(2)}
          </p>
          <p className="text-sm font-medium text-slate-500 mt-1 uppercase tracking-wider">Estimated Net Profit</p>
        </div>

        {/* Metric Grid - Added staggered fade-in via CSS classes */}
        <div className="grid grid-cols-2 gap-4">
          <MetricCard label="Hourly Rate" value={`$${results.hourlyRate.toFixed(2)}/hr`} positive={results.hourlyRate > 0} />
          <MetricCard label="Total Expenses" value={`$${results.totalExpenses.toFixed(2)}`} positive={false} />
          <MetricCard label={`Cost / ${distanceUnit}`} value={`$${results.costPerDist.toFixed(2)}`} positive={false} />
          <MetricCard label={`Profit / ${distanceUnit}`} value={`$${results.profitPerDist.toFixed(2)}`} positive={results.profitPerDist > 0} />
        </div>

        {/* Chart Card */}
        <div className="playful-card rounded-2xl p-6">
          <h4 className="mb-6 font-heading text-sm font-bold text-slate-500 uppercase tracking-widest">Earnings Visualization</h4>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip 
                  cursor={{fill: '#f1f5f9'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="value" radius={[8, 8, 8, 8]} barSize={40}>
                  {chartData.map((entry, i) => (
                    <Cell key={i} fill={i === 0 || i === 3 ? "#10b981" : "#f43f5e"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Save Button with Bounce animation */}
        <Button 
          variant="outline" 
          className="btn-bounce w-full py-6 rounded-xl border-2 font-bold text-primary hover:bg-primary hover:text-white transition-all shadow-md" 
          onClick={handleSave}
        >
          <Save className="mr-2 h-5 w-5" /> Save This Entry
        </Button>
      </div>
    </div>
  );
};

const InputField = ({ icon, label, value, onChange, step = 1 }: any) => (
  <div className="group">
    <label className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-600 group-focus-within:text-primary transition-colors">
      <span className="opacity-70">{icon}</span>
      {label}
    </label>
    <input
      type="number"
      value={value}
      step={step}
      onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
      className="w-full rounded-xl border-2 border-slate-100 bg-slate-50/50 px-4 py-3 text-xl font-bold text-slate-800 transition-all focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 shadow-sm"
    />
    <input
      type="range"
      min={0}
      max={step === 0.5 ? 24 : label.includes("Distance") ? 500 : 1000}
      step={step}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="mt-4 w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary hover:accent-blue-600 transition-all"
    />
  </div>
);

const MetricCard = ({ label, value, positive }: any) => (
  <div className="playful-card rounded-2xl p-5 border-none bg-white">
    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</p>
    <p className={`mt-2 font-heading text-2xl font-black ${positive ? "text-emerald-500" : "text-rose-500"}`}>
      {value}
    </p>
  </div>
);

export default EarningsCalculator;
