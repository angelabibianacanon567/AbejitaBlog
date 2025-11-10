@echo off
echo ========================================
echo VERIFICACION DE NODE.JS Y NPM
echo ========================================
echo.

echo 1. Verificando Node.js...
where node >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Node.js encontrado!
    node --version
) else (
    echo [ERROR] Node.js NO encontrado en el PATH
    echo.
    echo Verificando instalacion manual...
    if exist "C:\Program Files\nodejs\node.exe" (
        echo [OK] Node.js esta instalado en: C:\Program Files\nodejs\
        echo [INFO] Pero no esta en el PATH. Agrega esta ruta al PATH del sistema.
    ) else (
        echo [ERROR] Node.js NO esta instalado
        echo.
        echo SOLUCION: Instala Node.js desde https://nodejs.org/
        echo Asegurate de marcar "Add to PATH" durante la instalacion.
    )
)

echo.
echo 2. Verificando npm...
where npm >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] npm encontrado!
    npm --version
) else (
    echo [ERROR] npm NO encontrado en el PATH
    if exist "C:\Program Files\nodejs\npm.cmd" (
        echo [OK] npm esta instalado en: C:\Program Files\nodejs\
        echo [INFO] Pero no esta en el PATH. Agrega esta ruta al PATH del sistema.
    ) else (
        echo [ERROR] npm NO esta instalado
    )
)

echo.
echo ========================================
echo VERIFICACION COMPLETA
echo ========================================
echo.
echo Si Node.js y npm estan instalados pero no se reconocen:
echo 1. Cierra esta ventana
echo 2. Reinicia tu computadora
echo 3. Abre una nueva terminal
echo 4. Vuelve a ejecutar: node --version
echo.
pause


