import { useState, useMemo } from "react";
import { Home, Percent, Calendar, DollarSign, TrendingDown } from "lucide-react";
import { PieChart as RechartPie, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const MortgageCalculator = () => {
  const [homePrice, setHomePrice] = useState(500000);
  const [downPayment, setDownPayment] = useState(100000);
  const [interestRate, setInterestRate] = useState(5.5);
  const [loanTerm, setLoanTerm] = useState(25);
  const [annualIncome, setAnnualIncome] = useState(80000);
  const [monthlyDebts, setMonthlyDebts] = useState(500);

  // FIX: Stats must come BEFORE Qualification
  const stats = useMemo(() => {
    const principal = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    
    const monthlyPayment = 
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    return { 
      monthlyPayment: isNaN(monthlyPayment) ? 0 : monthlyPayment, 
      totalInterest: (monthlyPayment * numberOfPayments) - principal, 
      principal 
    };
  }, [homePrice, downPayment, interestRate, loanTerm]);

  const qualification = useMemo(() => {
    const monthlyGrossIncome = annualIncome / 12;
    const gds = ((stats.monthlyPayment + 400) / monthlyGrossIncome) * 100;
    const tds = ((stats.monthlyPayment + 400 + monthlyDebts) / monthlyGrossIncome) * 100;
    return { gds, tds, isQualified: gds < 39 && tds < 44 };
  }, [annualIncome, stats.monthlyPayment, monthlyDebts]);

  const chartData = [
    { name: "Principal", value: stats.principal, color: "#10b981" },
    { name: "Total Interest", value: stats.totalInterest, color: "#f43f5e" },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 fade-in-up">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Mortgage Planner</h1>
        <p className="text-slate-500 mt-2 font-medium">Plan your future home based on your real earnings.</p>
      </header>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* LEFT COLUMN: INPUTS */}
        <div className="space-y-6">
          <div className="playful-card rounded-2xl p-8 space-y-6">
            <h3 className="font-bold text-slate-800 border-b pb-2">Loan Details</h3>
            <MortgageInput label="Home Price" icon={<Home size={18}/>} value={homePrice} onChange={setHomePrice} step={5000} max={2000000} />
            <MortgageInput label="Down Payment" icon={<DollarSign size={18}/>} value={downPayment} onChange={setDownPayment} step={1000} max={homePrice} />
            <MortgageInput label="Interest Rate (%)" icon={<Percent size={18}/>} value={interestRate} onChange={setInterestRate} step={0.1} max={15} />
            <MortgageInput label="Loan Term (Years)" icon={<Calendar size={18}/>} value={loanTerm} onChange={setLoanTerm} step={1} max={30} />
          </div>

          {/* CHECKER UI ADDED HERE */}
          <div className={`p-6 rounded-2xl border-2 transition-all duration-500 ${
            qualification.isQualified ? "border-emerald-500 bg-emerald-50/30" : "border-amber-500 bg-amber-50/30"
          }`}>
            <h3 className="font-heading text-lg font-bold text-slate-800 flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${qualification.isQualified ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`} />
              Qualification Check
            </h3>
            <div className="space-y-4 mt-6">
              <MortgageInput label="Annual Gross Income" icon={<DollarSign size={16}/>} value={annualIncome} onChange={setAnnualIncome} step={1000} max={250000} />
              <MortgageInput label="Monthly Debts" icon={<TrendingDown size={16}/>} value={monthlyDebts} onChange={setMonthlyDebts} step={50} max={5000} />
              
              <div className="bg-white/60 rounded-xl p-4 mt-4 shadow-sm">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-slate-600">Debt-to-Income (GDS):</span>
                  <span className={`font-bold ${qualification.gds < 39 ? "text-emerald-600" : "text-rose-600"}`}>
                    {qualification.gds.toFixed(1)}%
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Bank Limit: 39%</p>
                <p className="text-sm text-slate-600 mt-4 italic">
                  {qualification.isQualified 
                    ? "✅ You're in the green zone for most Canadian lenders!" 
                    : "⚠️ This mortgage might be tough to get with your current income."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: RESULTS */}
        <div className="space-y-6">
          <div className="bg-primary rounded-2xl p-8 text-white shadow-xl shadow-blue-200 transition-transform hover:scale-[1.02] duration-300">
            <p className="text-blue-100 font-bold uppercase tracking-widest text-xs">Estimated Monthly Payment</p>
            <h2 className="text-6xl font-black mt-2">${stats.monthlyPayment.toFixed(2)}</h2>
          </div>

          <div className="playful-card rounded-2xl p-6">
             <h4 className="font-bold text-slate-500 uppercase text-xs tracking-widest mb-4">Payment Breakdown</h4>
             <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartPie>
                    <Pie data={chartData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </RechartPie>
                </ResponsiveContainer>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MortgageInput = ({ label, icon, value, onChange, step, max }: any) => (
  <div className="group">
    <div className="flex justify-between mb-2">
        <label className="flex items-center gap-2 text-sm font-bold text-slate-600">
            <span className="text-primary">{icon}</span> {label}
        </label>
        <span className="text-sm font-black text-primary">${value.toLocaleString()}</span>
    </div>
    <input 
      type="range" min={0} max={max} step={step} value={value} 
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary"
    />
  </div>
);

export default MortgageCalculator;
