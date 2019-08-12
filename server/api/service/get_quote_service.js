'use strict';
let mongoose = require('mongoose'),
    commonQuery = require('./../lib/commonQuery'),
    getQuote = mongoose.model('GetQuote'),
    PRODUCT_TYPE_LIST = mongoose.model('ProductTypeList'),
    Constant = require('../../config/constant.js'),
    CHARGES = mongoose.model('charges'),
    logger = require('../lib/logger'),
    validator = require('../../config/validator.js');


module.exports = {
    addQuote: addQuote,
    calculateCharges: calculateCharges,
    getProductTypesById: getProductTypesById
};

function addQuote(object) {
    return new Promise((resolve, reject) => {
        try {
            commonQuery.InsertIntoCollection(getQuote, object).then(data => {
                resolve(data);
            }).catch(error => {
                reject(error);
            })
        } catch (error) {
            reject(error);
        }
    });
}

function getProductTypesById(productId) {
    return new Promise((resolve, reject) => {
        try {
            if (validator.isValid(productId)) {
                let condition = {
                    _id: commonQuery.mongoObjectId(productId)
                }
                let select_attributes = {
                    duty_rate_perc: 1,
                    name: 1
                }
                commonQuery.findoneData(PRODUCT_TYPE_LIST, condition, select_attributes).then(data => {
                    resolve(data);
                }).catch(err => {
                    reject(err);
                })
            } else {
                throw Constant.NOT_PROPER_DATA;
            }
        } catch (error) {
            reject(error);
        }
    })
}

async function calculateCharges(weight, amount, product_type, quantity) {
    let custom_duty = await getProductTypesById(product_type);
    let charges = await getCharges();
    let amount_of_weight = Number(calculatePounds(weight, charges));
    let duty_rate_perc = ((amount * Number(custom_duty.duty_rate_perc)) / 100) * charges.charges_equal_pounds;
    let weight_charges = ((Number(Constant.CHARGES_WEIGHT) + (weight * Number(charges.charges_extra_pounds))) * Number(charges.charges_equal_pounds));
    let admin_charges = ((amount * Number(charges.charges_admin)) / 100) * charges.charges_equal_pounds;
    if (custom_duty.type == 'Hazmat Product') {
        let hazmat = (charges.charges_hazmat * Number(quantity)) * charges.charges_equal_pounds;
        let total_amount = (amount * Number(charges.charges_equal_pounds)) + (Number(weight_charges) + Number(duty_rate_perc) + Number(hazmat) + Number(admin_charges));
        let downPayment = downPaymentAmount(total_amount, charges);
        return Object.assign({}, {
            shiping_charges: Math.round(weight_charges),
            duty_rate_perc: Math.round(duty_rate_perc),
            hazmat: Math.round(hazmat),
            admin_charges: Math.round(admin_charges),
            total_amount: Math.round(total_amount),
            downPayment: Math.round(downPayment)
        });
    } else {

        let total_amount = (amount * Number(charges.charges_equal_pounds)) + (Number(weight_charges) + Number(duty_rate_perc) + Number(admin_charges));
        let downPayment = downPaymentAmount(total_amount, charges);
        return Object.assign({}, {
            shiping_charges: Math.round(weight_charges),
            duty_rate_perc: Math.round(duty_rate_perc),
            admin_charges: Math.round(admin_charges),
            total_amount: Math.round(total_amount),
            downPayment: Math.round(downPayment)
        });
    }
}

function getCharges() {
    return new Promise((resolve, reject) => {
        try {
            commonQuery.fetch_one(CHARGES).then(data => {
                resolve(data);
            }).catch(err => {
                reject(err);
            })

        } catch (error) {
            reject(error);
        }
    })
}

function calculatePounds(pounds, charges) {
    if (pounds && pounds !== null && pounds !== undefined) {
        if (pounds == '1') {
            return charges.charges_one_pounds * charges.charges_equal_pounds
        } else {
            let pounds_chagres = (pounds - 1) * charges.charges_extra_pounds;

            return charges.charges_one_pounds + pounds_chagres * charges.charges_equal_pounds
        }
    }
}

function downPaymentAmount(total_amount, charges) {
    let d_amount = Number(total_amount);
    if (d_amount < 100000) {
        return ((charges.down_payment_lac / 100) * d_amount).toFixed(2);
    } else {
        return ((charges.down_payment / 100) * d_amount).toFixed(2);
    }
}