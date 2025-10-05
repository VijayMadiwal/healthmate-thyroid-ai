import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResultCardProps {
  hasThyroid: boolean;
  onViewDashboard?: () => void;
}

export const ResultCard = ({ hasThyroid, onViewDashboard }: ResultCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-2xl mx-auto mt-6"
    >
      <Card className={`p-6 shadow-large ${hasThyroid ? 'border-warning' : 'border-success'}`}>
        <div className="flex items-start gap-4">
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
            hasThyroid ? 'bg-warning/10' : 'bg-success/10'
          }`}>
            {hasThyroid ? (
              <AlertCircle className="h-6 w-6 text-warning" />
            ) : (
              <CheckCircle className="h-6 w-6 text-success" />
            )}
          </div>
          <div className="flex-1">
            <h3 className={`text-xl font-bold mb-2 ${
              hasThyroid ? 'text-warning' : 'text-success'
            }`}>
              {hasThyroid ? '⚠️ Thyroid Detected' : '✅ No Thyroid Disorder Detected'}
            </h3>
            <p className="text-muted-foreground mb-4">
              {hasThyroid 
                ? 'Your test results indicate a potential thyroid disorder. Please proceed to your personalized dashboard for detailed recommendations.'
                : 'Your thyroid hormone levels appear to be within normal range. Continue monitoring your health with regular check-ups.'}
            </p>
            {hasThyroid && onViewDashboard && (
              <Button onClick={onViewDashboard} className="mt-2">
                Proceed to Personalized Dashboard
              </Button>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
