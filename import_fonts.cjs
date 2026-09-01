const fs = require('fs');
let code = fs.readFileSync('src/main.jsx', 'utf8');
if (!code.includes('./styles/fonts.css')) {
  code = "import './styles/fonts.css';\n" + code;
  fs.writeFileSync('src/main.jsx', code);
}
