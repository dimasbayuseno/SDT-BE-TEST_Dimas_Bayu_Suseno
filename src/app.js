const express = require('express');
const { createTable, createLogTable } = require('./db/db');
const userRoutes = require('./routes/userRoutes');
const {runScheduler} = require('./utils/scheduler')
const {getUsersBetweenDates} = require('./models/userModel')
const {sendPendingEmails} = require('./utils/sendEmail')
const moment = require('moment');
require('dotenv').config();
require('moment-timezone');

const app = express();

app.use(express.json());

// User routes
app.use('/user', userRoutes);

const port = process.env.PORT;

// Create the users table if it doesn't exist
createTable();
createLogTable();

// Send email if the server's down


// Run the sendPendingEmails function before starting the scheduler
sendPendingEmails();

// Start the scheduler
runScheduler();

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
