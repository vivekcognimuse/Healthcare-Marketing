# CogniMuse Analytics Dashboard - Quick Setup

Write-Host "🚀 Setting up Firebase Cloud Functions for CogniMuse Analytics..." -ForegroundColor Cyan
Write-Host ""

# Navigate to functions directory
Set-Location -Path "functions"

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

# Build TypeScript
Write-Host ""
Write-Host "🔨 Building TypeScript..." -ForegroundColor Yellow
npm run build

Write-Host ""
Write-Host "✅ Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Deploy functions: " -NoNewline
Write-Host "npm run deploy" -ForegroundColor White
Write-Host "   OR from root: " -NoNewline
Write-Host "firebase deploy --only functions" -ForegroundColor White
Write-Host ""
Write-Host "2. Test locally: " -NoNewline
Write-Host "npm run serve" -ForegroundColor White
Write-Host ""
Write-Host "3. View logs: " -NoNewline
Write-Host "npm run logs" -ForegroundColor White
Write-Host ""

# Navigate back to root
Set-Location -Path ".."
