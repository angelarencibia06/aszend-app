import os
import re

app_path = "../aszend_app/src/context/AppContext.jsx"
with open(app_path, "r", encoding="utf-8") as f:
    app = f.read()

# Remove the forced streak 365
app = re.sub(r'const \[streak, setStreak\] = useLocalStorage\(\'aszend_streak\', 365\);', r"const [streak, setStreak] = useLocalStorage('aszend_streak', 0);", app)

app = re.sub(r'// FORCE STREAK TO 365 OVERRIDING LOCAL STORAGE FOR TESTING\s*useEffect\(\(\) => \{\s*setStreak\(365\);\s*\}, \[\]\);\s*', '', app, flags=re.DOTALL)

with open(app_path, "w", encoding="utf-8") as f:
    f.write(app)
