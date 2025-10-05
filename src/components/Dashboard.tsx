import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { 
  Activity, 
  Pill, 
  Heart, 
  Apple, 
  TrendingUp, 
  Download,
  CheckCircle2,
  Dumbbell,
  Salad,
  FileText
} from "lucide-react";

interface DashboardProps {
  formData: any;
}

export const Dashboard = ({ formData }: DashboardProps) => {
  const [dailyTasks, setDailyTasks] = useState({
    medicine: false,
    exercise: false,
    meals: false,
    symptomLog: false,
  });

  const calculateCompliance = () => {
    const completed = Object.values(dailyTasks).filter(Boolean).length;
    return (completed / Object.keys(dailyTasks).length) * 100;
  };

  const toggleTask = (task: keyof typeof dailyTasks) => {
    setDailyTasks(prev => ({ ...prev, [task]: !prev[task] }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="w-full">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {/* Diagnosis Summary Card */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Card className="p-6 shadow-medium h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Activity className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-bold text-lg">Diagnosis Summary</h3>
            </div>
            <p className="text-foreground font-medium">
              You may have <span className="text-primary">Hypothyroidism</span>
            </p>
          </Card>
        </motion.div>

        {/* Medication Card */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Card className="p-6 shadow-medium h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/20">
                <Pill className="h-5 w-5 text-secondary-foreground" />
              </div>
              <h3 className="font-bold text-lg">Medication</h3>
            </div>
            <p className="text-foreground mb-2">
              Consult doctor for appropriate <span className="font-medium">Levothyroxine</span> dosage.
            </p>
            <p className="text-xs text-muted-foreground bg-muted p-3 rounded-lg">
              ⚠️ Do not self-medicate; dosage varies by TSH level.
            </p>
          </Card>
        </motion.div>

        {/* Lifestyle Recommendations */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Card className="p-6 shadow-medium h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20">
                <Heart className="h-5 w-5 text-accent-foreground" />
              </div>
              <h3 className="font-bold text-lg">Lifestyle</h3>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <span>30 minutes of brisk walking daily</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <span>Practice yoga/meditation for stress reduction</span>
              </li>
            </ul>
          </Card>
        </motion.div>

        {/* Diet Plan */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Card className="p-6 shadow-medium h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/20">
                <Apple className="h-5 w-5 text-success-foreground" />
              </div>
              <h3 className="font-bold text-lg">Diet Plan</h3>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                <span>Include iodine-rich foods (fish, eggs, dairy)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                <span>Avoid excess soy and processed food</span>
              </li>
            </ul>
          </Card>
        </motion.div>

        {/* Daily Tracker */}
        <motion.div 
          variants={itemVariants} 
          className="lg:col-span-2"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Card className="p-6 shadow-medium h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-bold text-lg">Daily Tracker</h3>
            </div>
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-3">
                <Checkbox 
                  id="medicine" 
                  checked={dailyTasks.medicine}
                  onCheckedChange={() => toggleTask("medicine")}
                />
                <label htmlFor="medicine" className="flex items-center gap-2 text-sm cursor-pointer">
                  <Pill className="h-4 w-4 text-muted-foreground" />
                  Took medicine today
                </label>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox 
                  id="exercise" 
                  checked={dailyTasks.exercise}
                  onCheckedChange={() => toggleTask("exercise")}
                />
                <label htmlFor="exercise" className="flex items-center gap-2 text-sm cursor-pointer">
                  <Dumbbell className="h-4 w-4 text-muted-foreground" />
                  Exercise done
                </label>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox 
                  id="meals" 
                  checked={dailyTasks.meals}
                  onCheckedChange={() => toggleTask("meals")}
                />
                <label htmlFor="meals" className="flex items-center gap-2 text-sm cursor-pointer">
                  <Salad className="h-4 w-4 text-muted-foreground" />
                  Healthy meals consumed
                </label>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox 
                  id="symptomLog" 
                  checked={dailyTasks.symptomLog}
                  onCheckedChange={() => toggleTask("symptomLog")}
                />
                <label htmlFor="symptomLog" className="flex items-center gap-2 text-sm cursor-pointer">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  Symptom log updated
                </label>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Weekly Compliance</span>
                <span className="font-bold text-primary">{calculateCompliance().toFixed(0)}%</span>
              </div>
              <Progress value={calculateCompliance()} className="h-2" />
            </div>
          </Card>
        </motion.div>

        {/* Post-Cure Insights */}
        <motion.div 
          variants={itemVariants} 
          className="lg:col-start-2"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Card className="p-6 shadow-medium h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20">
                <Heart className="h-5 w-5 text-accent-foreground" />
              </div>
              <h3 className="font-bold text-lg">Post-Cure Insights</h3>
            </div>
            <ul className="space-y-2 text-sm mb-4">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <span>Maintain a balanced diet and routine</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <span>Do yearly thyroid function tests</span>
              </li>
            </ul>
            <Button variant="outline" className="w-full gap-2">
              <Download className="h-4 w-4" />
              Download Progress Report
            </Button>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};
