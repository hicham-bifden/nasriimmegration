#!/bin/bash

echo "🔍 DIAGNOSTIC DU SITE IMMIGWAY"
echo "=============================="

echo ""
echo "1. Vérification des fichiers essentiels..."

# Vérifier les fichiers principaux
if [ -f "package.json" ]; then
    echo "✅ package.json existe"
else
    echo "❌ package.json manquant"
fi

if [ -f "src/index.js" ]; then
    echo "✅ src/index.js existe"
else
    echo "❌ src/index.js manquant"
fi

if [ -f "src/App.js" ]; then
    echo "✅ src/App.js existe"
else
    echo "❌ src/App.js manquant"
fi

echo ""
echo "2. Vérification des dépendances..."
if [ -d "node_modules" ]; then
    echo "✅ node_modules existe"
else
    echo "❌ node_modules manquant - exécuter: npm install"
fi

echo ""
echo "3. Vérification de la syntaxe JavaScript..."
if node -c src/index.js 2>/dev/null; then
    echo "✅ src/index.js syntaxe OK"
else
    echo "❌ Erreur de syntaxe dans src/index.js"
    node -c src/index.js
fi

if node -c src/App.js 2>/dev/null; then
    echo "✅ src/App.js syntaxe OK"
else
    echo "❌ Erreur de syntaxe dans src/App.js"
    node -c src/App.js
fi

echo ""
echo "4. Vérification des processus..."
REACT_PROCESSES=$(ps aux | grep react-scripts | grep -v grep | wc -l)
echo "Processus React actifs: $REACT_PROCESSES"

if [ $REACT_PROCESSES -gt 0 ]; then
    echo "⚠️  Plusieurs processus React détectés"
    echo "Recommandation: pkill -f react-scripts"
fi

echo ""
echo "5. Test des ports..."
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Port 3000 accessible"
elif curl -s http://localhost:3001 > /dev/null 2>&1; then
    echo "✅ Port 3001 accessible"
elif curl -s http://localhost:3004 > /dev/null 2>&1; then
    echo "✅ Port 3004 accessible"
else
    echo "❌ Aucun port React accessible"
fi

echo ""
echo "6. Vérification des erreurs de compilation..."
echo "Démarrage d'un test de compilation..."

# Test de compilation
timeout 30s npm start > /tmp/react_test.log 2>&1 &
TEST_PID=$!

sleep 10

if grep -q "Failed to compile" /tmp/react_test.log; then
    echo "❌ Erreur de compilation détectée:"
    grep "Failed to compile" -A 5 /tmp/react_test.log
elif grep -q "webpack compiled" /tmp/react_test.log; then
    echo "✅ Compilation réussie"
else
    echo "⚠️  Compilation en cours ou erreur inconnue"
fi

# Nettoyer
kill $TEST_PID 2>/dev/null
rm -f /tmp/react_test.log

echo ""
echo "🎯 RÉSUMÉ DU DIAGNOSTIC"
echo "======================"
echo "Si vous voyez des erreurs ci-dessus, voici les solutions:"
echo ""
echo "1. Si node_modules manque: npm install"
echo "2. Si erreur de syntaxe: vérifier les fichiers JavaScript"
echo "3. Si plusieurs processus: pkill -f react-scripts"
echo "4. Si erreur de compilation: vérifier les imports"
echo ""
echo "🚀 Pour redémarrer proprement:"
echo "pkill -f react-scripts && sleep 3 && npm start"
