# Jaypurloom Enterprise E-Commerce Platform One-Click Startup Script (Windows PowerShell)

Write-Host "==========================================================" -ForegroundColor Magenta
Write-Host "👑 Jaypurloom - Premium Women's Ethnic Wear & Home Furnishing" -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Magenta

# Check if Docker is available
$dockerInstalled = Get-Command docker -ErrorAction SilentlyContinue

if ($dockerInstalled) {
    Write-Host "`n[+] Docker detected! Starting entire enterprise platform via Docker Compose..." -ForegroundColor Green
    docker-compose up --build -d
    Write-Host "`n==========================================================" -ForegroundColor Cyan
    Write-Host "✅ Jaypurloom is LIVE!" -ForegroundColor Green
    Write-Host "🌐 Frontend Store:       http://localhost:3000" -ForegroundColor White
    Write-Host "⚙️ Backend API Server:   http://localhost:3001/api/v1" -ForegroundColor White
    Write-Host "📘 Swagger OpenAPI Docs: http://localhost:3001/api/docs" -ForegroundColor White
    Write-Host "==========================================================" -ForegroundColor Cyan
} else {
    Write-Host "`n[!] Docker not found or not in PATH. Please run locally using Node.js:" -ForegroundColor Yellow
    Write-Host "1. Open Terminal 1 (Backend API):" -ForegroundColor Cyan
    Write-Host "   cd backend" -ForegroundColor White
    Write-Host "   npm install" -ForegroundColor White
    Write-Host "   npx prisma db push" -ForegroundColor White
    Write-Host "   npm run seed" -ForegroundColor White
    Write-Host "   npm run start:dev" -ForegroundColor White
    Write-Host "`n2. Open Terminal 2 (Frontend Store):" -ForegroundColor Cyan
    Write-Host "   cd frontend" -ForegroundColor White
    Write-Host "   npm install" -ForegroundColor White
    Write-Host "   npm run dev" -ForegroundColor White
}
