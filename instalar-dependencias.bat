@echo off
echo ========================================
echo INSTALACION DE DEPENDENCIAS - BLOG PIXEL
echo ========================================
echo.

echo Verificando Node.js y npm...
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js no encontrado!
    echo.
    echo Por favor:
    echo 1. Instala Node.js desde https://nodejs.org/
    echo 2. Asegurate de marcar "Add to PATH"
    echo 3. Reinicia tu computadora
    echo 4. Vuelve a ejecutar este script
    echo.
    pause
    exit /b 1
)

where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] npm no encontrado!
    echo.
    echo Por favor:
    echo 1. Reinstala Node.js desde https://nodejs.org/
    echo 2. Asegurate de marcar "Install npm package manager"
    echo 3. Reinicia tu computadora
    echo.
    pause
    exit /b 1
)

echo [OK] Node.js y npm encontrados!
echo.
node --version
npm --version
echo.

echo Cambiando a la carpeta del proyecto...
cd /d "%~dp0"
echo Carpeta actual: %CD%
echo.

echo Instalando dependencias...
echo Esto puede tardar 2-3 minutos...
echo.
npm install

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo [EXITO] DEPENDENCIAS INSTALADAS!
    echo ========================================
    echo.
    echo Proximo paso:
    echo 1. Configura Supabase (ve a COMANDOS.md)
    echo 2. Ejecuta: npm run dev
    echo.
) else (
    echo.
    echo ========================================
    echo [ERROR] HUBO UN PROBLEMA
    echo ========================================
    echo.
    echo Revisa los mensajes de error arriba.
    echo.
)

pause


