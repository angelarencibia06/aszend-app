import os

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

fonts = """    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Oswald:wght@500;700&family=Sora:wght@300;400;600;700;800&family=Rajdhani:wght@400;600;700&display=swap" rel="stylesheet">"""

if "fonts.googleapis.com" not in html:
    html = html.replace('</head>', fonts + '\n  </head>')
    
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
