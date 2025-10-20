// Routes pour l'API des rendez-vous
// Fichier: server/routes/appointments.js

const express = require('express');
const Appointment = require('../models/Appointment');
const router = express.Router();

// Middleware pour parser le JSON
router.use(express.json());

// Créer un nouveau rendez-vous
router.post('/', async (req, res) => {
  try {
    const appointment = new Appointment();
    
    // Valider les données
    const { name, email, appointment_date, appointment_time } = req.body;
    
    if (!name || !email || !appointment_date || !appointment_time) {
      return res.status(400).json({
        error: 'Données manquantes',
        message: 'Le nom, email, date et heure sont obligatoires'
      });
    }

    // Vérifier que la date n'est pas dans le passé
    const appointmentDateTime = new Date(`${appointment_date}T${appointment_time}`);
    if (appointmentDateTime < new Date()) {
      return res.status(400).json({
        error: 'Date invalide',
        message: 'La date et l\'heure du rendez-vous ne peuvent pas être dans le passé'
      });
    }

    // Créer le rendez-vous
    const newAppointment = await appointment.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Rendez-vous créé avec succès',
      appointment: newAppointment
    });

  } catch (error) {
    console.error('Erreur création rendez-vous:', error);
    res.status(500).json({
      error: 'Erreur interne',
      message: error.message
    });
  }
});

// Récupérer tous les rendez-vous (avec filtres et pagination)
router.get('/', async (req, res) => {
  try {
    const appointment = new Appointment();
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    
    const filters = {
      status: req.query.status,
      date_from: req.query.date_from,
      date_to: req.query.date_to
    };

    const result = await appointment.getAll(filters, page, limit);
    
    res.json(result);
  } catch (error) {
    console.error('Erreur récupération rendez-vous:', error);
    res.status(500).json({
      error: 'Erreur interne',
      message: error.message
    });
  }
});

// Récupérer les créneaux disponibles pour une date
router.get('/available-slots', async (req, res) => {
  try {
    const appointment = new Appointment();
    const date = req.query.date || new Date().toISOString().split('T')[0];
    
    // Valider le format de date
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({
        error: 'Format de date invalide',
        message: 'Utilisez le format YYYY-MM-DD'
      });
    }

    const availableSlots = await appointment.getAvailableSlots(date);
    
    res.json({
      date,
      available_slots: availableSlots,
      total_available: availableSlots.length
    });
  } catch (error) {
    console.error('Erreur récupération créneaux:', error);
    res.status(500).json({
      error: 'Erreur interne',
      message: error.message
    });
  }
});

// Mettre à jour le statut d'un rendez-vous
router.patch('/:id/status', async (req, res) => {
  try {
    const appointment = new Appointment();
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        error: 'Statut manquant',
        message: 'Le statut est obligatoire'
      });
    }

    const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        error: 'Statut invalide',
        message: 'Statut doit être: pending, confirmed, cancelled, ou completed'
      });
    }

    await appointment.updateStatus(id, status);
    
    res.json({
      success: true,
      message: 'Statut mis à jour avec succès'
    });
  } catch (error) {
    console.error('Erreur mise à jour statut:', error);
    res.status(500).json({
      error: 'Erreur interne',
      message: error.message
    });
  }
});

// Supprimer un rendez-vous
router.delete('/:id', async (req, res) => {
  try {
    const appointment = new Appointment();
    const { id } = req.params;

    await appointment.delete(id);
    
    res.json({
      success: true,
      message: 'Rendez-vous supprimé avec succès'
    });
  } catch (error) {
    console.error('Erreur suppression rendez-vous:', error);
    res.status(500).json({
      error: 'Erreur interne',
      message: error.message
    });
  }
});

// Récupérer les statistiques
router.get('/statistics', async (req, res) => {
  try {
    const appointment = new Appointment();
    const statistics = await appointment.getStatistics();
    
    res.json({
      statistics,
      total: Object.values(statistics).reduce((sum, count) => sum + count, 0)
    });
  } catch (error) {
    console.error('Erreur récupération statistiques:', error);
    res.status(500).json({
      error: 'Erreur interne',
      message: error.message
    });
  }
});

module.exports = router;
