import os

# 1. Fix AppContext.jsx
with open("../aszend_app/src/context/AppContext.jsx", "r", encoding="utf-8") as f:
    app_context = f.read()

app_context = app_context.replace(
    "export const useAppContext = () => useContext(AppContext);",
    "// eslint-disable-next-line react-refresh/only-export-components\nexport const useAppContext = () => useContext(AppContext);"
)

with open("../aszend_app/src/context/AppContext.jsx", "w", encoding="utf-8") as f:
    f.write(app_context)


# 2. Fix App.jsx
with open("../aszend_app/src/App.jsx", "r", encoding="utf-8") as f:
    app_jsx = f.read()

app_jsx = app_jsx.replace(
    "const { isPanicRoomActive, isAuthenticated, hasCompletedOnboarding } = useAppContext();",
    "const { isPanicRoomActive } = useAppContext();"
)

with open("../aszend_app/src/App.jsx", "w", encoding="utf-8") as f:
    f.write(app_jsx)


# 3. Fix EnergyOrb.jsx
with open("../aszend_app/src/components/EnergyOrb.jsx", "r", encoding="utf-8") as f:
    energy_orb = f.read()

energy_orb = energy_orb.replace(
    "planets.map((p, i) =>",
    "planets.map((p) =>"
)

with open("../aszend_app/src/components/EnergyOrb.jsx", "w", encoding="utf-8") as f:
    f.write(energy_orb)


# 4. Fix Onboarding.jsx
with open("../aszend_app/src/pages/Onboarding.jsx", "r", encoding="utf-8") as f:
    onboarding = f.read()

# Fix unused imports
onboarding = onboarding.replace(
    "import { Brain, Activity, Target, Zap, ShieldAlert, CheckCircle2, ChevronRight, Lock, Unlock, ArrowRight } from 'lucide-react';",
    "import { Brain, Activity, Target, Zap, Lock, Unlock } from 'lucide-react';"
)

# Fix unused state
onboarding = onboarding.replace(
    "  const [isAnalyzing, setIsAnalyzing] = useState(false);\n",
    ""
)

# Remove any remaining setIsAnalyzing calls if they exist
onboarding = onboarding.replace("setIsAnalyzing(true);", "")
onboarding = onboarding.replace("setIsAnalyzing(false);", "")

with open("../aszend_app/src/pages/Onboarding.jsx", "w", encoding="utf-8") as f:
    f.write(onboarding)
