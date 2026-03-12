const fs = require('fs');
const path = require('path');

const dir = '.';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'todo.html');

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix Kontakt button links
  content = content.replace(/<a href="kontakt\.html" class="btn btn-primary btn-lg">Poptat .*(čištění|impregnaci|vyklízení)<\/a>/g, (m) => m.replace('kontakt.html', 'https://sanacesf.cz/kontakt'));
  content = content.replace(/<a href="kontakt\.html" class="btn btn-primary btn-lg">Potřebuji diskrétní pomoc<\/a>/g, (m) => m.replace('kontakt.html', 'https://sanacesf.cz/kontakt'));

  // Fix Kontakt.html hero-split style
  if (file === 'kontakt.html') {
    content = content.replace('.hero-split { width:100%; background:#ffffff; overflow: hidden; }', '.hero-split { width:100%; background:#ffffff; overflow: hidden; padding: 0 !important; }');
  }

  // Fix Hero images to display properly
  if (file === 'extremni-vyklizeni-a-cisteni.html' || file === 'impregnace-strech-a-fasad.html') {
    content = content.replace(/<div class="hero-image rounded-bg-image"[^>]+>/g, '<div class="hero-image">');
  }

  // Replace Preconnects and Google Fonts
  content = content.replace(/<link[^>]+rel="preconnect"[^>]+googleapis\.com[^>]*>\s*/g, '');
  content = content.replace(/<link[^>]+rel="preconnect"[^>]+gstatic\.com[^>]*>\s*/g, '');
  
  const fontLinkStr = '<link rel="stylesheet" href="/css/montserrat.css">\n    <link rel="preload" as="font" href="/fonts/JTUSjIg1_i6t8kCHKm459Wlhyw.woff2" type="font/woff2" crossorigin>\n    ';
  content = content.replace(/<link[^>]+href="https:\/\/fonts\.googleapis\.com\/css2\?family=Montserrat[^"]+"[^>]*rel="stylesheet">\s*/g, fontLinkStr);

  // Defer main.js
  content = content.replace(/<script src="(\/?)js\/main\.js(\?v=[0-9]+)?"><\/script>/g, '<script src="/main.js" defer></script>');

  fs.writeFileSync(filePath, content, 'utf8');
}
console.log('done');
