// Configuration de la base de données MySQL
// Fichier: server/config/database.js

const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT || 8889,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'nasri_bdd',
  charset: 'utf8mb4',
  timezone: '+00:00'
};

// Créer une connexion à la base de données
const createConnection = async () => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Connexion à la base de données MySQL réussie');
    return connection;
  } catch (error) {
    console.error(' Erreur de connexion à la base de données:', error.message);
    throw error;
  }
};

// Créer un pool de connexions pour de meilleures performances
const createPool = () => {
  return mysql.createPool({
    ...dbConfig,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
};

module.exports = {
  createConnection,
  createPool,
  dbConfig
};
