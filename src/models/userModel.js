const moment = require('moment');
const db = require('../db/db');
const convert = require('../utils/convertTime');

// Create a new user
createUser = async (firstName, lastName, birthday, location) => {
    const connection = await db.getConnection();
    const scheduledTime = convert.calculateScheduledTime(birthday, location);

    await connection.execute(
        'INSERT INTO users (firstName, lastName, birthday, location, scheduled_time) VALUES (?, ?, ?, ?, ?)',
        [firstName, lastName, birthday, location, scheduledTime]
    );
    connection.release();

}

// Update a user
updateUser = async (userId, firstName, lastName, birthday, location) => {
    const connection = await db.getConnection();
    const scheduledTime = convert.calculateScheduledTime(birthday, location);

    await connection.execute(
        'UPDATE users SET firstName = ?, lastName = ?, birthday = ?, location = ?, scheduled_time = ? WHERE id = ?',
        [firstName, lastName, birthday, location, scheduledTime, userId]
    );
    connection.release();
}

// Delete a user
async function deleteUser(userId) {
    const connection = await db.getConnection();
    await connection.execute('DELETE FROM users WHERE id = ?', [userId]);
    connection.release();
}

getRowsByDateTime = async (dateWithoutYear, hour) => {
    try {
        const connection = await db.getConnection();
        const query = 'SELECT * FROM users WHERE DATE_FORMAT(scheduled_time, "%m-%d %H") = ?';
        const result = await connection.execute(query, [`${dateWithoutYear} ${hour}`]);
        return result[0];
    } catch (error) {
        throw error;
    }
}

async function getUsersBetweenDates(startDate, endDate) {
    try {
        const connection = await db.getConnection();
        const query = 'SELECT * FROM users WHERE scheduled_time >= ? AND scheduled_time <= ?';
        const result = await connection.execute(query, [startDate, endDate]);
        return result[0];
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getRowsByDateTime,
    getUsersBetweenDates,
};
