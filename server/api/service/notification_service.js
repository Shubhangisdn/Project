'user strict';
let mongoose = require('mongoose'),
    commonQuery = require('./../lib/commonQuery'),
    NOTIFICATIONS = mongoose.model('Notifications');

module.exports = {
    createNotification: createNotification,
    getNotification: getNotification
}

function createNotification(data) {
    return new Promise((resolve, reject) => {
        try {
            commonQuery.InsertIntoCollection(NOTIFICATIONS, data).then(resp => {
                resolve(resp);
            }).catch(error=> {
                reject(error);
            });   
        } catch (error) {
            reject(error);
        }        
    });
}

function getNotification(data) {
    return new Promise((resolve, reject) => {
        try {
            commonQuery.fetch_all(NOTIFICATIONS, data).then(resp => {
                console.log('response ', resp);
                resolve(resp);
            }).catch(error=> {
                reject(error);
            });   
        } catch (error) {
            reject(error);
        }        
    });
}