const fs = require('fs');
let code = fs.readFileSync('src/pages/Profile.jsx', 'utf8');

let index = code.indexOf('  return (\n    <div className="page-container"');
if (index === -1) index = code.indexOf('  return (\r\n    <div className="page-container"');

if (index !== -1) {
    const top = code.substring(0, index);
    const newBottom = fs.readFileSync('temp_profile_end.txt', 'utf8');
    fs.writeFileSync('src/pages/Profile.jsx', top + newBottom);
    console.log('Success');
} else {
    console.log('Not found');
}
