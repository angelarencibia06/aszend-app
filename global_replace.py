import os
import re

app_dir = r'C:\Users\Ángel\.gemini\antigravity\scratch\aszend_app\src'

for root, _, files in os.walk(app_dir):
    for file in files:
        if file.endswith('.jsx') or file.endswith('.js') or file.endswith('.css'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Use regex to match ASZEND only if it's not part of a CSS variable or import
            content = re.sub(r'(?<![-/a-zA-Z])ASZEND(?![a-zA-Z_-])', 'Aszend', content)
            
            with open(path, 'w', encoding='utf-8') as f:
                f.write(content)

