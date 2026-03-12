# Sanace SF - Profesionální web pro čištění a sanace

Moderní, responzivní web pro společnost Sanace SF specializující se na extrémní čištění, sanace fasád a výškové práce po celé České republice.

## 📋 Přehled projektu

**Firma:** Sanace SF (Josef Pavlas)  
**IČ:** 19520239  
**Sídlo:** Libouchec 419, 403 35  
**Web:** https://www.sanacesf.cz/  
**Kontakt:** info@sanacesf.cz, +420 608 300 704  

### Služby
- Čištění střech a fasád
- Impregnace střech a fasád  
- Extrémní vyklízení a čištění
- Sanace po úmrtí

## 🚀 Technické specifikace

### Design & Architektura
- **Mobile-first** responzivní design
- **Vanilla HTML5, CSS3, JavaScript** (bez external dependencies)
- **Moderní CSS**: Variables, Flexbox, Grid, clamp(), rem jednotky
- **Accessibility**: WCAG AA compliance, semantický HTML, ARIA
- **SEO optimalizace**: Structured data, OpenGraph, sitemap.xml

### Bezpečnost
- **CSP** (Content Security Policy) hlavičky
- **Honeypot** anti-spam ochrana formulářů
- **HTTPS** ready s HSTS hlavičkami
- **XSS/Clickjacking** ochrana

### Performance
- **Lazy loading** obrázků (below the fold)
- **WebP + JPG** fallback pro obrázky
- **Critical CSS** inline optimalizace
- **Gzip** komprese
- **Browser caching**

## 📁 Struktura projektu

```
├── index.html                 # Hlavní stránka
├── contact.html              # Kontaktní formulář
├── privacy.html              # GDPR prohlášení
├── cookies.html              # Zásady cookies
├── 404.html                  # Chybová stránka
├──                  # Stránky služeb
│   ├── cisteni-strech-a-fasad.html          # Čištění střech a fasád
│   ├── impregnace-strech-a-fasad.html       # Impregnace
│   ├── extremni-vyklizeni-a-cisteni.html        # Extrémní vyklízení
│   └── sanace-po-umrti.html  # Sanace po úmrtí
├── css/
│   └── styles.css            # Hlavní stylesheet (mobile-first)
├── js/
│   └── main.js               # Vanilla JavaScript
├── obrazky/                  # Obrázky (organizované podle sekcí)
│   ├── hero/
│   ├── logo/
│   ├── favicon/
│   ├── Ikony_proc/
│   ├── nasesluzby/
│   ├── cisteni-strech-a-fasad/
│   ├── Impregnace/
│   └── vyklizeni/
├── sitemap.xml              # XML sitemap
├── robots.txt               # Robots.txt
├── llms.txt                 # LLM instrukce
├── .htaccess               # Apache konfigurace
├── favicon.svg             # SVG favicon
├── README.md              # Tato dokumentace
└── instrukce.md           # Původní zadání
```

## 🎨 Design systém

### Barevná paleta
```css
--color-primary: #FFFFFF      /* Hlavní bílá */
--color-secondary: #B17A65    /* Sekundární hnědá */
--color-button: #59707e       /* Tlačítka modrozelená */
--color-background: #FFFFFF   /* Pozadí */
--color-background-alt: #F8FAFC /* Alternativní pozadí */
--color-footer-bg: #222A30    /* Patička tmavá */
--color-text: #333333         /* Text */
```

### Typografie
- **Headings:** Montserrat (Google Fonts)
- **Body:** System sans-serif stack
- **Sizes:** clamp() pro nadpisy, rem pro běžný text
- **Line-height:** 1.5-1.8 pro optimální čitelnost

### Spacing
- **8px grid systém** pro konzistentní rozestupy
- **Border radius:** 16-24px pro moderní look
- **Shadows:** Jemné, subtilní stíny

## 🛠️ Deployment

### 1. Statické hostování (Netlify/Vercel)
```bash
# Jednoduše nahrajte všechny soubory do root adresáře
```

### 2. Apache hosting
```bash
# Nahrajte soubory do public_html/
# .htaccess už obsahuje potřebnou konfiguraci
# Nastavte security headers v cPanel nebo kontaktujte support
```

### 3. Bezpečnostní hlavičky (pro Apache)
Přidejte do `.htaccess` nebo požádejte hosting o nastavení:
```apache
Header always set X-Frame-Options "DENY"
Header always set X-Content-Type-Options "nosniff"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
Header always set Content-Security-Policy "default-src 'self'; font-src 'self' fonts.googleapis.com fonts.gstatic.com; style-src 'self' 'unsafe-inline' fonts.googleapis.com; script-src 'self'; img-src 'self' data:; connect-src 'self';"
```

## 📧 Kontaktní formulář

