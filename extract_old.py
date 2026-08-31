import subprocess

old_content = subprocess.check_output(["git", "show", "e5c710d:src/pages/Home.jsx"]).decode('utf-8')
with open("../aszend_app/temp_old_home.jsx", "w", encoding="utf-8") as f:
    f.write(old_content)
