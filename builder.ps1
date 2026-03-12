$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
$files = Get-ChildItem -Path . -Filter *.html | Where-Object { $_.Name -ne 'todo.html' }
foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName, $utf8NoBom)
    
    $content = [regex]::Replace($content, '<a href="kontakt\.html" class="([^"]*)btn-lg">Poptat (čištění|impregnaci|vyklízení)</a>', '<a href="https://sanacesf.cz/kontakt" class="$1btn-lg">Poptat $2</a>')
    $content = [regex]::Replace($content, '<a href="kontakt\.html" class="([^"]*)btn-lg">Potřebuji diskrétní pomoc</a>', '<a href="https://sanacesf.cz/kontakt" class="$1btn-lg">Potřebuji diskrétní pomoc</a>')

    if ($file.Name -eq 'kontakt.html') {
        $content = $content.Replace('.hero-split { width:100%; background:#ffffff; overflow: hidden; }', '.hero-split { width:100%; background:#ffffff; overflow: hidden; padding: 0 !important; }')
    }

    if ($file.Name -in @('extremni-vyklizeni-a-cisteni.html', 'impregnace-strech-a-fasad.html')) {
        $content = [regex]::Replace($content, '<div class="hero-image rounded-bg-image"[^>]+>', '<div class="hero-image">')
    }

    $content = [regex]::Replace($content, '(?i)\s*<link[^>]+rel="preconnect"[^>]+googleapis\.com[^>]*>', '')
    $content = [regex]::Replace($content, '(?i)\s*<link[^>]+rel="preconnect"[^>]+gstatic\.com[^>]*>', '')
    $fontLinkStr = '<link rel="preload" as="font" href="/fonts/JTUSjIg1_i6t8kCHKm459Wlhyw.woff2" type="font/woff2" crossorigin>' + "`r`n    " + '<link rel="stylesheet" href="/css/montserrat.css">'
    $content = [regex]::Replace($content, '(?i)<link[^>]+href="https://fonts\.googleapis\.com/css2\?family=Montserrat[^"]+"[^>]*rel="stylesheet">', $fontLinkStr)

    $content = [regex]::Replace($content, '(?i)<script src="(/?)js/main\.js(\?v=[0-9]+)?"></script>', '<script src="$1js/main.js$2" defer></script>')

    [System.IO.File]::WriteAllText($file.FullName, $content, $utf8NoBom)
}
