import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { DiagnosisForm } from "@/components/DiagnosisForm";
import { ResultCard } from "@/components/ResultCard";
import { Dashboard } from "@/components/Dashboard";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showResult, setShowResult] = useState(false);
  const [hasThyroid, setHasThyroid] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  const handleResult = (thyroidDetected: boolean, data: any) => {
    setHasThyroid(thyroidDetected);
    setFormData(data);
    setShowResult(true);
    setShowDashboard(false);
  };

  const handleViewDashboard = () => {
    setShowDashboard(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8 px-4">
        {!showDashboard ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                AI-Powered Thyroid Diagnosis
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Get instant insights into your thyroid health with our advanced AI analysis
              </p>
            </motion.div>

            <DiagnosisForm onResult={handleResult} />
            
            {showResult && (
              <ResultCard 
                hasThyroid={hasThyroid} 
                onViewDashboard={hasThyroid ? handleViewDashboard : undefined}
              />
            )}
          </>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                Your Personalized Care Dashboard
              </h2>
              <p className="text-muted-foreground">
                Track your progress and follow personalized recommendations
              </p>
            </motion.div>

            <Dashboard formData={formData} />
          </>
        )}
      </main>
    </div>
  );
};

export default Index;
