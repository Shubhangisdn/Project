'use strict';

var notification = require('../../config/notification'),
    notificationService = require('../service/notification_service');
module.exports = {
    generateNotification: generateNotification,
    
}

function generateNotification(request_data) {
    async function generate_notification() {
        try{
            await notificationService.createNotification(request_data);
        } catch(err) {
            console.log('notification ', err);
        }
    } generate_notification().then(data=>{});
    
}


