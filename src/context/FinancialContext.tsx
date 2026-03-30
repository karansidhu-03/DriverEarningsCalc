import React, { createContext, useContext, useReducer, useMemo } from "react";

// --- Types ---
export type IncomeType = "salary" | "hourly" | "gig";

export interface IncomeSource {
  id: string;
  label: string;
  type: IncomeType;
  annualAmount: number;
}

export interface FinancialState {
  incomeSources: IncomeSource[];
  monthlyExpenses: number;
  savingsBalance: number;
}

export interface FinancialMetrics {
  totalAnnualIncome: number;
  totalMonthlyIncome: number;
  monthlyNetProfit: number;
  annualNetProfit: number;
  safeToSpendDaily: number;
  burnRate: number;
  hasGigIncome: boolean;
  gigIncome: number;
  taxReserveMonthly: number;
  taxReserveAnnual: number;
  monthsOfSavings: number;
}

export interface Advice {
  id: string;
  type: "critical" | "warning" | "tip";
  icon: string;
  title: string;
  description: string;
}

type Action =
  | { type: "SET_INCOME"; payload: { id: string; annualAmount: number } }
  | { type: "SET_EXPENSES"; payload: number }
  | { type: "SET_SAVINGS"; payload: number }
  | { type: "ADD_INCOME_SOURCE"; payload: IncomeSource }
  | { type: "REMOVE_INCOME_SOURCE"; payload: string };

// --- Reducer ---
function financialReducer(state: FinancialState, action: Action): FinancialState {
  switch (action.type) {
    case "SET_INCOME":
      return {
        ...state,
        incomeSources: state.incomeSources.map((s) =>
          s.id === action.payload.id ? { ...s, annualAmount: action.payload.annualAmount } : s
        ),
      };
    case "SET_EXPENSES":
      return { ...state, monthlyExpenses: action.payload };
    case "SET_SAVINGS":
      return { ...state, savingsBalance: action.payload };
    case "ADD_INCOME_SOURCE":
      return { ...state, incomeSources: [...state.incomeSources, action.payload] };
    case "REMOVE_INCOME_SOURCE":
      return {
        ...state,
        incomeSources: state.incomeSources.filter((s) => s.id !== action.payload),
      };
    default:
      return state;
  }
}

// --- Action Engine ---
export function computeMetrics(state: FinancialState): FinancialMetrics {
  const totalAnnualIncome = state.incomeSources.reduce((sum, s) => sum + s.annualAmount, 0);
  const totalMonthlyIncome = totalAnnualIncome / 12;
  const gigIncome = state.incomeSources
    .filter((s) => s.type === "gig")
    .reduce((sum, s) => sum + s.annualAmount, 0);
  const hasGigIncome = gigIncome > 0;
  const taxReserveAnnual = gigIncome * 0.25;
  const taxReserveMonthly = taxReserveAnnual / 12;
  const monthlyNetProfit = totalMonthlyIncome - state.monthlyExpenses - taxReserveMonthly;
  const annualNetProfit = monthlyNetProfit * 12;
  const burnRate = totalMonthlyIncome > 0 ? (state.monthlyExpenses / totalMonthlyIncome) * 100 : 0;
  const safeToSpendDaily = Math.max(0, monthlyNetProfit / 30);
  const monthsOfSavings =
    state.monthlyExpenses > 0 ? state.savingsBalance / state.monthlyExpenses : 0;

  return {
    totalAnnualIncome,
    totalMonthlyIncome,
    monthlyNetProfit,
    annualNetProfit,
    safeToSpendDaily,
    burnRate,
    hasGigIncome,
    gigIncome,
    taxReserveMonthly,
    taxReserveAnnual,
    monthsOfSavings,
  };
}

export function generateAdvice(metrics: FinancialMetrics): Advice[] {
  const advice: Advice[] = [];

  if (metrics.burnRate > 70) {
    advice.push({
      id: "burn-rate",
      type: "critical",
      icon: "🔥",
      title: "Burn Rate Alert",
      description: `Your expenses consume ${metrics.burnRate.toFixed(0)}% of your income. Immediate expense auditing recommended — look for subscriptions or costs you can cut.`,
    });
  }

  if (metrics.monthlyNetProfit > 0 && metrics.monthsOfSavings < 3) {
    advice.push({
      id: "emergency-buffer",
      type: "warning",
      icon: "🛡️",
      title: "Build Your Safety Net",
      description: `You only have ${metrics.monthsOfSavings.toFixed(1)} months of expenses saved. Prioritize building a 3-month emergency buffer of $${(metrics.monthlyExpenses * 3).toLocaleString()}.`,
    });
  }

  if (metrics.hasGigIncome) {
    advice.push({
      id: "tax-shield",
      type: "warning",
      icon: "📋",
      title: "Tax Shield Alert",
      description: `Set aside $${metrics.taxReserveMonthly.toFixed(0)}/mo ($${metrics.taxReserveAnnual.toLocaleString()}/yr) for taxes on your $${metrics.gigIncome.toLocaleString()} gig income. Self-employed? That's 25% reserved.`,
    });
  }

  if (metrics.burnRate <= 50 && metrics.monthsOfSavings >= 3) {
    advice.push({
      id: "invest",
      type: "tip",
      icon: "📈",
      title: "Ready to Invest",
      description: `Great financial health! With a ${metrics.burnRate.toFixed(0)}% burn rate and ${metrics.monthsOfSavings.toFixed(1)} months saved, consider investing your surplus of $${metrics.monthlyNetProfit.toFixed(0)}/mo.`,
    });
  }

  if (metrics.monthlyNetProfit < 0) {
    advice.push({
      id: "deficit",
      type: "critical",
      icon: "⚠️",
      title: "Monthly Deficit",
      description: `You're spending $${Math.abs(metrics.monthlyNetProfit).toFixed(0)} more than you earn each month. This is unsustainable — reduce expenses or increase income immediately.`,
    });
  }

  return advice;
}

// --- Default state ---
const defaultState: FinancialState = {
  incomeSources: [
    { id: "salary", label: "Primary Salary", type: "salary", annualAmount: 55000 },
    { id: "gig", label: "Side Hustle / Gig", type: "gig", annualAmount: 12000 },
  ],
  monthlyExpenses: 3200,
  savingsBalance: 5000,
};

// --- Context ---
interface FinancialContextType {
  state: FinancialState;
  dispatch: React.Dispatch<Action>;
  metrics: FinancialMetrics;
  advice: Advice[];
}

const FinancialContext = createContext<FinancialContextType | undefined>(undefined);

export function FinancialProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(financialReducer, defaultState);
  const metrics = useMemo(() => computeMetrics(state), [state]);
  const advice = useMemo(() => generateAdvice(metrics), [metrics]);

  return (
    <FinancialContext.Provider value={{ state, dispatch, metrics, advice }}>
      {children}
    </FinancialContext.Provider>
  );
}

export function useFinancial() {
  const ctx = useContext(FinancialContext);
  if (!ctx) throw new Error("useFinancial must be used within FinancialProvider");
  return ctx;
}
