#!/bin/bash

echo "🚀 Iniciando backend - El Día del Indio"
echo ""

# Verificar si existe el archivo de eventos
if [ ! -f "data/eventos.json" ]; then
    echo "❌ No se encontró data/eventos.json"
    echo "📋 Ejecuta: cp ../react/src/data/eventos.json ./data/eventos.json"
    exit 1
fi

# Verificar si existe la base de datos
if [ ! -f "database.sqlite" ]; then
    echo "🗄️  Base de datos no encontrada, ejecutando seed..."
    npm run seed
fi

echo "🚀 Iniciando servidor..."
npm start
