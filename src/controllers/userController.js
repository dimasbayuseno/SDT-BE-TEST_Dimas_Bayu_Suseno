const moment = require('moment');
const userModel = require('../models/userModel');

// Create a new user
async function createUser(req, res) {
    try {
        const { firstName, lastName, birthday, location } = req.body;

        const birthdayUTC = moment.utc(birthday, 'YYYY-MM-DD').toDate();

        const result = await userModel.createUser(firstName, lastName, birthdayUTC, location);
        res.status(201).json({ message: 'User created successfully', result });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Update a user
async function updateUser(req, res) {
    try {
        const userId = req.params.id;
        const { firstName, lastName, birthday, location } = req.body;

        const birthdayUTC = moment.utc(birthday, 'YYYY-MM-DD').toDate();

        await userModel.updateUser(userId, firstName, lastName, birthdayUTC, location);

        res.status(204).json({ message: 'User updated successfully', result });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Delete a user
async function deleteUser(req, res) {
    try {
        const userId = req.params.id;

        await userModel.deleteUser(userId);

        res.status(201).json({ message: 'User deleted successfully', result });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
};
