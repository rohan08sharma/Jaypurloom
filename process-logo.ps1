Add-Type -AssemblyName System.Drawing

$srcPath = "c:\Users\rohan\OneDrive\Jaypurloom\Brand Logo.jpg"
$outPath1 = "c:\Users\rohan\OneDrive\Jaypurloom\Brand Logo Transparent.png"
$outPath2 = "c:\Users\rohan\OneDrive\Jaypurloom\frontend\public\logo.png"
$outPath3 = "c:\Users\rohan\OneDrive\Jaypurloom\frontend\public\logo-transparent.png"

$src = New-Object System.Drawing.Bitmap($srcPath)
$dst = New-Object System.Drawing.Bitmap($src.Width, $src.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# Background color estimation from top-left area
$Rb = 230.0
$Gb = 229.0
$Bb = 224.0
$Yb = 0.299*$Rb + 0.587*$Gb + 0.114*$Bb # ~228.4
$Yf = 15.0 # Foreground deep navy luminance threshold

Write-Host "Processing $($src.Width)x$($src.Height) pixels..."

for ($x = 0; $x -lt $src.Width; $x++) {
    for ($y = 0; $y -lt $src.Height; $y++) {
        $p = $src.GetPixel($x, $y)
        $lum = 0.299*$p.R + 0.587*$p.G + 0.114*$p.B
        
        # Calculate alpha (0 for background, 1 for dark foreground)
        $alpha = ($Yb - $lum) / ($Yb - $Yf)
        if ($alpha -lt 0) { $alpha = 0 }
        if ($alpha -gt 1) { $alpha = 1 }
        
        # Threshold to remove near-white noise completely
        if ($alpha -lt 0.03) {
            $dst.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        } else {
            # Un-premultiply background to recover exact royal navy blue ink color cleanly
            $rNew = [Math]::Min(255, [Math]::Max(0, [int](($p.R - (1 - $alpha) * $Rb) / $alpha)))
            $gNew = [Math]::Min(255, [Math]::Max(0, [int](($p.G - (1 - $alpha) * $Gb) / $alpha)))
            $bNew = [Math]::Min(255, [Math]::Max(0, [int](($p.B - (1 - $alpha) * $Bb) / $alpha)))
            
            $aByte = [int]($alpha * 255)
            $dst.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($aByte, $rNew, $gNew, $bNew))
        }
    }
}

$dst.Save($outPath1, [System.Drawing.Imaging.ImageFormat]::Png)
$dst.Save($outPath2, [System.Drawing.Imaging.ImageFormat]::Png)
$dst.Save($outPath3, [System.Drawing.Imaging.ImageFormat]::Png)

$src.Dispose()
$dst.Dispose()

Write-Host "Successfully generated transparent logo at $outPath1 and public folder!"
