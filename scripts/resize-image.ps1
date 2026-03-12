Param(
    [string]$Input = "obrazky\cisteni\vysokotlake-myty-fasady-vyskova-plosina.jpg",
    [string]$Output = "obrazky\cisteni\vysokotlake-myty-fasady-vyskova-plosina-small.jpg",
    [int]$Width = 1200,
    [int]$Quality = 85
)

# Resize using System.Drawing (Windows PowerShell/.NET Framework)
Add-Type -AssemblyName System.Drawing

if (-not (Test-Path $Input)) {
    Write-Error "Input file not found: $Input"
    exit 1
}

$img = [System.Drawing.Image]::FromFile($Input)
$ratio = $img.Height / $img.Width
$newHeight = [int]([math]::Round($Width * $ratio))
$bmp = New-Object System.Drawing.Bitmap $Width, $newHeight
$gfx = [System.Drawing.Graphics]::FromImage($bmp)
$gfx.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$gfx.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$gfx.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$gfx.DrawImage($img, 0, 0, $Width, $newHeight)

$encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$encParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, $Quality)

$dir = Split-Path $Output -Parent
if ($dir -and -not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir | Out-Null }

$bmp.Save($Output, $encoder, $encParams)

$gfx.Dispose(); $bmp.Dispose(); $img.Dispose()
Write-Host "Saved resized image: $Output (width: $Width px, quality: $Quality)"