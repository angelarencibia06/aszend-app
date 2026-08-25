import re

# Read markdown files
with open('legal/Privacy.md', 'r', encoding='utf-8') as f:
    privacy_md = f.read()
with open('legal/Terms.md', 'r', encoding='utf-8') as f:
    terms_md = f.read()

# Prepare HTML versions (simple replace for newlines)
privacy_html = '<div style="white-space: pre-wrap; text-align: left; line-height: 1.5; font-size: 14px;">' + privacy_md + '</div>'
terms_html = '<div style="white-space: pre-wrap; text-align: left; line-height: 1.5; font-size: 14px;">' + terms_md + '</div>'

# Read landing index.html
html_path = '../aszend_landing/index.html'
with open(html_path, 'r', encoding='utf-8') as f:
    index_html = f.read()

# Replace Privacy
index_html = re.sub(
    r'<div id="privacy-modal".*?<h2>POLÍTICAS DE PRIVACIDAD \(Resumen Ejecutivo\)</h2>.*?<div class="legal-text">.*?</div>\s*</div>\s*</div>',
    f'''<div id="privacy-modal" class="legal-modal">
        <div class="legal-modal-content">
            <span class="close-modal" id="close-privacy">&times;</span>
            <h2>POLÍTICAS DE PRIVACIDAD</h2>
            <div class="legal-text" style="height: 70vh; overflow-y: auto; padding: 20px;">
                {privacy_html}
            </div>
        </div>
    </div>''',
    index_html,
    flags=re.DOTALL | re.IGNORECASE
)

# Replace Terms
index_html = re.sub(
    r'<div id="terms-modal".*?<h2>TÉRMINOS DE SERVICIO \(Resumen Ejecutivo\)</h2>.*?<div class="legal-text">.*?</div>\s*</div>\s*</div>',
    f'''<div id="terms-modal" class="legal-modal">
        <div class="legal-modal-content">
            <span class="close-modal" id="close-terms">&times;</span>
            <h2>TÉRMINOS DE SERVICIO</h2>
            <div class="legal-text" style="height: 70vh; overflow-y: auto; padding: 20px;">
                {terms_html}
            </div>
        </div>
    </div>''',
    index_html,
    flags=re.DOTALL | re.IGNORECASE
)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(index_html)
print('Updated landing page index.html')
