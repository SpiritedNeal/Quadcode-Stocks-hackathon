@echo off
echo Setting NVIDIA API Key...
echo.
set /p API_KEY="Enter your NVIDIA API key: "
set NVIDIA_API_KEY=%API_KEY%
echo.
echo NVIDIA_API_KEY has been set for this session.
echo.
echo To verify, run: echo %NVIDIA_API_KEY%
echo.
echo Note: This will only work in this CMD window.
echo To make it permanent, use Method 2 in the README.
echo.
pause

