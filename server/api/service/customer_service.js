'use strict';

let util = require('util');
let mongoose = require('mongoose'),
    PERMISSION = mongoose.model('Permission'),
    validator = require('../../config/validator.js'),
    commonQuery = require('./../lib/commonQuery'),
    response = require('./../lib/response_handler'),
    utility = require('./../lib/utility'),
    Constant = require('../../config/constant.js'),
    Users = mongoose.model('Users'),
    SocialLogin = mongoose.model('SocialLogin');


module.exports = {
    addCustomer: addCustomer,
    addSocialCustomer: addSocialCustomer,
    checkImageFile: checkImageFile,
    formatDate: formatDate,
    customerSign: customerSign
};

function formatDate() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
}

function addCustomer(object) {
    return new Promise((resolve, reject) => {
        try {
            let condition = {
                email: object.email
            }
            commonQuery.findoneData(Users, condition).then(customerData => {
                if (!customerData) {
                    commonQuery.InsertIntoCollection(Users, object).then(data => {
                        resolve(data);
                    }).catch(error => {
                        reject(error);
                    })
                } else {
                    resolve(customerData);
                }
            });

        } catch (error) {
            reject(error);
        }
    });
}

function addSocialCustomer(object) {
    return new Promise((resolve, reject) => {
        try {
            let condition = {
                email: object.email
            }
            commonQuery.findoneData(SocialLogin, condition).then(customerData => {
                if (!customerData) {
                    commonQuery.InsertIntoCollection(SocialLogin, object).then(data => {
                        resolve(data);
                    }).catch(error => {
                        reject(error);
                    })
                } else {
                    reject('Social Customer already exist!');
                }
            });

        } catch (error) {
            reject(error);
        }
    });
}

function checkImageFile(id) {
    return new Promise((resolve, reject) => {
        try {
            let condition = {
                _id: id
            }
            commonQuery.findoneData(Users, condition).then(customer => {
                if (customer) {
                    console.log(' customer image exist!');
                    resolve(customer);
                } else {
                    console.log('please update new customer image profile!');
                    resolve(false);
                }
            });

        } catch (error) {
            reject(error);
        }
    });
}

function customerSign(sign) {
    console.log("customerSign", sign)
}