### Formspree integrace
1. Zaregistrujte se na [formspree.io](https://formspree.io/)
2. Vytvořte nový formulář 
3. Získejte Form ID
4. Upravte v `contact.html` a `js/main.js`:
   ```javascript
   const formspreeUrl = 'https://formspree.io/f/YOUR_FORM_ID';
   ```

### PHP handler (alternativa)
Pokud máte PHP hosting, vytvořte `contact-handler.php`:
```php
<?php
// Zpracování formuláře a odeslání na info@sanacesf.cz
if ($_POST) {
    $to = 'info@sanacesf.cz';
    $subject = 'Dotaz z webu sanacesf.cz';
    // ... PHP mail logic
}
?>
```

## 🔧 Konfigurace

### Analytics (volitelně)
Pro přidání Google Analytics:
1. Získejte GA4 Measurement ID
2. Přidejte do `<head>` všech stránek:
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```
3. Upravte cookie consent logiku v `js/main.js`

### Facebook Pixel (volitelně)
```html
<!-- Facebook Pixel Code -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  // ... Facebook pixel code
</script>
```

## ✏️ Úpravy obsahu

### Změna textu
Texty jsou přímo v HTML souborech. Pro úpravu:
1. Najděte příslušnou stránku (`index.html`, `cisteni-strech-a-fasad.html`, etc.)
2. Upravte text v HTML tazích
3. Zachovejte `&nbsp;` pro nedělitelné mezery
4. Zachovejte strukturu nadpisů H1-H6

### Přidání nové služby
1. Vytvořte nový soubor v `nova-sluzba.html`
2. Zkopírujte strukturu z existující služby
3. Přidejte odkaz do navigace (všechny HTML soubory)
4. Aktualizujte `sitemap.xml`
5. Přidejte obrázky do `obrazky/nova-sluzba/`

### Změna kontaktních údajů
Aktualizujte ve všech souborech:
- Telefon: `+420 608 300 704`
- Email: `info@sanacesf.cz`  
- Adresa: `Libouchec 419, 403 35`
- Structured data (JSON-LD) v patičkách stránek

## 🖼️ Správa obrázků

### Optimalizace
- **Formát:** WebP (primary) + JPG (fallback)
- **Velikost:** Max 1920px šířka pro hero, 800px pro content
- **Komprese:** 80-90% kvalita pro web
- **Lazy loading:** Automaticky pro obrázky below-the-fold

### Přidání nových obrázků
1. Zkomprimujte obrázky (TinyPNG, Squoosh.app)
2. Vytvořte WebP + JPG verze
3. Přidejte do příslušné složky v `obrazky/`
4. Přidejte `alt` text pro accessibility
5. Pro hero sekce nepoužívejte `loading="lazy"`

## 📊 SEO údržba

### Aktualizace sitemap
Po přidání nových stránek upravte `sitemap.xml`:
```xml
<url>
    <loc>https://www.sanacesf.cz/nova-stranka.html</loc>
    <lastmod>2026-03-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
</url>
```

### Structured Data
Zkontrolujte pomocí [Google Rich Results Test](https://search.google.com/test/rich-results)

### Meta tagy
Každá stránka má unikátní:
- `<title>` (max 60 znaků)
- `<meta name="description">` (max 160 znaků)
- OpenGraph tagy pro social sharing

## 🧪 Testování

### Před nasazením
1. **W3C Validator**: Validace HTML
2. **Lighthouse**: Performance, Accessibility, SEO
3. **Mobile Test**: Responzivní design
4. **Form Test**: Kontaktní formulář
5. **Cross-browser**: Chrome, Firefox, Safari, Edge

### Checklist
- [ ] Všechny odkazy fungují
- [ ] Formulář odesílá na správný email
- [ ] Obrázky se načítají správně
- [ ] Mobile navigace funguje
- [ ] Cookie consent funguje
- [ ] Structured data jsou validní
- [ ] 404 stránka je dostupná

## 🔧 Údržba

### Pravidelně
- [ ] Aktualizace datum v cookie/privacy policy
- [ ] Kontrola funkčnosti formuláře
- [ ] Backup souborů
- [ ] Monitoring rychlosti načítání
- [ ] SSL certifikát platnost

### Při problémech
1. **Formulář nefunguje**: Zkontrolujte Formspree nastavení
2. **Slow loading**: Zkomprimujte obrázky
3. **Mobile issues**: Testujte v dev tools
4. **SEO problémy**: Zkontrolujte sitemap, robots.txt

## 📞 Podpora

Pro technické dotazy kontaktujte vývojáře webu:
- **Web:** [TalentGO](https://talentgo.cz)
- **Vytvořeno:** Únor 2026
- **Verze:** 1.0

---

**© 2026 Sanace SF | Všechna práva vyhrazena**