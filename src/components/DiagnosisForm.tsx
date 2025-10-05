import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";

interface FormData {
  age: string;
  sex: string;
  pregnant: string;
  tt4: string;
  t3: string;
  t4u: string;
  fti: string;
  tsh: string;
}

interface DiagnosisFormProps {
  onResult: (hasThyroid: boolean, formData: FormData) => void;
}

export const DiagnosisForm = ({ onResult }: DiagnosisFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    age: "",
    sex: "",
    pregnant: "",
    tt4: "",
    t3: "",
    t4u: "",
    fti: "",
    tsh: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple diagnosis logic based on TSH levels
    const tshValue = parseFloat(formData.tsh);
    const hasThyroid = tshValue > 4.0 || tshValue < 0.4;
    
    onResult(hasThyroid, formData);
  };

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      <Card className="p-8 shadow-large">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Activity className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Thyroid Diagnosis</h2>
            <p className="text-sm text-muted-foreground">Enter your clinical values below</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                placeholder="Enter age"
                value={formData.age}
                onChange={(e) => updateFormData("age", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sex">Sex</Label>
              <Select value={formData.sex} onValueChange={(value) => updateFormData("sex", value)} required>
                <SelectTrigger id="sex">
                  <SelectValue placeholder="Select sex" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pregnant">Pregnant</Label>
              <Select value={formData.pregnant} onValueChange={(value) => updateFormData("pregnant", value)} required>
                <SelectTrigger id="pregnant">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tt4">TT4 (Total Thyroxine)</Label>
              <Input
                id="tt4"
                type="number"
                step="0.01"
                placeholder="Enter TT4 value"
                value={formData.tt4}
                onChange={(e) => updateFormData("tt4", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="t3">T3 (Triiodothyronine)</Label>
              <Input
                id="t3"
                type="number"
                step="0.01"
                placeholder="Enter T3 value"
                value={formData.t3}
                onChange={(e) => updateFormData("t3", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="t4u">T4U (Thyroxine Uptake)</Label>
              <Input
                id="t4u"
                type="number"
                step="0.01"
                placeholder="Enter T4U value"
                value={formData.t4u}
                onChange={(e) => updateFormData("t4u", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fti">FTI (Free Thyroxine Index)</Label>
              <Input
                id="fti"
                type="number"
                step="0.01"
                placeholder="Enter FTI value"
                value={formData.fti}
                onChange={(e) => updateFormData("fti", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tsh">TSH (Thyroid Stimulating Hormone)</Label>
              <Input
                id="tsh"
                type="number"
                step="0.01"
                placeholder="Enter TSH value"
                value={formData.tsh}
                onChange={(e) => updateFormData("tsh", e.target.value)}
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full animate-pulse-slow">
            Analyze Results
          </Button>
        </form>
      </Card>
    </motion.div>
  );
};
