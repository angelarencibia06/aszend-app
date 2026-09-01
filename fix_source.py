import os

with open('src/index.css', 'r', encoding='utf-8') as f:
    css = f.read()

css = css.replace('@source "./";', '@source "./**/*.jsx";')

with open('src/index.css', 'w', encoding='utf-8') as f:
    f.write(css)
