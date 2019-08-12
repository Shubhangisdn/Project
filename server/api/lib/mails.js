'use strict';
let mongoose = require('mongoose'),
    response = require('./../lib/response_handler'),
    emailTemplate = mongoose.model('emailTemplate'),
    validator = require('../../config/validator.js'),
    handlebars = require('handlebars'),
    nodemailer = require('nodemailer'),
    Constant = require('../../config/constant.js'),
    commonQuery = require('./../lib/commonQuery'),
    logger = require('../lib/logger'),
    config = require('../../config/config.js').get(process.env.NODE_ENV || 'staging'),
    utility = require('../lib/utility.js');

module.exports = {
    send: send,
    sendMail: sendMail,
    callGetEmailTemplateById: callGetEmailTemplateById
}

function send(template_code, metadata, email_to) {
    return new Promise(async (resolve, reject) => {

        try {
            if (metadata && template_code) {
                let template;
                template = await callGetEmailTemplateById({
                    template_code: template_code
                }).catch(error => {
                    return reject(Constant.SOMETHING_WENT_WRONG);
                });

                if (!template) return reject('Template' + Constant.NOT_FOUND_MESSAGE);
                let handle_obj = handlebars.compile(template.body);
                template.body = handle_obj(metadata);
                console.log("yahaaaaaaaaaaaa", template.body)

                logger.log('***email_to***', email_to)
                logger.log('*** template.subject***', template.subject)
                logger.log(", template.body", template.body)
                sendMail(email_to, template.subject, template.body)
                    .then((result) => {
                        console.log('result true email sent ')
                        return resolve(result)
                    }).catch(err => {
                        console.log('unable to sent email check above error ', err)
                        return reject(err);
                    })
            } else {
                return reject(Constant.NOT_PROPER_DATA);
            }
        } catch (error) {
            return reject(Constant.NOT_PROPER_DATA);
        }
    })
}

function callGetEmailTemplateById(req) {
    return new Promise((resolve, reject) => {
        try {
            if (req.template_code) {
                let condition = {
                    template_code: req.template_code
                }
                commonQuery.findoneData(emailTemplate, condition).then((result) => {
                    return resolve(result);
                }).catch(err => {
                    reject(Constant.INTERNAL_ERROR)
                })
            } else {
                return reject(Constant.INVALID_EMAIL_CODE);
            }
        } catch (error) {
            return reject(Constant.SOMETHING_WENT_WRONG);
        }
    })
}

function sendMail(to, subject, message, attachments = []) { // attachments is an array
    return new Promise((resolve, reject) => {
        try {
            if (to && subject && message) {
                let smtpTransport = nodemailer.createTransport({
                    service: config.SMTP.service,
                    host: config.SMTP.host,
                    port: config.SMTP.port,
                    secure: config.SMTP.secure,
                    auth: {
                        user: config.SMTP.authUser,
                        pass: config.SMTP.authpass
                    }
                });
                let mailOptions = {
                    to: (to != 'self') ? to : config.SMTP.authUser,
                    from: config.SMTP.authUser,
                    subject: subject,
                    html: message
                };
                if (attachments && attachments.length)
                    mailOptions['attachments'] = attachments;
                smtpTransport.sendMail(mailOptions, (err, res) => {
                    if (err) {
                        return reject(err);
                    } else {
                        return resolve(res)
                    }
                });
            } else {
                return reject(Constant.NOT_PROPER_DATA);
            }
        } catch (error) {
            return reject(Constant.SOMETHING_WENT_WRONG);
        }
    })
}