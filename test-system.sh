#!/bin/bash

echo "🧪 TEST COMPLET DU SYSTÈME"
echo "=========================="

echo ""
echo "1. Test de l'API des pages..."
curl -s http://localhost:3002/api/pages/immigration-consulting | jq '.success'

echo ""
echo "2. Test de l'API de sauvegarde..."
curl -X PUT http://localhost:3002/api/pages/immigration-consulting \
  -H "Content-Type: application/json" \
  -d '{"content":"<h2>Test de sauvegarde</h2><p>Ce contenu a été sauvegardé via l'\''API.</p>","title":"Test Title","meta_description":"Test description"}' \
  | jq '.success'

echo ""
echo "3. Test de l'API du menu..."
curl -s http://localhost:3002/api/menu | jq '.success'

echo ""
echo "4. Test des pages React..."
echo "   - Page d'accueil: $(curl -s http://localhost:3025 | grep -o '<title>.*</title>')"
echo "   - Page admin: $(curl -s http://localhost:3025/admin/pages | grep -o '<title>.*</title>')"
echo "   - Page services: $(curl -s http://localhost:3025/services/immigration-consulting | grep -o '<title>.*</title>')"

echo ""
echo "✅ TESTS TERMINÉS !"
echo ""
echo "🌐 URLs à tester dans le navigateur :"
echo "   - Page d'accueil: http://localhost:3025"
echo "   - Page admin: http://localhost:3025/admin/pages"
echo "   - Page services: http://localhost:3025/services/immigration-consulting"
echo "   - Page services 2: http://localhost:3025/services/full-representation"
echo ""
echo "📝 Fonctionnalités à tester :"
echo "   - Menu avec sous-menus au survol"
echo "   - Chargement des pages depuis la base de données"
echo "   - Éditeur WYSIWYG complet dans l'admin"
echo "   - Sauvegarde des modifications"
