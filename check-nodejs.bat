@echo off
echo ========================================
echo Checking Node.js Installation
echo ========================================
echo.

echo 1. Checking Node.js version...
node --version
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is NOT installed or NOT in PATH
) else (
    echo [OK] Node.js is installed!
)
echo.

echo 2. Checking npm version...
npm --version
if %errorlevel% neq 0 (
    echo [ERROR] npm is NOT installed or NOT in PATH
) else (
    echo [OK] npm is installed!
)
echo.

echo 3. Checking Node.js installation path...
where node
if %errorlevel% neq 0 (
    echo [ERROR] Cannot find node.exe in PATH
) else (
    echo [OK] Node.js found in PATH
)
echo.

echo 4. Checking npm installation path...
where npm
if %errorlevel% neq 0 (
    echo [ERROR] Cannot find npm in PATH
) else (
    echo [OK] npm found in PATH
)
echo.

echo ========================================
echo Summary:
echo ========================================
echo If you see version numbers above, Node.js is installed correctly.
echo If you see errors, Node.js needs to be installed or added to PATH.
echo.
pause

