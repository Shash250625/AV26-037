@echo off
setlocal enabledelayedexpansion

echo ======================================================
echo           AgriShield AI - Windows Setup
echo ======================================================
echo.

:: Check for Python
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed or not in PATH.
    echo Please install Python 3.10+ and check "Add Python to PATH".
    pause
    exit /b
)

:: Create virtual environment
echo [1/4] Creating Virtual Environment...
python -m venv venv
if %errorlevel% neq 0 (
    echo [ERROR] Failed to create virtual environment.
    pause
    exit /b
)

:: Upgrade pip
echo [2/4] Upgrading Pip...
call .\venv\Scripts\activate
python -m pip install --upgrade pip

:: Install dependencies
echo [3/4] Installing Requirements (this may take a few minutes)...
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install dependencies.
    pause
    exit /b
)

:: Create necessary directories
echo [4/4] Finalizing directory structure...
if not exist "static\uploads" mkdir "static\uploads"
if not exist "static\heatmaps" mkdir "static\heatmaps"
if not exist "model" mkdir "model"

echo.
echo ======================================================
echo           SETUP COMPLETE SUCCESSFULLY
echo ======================================================
echo.
echo To run the application, use 'run_app.bat' or:
echo 1. call venv\Scripts\activate
echo 2. python app.py
echo.
pause
