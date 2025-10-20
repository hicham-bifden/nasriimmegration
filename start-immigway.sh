#!/bin/bash

# Script de démarrage automatique pour IMMIGWAY
# Ce script démarre tous les services nécessaires

echo "🚀 DÉMARRAGE AUTOMATIQUE IMMIGWAY"
echo "================================="

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Fonction pour vérifier si un port est utilisé
check_port() {
    local port=$1
    if lsof -i :$port > /dev/null 2>&1; then
        return 0  # Port utilisé
    else
        return 1  # Port libre
    fi
}

# Fonction pour arrêter les processus existants
cleanup() {
    echo "🧹 Nettoyage des processus existants..."
    pkill -f "react-scripts" 2>/dev/null
    pkill -f "node.*server" 2>/dev/null
    sleep 2
}

# Fonction pour démarrer le serveur Node.js
start_backend() {
    echo "🔧 Démarrage du serveur Node.js..."
    
    if check_port 3002; then
        echo -e "${YELLOW}⚠️  Port 3002 déjà utilisé${NC}"
        echo "   Arrêt du processus existant..."
        lsof -ti :3002 | xargs kill -9 2>/dev/null
        sleep 2
    fi
    
    PORT=3002 node server/mamp-server.js &
    BACKEND_PID=$!
    
    # Attendre que le serveur démarre
    sleep 5
    
    # Tester la connexion
    if curl -s http://localhost:3002/api/health > /dev/null; then
        echo -e "${GREEN}✅ Serveur Node.js démarré sur le port 3002${NC}"
        echo "   API: http://localhost:3002/api"
        return 0
    else
        echo -e "${RED}❌ Erreur de démarrage du serveur Node.js${NC}"
        return 1
    fi
}

# Fonction pour démarrer React
start_frontend() {
    echo "⚛️  Démarrage de React..."
    
    # Trouver un port libre pour React
    REACT_PORT=3000
    while check_port $REACT_PORT; do
        REACT_PORT=$((REACT_PORT + 1))
        if [ $REACT_PORT -gt 3010 ]; then
            echo -e "${RED}❌ Aucun port libre trouvé pour React${NC}"
            return 1
        fi
    done
    
    echo "   Port React: $REACT_PORT"
    
    # Démarrer React
    BROWSER=none npm start &
    FRONTEND_PID=$!
    
    # Attendre que React démarre
    echo "   Attente du démarrage de React..."
    sleep 15
    
    # Tester la connexion
    if curl -s http://localhost:$REACT_PORT > /dev/null; then
        echo -e "${GREEN}✅ React démarré sur le port $REACT_PORT${NC}"
        echo "   Frontend: http://localhost:$REACT_PORT"
        return 0
    else
        echo -e "${YELLOW}⚠️  React en cours de démarrage...${NC}"
        echo "   Vérifiez manuellement: http://localhost:$REACT_PORT"
        return 0
    fi
}

# Fonction pour tester le système complet
test_system() {
    echo "🧪 Test du système complet..."
    
    # Test API
    if curl -s http://localhost:3002/api/health > /dev/null; then
        echo -e "${GREEN}✅ API fonctionnelle${NC}"
    else
        echo -e "${RED}❌ API non accessible${NC}"
        return 1
    fi
    
    # Test création de rendez-vous
    test_appointment=$(curl -s -X POST http://localhost:3002/api/appointments \
        -H "Content-Type: application/json" \
        -d '{"name":"Test Auto","email":"test@auto.com","appointment_date":"2025-10-20","appointment_time":"09:00:00"}' 2>/dev/null)
    
    if echo "$test_appointment" | grep -q "success"; then
        echo -e "${GREEN}✅ Système de rendez-vous fonctionnel${NC}"
    else
        echo -e "${RED}❌ Problème avec les rendez-vous${NC}"
    fi
    
    return 0
}

# Fonction pour afficher les URLs
show_urls() {
    echo ""
    echo "🌐 URLs de test:"
    echo "   Frontend: http://localhost:$REACT_PORT"
    echo "   API: http://localhost:3002/api"
    echo "   Santé API: http://localhost:3002/api/health"
    echo "   Rendez-vous: http://localhost:$REACT_PORT/appointment"
    echo "   Calculateur CRS: http://localhost:$REACT_PORT/resources/tools/crs-calculator"
    echo ""
}

# Fonction pour gérer l'arrêt propre
cleanup_on_exit() {
    echo ""
    echo "🛑 Arrêt des services..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "✅ Services arrêtés"
    exit 0
}

# Gérer Ctrl+C
trap cleanup_on_exit INT

# Script principal
main() {
    echo "📋 Vérification des prérequis..."
    
    # Vérifier que nous sommes dans le bon dossier
    if [ ! -f "package.json" ] || [ ! -f "server/mamp-server.js" ]; then
        echo -e "${RED}❌ Erreur: Exécutez ce script depuis le dossier immigway-website${NC}"
        exit 1
    fi
    
    # Vérifier MAMP
    if ! curl -s http://localhost:8889 > /dev/null 2>&1; then
        echo -e "${YELLOW}⚠️  MAMP n'est pas démarré${NC}"
        echo "   Démarrez MAMP avant de continuer"
        echo "   Ou appuyez sur Entrée pour continuer quand même..."
        read -r
    fi
    
    # Nettoyer les processus existants
    cleanup
    
    # Démarrer le backend
    if ! start_backend; then
        echo -e "${RED}❌ Impossible de démarrer le backend${NC}"
        exit 1
    fi
    
    # Démarrer le frontend
    if ! start_frontend; then
        echo -e "${RED}❌ Impossible de démarrer le frontend${NC}"
        kill $BACKEND_PID 2>/dev/null
        exit 1
    fi
    
    # Tester le système
    test_system
    
    # Afficher les URLs
    show_urls
    
    echo -e "${GREEN}🎉 IMMIGWAY est maintenant opérationnel !${NC}"
    echo ""
    echo "📋 Commandes utiles:"
    echo "   Ctrl+C pour arrêter tous les services"
    echo "   ./test-complet.sh pour tester le système"
    echo "   node search-docs.js [mot-clé] pour rechercher dans la doc"
    echo ""
    echo "⏳ Services en cours d'exécution... (Ctrl+C pour arrêter)"
    
    # Attendre indéfiniment
    while true; do
        sleep 10
        # Vérifier que les processus sont toujours actifs
        if ! kill -0 $BACKEND_PID 2>/dev/null; then
            echo -e "${RED}❌ Serveur Node.js arrêté${NC}"
            break
        fi
        if ! kill -0 $FRONTEND_PID 2>/dev/null; then
            echo -e "${RED}❌ React arrêté${NC}"
            break
        fi
    done
}

# Exécuter le script principal
main
