import os

auth_path = "../aszend_app/src/pages/Auth.jsx"
with open(auth_path, "r", encoding="utf-8") as f:
    auth = f.read()

# Fix the broken required
auth = auth.replace("/* /* required - dev bypass */={!isLogin} - dev bypass */", "")
auth = auth.replace("/* required - dev bypass */", "")

with open(auth_path, "w", encoding="utf-8") as f:
    f.write(auth)
