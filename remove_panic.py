import os
import re

control_path = "../aszend_app/src/pages/Control.jsx"
with open(control_path, "r", encoding="utf-8") as f:
    control = f.read()

# Remove Panic state and logic
control = re.sub(r'// Panic Button State.*?const stopPanicHold = \(\) => \{.*?\};\n\n  useEffect\(\(\) => \{\n    return \(\) => clearInterval\(holdIntervalRef.current\);\n  \}, \[\]\);\n', '', control, flags=re.DOTALL)
control = re.sub(r'const \[panicHoldProgress.*?;\n  const holdIntervalRef = useRef\(null\);\n  const \[showPanicModal, setShowPanicModal\] = useState\(false\);\n', '', control)

# Remove Panic JSX
control = re.sub(r'\{/\* Panic Button \*/\}.*?</p>\n      </div>', '', control, flags=re.DOTALL)
control = re.sub(r'\{/\* Panic Modal \*/\}.*?</AnimatePresence>', '', control, flags=re.DOTALL)

with open(control_path, "w", encoding="utf-8") as f:
    f.write(control)

css_path = "../aszend_app/src/styles/Control.css"
with open(css_path, "r", encoding="utf-8") as f:
    css = f.read()

css = re.sub(r'/\* Panic Button \*/.*?(?=/\* Bottom Sheet Add Modal \*/)', '', css, flags=re.DOTALL)
css = re.sub(r'/\* Panic Modal Overlay \*/.*', '', css, flags=re.DOTALL)

with open(css_path, "w", encoding="utf-8") as f:
    f.write(css)
