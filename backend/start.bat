@echo off
echo 🚀 Iniciando backend - El Día del Indio
echo.

if not exist "data\eventos.json" (
    echo ❌ No se encontró data\eventos.json
    echo 📋 Ejecuta: copy ..\react\src\data\eventos.json .\data\eventos.json
    exit /b 1
)

if not exist "database.sqlite" (
    echo 🗄️  Base de datos no encontrada, ejecutando seed...
    call npm run seed
)

echo 🚀 Iniciando servidor...
call npm start
