const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    multipleStatements: true
});

createTable = async () => {
    const query = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      firstName VARCHAR(255) NOT NULL,
      lastName VARCHAR(255) NOT NULL,
      birthday DATE NOT NULL,
      location VARCHAR(255) NOT NULL,
      scheduled_time DATETIME
    )
  `;

    try {
        const connection = await pool.getConnection();
        await connection.query(query);
        connection.release();
        console.log('Table "users" created successfully.');
    } catch (error) {
        console.error('Error creating table:', error);
    }
}

createLogTable = async () => {
    const query = `
    CREATE TABLE IF NOT EXISTS logs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      timestamp DATETIME,
      user_id INT,
      email_status VARCHAR(255)
    )
  `;

    try {
        const connection = await pool.getConnection();
        await connection.query(query);
        connection.release();
        console.log('Table "logs" created successfully.');
    } catch (error) {
        console.error('Error creating table:', error);
    }
}

getConnection = async () => {
    try {
        const connection = await pool.getConnection();
        return connection;
    } catch (error) {
        console.error('Error getting database connection:', error);
        throw error;
    }
}

module.exports = {
    pool,
    createTable,
    createLogTable,
    getConnection
};
