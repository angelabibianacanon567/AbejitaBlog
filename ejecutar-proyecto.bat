@echo off
echo ========================================
echo EJECUTAR PROYECTO - BLOG PIXEL
echo ========================================
echo.

echo Cambiando a la carpeta del proyecto...
cd /d "%~dp0"

echo.
echo Iniciando servidor de desarrollo...
echo.
echo El proyecto se abrira en: http://localhost:5173
echo.
echo Presiona Ctrl+C para detener el servidor
echo.

npm run dev

pause

