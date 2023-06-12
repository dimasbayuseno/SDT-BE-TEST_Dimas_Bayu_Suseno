const axios = require('axios');
const log = require('../models/logModel')
const moment = require("moment/moment");
const {getUsersBetweenDates} = require("../models/userModel");
const {messageFormat} = require("../utils/messageFormat")
require('dotenv').config();

const SUCCESS = 'sent'
const FAILED = 'failed'

// Send email via the email service API
sendEmail = async (email, message, userId) => {

    try {
        const response = await axios.post('https://email-service.digitalenvision.com.au/send-email', {
            email,
            message,
        });
        await log.createLog(userId, SUCCESS);
        console.log('Email sent:', response.status);
    } catch (error) {
        await log.createLog(userId, FAILED);
        console.error('Error sending email:', error);
    }
}

sendPendingEmails = async () => {
    try {
        const currentDate = moment().tz(process.env.TIMEZONE).format('YYYY-MM-DD HH:mm:ss');
        const startDate = moment().tz(process.env.TIMEZONE).startOf('day').format('YYYY-MM-DD 00:00:00');

        const users = await getUsersBetweenDates(startDate, currentDate);

        for (const user of users) {
            const { id, lastName, firstName } = user;
            let emailFormat = firstName + lastName + '@example.com'
            let message = messageFormat(firstName, lastName)

            sendEmail(emailFormat, message, id)
        }
        if (users.length > 0) {
            console.log('Pending emails sent successfully.');
        } else {
            console.log('No pending emails to send');
        }
    } catch (error) {
        console.error('Error sending pending emails:', error);
    }
}

module.exports = {
    sendEmail,
    sendPendingEmails,
};
