import { motion } from "framer-motion";
import { DollarSign, Briefcase, Zap, PiggyBank, CreditCard } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useFinancial } from "@/context/FinancialContext";

const formatCurrency = (v: number) =>
  v >= 1000 ? `$${(v / 1000).toFixed(v % 1000 === 0 ? 0 : 1)}k` : `$${v}`;

interface SliderRowProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  color?: "green" | "red" | "blue";
  suffix?: string;
}

const SliderRow = ({ icon, label, value, min, max, step, onChange, color = "green", suffix = "/yr" }: SliderRowProps) => {
  const colorClasses = {
    green: "neon-text-green",
    red: "neon-text-red",
    blue: "text-blue-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-card p-4 md:p-5"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
            {icon}
          </div>
          <span className="text-sm font-medium text-muted-foreground">{label}</span>
        </div>
        <span className={`font-heading text-lg font-bold ${colorClasses[color]}`}>
          {formatCurrency(value)}
          <span className="text-xs font-normal text-muted-foreground ml-0.5">{suffix}</span>
        </span>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={([v]) => onChange(v)}
        className="w-full"
      />
      <div className="flex justify-between mt-1.5 text-xs text-muted-foreground">
        <span>{formatCurrency(min)}</span>
        <span>{formatCurrency(max)}</span>
      </div>
    </motion.div>
  );
};

const InputController = () => {
  const { state, dispatch } = useFinancial();
  const salary = state.incomeSources.find((s) => s.id === "salary");
  const gig = state.incomeSources.find((s) => s.id === "gig");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-3"
    >
      <h2 className="font-heading text-lg font-bold text-foreground flex items-center gap-2">
        <span className="h-1 w-1 rounded-full bg-primary" />
        Income & Expenses
      </h2>

      {salary && (
        <SliderRow
          icon={<Briefcase className="h-4 w-4 text-primary" />}
          label="Primary Salary"
          value={salary.annualAmount}
          min={0}
          max={250000}
          step={1000}
          onChange={(v) => dispatch({ type: "SET_INCOME", payload: { id: "salary", annualAmount: v } })}
          color="green"
        />
      )}

      {gig && (
        <SliderRow
          icon={<Zap className="h-4 w-4 text-yellow-400" />}
          label="Side Hustle / Gig"
          value={gig.annualAmount}
          min={0}
          max={100000}
          step={500}
          onChange={(v) => dispatch({ type: "SET_INCOME", payload: { id: "gig", annualAmount: v } })}
          color="green"
        />
      )}

      <SliderRow
        icon={<CreditCard className="h-4 w-4 text-destructive" />}
        label="Monthly Expenses"
        value={state.monthlyExpenses}
        min={0}
        max={15000}
        step={100}
        onChange={(v) => dispatch({ type: "SET_EXPENSES", payload: v })}
        color="red"
        suffix="/mo"
      />

      <SliderRow
        icon={<PiggyBank className="h-4 w-4 text-blue-400" />}
        label="Current Savings"
        value={state.savingsBalance}
        min={0}
        max={200000}
        step={500}
        onChange={(v) => dispatch({ type: "SET_SAVINGS", payload: v })}
        color="blue"
        suffix=""
      />
    </motion.div>
  );
};

export default InputController;
