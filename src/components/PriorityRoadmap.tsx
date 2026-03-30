import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Shield, ArrowRight } from "lucide-react";
import { useFinancial, type Advice } from "@/context/FinancialContext";

const typeStyles = {
  critical: {
    bg: "bg-destructive/10",
    border: "border-destructive/30",
    badge: "bg-destructive text-destructive-foreground",
    badgeText: "Urgent",
  },
  warning: {
    bg: "bg-warning/10",
    border: "border-warning/30",
    badge: "bg-warning text-warning-foreground",
    badgeText: "Heads Up",
  },
  tip: {
    bg: "bg-primary/10",
    border: "border-primary/30",
    badge: "bg-primary text-primary-foreground",
    badgeText: "Opportunity",
  },
};

const AdviceCard = ({ item, index }: { item: Advice; index: number }) => {
  const style = typeStyles[item.type];
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      className={`glass-card p-4 border ${style.border} ${style.bg}`}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl mt-0.5">{item.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-heading text-sm font-bold text-foreground">{item.title}</h3>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${style.badge}`}>
              {style.badgeText}
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
        </div>
        <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
      </div>
    </motion.div>
  );
};

const PriorityRoadmap = () => {
  const { advice } = useFinancial();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="space-y-3"
    >
      <h2 className="font-heading text-lg font-bold text-foreground flex items-center gap-2">
        <span className="h-1 w-1 rounded-full bg-primary" />
        Financial Priority Roadmap
      </h2>

      {advice.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-card p-6 text-center"
        >
          <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">
            Looking good! No urgent financial actions needed right now.
          </p>
        </motion.div>
      ) : (
        <AnimatePresence mode="popLayout">
          {advice.map((item, i) => (
            <AdviceCard key={item.id} item={item} index={i} />
          ))}
        </AnimatePresence>
      )}
    </motion.div>
  );
};

export default PriorityRoadmap;
