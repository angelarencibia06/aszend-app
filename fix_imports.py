with open("src/components/PanicRoom.jsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace(
    "import { ShieldAlert, Activity, MapPin, Lock, ChevronRight, X, AlertTriangle, CheckCircle } from 'lucide-react';",
    "import { ShieldAlert, Activity, MapPin, Lock, ChevronRight, X, AlertTriangle, CheckCircle, ShieldCheck } from 'lucide-react';"
)

with open("src/components/PanicRoom.jsx", "w", encoding="utf-8") as f:
    f.write(content)
