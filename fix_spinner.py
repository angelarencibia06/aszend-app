import os

path = "../aszend_app/src/pages/Onboarding.jsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace startAnalysis logic with useEffect
old_logic = """  const startAnalysis = () => {
    setStep(3); // Analyzing step
    setIsAnalyzing(true);
    
    setTimeout(() => setAnalysisText('Evaluando desgaste del córtex prefrontal...'), 1500);
    setTimeout(() => setAnalysisText('Calculando tiempo de reseteo de receptores D2...'), 3000);
    setTimeout(() => setAnalysisText('Construyendo protocolo Aszend...'), 4500);
    
    setTimeout(() => {
      setIsAnalyzing(false);
      nextStep(); // Go to Step 4 (Science)
    }, 6000);
  };"""

new_logic = """  const startAnalysis = () => {
    setStep(3); // Analyzing step
  };

  useEffect(() => {
    if (step === 3) {
      setAnalysisText('Analizando patrones de consumo...');
      const t1 = setTimeout(() => setAnalysisText('Evaluando desgaste del córtex prefrontal...'), 1500);
      const t2 = setTimeout(() => setAnalysisText('Calculando tiempo de reseteo de receptores D2...'), 3000);
      const t3 = setTimeout(() => setAnalysisText('Construyendo protocolo Aszend...'), 4500);
      
      const t4 = setTimeout(() => {
        setStep(4);
      }, 6000);
      
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
      };
    }
  }, [step]);"""

content = content.replace(old_logic, new_logic)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
