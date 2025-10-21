// Serveur Node.js avec MAMP
// Fichier: server/mamp-server.js

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3002;

// Configuration MAMP
const dbConfig = {
  host: '127.0.0.1',
  port: 8889,
  user: 'root',
  password: 'root',
  database: 'nasri_bdd',
  charset: 'utf8mb4'
};

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../build')));

// Test de connexion à la base de données
app.get('/api/health', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    await connection.execute('SELECT 1');
    connection.end();
    
    res.json({
      status: 'OK',
      message: 'Serveur et base de données MAMP opérationnels',
      timestamp: new Date().toISOString(),
      database: 'nasri_bdd'
    });
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      message: 'Erreur de connexion à MAMP',
      error: error.message
    });
  }
});

// Créer un rendez-vous
app.post('/api/appointments', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    
    const {
      name,
      email,
      phone,
      service,
      appointment_date,
      appointment_time,
      message
    } = req.body;

    // Vérifier si le créneau est déjà pris
    const [existing] = await connection.execute(
      'SELECT COUNT(*) as count FROM appointments WHERE appointment_date = ? AND appointment_time = ? AND status != "cancelled"',
      [appointment_date, appointment_time]
    );

    if (existing[0].count > 0) {
      connection.end();
      return res.status(409).json({
        error: 'Ce créneau horaire est déjà pris'
      });
    }

    // Insérer le nouveau rendez-vous
    const [result] = await connection.execute(
      `INSERT INTO appointments (
        name, email, phone, service, appointment_date, 
        appointment_time, message, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [name, email, phone, service, appointment_date, appointment_time, message]
    );

    connection.end();

    res.json({
      success: true,
      message: 'Rendez-vous créé avec succès dans MAMP',
      appointment: {
        id: result.insertId,
        name,
        email,
        phone,
        service,
        appointment_date,
        appointment_time,
        message,
        status: 'pending',
        created_at: new Date()
      }
    });

  } catch (error) {
    console.error('Erreur création rendez-vous:', error);
    res.status(500).json({
      error: 'Erreur interne',
      message: error.message
    });
  }
});

// Récupérer les créneaux disponibles
app.get('/api/appointments/available-slots', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const date = req.query.date || new Date().toISOString().split('T')[0];

    // Récupérer tous les créneaux horaires
    const [allSlots] = await connection.execute(
      'SELECT time_slot FROM time_slots WHERE is_available = 1 ORDER BY time_slot'
    );

    // Récupérer les créneaux déjà pris
    const [takenSlots] = await connection.execute(
      'SELECT appointment_time FROM appointments WHERE appointment_date = ? AND status != "cancelled"',
      [date]
    );

    connection.end();

    const takenTimes = takenSlots.map(slot => slot.appointment_time);
    const availableSlots = allSlots
      .map(slot => slot.time_slot)
      .filter(slot => !takenTimes.includes(slot));

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

// Récupérer tous les rendez-vous
app.get('/api/appointments', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    
    const [appointments] = await connection.execute(
      'SELECT * FROM appointments ORDER BY appointment_date DESC, appointment_time DESC'
    );

    connection.end();

    res.json({
      appointments,
      total: appointments.length
    });

  } catch (error) {
    console.error('Erreur récupération rendez-vous:', error);
    res.status(500).json({
      error: 'Erreur interne',
      message: error.message
    });
  }
});

// Initialiser la base de données
app.post('/api/init-database', async (req, res) => {
  try {
    // Connexion sans base de données spécifiée
    const connection = await mysql.createConnection({
      host: '127.0.0.1',
      port: 8889,
      user: 'root',
      password: 'root',
      charset: 'utf8mb4'
    });

    // Créer la base de données
    await connection.execute('CREATE DATABASE IF NOT EXISTS nasri_bdd CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci');
    
    connection.end();

    // Nouvelle connexion avec la base de données
    const dbConnection = await mysql.createConnection(dbConfig);

    // Créer les tables
    await dbConnection.execute(`
      CREATE TABLE IF NOT EXISTS appointments (
        id int(11) NOT NULL AUTO_INCREMENT,
        name varchar(255) NOT NULL,
        email varchar(255) NOT NULL,
        phone varchar(50) DEFAULT NULL,
        service varchar(255) DEFAULT NULL,
        appointment_date date NOT NULL,
        appointment_time time NOT NULL,
        message text DEFAULT NULL,
        status enum('pending','confirmed','cancelled','completed') DEFAULT 'pending',
        created_at timestamp DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        KEY idx_date_time (appointment_date, appointment_time),
        KEY idx_email (email),
        KEY idx_status (status)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    await dbConnection.execute(`
      CREATE TABLE IF NOT EXISTS time_slots (
        id int(11) NOT NULL AUTO_INCREMENT,
        time_slot time NOT NULL,
        is_available tinyint(1) DEFAULT 1,
        max_appointments int(11) DEFAULT 1,
        PRIMARY KEY (id),
        UNIQUE KEY unique_time_slot (time_slot)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Insérer les créneaux horaires
    const timeSlots = [
      '09:00:00', '09:30:00', '10:00:00', '10:30:00', '11:00:00', '11:30:00',
      '14:00:00', '14:30:00', '15:00:00', '15:30:00', '16:00:00', '16:30:00'
    ];

    for (const timeSlot of timeSlots) {
      await dbConnection.execute(
        'INSERT IGNORE INTO time_slots (time_slot, is_available, max_appointments) VALUES (?, 1, 1)',
        [timeSlot]
      );
    }

    dbConnection.end();

    res.json({
      success: true,
      message: 'Base de données MAMP initialisée avec succès'
    });

  } catch (error) {
    console.error('Erreur initialisation:', error);
    res.status(500).json({
      error: 'Erreur interne',
      message: error.message
    });
  }
});

// Route pour récupérer le menu
app.get('/api/menu', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    
    // Récupérer les éléments de menu principaux
    const [menuItems] = await connection.execute(
      'SELECT * FROM menu_items WHERE is_active = 1 ORDER BY sort_order ASC'
    );

    // Pour chaque élément de menu, récupérer ses colonnes
    for (let item of menuItems) {
      const [columns] = await connection.execute(
        'SELECT * FROM menu_columns WHERE menu_item_id = ? ORDER BY sort_order ASC',
        [item.id]
      );

      // Pour chaque colonne, récupérer ses éléments
      for (let column of columns) {
        const [items] = await connection.execute(
          'SELECT * FROM menu_column_items WHERE column_id = ? ORDER BY sort_order ASC',
          [column.id]
        );
        column.items = items;
      }

      item.columns = columns;
    }

    connection.end();

    res.json({ 
      success: true, 
      menu: menuItems,
      total: menuItems.length 
    });
  } catch (error) {
    console.error('Erreur API menu:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Erreur serveur' 
    });
  }
});

// Route pour récupérer une page par slug
app.get('/api/pages/:slug', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    
    const [rows] = await connection.execute(
      'SELECT * FROM pages WHERE slug = ? AND is_published = 1',
      [req.params.slug]
    );

    connection.end();

    if (rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Page non trouvée' 
      });
    }

    res.json({ 
      success: true, 
      page: rows[0] 
    });
  } catch (error) {
    console.error('Erreur API page:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Erreur serveur' 
    });
  }
});

// Route pour sauvegarder une page
app.put('/api/pages/:slug', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    
    const { content, title, meta_description } = req.body;
    const slug = req.params.slug;
    
    await connection.execute(
      'UPDATE pages SET content = ?, title = ?, meta_description = ?, updated_at = CURRENT_TIMESTAMP WHERE slug = ?',
      [content, title, meta_description, slug]
    );

    connection.end();

    res.json({ 
      success: true, 
      message: 'Page sauvegardée avec succès' 
    });
  } catch (error) {
    console.error('Erreur API sauvegarde page:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Erreur serveur' 
    });
  }
});

// Servir React pour toutes les autres routes
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur MAMP démarré sur le port ${PORT}`);
  console.log(`📊 API disponible sur http://localhost:${PORT}/api`);
  console.log(`🌐 Application React sur http://localhost:${PORT}`);
  console.log(`💾 Base de données: nasri_bdd sur MAMP (port 8889)`);
});

module.exports = app;
