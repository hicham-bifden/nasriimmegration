// Service pour communiquer avec l'API Node.js
// Fichier: src/services/appointmentService.js

const API_BASE_URL = 'http://localhost:3025/api';

class AppointmentService {
  // Créer un nouveau rendez-vous
  static async createAppointment(appointmentData) {
    try {
      const response = await fetch(`${API_BASE_URL}/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Erreur lors de la création du rendez-vous');
      }

      return result;
    } catch (error) {
      console.error('Erreur création rendez-vous:', error);
      throw error;
    }
  }

  // Récupérer les créneaux disponibles pour une date
  static async getAvailableSlots(date) {
    try {
      const response = await fetch(`${API_BASE_URL}/appointments/available-slots?date=${date}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Erreur lors de la récupération des créneaux');
      }

      return result;
    } catch (error) {
      console.error('Erreur récupération créneaux:', error);
      throw error;
    }
  }

  // Récupérer tous les rendez-vous (pour l'administration)
  static async getAllAppointments(filters = {}, page = 1, limit = 20) {
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...filters
      });

      const response = await fetch(`${API_BASE_URL}/appointments?${queryParams}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Erreur lors de la récupération des rendez-vous');
      }

      return result;
    } catch (error) {
      console.error('Erreur récupération rendez-vous:', error);
      throw error;
    }
  }

  // Mettre à jour le statut d'un rendez-vous
  static async updateAppointmentStatus(id, status) {
    try {
      const response = await fetch(`${API_BASE_URL}/appointments/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Erreur lors de la mise à jour du statut');
      }

      return result;
    } catch (error) {
      console.error('Erreur mise à jour statut:', error);
      throw error;
    }
  }

  // Supprimer un rendez-vous
  static async deleteAppointment(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/appointments/${id}`, {
        method: 'DELETE'
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Erreur lors de la suppression du rendez-vous');
      }

      return result;
    } catch (error) {
      console.error('Erreur suppression rendez-vous:', error);
      throw error;
    }
  }

  // Récupérer les statistiques
  static async getStatistics() {
    try {
      const response = await fetch(`${API_BASE_URL}/appointments/statistics`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Erreur lors de la récupération des statistiques');
      }

      return result;
    } catch (error) {
      console.error('Erreur récupération statistiques:', error);
      throw error;
    }
  }

  // Vérifier la santé du serveur
  static async checkHealth() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Serveur non disponible');
      }

      return result;
    } catch (error) {
      console.error('Erreur vérification santé:', error);
      throw error;
    }
  }

  // Initialiser la base de données
  static async initDatabase() {
    try {
      const response = await fetch(`${API_BASE_URL}/init-database`, {
        method: 'POST'
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Erreur lors de l\'initialisation de la base de données');
      }

      return result;
    } catch (error) {
      console.error('Erreur initialisation base de données:', error);
      throw error;
    }
  }
}

export default AppointmentService;
