import os
import re

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith('.jsx'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                code = f.read()

            # Fix age
            code = code.replace('16 aos', '14 aos')
            code = code.replace('16 a\u00f1os', '14 a\u00f1os')
            code = code.replace('16 años', '14 años')
            
            # Change ASZEND to Aszend
            code = code.replace('ASZEND PRO', 'Aszend Pro')
            code = code.replace('ASZEND PREMIUM', 'Aszend Premium')
            code = code.replace('ASZEND', 'Aszend')
            
            # Change aszend to Aszend except in emails/urls
            # A bit tricky, just use regex to match aszend not preceded by @ or .
            code = re.sub(r'(?<![@.])\baszend\b', 'Aszend', code)

            with open(path, 'w', encoding='utf-8') as f:
                f.write(code)
