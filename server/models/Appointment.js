// Modèle pour gérer les rendez-vous
// Fichier: server/models/Appointment.js

const { createPool } = require('../config/database');

class Appointment {
  constructor() {
    this.pool = createPool();
  }

  // Créer un nouveau rendez-vous
  async create(appointmentData) {
    const {
      name,
      email,
      phone,
      service,
      appointment_date,
      appointment_time,
      message
    } = appointmentData;

    try {
      // Vérifier si le créneau est déjà pris
      const existingAppointment = await this.getByDateTime(appointment_date, appointment_time);
      if (existingAppointment) {
        throw new Error('Ce créneau horaire est déjà pris');
      }

      // Insérer le nouveau rendez-vous
      const [result] = await this.pool.execute(
        `INSERT INTO appointments (
          name, email, phone, service, appointment_date, 
          appointment_time, message, status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')`,
        [name, email, phone, service, appointment_date, appointment_time, message]
      );

      return {
        id: result.insertId,
        ...appointmentData,
        status: 'pending',
        created_at: new Date()
      };
    } catch (error) {
      throw error;
    }
  }

  // Récupérer un rendez-vous par date et heure
  async getByDateTime(date, time) {
    try {
      const [rows] = await this.pool.execute(
        'SELECT * FROM appointments WHERE appointment_date = ? AND appointment_time = ? AND status != "cancelled"',
        [date, time]
      );
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  // Récupérer tous les rendez-vous avec pagination
  async getAll(filters = {}, page = 1, limit = 20) {
    try {
      const offset = (page - 1) * limit;
      let whereClause = '';
      let params = [];

      // Construire la clause WHERE
      if (filters.status) {
        whereClause += ' WHERE status = ?';
        params.push(filters.status);
      }

      if (filters.date_from) {
        whereClause += whereClause ? ' AND appointment_date >= ?' : ' WHERE appointment_date >= ?';
        params.push(filters.date_from);
      }

      if (filters.date_to) {
        whereClause += whereClause ? ' AND appointment_date <= ?' : ' WHERE appointment_date <= ?';
        params.push(filters.date_to);
      }

      // Compter le total
      const [countResult] = await this.pool.execute(
        `SELECT COUNT(*) as total FROM appointments${whereClause}`,
        params
      );
      const total = countResult[0].total;

      // Récupérer les rendez-vous
      const [rows] = await this.pool.execute(
        `SELECT * FROM appointments${whereClause} 
         ORDER BY appointment_date DESC, appointment_time DESC 
         LIMIT ? OFFSET ?`,
        [...params, limit, offset]
      );

      return {
        appointments: rows,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      throw error;
    }
  }

  // Récupérer les créneaux disponibles pour une date
  async getAvailableSlots(date) {
    try {
      // Récupérer tous les créneaux horaires
      const [allSlots] = await this.pool.execute(
        'SELECT time_slot FROM time_slots WHERE is_available = 1 ORDER BY time_slot'
      );

      // Récupérer les créneaux déjà pris
      const [takenSlots] = await this.pool.execute(
        'SELECT appointment_time FROM appointments WHERE appointment_date = ? AND status != "cancelled"',
        [date]
      );

      const takenTimes = takenSlots.map(slot => slot.appointment_time);
      const availableSlots = allSlots
        .map(slot => slot.time_slot)
        .filter(slot => !takenTimes.includes(slot));

      return availableSlots;
    } catch (error) {
      throw error;
    }
  }

  // Mettre à jour le statut d'un rendez-vous
  async updateStatus(id, status) {
    try {
      const [result] = await this.pool.execute(
        'UPDATE appointments SET status = ?, updated_at = NOW() WHERE id = ?',
        [status, id]
      );

      if (result.affectedRows === 0) {
        throw new Error('Rendez-vous non trouvé');
      }

      return true;
    } catch (error) {
      throw error;
    }
  }

  // Supprimer un rendez-vous
  async delete(id) {
    try {
      const [result] = await this.pool.execute(
        'DELETE FROM appointments WHERE id = ?',
        [id]
      );

      if (result.affectedRows === 0) {
        throw new Error('Rendez-vous non trouvé');
      }

      return true;
    } catch (error) {
      throw error;
    }
  }

  // Récupérer les statistiques
  async getStatistics() {
    try {
      const [stats] = await this.pool.execute(
        'SELECT status, COUNT(*) as count FROM appointments GROUP BY status'
      );

      const statistics = {};
      stats.forEach(stat => {
        statistics[stat.status] = stat.count;
      });

      return statistics;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Appointment;
