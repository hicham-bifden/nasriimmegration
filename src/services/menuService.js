/**
 * Service pour charger le menu depuis l'API
 * Fichier: src/services/menuService.js
 */

const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://your-domain.com/api'
  : 'http://localhost:3002/api';

class MenuService {
  /**
   * Effectuer une requête HTTP
   * @param {string} endpoint - Point de terminaison API
   * @param {Object} options - Options de la requête
   * @returns {Promise<Object>} Réponse de l'API
   */
  static async request(endpoint, options = {}) {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      };

      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur API');
      }

      return data;
    } catch (error) {
      console.error('Erreur API Menu:', error);
      throw error;
    }
  }

  /**
   * Récupérer la structure complète du menu
   * @returns {Promise<Array>} Structure du menu
   */
  static async getMenu() {
    try {
      const response = await this.request('/menu');
      return response.menu;
    } catch (error) {
      console.error('Erreur lors du chargement du menu:', error);
      throw error;
    }
  }
}

export default MenuService;