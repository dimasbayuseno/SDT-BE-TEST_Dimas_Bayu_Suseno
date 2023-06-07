const userModel = require('../models/userModel');
const emailService = require('../utils/sendEmail')
const cron = require('node-cron');
const {messageFormat} = require("./messageFormat");

function runScheduler() {
    cron.schedule('0 * * * *', async () => {
        console.log('Scheduler is running...');

        try {
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1; // Months are zero-based, so add 1
            const currentDateWithoutYear = currentDate.toISOString().slice(5, 10); // Extract month and date in "MM-DD" format
            const currentHour = currentDate.getHours();

            const matchingRows = await userModel.getRowsByDateTime(currentDateWithoutYear, currentHour);

            matchingRows.forEach((row) => {
                let email = row.firstName + row.lastName + '@example.com'
                let message = messageFormat(firstName, lastName)
                emailService.sendEmail(email, message, row.id)
            });
        } catch (error) {
            console.error('Error fetching rows:', error);
        }
    });
}

module.exports = { runScheduler };
