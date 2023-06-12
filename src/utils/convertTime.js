const moment = require('moment');
require('moment-timezone');


calculateScheduledTime = (birthday, location) => {


    const birthdays = moment(birthday).tz(location);
    birthdays.set({ hour: 9, minute: 0, second: 0, millisecond: 0 });

    const indonesiaBirthday = birthdays.clone().tz(process.env.TIMEZONE).format('YYYY-MM-DD HH:mm:ss');

    return indonesiaBirthday;
}

module.exports = {
    calculateScheduledTime,
}