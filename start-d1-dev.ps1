# Windows PowerShell脚本，用于启动D1开发环境
# 使用方法: .\start-d1-dev.ps1

Write-Host "开始启动D1开发环境..."

# 启动Wrangler开发服务器
Write-Host "正在启动Wrangler开发服务器..."
Start-Process -FilePath "npm" -ArgumentList "run db:d1:start" -PassThru

# 等待Wrangler服务器启动
Write-Host "等待Wrangler服务器启动(5秒)..."
Start-Sleep -Seconds 5

# 执行D1数据库迁移
Write-Host "正在执行D1数据库迁移..."
npm run db:d1:execute

# 启动Nuxt开发服务器
Write-Host "正在启动Nuxt开发服务器..."
npm run dev

Write-Host "开发环境启动完成!"