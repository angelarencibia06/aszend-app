import re

with open('src/pages/Profile.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the small camera badge
target = r'<div style=\{\{ position: \'absolute\', bottom: \'-8px\', right: \'-8px\', background: \'#02040a\', borderRadius: \'8px\', padding: \'5px\', border: `1px solid \$\{activeRankDef\.color1\}80` \}\}>\s*<Camera size=\{12\} color="#fff" \/>\s*<\/div>'
content = re.sub(target, '', content)

with open('src/pages/Profile.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
