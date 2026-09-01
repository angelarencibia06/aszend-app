import os

with open('src/index.css', 'r', encoding='utf-8') as f:
    css = f.read()

i1 = '@import "tailwindcss";\n'
i2 = "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Oswald:wght@500;700&display=swap');\n\n"
i2_short = "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Oswald:wght@500;700&display=swap');"

css = css.replace(i1, '')
css = css.replace(i2, '')
css = css.replace(i2_short, '')

# Now, put the fonts URL first
css = i2 + i1 + css

with open('src/index.css', 'w', encoding='utf-8') as f:
    f.write(css)
