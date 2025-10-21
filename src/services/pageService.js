/**
 * Service pour charger les pages depuis l'API
 * Fichier: src/services/pageService.js
 */

const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://your-domain.com/api'
  : 'http://localhost:3002/api';

class PageService {
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
      console.error('Erreur API Page:', error);
      throw error;
    }
  }

  /**
   * Récupérer une page par son slug
   * @param {string} slug - Slug de la page
   * @returns {Promise<Object>} Données de la page
   */
  static async getPageBySlug(slug) {
    try {
      const response = await this.request(`/pages/${slug}`);
      return response.page;
    } catch (error) {
      console.error(`Erreur lors de la récupération de la page ${slug}:`, error);
      throw error;
    }
  }

  /**
   * Sauvegarder une page
   * @param {string} slug - Slug de la page
   * @param {Object} data - Données à sauvegarder
   * @returns {Promise<Object>} Réponse de l'API
   */
  static async savePage(slug, data) {
    try {
      const response = await this.request(`/pages/${slug}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      });
      return response;
    } catch (error) {
      console.error(`Erreur lors de la sauvegarde de la page ${slug}:`, error);
      throw error;
    }
  }
}

export default PageService;
