const db = require('../db/db');
const moment = require("moment");
require('moment-timezone');
require('dotenv').config();

// Create a new log
createLog = async (userId, emailStatus) => {
    const connection = await db.getConnection();
    const timeStamp = moment().tz(process.env.TIMEZONE).format('YYYY-MM-DD HH:mm:ss');

    await connection.execute(
        'INSERT INTO logs (timestamp, user_id, email_status) VALUES (?, ?, ?)',
        [timeStamp, userId, emailStatus]
    );
    connection.release();
}

getLog = async () => {
    const connection = await db.getConnection();

    const [rows] = await connection.execute(
        'SELECT * FROM logs ORDER BY timestamp DESC LIMIT 1'
    );
    connection.release();

    return rows.length ? rows[0] : null;
}


module.exports = {
    createLog,
    getLog
};
