'use strict';


var config = require('../../config/config.js').get(process.env.NODE_ENV || 'staging');
let moment = require('moment');

module.exports = {
    hashPassword:hashPassword,
    customizeDate: customizeDate
}

function hashPassword(password) {
    if(password){        
        return  bcrypt.hashSync(req.body.password, salt);
    }
    return '';
}

function customizeDate(checkinout, inoutdate) {
    let search_date_next = moment(inoutdate,'YYYY-MM-DD').add(1, 'days').format('YYYY-MM-DD');
    let checkindate = checkinout.split('T');
    let checkinTime = search_date_next + 'T' + checkindate[1];
    return checkinTime;
}