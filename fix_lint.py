import os
import re

def fix_imports(filepath, to_remove):
    if not os.path.exists(filepath):
        return
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    for item in to_remove:
        # Match `Item, ` or `, Item` or `{ Item }`
        content = re.sub(r',\s*' + item + r'\b', '', content)
        content = re.sub(r'\b' + item + r'\s*,', '', content)
        content = re.sub(r'\{\s*' + item + r'\s*\}', '{}', content)
    
    # Clean up empty imports
    content = re.sub(r'import\s*\{\s*\}\s*from\s*[\'"][^\'"]+[\'"];\n?', '', content)
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

# AppContext
appctx = "../aszend_app/src/context/AppContext.jsx"
with open(appctx, "r", encoding="utf-8") as f:
    c = f.read()
c = re.sub(r'export const RANKS = \[.*?\];', '', c, flags=re.DOTALL)
c = re.sub(r'export const getStreakData = \(days\) => \{.*?\};\n', '', c, flags=re.DOTALL)
with open(appctx, "w", encoding="utf-8") as f:
    f.write(c)

# Home
home = "../aszend_app/src/pages/Home.jsx"
with open(home, "r", encoding="utf-8") as f:
    c = f.read()
c = c.replace("import { useAppContext, RANKS }", "import { useAppContext }")
c = "import { RANKS } from '../utils/constants';\n" + c
with open(home, "w", encoding="utf-8") as f:
    f.write(c)

fix_imports("../aszend_app/src/pages/Control.jsx", ['useEffect', 'useRef', 'useAppContext'])
# Fix setSites in Control.jsx
with open("../aszend_app/src/pages/Control.jsx", "r", encoding="utf-8") as f:
    c = f.read()
c = c.replace("const [sites, setSites] =", "const [sites] =")
with open("../aszend_app/src/pages/Control.jsx", "w", encoding="utf-8") as f:
    f.write(c)

fix_imports("../aszend_app/src/components/DailyCheckIn.jsx", ['ArrowRight', 'Check'])
fix_imports("../aszend_app/src/components/RiskAnalysisModal.jsx", ['AnimatePresence'])
fix_imports("../aszend_app/src/pages/Habits.jsx", ['TrendingUp', 'Flame', 'Award'])
fix_imports("../aszend_app/src/pages/Onboarding.jsx", ['ChevronRight', 'Star'])
fix_imports("../aszend_app/src/pages/Profile.jsx", ['useEffect'])
# Profile unused i
with open("../aszend_app/src/pages/Profile.jsx", "r", encoding="utf-8") as f:
    c = f.read()
c = c.replace("RANKS.map((rank, i) =>", "RANKS.map((rank) =>")
with open("../aszend_app/src/pages/Profile.jsx", "w", encoding="utf-8") as f:
    f.write(c)

fix_imports("../aszend_app/src/components/PanicRoom.jsx", ['ChevronRight', 'X'])
fix_imports("../aszend_app/src/pages/Home.jsx", ['Shield', 'Lock', 'Link'])

