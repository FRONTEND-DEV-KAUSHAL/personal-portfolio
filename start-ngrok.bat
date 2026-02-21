@echo off
REM ngrok setup and start script for Windows

echo.
echo ═══════════════════════════════════════════════════════════════════
echo          NGROK SETUP - Expose Your Portfolio to the Internet
echo ═══════════════════════════════════════════════════════════════════
echo.

REM Check if ngrok is installed
where ngrok >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ⚠️  ngrok is not installed or not in PATH
    echo.
    echo INSTALLATION STEPS:
    echo ────────────────────────────────────────────────────────────────
    echo 1. Visit: https://ngrok.com/download
    echo 2. Download ngrok for Windows
    echo 3. Extract the ngrok.exe file
    echo 4. Add ngrok to your PATH or move to C:\ngrok\
    echo 5. Run this script again
    echo.
    echo QUICK INSTALLATION:
    echo ────────────────────────────────────────────────────────────────
    echo 1. Download: https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-windows-amd64.zip
    echo 2. Extract to: C:\ngrok\
    echo 3. Add C:\ngrok\ to Windows PATH
    echo 4. Open new PowerShell and run this script
    echo.
    pause
    exit /b 1
)

echo ✅ ngrok found! Starting...
echo.
echo MAKE SURE YOUR LOCAL SETUP IS RUNNING:
echo ────────────────────────────────────────────────────────────────
echo □ Backend running on port 5000 (node server.js)
echo □ nginx running on port 80 (start-nginx.bat as admin)
echo.
echo Press any key to continue...
pause

echo.
echo Starting ngrok tunnel on port 80...
echo.

ngrok http 80

pause
