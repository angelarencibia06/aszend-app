import os

with open('src/index.css', 'r', encoding='utf-8') as f:
    css = f.read()

if '@source' not in css:
    css = css.replace('@import "tailwindcss";', '@import "tailwindcss";\n@source "./";\n')

with open('src/index.css', 'w', encoding='utf-8') as f:
    f.write(css)
