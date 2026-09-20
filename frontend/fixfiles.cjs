const fs = require('fs');

let k = fs.readFileSync('src/pages/KatalogPage.jsx', 'utf8');
k = k.replace(/\uFFFD/g, 'x');
fs.writeFileSync('src/pages/KatalogPage.jsx', k, 'utf8');
console.log('KatalogPage fixed');

let l = fs.readFileSync('src/pages/LoginPage.jsx', 'utf8');
l = l.replace(/\uFFFD+/g, '');
fs.writeFileSync('src/pages/LoginPage.jsx', l, 'utf8');
console.log('LoginPage fixed');

['src/pages/KatalogPage.jsx', 'src/pages/LoginPage.jsx'].forEach(f => {
  const buf = Buffer.from(fs.readFileSync(f, 'utf8'), 'utf8');
  let high = 0;
  for (let j = 0; j < buf.length - 2; j++) {
    if (buf[j] === 0xEF && buf[j+1] === 0xBF && buf[j+2] === 0xBD) high++;
  }
  console.log(f + ': replacement chars remaining =', high);
});