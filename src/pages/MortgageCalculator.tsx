import { useState, useMemo } from "react";
import { Home, Percent, Calendar, DollarSign, TrendingDown } from "lucide-react";
import { PieChart as RechartPie, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { toast } from "sonner"; // or "react-hot-toast" depending on your setup

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
  const [scenarios, setScenarios] = useState<any[]>([]);

  const saveScenario = () => {
          if (scenarios.length >= 3) {
            toast.error("Max 3 scenarios for comparison. Remove one to add more!");
            return;
          }
          
          const newScenario = {
            id: Date.now(),
            homePrice,
            monthlyPayment: stats.monthlyPayment,
            gds: qualification.gds,
            isQualified: qualification.isQualified,
          };
          
          setScenarios([...scenarios, newScenario]);
          toast.success("Scenario saved for comparison!");
        };
        
        const removeScenario = (id: number) => {
          setScenarios(scenarios.filter(s => s.id !== id));
      };  
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
          <Button 
              onClick={saveScenario} 
              className="btn-bounce w-full py-6 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold shadow-lg shadow-slate-200"
            >
              + Save to Compare
            </Button>  
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
      {/* COMPARISON GRID SECTION */}
      {scenarios.length > 0 && (
        <div className="mt-12 pt-12 border-t border-slate-200 fade-in-up">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl font-black text-slate-900">Compare Scenarios</h2>
              <p className="text-slate-500 text-sm">Review your saved options side-by-side.</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setScenarios([])} className="text-slate-400 hover:text-rose-500">
              Clear All
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {scenarios.map((s, index) => (
              <div key={s.id} className="playful-card relative rounded-2xl p-6 bg-white border-2 border-slate-100">
                <button 
                  onClick={() => removeScenario(s.id)}
                  className="absolute top-3 right-3 text-slate-300 hover:text-rose-500 text-xl font-bold"
                >
                  ×
                </button>
                <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Option {index + 1}</p>
                <p className="text-xl font-black text-slate-800">${s.homePrice.toLocaleString()}</p>
                
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Monthly:</span>
                    <span className="font-bold text-slate-800">${s.monthlyPayment.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">GDS Ratio:</span>
                    <span className={`font-bold ${s.isQualified ? "text-emerald-500" : "text-rose-500"}`}>
                      {s.gds.toFixed(1)}%
                    </span>
                  </div>
                </div>
                
                <div className={`mt-4 py-2 text-center rounded-lg text-[10px] font-bold uppercase tracking-tighter ${
                  s.isQualified ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                }`}>
                  {s.isQualified ? "Likely Qualified" : "High Risk"}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div> // This is the end of the main container
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
