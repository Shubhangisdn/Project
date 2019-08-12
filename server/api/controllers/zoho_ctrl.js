'use strict';

let mongoose = require('mongoose'),
    // bank_details = require('../models/bankDetails')
    bank_details = mongoose.model('bankDetails'),
    Client = require('node-rest-client').Client,
    client = new Client(),
    validator = require('../../config/validator'),
    Constant = require('../../config/constant'),
    USER = mongoose.model('Users'),
    commonQuery = require('./../lib/commonQuery'),
    config = require('../../config/config').get(process.env.NODE_ENV || 'staging'),
    jwt = require('jsonwebtoken'),
    cities = require('../models/cities'),
    moment = require('moment'),
    utility = require('../lib/utility.js'),
    ZohoBooks = require('zoho-books'),
    // zohoBooks = new ZohoBooks({
    //     authtoken: 'da0499350726ce6603dddd4a8faee448',
    //     host: 'https://books.zoho.com/api/v3',
    //     organization: '653606302',
    // }),
    // args = {
    //     headers: {
    //         "Authorization": "Zoho-authtoken da0499350726ce6603dddd4a8faee448",
    //         "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    //     }
    // },
    mails = require('../lib/mails');

module.exports = {
    getOutstandingBal: getOutstandingBal,
    pricebookItems: pricebookItems,
    updatePriceList: updatePriceList,
    addInventoryAdjustment: addInventoryAdjustment,
    editpagePriceBook: editpagePriceBook,
    getCurrencies: getCurrencies,
    addAddress: addAddress,
    getFilteredData: getFilteredData,
    getInvoiceByIdZoho: getInvoiceByIdZoho,
    getInvoicesFromZoho: getInvoicesFromZoho,
    getInvoiceForEditpage: getInvoiceForEditpage,
    getPaymentsFromZoho: getPaymentsFromZoho,
    getContacts: getContacts,
    filterReportByDateCreditNote: filterReportByDateCreditNote,
    getInvoicesById: getInvoicesById,
    filterReportByDateRefund: filterReportByDateRefund,
    getPaymentsById: getPaymentsById,
    getContactById: getContactById,
    deleteContact: deleteContact,
    editContactZoho: editContactZoho,
    getItemDetails: getItemDetails,
    getEstimates: getEstimates,
    deleteEstimate: deleteEstimate,
    addEstimate: addEstimate,
    updateEstimate: updateEstimate,
    listRefunds: listRefunds,
    inventoryProducts: inventoryProducts,
    getPriceDetails: getPriceDetails,
    listCreditNotes: listCreditNotes,
    listItems: listItems,
    markAsPrimary: markAsPrimary,
    forInvoiceListItems: forInvoiceListItems,
    getPaymentRecordList: getPaymentRecordList,
    getPaymentReportRecordList: getPaymentReportRecordList,
    getContactPersonById: getContactPersonById,
    getInventoryAdjustments: getInventoryAdjustments,
    getInventoryAdjustementDetails: getInventoryAdjustementDetails,
    deleteInventoryAdjustedDetails: deleteInventoryAdjustedDetails,
    getPriceList: getPriceList,
    getRecurringInvoicesFromZoho: getRecurringInvoicesFromZoho,
    getInvoiceWithTemplate: getInvoiceWithTemplate,
    getPayRelatedInfo: getPayRelatedInfo,
    deletePaymentRecord: deletePaymentRecord,
    editPaymentRecieved: editPaymentRecieved,
    getPayById: getPayById,
    editpagePaymentRecieved: editpagePaymentRecieved,
    addRecordPayment: addRecordPayment,
    addInvoicesZoho: addInvoicesZoho,
    deleteZohoItem: deleteZohoItem,
    addItemsGetInfo: addItemsGetInfo,
    getRetainterInvoiceById: getRetainterInvoiceById,
    addItemsZoho: addItemsZoho,
    editItemsZoho: editItemsZoho,
    editContactPerson: editContactPerson,
    addContactPerson: addContactPerson,
    deletePrimaryContact: deletePrimaryContact,
    editAdditionalAddress: editAdditionalAddress,
    deleteAdditionalAddress: deleteAdditionalAddress,
    sendInvoiceFromZoho: sendInvoiceFromZoho,
    getItemById: getItemById,
    getInvoiceTable: getInvoiceTable,
    countZoho: countZoho,
    getEstimateById: getEstimateById,
    getInvcById: getInvcById, //get invoice by id for creating new invoice
    // zohoInvoice: zohoInvoice,
    editCustomerPayment: editCustomerPayment,
    getAddressById: getAddressById,
    editpageEstimate: editpageEstimate,
    disablePyamentReminders: disablePyamentReminders,
    listContactRefunds: listContactRefunds,
    enablePyamentReminders: enablePyamentReminders,
    getSubAddressById: getSubAddressById,
    addBillingAddress: addBillingAddress,
    updateBillingAddress: updateBillingAddress,
    getCountries: getCountries,
    getRefundById: getRefundById,
    deleteZohoInvoice: deleteZohoInvoice,
    filterReportByDate: filterReportByDate
}

function pricebookItems(req, res) {
    let id = req.swagger.params.id.value
    let type = req.swagger.params.type.value
    // console.log('reqq', id, '            ', type)

    var org_id = req.user.zoho_org_id; //org id will be different
    let url = config.ZOHO.url + `pricebooks/items?per_page=500&sales_or_purchase_type=` + type + `&pricebook_id=` + id + `&organization_id=` + org_id
    var arg = {
        headers: {
            "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    }
    client.get(url, arg, (data) => {

        // console.log('url.............===============', url)
        // console.log('data.............===============', data)

        if (data) {
            return res.json({
                code: Constant.SUCCESS_CODE,
                message: Constant.SUCCESS_GET_DATA,
                data: data.items || [],
                // total: data.page_context.page
            });
        } else {
            return res.json({
                code: Constant.REQ_DATA_ERROR_CODE,
                message: Constant.SOMETHING_WENT_WRONG
            });
        }
    })
}

function updatePriceList(req, res) {
    console.log('reqqqqqqq', req.body)

    var org_id = req.user.zoho_org_id; //org id will be different
    var auth_token = req.user.zoho_auth;
    var zohoBooks = new ZohoBooks({
        authtoken: auth_token,
        host: 'https://books.zoho.com/api/v3',
        organization: org_id,
    })
    // let request = req.body
    let pricebook_array = []
    let pricebook_item = [];
    pricebook_item = req.body.custom_rate
    for (let i = 0; i < pricebook_item.length; i++) {
        let obj = {
            "item_id": pricebook_item[i].item_id || '',
            "pricebook_rate": pricebook_item[i].rate || '',
            "pricebook_item_id": pricebook_item[i].rate || '',
        }
        pricebook_array.push(obj)
    }

    // const momentDate = new Date(req.body.due_date); // Replace event.value with your date value
    // const formated_due_date = moment(momentDate).format("YYYY-MM-DD");
    // // console.log('-----formated_due_date-------------------', formated_due_date);
    // const momentDateEstimate = new Date(req.body.estimate_date); // Replace event.value with your date value
    // const formated_estimate_date = moment(momentDateEstimate).format("YYYY-MM-DD");
    // console.log('-----formated_estimate_date -------------------', formated_estimate_date);

    // req.body.line_items.forEach(element => {
    //     item_order: element,
    //         item_id: element.item_id,
    //         "rate": element.rate,
    //         "name": element.item_name,
    //         "description": "",
    //         "quantity": element.quantity,
    //         "discount": "0%",
    //         "tax_id": element.tax,
    //         "tags": [],
    //         "unit": element.unit,
    //         "item_custom_fields": []
    // });

    let tes = {
        "name": "Mailbox adjusted rate",
        "description": "",
        "currency_id": "952424000000061026",
        "pricebook_type": "per_item",
        "is_increase": false,
        "percentage": "",
        "rounding_type": "no_rounding",
        "pricebook_items": [{
            "item_id": "952424000000149547",
            "pricebook_rate": 608,
            "pricebook_item_id": "952424000000155007"
        }, {
            "item_id": "952424000000149539",
            "pricebook_rate": 608,
            "pricebook_item_id": "952424000000180998"
        }, {
            "item_id": "952424000000149449",
            "pricebook_rate": 412,
            "pricebook_item_id": "952424000000180996"
        }],
        "sales_or_purchase_type": "sales"
    }

    let reqObj = {
        "name": (typeof req.body.name != 'undefined') ? req.body.name : '',
        "description": (typeof req.body.description != 'undefined') ? req.body.description : '',
        "currency_id": (typeof req.body.currency != 'undefined') ? req.body.currency : '', //need in this format req.body.date
        "pricebook_type": (typeof req.body.rate_radiobtn != 'undefined') ? req.body.rate_radiobtn : '', //need in this format req.body.date
        "is_increase": (typeof req.body.is_increase != 'undefined') ? req.body.is_increase : '',
        "percentage": (typeof req.body.percentage != 'undefined') ? req.body.percentage : '',
        "rounding_type": (typeof req.body.round_off != 'undefined') ? req.body.round_off : '',
        "pricebook_items": (typeof pricebook_array != 'undefined') ? pricebook_array : [],
    }
    console.log('req objjjjjjjjjjjj', reqObj)
    // return
    let estimate_id = req.swagger.params.id.value
    let url = `/estimates/` + estimate_id
    zohoBooks.api(url, 'PUT', reqObj).then(function (data) {
        console.log(data)
        return res.json({
            code: Constant.SUCCESS_CODE,
            message: Constant.SUCCESS,
            data: data || {},
        });

    }).catch(function (error) {
        console.log('=error ========', error)
        return res.json({
            code: Constant.REQ_DATA_ERROR_CODE,
            message: Constant.SOMETHING_WENT_WRONG
        });
    })
}

function getCurrencies(req, res) {
    var org_id = req.user.zoho_org_id; //org id will be different
    let url = config.ZOHO.url + `settings/currencies?organization_id=` + org_id
    var arg = {
        headers: {
            "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    }
    client.get(url, arg, (data) => {

        // console.log('url.............===============', url)
        // console.log('data.............===============', data)

        if (data) {
            return res.json({
                code: Constant.SUCCESS_CODE,
                message: Constant.SUCCESS_GET_DATA,
                data: data.currencies || [],
                // total: data.page_context.page
            });
        } else {
            return res.json({
                code: Constant.REQ_DATA_ERROR_CODE,
                message: Constant.SOMETHING_WENT_WRONG
            });
        }
    })
}

function inventoryProducts(req, res) {
    console.log('bsdjbfshdf')
    var arg = {
        headers: {
            "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    }
    var org_id = req.user.zoho_org_id;
    // var search_string = req.body.search_string
    // var url = config.ZOHO.url + `autocomplete/product?search_text=&item_type=sales&organization_id=` + org_id;
    var url = config.ZOHO.url + `autocomplete/product?search_text=&item_type=inventory&organization_id=` + org_id;

    client.get(url, arg, (data) => {
        // console.log('resss', data)
        // let payment = data.results

        if (data) {
            return res.json({
                code: Constant.SUCCESS_CODE,
                message: Constant.SUCCESS_GET_DATA,
                data: data.results || [],
                // total: data.page_context.page
            });
        } else {
            return res.json({
                code: Constant.REQ_DATA_ERROR_CODE,
                message: Constant.SOMETHING_WENT_WRONG
            });
        }
    })
}

function editpagePriceBook(req, res) {
    let id = req.swagger.params.id.value
    var org_id = req.user.zoho_org_id; //org id will be different
    let url = config.ZOHO.url + `pricebooks/editpage?pricebook_id=` + id + `&organization_id=` + org_id
    var arg = {
        headers: {
            "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    }
    client.get(url, arg, (data) => {

        // console.log('url.............===============', url)
        // console.log('data.............===============', data)

        if (data) {
            return res.json({
                code: Constant.SUCCESS_CODE,
                message: Constant.SUCCESS_GET_DATA,
                data: data.pricebook || [],
                // total: data.page_context.page
            });
        } else {
            return res.json({
                code: Constant.REQ_DATA_ERROR_CODE,
                message: Constant.SOMETHING_WENT_WRONG
            });
        }
    })
}

function getInvoiceByIdZoho(req, res) {
    let id = req.swagger.params.id.value
    var org_id = req.user.zoho_org_id; //org id will be different
    let url = config.ZOHO.url + `contacts/editpage?contact_id=` + id + `&clone_contact_id=&organization_id=` + org_id
    var arg = {
        headers: {
            "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    }
    client.get(url, arg, (data) => {

        // console.log('url.............===============', url)
        // console.log('data.............===============', data)

        if (data) {
            return res.json({
                code: Constant.SUCCESS_CODE,
                message: Constant.SUCCESS_GET_DATA,
                data: data.contact || [],
                // total: data.page_context.page
            });
        } else {
            return res.json({
                code: Constant.REQ_DATA_ERROR_CODE,
                message: Constant.SOMETHING_WENT_WRONG
            });
        }
    })
}

function listContactRefunds(req, res) {
    var arg = {
        headers: {
            "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    }
    var org_id = req.user.zoho_org_id; //org id will be different
    let customer_payment_id = req.swagger.params.id.value
    console.log("eeeeeeee", customer_payment_id)
    // https://books.zoho.com/api/v3/customerpayments/{customer_payment_id}/refunds?organization_id=10234695
    // https://books.zoho.com/api/v3/contacts/{:contact_id}/refunds?organization_id=10234695
    let url = ''
    url = config.ZOHO.url + `contacts/` + customer_payment_id + `/refunds?organization_id=` + org_id
    // url = config.ZOHO.url + `customerpayments/` + customer_payment_id + `/refunds?organization_id=` + org_id
    client.get(url, arg, (data) => {

        console.log('url.............===============', url)
        console.log('data.............===============', data)

        if (data) {
            return res.json({
                code: Constant.SUCCESS_CODE,
                message: Constant.SUCCESS_GET_DATA,
                data: data.creditnote_refunds || [],
                // total: data.page_context.page
            });
        } else {
            return res.json({
                code: Constant.REQ_DATA_ERROR_CODE,
                message: Constant.SOMETHING_WENT_WRONG
            });
        }
        // })
    })
}

function editpageEstimate(req, res) {
    var arg = {
        headers: {
            "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    }
    //https://books.zoho.com/api/v3/estimates/editpage?contact_id=&clone_id=&document_ids=&mail_id=&email_account_type=&email_account_id=&email_folder_id=&project_id=&organization_id=653606302
    var org_id = req.user.zoho_org_id;
    var url = ``;
    url = config.ZOHO.url + `estimates/editpage?contact_id=&clone_id=&document_ids=&mail_id=&email_account_type=&email_account_id=&email_folder_id=&project_id=` + `&organization_id=` + org_id;

    client.get(url, arg, (data) => {
        // console.log('=data.............===============', data)
        if (data) {
            return res.json({
                code: Constant.SUCCESS_CODE,
                message: Constant.SUCCESS_GET_DATA,
                data: data.estimate_settings || {},
            });
        } else {
            return res.json({
                code: Constant.REQ_DATA_ERROR_CODE,
                message: Constant.SOMETHING_WENT_WRONG
            });
        }
        // })
    })
}

function getEstimateById(req, res) {
    var arg = {
        headers: {
            "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    }
    let estimate_id = req.swagger.params.id.value
    //required url for developer
    //https://books.zoho.com/api/v3/estimates/editpage?estimate_id=952424000004803462&contact_id=&clone_id=&document_ids=&mail_id=&email_account_type=&email_account_id=&email_folder_id=&project_id=&organization_id=653606302
    // https://books.zoho.com/api/v3/estimates/{:estimate_id}?organization_id=10234695
    var org_id = req.user.zoho_org_id;
    var url = ``;
    // url = config.ZOHO.url + `estimates/` + estimate_id + `?organization_id=` + org_id;
    url = config.ZOHO.url + `estimates/editpage?estimate_id=` + estimate_id + `&contact_id=&clone_id=&document_ids=&mail_id=&email_account_type=&email_account_id=&email_folder_id=&project_id=&organization_id=` + org_id;


    client.get(url, arg, (data) => {
        // console.log('=dataaa.............===============', data)
        if (data) {
            return res.json({
                code: Constant.SUCCESS_CODE,
                message: Constant.SUCCESS_GET_DATA,
                data: data.estimate || {},
            });
        } else {
            return res.json({
                code: Constant.REQ_DATA_ERROR_CODE,
                message: Constant.SOMETHING_WENT_WRONG
            });
        }
        // })
    })
}

function getEstimates(req, res) {
    var arg = {
        headers: {
            "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    }
    //required url for developer
    // https://books.zoho.com/api/v3/estimates?organization_id=10234695
    var org_id = req.user.zoho_org_id;
    var url = ``;
    url = config.ZOHO.url + `estimates` + `?organization_id=` + org_id;

    client.get(url, arg, (data) => {
        // console.log('=page.............===============', data)
        if (data) {
            return res.json({
                code: Constant.SUCCESS_CODE,
                message: Constant.SUCCESS_GET_DATA,
                data: data.estimates || {},
                total: data.page_context.page
            });
        } else {
            return res.json({
                code: Constant.REQ_DATA_ERROR_CODE,
                message: Constant.SOMETHING_WENT_WRONG
            });
        }
        // })
    })
}

function deleteEstimate(req, res) {
    var arg = {
        headers: {
            "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    }
    let estimate_id = req.swagger.params.id.value
    var org_id = req.user.zoho_org_id; //org id will be different
    let url = ''
    //https://books.zoho.com/api/v3/estimates/{:estimate_id}?organization_id=10234695
    url = config.ZOHO.url + `estimates/` + estimate_id + `?organization_id=` + org_id;
    client.delete(url, arg, (data) => {
        if (data) {
            return res.json({
                code: Constant.SUCCESS_CODE,
                message: Constant.DELETE_SUCCESS,

            });
        } else {
            return res.json({
                code: Constant.REQ_DATA_ERROR_CODE,
                message: Constant.SOMETHING_WENT_WRONG
            });
        }
    })
}

function updateEstimate(req, res) {
    // console.log('reqqqqqqq', req.body)

    var org_id = req.user.zoho_org_id; //org id will be different
    var auth_token = req.user.zoho_auth;
    var zohoBooks = new ZohoBooks({
        authtoken: auth_token,
        host: 'https://books.zoho.com/api/v3',
        organization: org_id,
    })
    // let request = req.body
    let line_item_arr = []
    let contact_persons = []
    let line_items = req.body.line_items
    for (let i = 0; i < line_items.length; i++) {
        let obj = {
            "item_order": i,
            "item_id": line_items[i].item_id || '',
            "rate": line_items[i].rate || '',
            "name": line_items[i].item_name || '',
            "description": '',
            "quantity": line_items[i].quantity || '',
            "discount": req.body.discount || '',
            "tax_id": line_items[i].tax || '',
            "tags": [],
            "unit": line_items[i].quantity || '',
            "item_custom_fields": []
        }
        line_item_arr.push(obj)
    }

    req.body.contactPerson.forEach(element => {
        contact_persons.push(element)
    });
    const momentDate = new Date(req.body.due_date); // Replace event.value with your date value
    const formated_due_date = moment(momentDate).format("YYYY-MM-DD");
    // console.log('-----formated_due_date-------------------', formated_due_date);
    const momentDateEstimate = new Date(req.body.estimate_date); // Replace event.value with your date value
    const formated_estimate_date = moment(momentDateEstimate).format("YYYY-MM-DD");
    // console.log('-----formated_estimate_date -------------------', formated_estimate_date);

    // req.body.line_items.forEach(element => {
    //     item_order: element,
    //         item_id: element.item_id,
    //         "rate": element.rate,
    //         "name": element.item_name,
    //         "description": "",
    //         "quantity": element.quantity,
    //         "discount": "0%",
    //         "tax_id": element.tax,
    //         "tags": [],
    //         "unit": element.unit,
    //         "item_custom_fields": []
    // });
    let reqObj = {
        "contact_persons": contact_persons, //array of contact persons
        "customer_id": (typeof req.body.customer_id != 'undefined') ? req.body.customer_id : '',
        "date": (typeof formated_estimate_date != 'undefined') ? formated_estimate_date : '', //need in this format req.body.date
        "expiry_date": (typeof formated_due_date != 'undefined') ? formated_due_date : '', //need in this format req.body.date
        "notes": "We look forward to providing you with our service!",
        "terms": "Please note that this estimate is valid for 30 days or until the price of your items from your sellers change (whichever is soonest). If you'd like to proceed with this order, please note the following:\na) If your order is less than $100,000 a 50% downpayment is required.\nb) If  your order is $100,000 or more, then a 75% downpayment is required.",
        "line_items": line_item_arr,
        "custom_fields": [],
        "is_inclusive_tax": false,
        "is_discount_before_tax": true,
        "discount": (typeof req.body.discount_value != 'undefined') ? req.body.discount_value : 0,
        "discount_type": "entity_level",
        "shipping_charge": (typeof req.body.shipping_charges != 'undefined') ? req.body.shipping_charges : 0,
        "adjustment": (typeof req.body.adjustment_charges != 'undefined') ? req.body.adjustment_charges : 0,
        "adjustment_description": (typeof req.body.adjustment != 'undefined') ? req.body.adjustment : '',
        "zcrm_potential_id": "",
        // "zcrm_potential_name": "",
        "pricebook_id": "",
        "template_id": (typeof req.body.template_id != 'undefined') ? req.body.template_id : '',
        "accept_retainer": (req.body.retainer_checkbox != false) ? true : false,
        "retainer_percentage": (typeof req.body.percentage_collect != 'undefined') ? req.body.percentage_collect : '',
        "payment_options": {
            "payment_gateways": [{
                "gateway_name": (typeof req.body.paypalCheckbox[0] != 'undefined') ? req.body.paypalCheckbox[0] : '',
                "additional_field1": (typeof req.body.myRadio != 'undefined') ? req.body.myRadio : ''
            }]
        },
        "documents": [],
        "mail_attachments": [],
        "billing_address_id": (typeof req.body.billing_address_id != 'undefined') ? req.body.billing_address_id : '',
        "shipping_address_id": (typeof req.body.shipping_address_id != 'undefined') ? req.body.shipping_address_id : '',
        "project_id": ""
    }
    // console.log('req objjjjjjjjjjjj', reqObj)
    // return
    let estimate_id = req.swagger.params.id.value
    let url = `/estimates/` + estimate_id
    zohoBooks.api(url, 'PUT', reqObj).then(function (data) {
        console.log(data)
        return res.json({
            code: Constant.SUCCESS_CODE,
            message: Constant.SUCCESS,
            data: data.estimate || {},
        });

    }).catch(function (error) {
        console.log('=error ========', error)
        return res.json({
            code: Constant.REQ_DATA_ERROR_CODE,
            message: Constant.SOMETHING_WENT_WRONG
        });
    })
}

function addInventoryAdjustment() {
    // console.log(req.user)

    console.log('reqqqqqqq', req.body)
    var org_id = req.user.zoho_org_id; //org id will be different
    var auth_token = req.user.zoho_auth;
    var zohoBooks = new ZohoBooks({
        authtoken: auth_token,
        host: 'https://books.zoho.com/api/v3',
        organization: org_id,
    })
    return
    // let request = req.body
    // let line_item_arr = []
    // let contact_persons = []
    // let line_items = req.body.line_items
    // for (let i = 0; i < line_items.length; i++) {
    //     let obj = {
    //         "item_order": i,
    //         "item_id": line_items[i].item_id || '',
    //         "rate": line_items[i].rate || '',
    //         "name": line_items[i].item_name || '',
    //         "description": '',
    //         "quantity": line_items[i].quantity || '',
    //         "discount": req.body.discount || '',
    //         "tax_id": line_items[i].tax || '',
    //         "tags": [],
    //         "unit": line_items[i].quantity || '',
    //         "item_custom_fields": []
    //     }
    //     line_item_arr.push(obj)
    // }

    // req.body.contactPerson.forEach(element => {
    //     contact_persons.push(element)
    // });
    const momentDate = new Date(req.body.date); // Replace event.value with your date value
    const formated_due_date = moment(momentDate).format("YYYY-MM-DD");
    // console.log('-----formated_due_date-------------------', formated_due_date);
    const momentDateEstimate = new Date(req.body.estimate_date); // Replace event.value with your date value
    const formated_estimate_date = moment(momentDateEstimate).format("YYYY-MM-DD");

    let reqObj = {
        "contact_persons": contact_persons, //array of contact persons
        "customer_id": (typeof req.body.customer_id != 'undefined') ? req.body.customer_id : '',
        "date": (typeof formated_estimate_date != 'undefined') ? formated_estimate_date : '', //need in this format req.body.date
        "expiry_date": (typeof formated_due_date != 'undefined') ? formated_due_date : '', //need in this format req.body.date
        "notes": "We look forward to providing you with our service!",
        "terms": "Please note that this estimate is valid for 30 days or until the price of your items from your sellers change (whichever is soonest). If you'd like to proceed with this order, please note the following:\na) If your order is less than $100,000 a 50% downpayment is required.\nb) If  your order is $100,000 or more, then a 75% downpayment is required.",
        "line_items": line_item_arr,
        "custom_fields": [],
        "is_inclusive_tax": false,
        "is_discount_before_tax": true,
        "discount_type": "entity_level",
        "shipping_charge": (typeof req.body.shipping_charges != 'undefined') ? req.body.shipping_charges : 0,
        "adjustment": (typeof req.body.adjustment_charges != 'undefined') ? req.body.adjustment_charges : 0,
        "adjustment_description": (typeof req.body.adjustment != 'undefined') ? req.body.adjustment : '',
        "zcrm_potential_id": "",
        // "zcrm_potential_name": "",
        "pricebook_id": "",
        "template_id": (typeof req.body.template_id != 'undefined') ? req.body.template_id : '',
        "accept_retainer": (req.body.retainer_checkbox != false) ? true : false,
        "retainer_percentage": (typeof req.body.percentage_collect != 'undefined') ? req.body.percentage_collect : '',
        "payment_options": {
            "payment_gateways": [{
                "gateway_name": (typeof req.body.paypalCheckbox[0] != 'undefined') ? req.body.paypalCheckbox[0] : '',
                "additional_field1": (typeof req.body.myRadio != 'undefined') ? req.body.myRadio : ''
            }]
        },
        "documents": [],
        "mail_attachments": [],
        "billing_address_id": (typeof req.body.billing_address_id != 'undefined') ? req.body.billing_address_id : '',
        "shipping_address_id": (typeof req.body.shipping_address_id != 'undefined') ? req.body.shipping_address_id : '',
        "project_id": ""
    }

    zohoBooks.api('/estimates', 'POST', reqObj).then(function (data) {
        console.log(data)
        return res.json({
            code: Constant.SUCCESS_CODE,
            message: Constant.SUCCESS,
            data: data.estimate || {},
        });

    }).catch(function (error) {
        console.log('=error ========', error)
        return res.json({
            code: Constant.REQ_DATA_ERROR_CODE,
            message: Constant.SOMETHING_WENT_WRONG
        });
    })
}

function addEstimate(req, res) {
    // console.log(req.user)

    // console.log('reqqqqqqq', req.body)
    var org_id = req.user.zoho_org_id; //org id will be different
    var auth_token = req.user.zoho_auth;
    var zohoBooks = new ZohoBooks({
        authtoken: auth_token,
        host: 'https://books.zoho.com/api/v3',
        organization: org_id,
    })
    // let request = req.body
    let line_item_arr = []
    let contact_persons = []
    let line_items = req.body.line_items
    for (let i = 0; i < line_items.length; i++) {
        let obj = {
            "item_order": i,
            "item_id": line_items[i].item_id || '',
            "rate": line_items[i].rate || '',
            "name": line_items[i].item_name || '',
            "description": '',
            "quantity": line_items[i].quantity || '',
            "discount": req.body.discount || '',
            "tax_id": line_items[i].tax || '',
            "tags": [],
            "unit": line_items[i].quantity || '',
            "item_custom_fields": []
        }
        line_item_arr.push(obj)
    }

    req.body.contactPerson.forEach(element => {
        contact_persons.push(element)
    });
    const momentDate = new Date(req.body.due_date); // Replace event.value with your date value
    const formated_due_date = moment(momentDate).format("YYYY-MM-DD");
    // console.log('-----formated_due_date-------------------', formated_due_date);
    const momentDateEstimate = new Date(req.body.estimate_date); // Replace event.value with your date value
    const formated_estimate_date = moment(momentDateEstimate).format("YYYY-MM-DD");
    // console.log('-----formated_estimate_date -------------------', formated_estimate_date);

    // req.body.line_items.forEach(element => {
    //     item_order: element,
    //         item_id: element.item_id,
    //         "rate": element.rate,
    //         "name": element.item_name,
    //         "description": "",
    //         "quantity": element.quantity,
    //         "discount": "0%",
    //         "tax_id": element.tax,
    //         "tags": [],
    //         "unit": element.unit,
    //         "item_custom_fields": []
    // });
    let reqObj = {
        "contact_persons": contact_persons, //array of contact persons
        "customer_id": (typeof req.body.customer_id != 'undefined') ? req.body.customer_id : '',
        "date": (typeof formated_estimate_date != 'undefined') ? formated_estimate_date : '', //need in this format req.body.date
        "expiry_date": (typeof formated_due_date != 'undefined') ? formated_due_date : '', //need in this format req.body.date
        "notes": "We look forward to providing you with our service!",
        "terms": "Please note that this estimate is valid for 30 days or until the price of your items from your sellers change (whichever is soonest). If you'd like to proceed with this order, please note the following:\na) If your order is less than $100,000 a 50% downpayment is required.\nb) If  your order is $100,000 or more, then a 75% downpayment is required.",
        "line_items": line_item_arr,
        "custom_fields": [],
        "is_inclusive_tax": false,
        "is_discount_before_tax": true,
        "discount_type": "entity_level",
        "shipping_charge": (typeof req.body.shipping_charges != 'undefined') ? req.body.shipping_charges : 0,
        "adjustment": (typeof req.body.adjustment_charges != 'undefined') ? req.body.adjustment_charges : 0,
        "adjustment_description": (typeof req.body.adjustment != 'undefined') ? req.body.adjustment : '',
        "zcrm_potential_id": "",
        // "zcrm_potential_name": "",
        "pricebook_id": "",
        "template_id": (typeof req.body.template_id != 'undefined') ? req.body.template_id : '',
        "accept_retainer": (req.body.retainer_checkbox != false) ? true : false,
        "retainer_percentage": (typeof req.body.percentage_collect != 'undefined') ? req.body.percentage_collect : '',
        "payment_options": {
            "payment_gateways": [{
                "gateway_name": (typeof req.body.paypalCheckbox[0] != 'undefined') ? req.body.paypalCheckbox[0] : '',
                "additional_field1": (typeof req.body.myRadio != 'undefined') ? req.body.myRadio : ''
            }]
        },
        "documents": [],
        "mail_attachments": [],
        "billing_address_id": (typeof req.body.billing_address_id != 'undefined') ? req.body.billing_address_id : '',
        "shipping_address_id": (typeof req.body.shipping_address_id != 'undefined') ? req.body.shipping_address_id : '',
        "project_id": ""
    }

    zohoBooks.api('/estimates', 'POST', reqObj).then(function (data) {
        console.log(data)
        return res.json({
            code: Constant.SUCCESS_CODE,
            message: Constant.SUCCESS,
            data: data.estimate || {},
        });

    }).catch(function (error) {
        console.log('=error ========', error)
        return res.json({
            code: Constant.REQ_DATA_ERROR_CODE,
            message: Constant.SOMETHING_WENT_WRONG
        });
    })
}

function editAdditionalAddress(req, res) {
    console.log(req.body)
    var org_id = req.user.zoho_org_id; //org id will be different
    var auth_token = req.user.zoho_auth;
    var zohoBooks = new ZohoBooks({
        authtoken: auth_token,
        host: 'https://books.zoho.com/api/v3',
        organization: org_id,
    })
    let contact_id = req.body.contact_id
    let address_id = req.body.address_id
    //https://books.zoho.com/api/v3/contacts/952424000004184900/address/952424000004578001
    // let url = config.ZOHO.url + `contacts/` + contact_id + `/address/` + address_id
    let Data = {
        "attention": req.body.attention,
        "address": req.body.address,
        "street2": req.body.street,
        "city": req.body.city,
        "state": req.body.state,
        "zip": req.body.zipcode,
        "country": req.body.country,
        "fax": req.body.fax,
        "phone": req.body.phone
    }
    // console.log('data heee*****************', Data);
    let url = `/contacts/` + contact_id + `/address/` + address_id
    console.log(url)
    zohoBooks.api(url, 'PUT', Data).then(function (data) {
        console.log("data", data.address_info)
        return res.json({
            code: Constant.SUCCESS_CODE,
            message: Constant.SUCCESS,
            data: data.address_info || {},
        });
    }).catch(function (error) {
        console.log("error", error)
        return res.json({
            code: Constant.REQ_DATA_ERROR_CODE,
            message: Constant.SOMETHING_WENT_WRONG
        });
    })
}

function deleteAdditionalAddress(req, res) {
    var org_id = req.user.zoho_org_id; //org id will be different
    var auth_token = req.user.zoho_auth;
    var zohoBooks = new ZohoBooks({
        authtoken: auth_token,
        host: 'https://books.zoho.com/api/v3',
        organization: org_id,
    })
    console.log(req.swagger.params)
    let contact_id = req.swagger.params.contact_id.value
    let address_id = req.swagger.params.address_id.value
    //https://books.zoho.com/api/v3/contacts/952424000004184900/address/952424000004578001
    // let url = config.ZOHO.url + `contacts/` + contact_id + `/address/` + address_id
    // console.log('data heee*****************', Data);
    let url = `/contacts/` + contact_id + `/address/` + address_id
    // console.log(url)
    zohoBooks.api(url, 'DELETE').then(function (data) {
        console.log("data", data)
        return res.json({
            code: Constant.SUCCESS_CODE,
            message: Constant.SUCCESS,
            data: data.address_info || {},
        });
    }).catch(function (error) {
        console.log("error", error)
        return res.json({
            code: Constant.REQ_DATA_ERROR_CODE,
            message: Constant.SOMETHING_WENT_WRONG
        });
    })
}

function addAddress(req, res) {
    var org_id = req.user.zoho_org_id; //org id will be different
    var auth_token = req.user.zoho_auth;
    var zohoBooks = new ZohoBooks({
        authtoken: auth_token,
        host: 'https://books.zoho.com/api/v3',
        organization: org_id,
    })
    let contact_id = req.body.contact_id
    // console.log(req.body)
    // let url = config.ZOHO.url + `/contacts/` + contact_id + `/address?organization_id=` + org_id
    let url = `/contacts/` + contact_id + `/address?`
    // console.log(url)

    let reqObj = {
        address: req.body.address,
        attention: req.body.attention,
        city: req.body.city,
        country: req.body.country,
        fax: req.body.fax,
        phone: req.body.phone,
        state: req.body.state,
        street: req.body.street,
        zipcode: req.body.zipcode
    }
    zohoBooks.api(url, 'POST', reqObj).then(function (data) {
        // console.log(data)
        return res.json({
            code: Constant.SUCCESS_CODE,
            message: Constant.SUCCESS,
            data: data.address_info || {},
        });

    }).catch(function (error) {
        console.log('=error ========', error)
        return res.json({
            code: Constant.REQ_DATA_ERROR_CODE,
            message: Constant.SOMETHING_WENT_WRONG
        });
    })
}

function addContactPerson(req, res) {
    console.log('hereee', req.body)
    var org_id = req.user.zoho_org_id; //org id will be different
    var auth_token = req.user.zoho_auth;
    var zohoBooks = new ZohoBooks({
        authtoken: auth_token,
        host: 'https://books.zoho.com/api/v3',
        organization: org_id,
    })

    let Data = {
        "contact_id": (typeof req.body.contact_id != 'undefined') ? req.body.contact_id : '',
        "salutation": (typeof req.body.salutation != 'undefined') ? req.body.salutation : '',
        "first_name": (typeof req.body.first_name != 'undefined') ? req.body.first_name : '',
        "last_name": (typeof req.body.last_name != 'undefined') ? req.body.last_name : '',
        "email": (typeof req.body.email != 'undefined') ? req.body.email : '',
        "phone": (typeof req.body.phone_no != 'undefined') ? req.body.phone_no : '',
        "mobile": (typeof req.body.mobile != 'undefined') ? req.body.mobile : '',
        "skype": (typeof req.body.skype_number != 'undefined') ? req.body.skype_number : '',
        "designation": (typeof req.body.designation != 'undefined') ? req.body.designation : '',
        "department": (typeof req.body.department != 'undefined') ? req.body.department : '',
        // "enable_portal": req.body.is_portal_invitation_accepted,
        // "is_primary_contact": req.body.is_primary_contact
    }
    // let url = ''
    // https://books.zoho.com/api/v3/contacts/contactpersons/{:contact_person_id}?organization_id=10234695
    // url = config.ZOHO.url + `contacts/contactpersons/`
    // console.log(url)
    zohoBooks.api('/contacts/contactpersons/', 'POST', Data).then(function (data) {
        // console.log("response................", data)
        return res.json({
            code: Constant.SUCCESS_CODE,
            message: Constant.SUCCESS,
            data: data || {},
        });
    }).catch(function (error) {
        console.log("error", error)
        return res.json({
            code: Constant.REQ_DATA_ERROR_CODE,
            message: Constant.SOMETHING_WENT_WRONG
        });
    })
}

function editContactPerson(req, res) {
    var org_id = req.user.zoho_org_id; //org id will be different
    var auth_token = req.user.zoho_auth;
    var zohoBooks = new ZohoBooks({
        authtoken: auth_token,
        host: 'https://books.zoho.com/api/v3',
        organization: org_id,
    })
    let contact_person_id = req.swagger.params.id.value
    console.log(req.body)
    let Data = {
        "contact_id": req.body.id || "",
        "salutation": req.body.cp_salutation,
        "first_name": req.body.cp_first_name,
        "last_name": req.body.cp_last_name,
        "email": req.body.cp_email,
        "phone": req.body.cp_work_phone,
        "mobile": req.body.cp_mobile,
        "skype": req.body.cp_skype_number || "",
        "designation": req.body.cp_designation,
        "department": req.body.cp_department,
        // "enable_portal": req.body.is_portal_invitation_accepted,
        // "is_primary_contact": req.body.is_primary_contact
    }
    // let Data = {
    //     "first_name": "shubhangi",
    //     "last_name": "goo",
    //     "mobile": "1234567899",
    //     "phone": "1234567890",
    //     "email": "emailaddress@yopmail.com",
    //     "salutation": "",
    //     "contact_id": "952424000004184900",
    //     "enable_portal": false,
    //     "skype": "",
    //     "designation": "designation",
    //     "department": "dept"
    // }
    console.log(Data)
    let url = ''
    //https://books.zoho.com/api/v3/contacts/contactpersons/952424000004708001
    // https://books.zoho.com/api/v3/contacts/contactpersons/{:contact_person_id}?organization_id=10234695
    url = `/contacts/contactpersons/` + contact_person_id;
    console.log(url)
    zohoBooks.api(url, 'PUT', Data).then(function (data) {
        // console.log("response................", data)
        return res.json({
            code: Constant.SUCCESS_CODE,
            message: Constant.SUCCESS,
            data: data || {},
        });
    }).catch(function (error) {
        console.log("error", error)
        return res.json({
            code: Constant.REQ_DATA_ERROR_CODE,
            message: Constant.SOMETHING_WENT_WRONG
        });
    })
}

function deletePrimaryContact(req, res) {
    var arg = {
        headers: {
            "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    }
    let contact_person_id = req.swagger.params.id.value
    var org_id = req.user.zoho_org_id; //org id will be different
    let url = ''
    url = config.ZOHO.url + `contacts/contactpersons/` + contact_person_id + `?organization_id=` + org_id;
    client.delete(url, arg, (data) => {
        if (data) {
            return res.json({
                code: Constant.SUCCESS_CODE,
                message: Constant.DELETE_SUCCESS,

            });
        } else {
            return res.json({
                code: Constant.REQ_DATA_ERROR_CODE,
                message: Constant.SOMETHING_WENT_WRONG
            });
        }
    })
}

function enablePyamentReminders(req, res) {
    let contact_id = req.body.id
    console.log('in enable', req.body)
    var org_id = req.user.zoho_org_id; //org id will be different
    var auth_token = req.user.zoho_auth;
    var zohoBooks = new ZohoBooks({
        authtoken: auth_token,
        host: 'https://books.zoho.com/api/v3',
        organization: org_id,
    })
    // https://books.zoho.com/api/v3/contacts/{:contact_id}/paymentreminder/enable?organization_id=10234695
    let url = `/contacts/` + contact_id + `/paymentreminder/enable?`
    let reqObj = {}
    zohoBooks.api(url, 'POST', reqObj).then(function (data) {
        console.log(data)
        return res.json({
            code: Constant.SUCCESS_CODE,
            message: Constant.SUCCESS,
            data: data || {},
        });

    }).catch(function (error) {
        console.log(error)
        return res.json({
            code: Constant.REQ_DATA_ERROR_CODE,
            message: Constant.SOMETHING_WENT_WRONG
        });
    })
}

function disablePyamentReminders(req, res) {
    console.log('disable', req.body)
    let contact_id = req.body.id
    var org_id = req.user.zoho_org_id; //org id will be different
    var auth_token = req.user.zoho_auth;
    var zohoBooks = new ZohoBooks({
        authtoken: auth_token,
        host: 'https://books.zoho.com/api/v3',
        organization: org_id,
    })
    // https://books.zoho.com/api/v3/contacts/{:contact_id}/paymentreminder/enable?organization_id=10234695
    let url = `/contacts/` + contact_id + `/paymentreminder/disable?`
    let reqObj = {}
    zohoBooks.api(url, 'POST', reqObj).then(function (data) {
        console.log(data)
        return res.json({
            code: Constant.SUCCESS_CODE,
            message: Constant.SUCCESS,
            data: data || {},
        });

    }).catch(function (error) {
        console.log(error)
        return res.json({
            code: Constant.REQ_DATA_ERROR_CODE,
            message: Constant.SOMETHING_WENT_WRONG
        });
    })
}

function getInvoicesFromZoho(req, res) {
    var arg = {
        headers: {
            "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    }
    var org_id = req.user.zoho_org_id;
    console.log("dshgnfbvdhjfg", org_id)
    var page = req.body.page;
    if (req.body.page === 0) {
        var page = req.body.page + 1;
    }
    var limitVal = req.body.limit;
    let filter = req.body.sortDate_as
    let search_text = req.body.search_string
    if (filter) {
        var url = ``;
        console.log('sortdate')
        //required url for developer
        // /https://books.zoho.com/api/v3/invoices?page=1&per_page=25&filter_by=Status.All&sort_column=date&sort_order=A&usestate=true&organization_id=653606302
        url = config.ZOHO.url + `invoices?page=` + page + `&per_page=` + limitVal + `&filter_by=Status.` + filter + `&sort_column=date&sort_order=D&usestate=true` + `&organization_id=` + org_id;
    } else if (search_text) {
        console.log('search_text')
        var url = ``;
        //https://books.zoho.com/api/v3/invoices?search_text=Coen&page=1&per_page=10&organization_id=653606302
        url = config.ZOHO.url + "invoices?search_text=" + search_text + "&page=1&per_page=10&organization_id=" + org_id

    } else {
        console.log('basic')
        url = config.ZOHO.url + `invoices?page=` + page + `&per_page=` + limitVal + `&organization_id=` + org_id;
        var url3 = config.ZOHO.url + `recurringinvoices?page=1&per_page=25&filter_by=Status.All&sort_column=created_time&sort_order=D&usestate=true&organization_id=` + org_id;
    }

    client.get(url, arg, (data) => {

        // console.log('=page.............===============', data)

        if (data) {
            return res.json({
                code: Constant.SUCCESS_CODE,
                message: Constant.SUCCESS_GET_DATA,
                data: data || {},
                total: data.page_context.page
            });
        } else {
            return res.json({
                code: Constant.REQ_DATA_ERROR_CODE,
                message: Constant.SOMETHING_WENT_WRONG
            });
        }
        // })
    })

}

function getCountries(req, res) {
    var arg = {
        headers: {
            "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    }
    // let url_country = config.ZOHO.url + "meta/countries?languagecode=en&organization_id=" + org_id
    var org_id = req.user.zoho_org_id;
    //https://books.zoho.com/api/v3/meta/countries?languagecode=en&organization_id=653606302
    let url = config.ZOHO.url + "meta/countries?languagecode=en&organization_id=" + org_id
    client.get(url, arg, (data) => {
        if (data) {
            return res.json({
                code: Constant.SUCCESS_CODE,
                message: Constant.SUCCESS_GET_DATA,
                data: data || {},
                // total: data.page_context.page
            });
        } else {
            return res.json({
                code: Constant.REQ_DATA_ERROR_CODE,
                message: Constant.SOMETHING_WENT_WRONG
            });
        }
    })
}

function getRecurringInvoicesFromZoho(req, res) {
    var arg = {
        headers: {
            "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    }
    var org_id = req.user.zoho_org_id;
    var url = config.ZOHO.url + `recurringinvoices?page=1&per_page=25&filter_by=Status.All&sort_column=created_time&sort_order=D&usestate=true&organization_id=` + org_id;
    client.get(url, arg, (data) => {

        console.log('=page.............===============', data)

        if (data) {
            return res.json({
                code: Constant.SUCCESS_CODE,
                message: Constant.SUCCESS_GET_DATA,
                data: data || {},
                total: data.page_context.page
            });
        } else {
            return res.json({
                code: Constant.REQ_DATA_ERROR_CODE,
                message: Constant.SOMETHING_WENT_WRONG
            });
        }
        // })
    })
}

function addInvoicesZoho(req, res) {
    console.log('add invoices zoho api', req.body)
    let data = req.body.data
    var org_id = req.user.zoho_org_id; //org id will be different
    var auth_token = req.user.zoho_auth;
    var zohoBooks = new ZohoBooks({
        authtoken: auth_token,
        host: 'https://books.zoho.com/api/v3',
        organization: org_id,
    })
    //https://books.zoho.com/api/v3/invoices?organization_id=653606302
    // var url = config.ZOHO.url + `invoices/?organization_id=` + config.ZOHO.organization_id + `&JSONString=` + data
    // console.log("url==========", url)

    zohoBooks.api('/invoices', 'POST', req.body).then(function (data) {
        return res.json({
            code: Constant.SUCCESS_CODE,
            message: Constant.SUCCESS_GET_DATA,
            data: data || {},
            // total: total.invoices.length
        });

    }).catch(function (error) {
        return res.json({
            code: Constant.REQ_DATA_ERROR_CODE,
            message: Constant.SOMETHING_WENT_WRONG
        });
    })
}

function getInvoiceForEditpage(req, res) {
    var arg = {
        headers: {
            "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    }
    var org_id = req.user.zoho_org_id;
    let data = JSON.stringify(req.body);
    var url = config.ZOHO.url + `invoices/editpage` + `?organization_id=` + org_id + `&JSONString=` + data
    client.get(url, arg, (response) => {
        if (response) {
            return res.json({
                code: Constant.SUCCESS_CODE,
                message: Constant.SUCCESS_GET_DATA,
                data: response || {},
            });
        } else {
            return res.json({
                code: Constant.REQ_DATA_ERROR_CODE,
                message: Constant.SOMETHING_WENT_WRONG
            });
        }
    })
}

function editItemsZoho(req, res) {
    var org_id = req.user.zoho_org_id; //org id will be different
    var auth_token = req.user.zoho_auth;
    var zohoBooks = new ZohoBooks({
        authtoken: auth_token,
        host: 'https://books.zoho.com/api/v3',
        organization: org_id,
    })
    console.log('req', req.body)

    let request = req.swagger.params
    let id = request.id.value;
    // let dataObj = {
    //     "name": "AAAAAAAAAAAAAAABBBBBBBBBBBBBBBBBBCCCCCCCCCCCCC",
    //     "rate": "1",
    //     "account_id": "952424000000000388",
    //     "tax_id": "",
    //     "tags": [],
    //     "custom_fields": [],
    //     "purchase_rate": "1",
    //     "purchase_account_id": "952424000000034003",
    //     "item_type": "sales_and_purchases",
    //     "product_type": "goods"
    // }
    let dataObj = {
        name: (typeof request.name.value != 'undefined') ? request.name.value : '',
        description: (typeof request.description_income.value != 'undefined') ? request.description_income.value : '',
        rate: (typeof request.rate.value != 'undefined') ? request.rate.value : '',
        account_id: (typeof request.income_accounts_list.value != 'undefined') ? request.income_accounts_list.value : '',
        item_id: (typeof id != 'undefined') ? id : '',
        tax_id: (typeof request.taxs.value != 'undefined') ? request.taxs.value : '',
        tags: [],
        sku: (typeof request.sku.value != 'undefined') ? request.sku.value : '',
        // custom_fields:  (typeof request.custom_fields.value != 'undefined') ? request.custom_fields.value : '',
        custom_fields: [],
        unit: (typeof request.unit.value != 'undefined') ? request.unit.value : '',
        purchase_rate: (typeof request.purchase_rate.value != 'undefined') ? request.purchase_rate.value : '',
        purchase_account_id: (typeof request.purchase_account_id.value != 'undefined') ? request.purchase_account_id.value : '',
        purchase_description: (typeof request.description_expense.value != 'undefined') ? request.description_expense.value : '',
        item_type: (typeof request.myRadio.value != 'undefined') ? request.myRadio.value : '',
        product_type: (typeof request.myRadio.value != 'undefined') ? request.myRadio.value : '',
        reorder_level: (typeof request.reorder_point.value != 'undefined') ? request.reorder_point.value : '',
        vendor_id: (typeof request.vendor_id.value != 'undefined') ? request.vendor_id.value : '',
        inventory_account_id: (typeof request.inventory_accounts.value != 'undefined') ? request.inventory_accounts.value : '',
        initial_stock: (typeof request.opening_stock.value != 'undefined') ? request.opening_stock.value : '',
        initial_stock_rate: (typeof request.opening_stock_rate.value != 'undefined') ? request.opening_stock_rate.value : '',
        crm_owner_id: (typeof request.crm_owner_id.value != 'undefined') ? request.crm_owner_id.value : '',
        brand: (typeof request.opening_stock_rate.value != 'undefined') ? request.opening_stock_rate.value : '',
        manufacturer: (typeof request.manufacturer.value != 'undefined') ? request.manufacturer.value : '',
        // image:  (typeof request.image.value != 'undefined') ? request.image.value : '',
    }
    console.log('data heee*****************', dataObj);
    let url = `/items/` + id
    console.log(url)
    zohoBooks.api(url, 'PUT', dataObj).then(function (data) {
        console.log('ressss', data)
        return res.json({
            code: Constant.SUCCESS_CODE,
            message: Constant.SUCCESS_GET_DATA,
            data: data || {},
        });
    }).catch(function (error) {
        console.log(error)
        return res.json({
            code: Constant.REQ_DATA_ERROR_CODE,
            message: Constant.SOMETHING_WENT_WRONG
        });
    })
    // if (response) {
    //     return res.json({
    //         code: Constant.SUCCESS_CODE,
    //         message: Constant.SUCCESS_GET_DATA,
    //         data: response || {},
    //         // total: total.invoices.length
    //     });
    // } else {
    //     return res.json({
    //         code: Constant.REQ_DATA_ERROR_CODE,
    //         message: Constant.SOMETHING_WENT_WRONG
    //     });
    // }
    return

    //FROM ZOHO SITE
    // {"name":"AaaaaaaaaaaExample",
    // "description":"income descrition",
    // "rate":"1","account_id":"952424000000149377",
    // "item_id":"952424000004200007",
    // "tax_id":"","tags":[],
    // "sku":"SKK","custom_fields":[],
    // "unit":"Pieces ","purchase_rate":45,
    // "purchase_account_id":"952424000000000430",
    // "purchase_description":"expense descrition",
    // "item_type":"inventory",
    // "product_type":"goods","reorder_level":1,
    // "vendor_id":"952424000001369143",
    // "inventory_account_id":"952424000000034001",
    // "initial_stock":111,"initial_stock_rate":222,
    // "crm_owner_id":"","brand":"","manufacturer":""}

    //FROM BAC SITE
    // {"name":"AaaaaaaaaaaExample",
    // "description":"dewscrioptb",
    // "rate":1,"account_id":"952424000000149377",
    // "item_id":"952424000004200007",
    // "tax_id":"","tags":[],
    // "sku":"test","custom_fields":[],
    // "unit":"Pieces ","purchase_rate":45,
    // "purchase_account_id":"952424000000000403",
    // "purchase_description":"",
    // "item_type":"952424000000034001",
    // "product_type":"goods","reorder_level":"1",
    // "vendor_id":"952424000001369143",
    // "inventory_account_id":"952424000000034001",
    // "initial_stock":"111","initial_stock_rate":"1",
    // "crm_owner_id":"","brand":"1","manufacturer":""}


    // let data = dataObj;
    // {"name":"AaaaaaaaaaaExample",
    // "description":"income descrition",
    // "rate":"1","account_id":"952424000000149377",
    // "item_id":"952424000004200007",
    // "tax_id":"","tags":[],"sku":"SKK",
    // "custom_fields":[],"unit":"Pieces ",
    // "purchase_rate":45,
    // "purchase_account_id":"952424000000000430",
    // "purchase_description":"expense descrition",
    // "item_type":"inventory","product_type":"goods",
    // "reorder_level":1,"vendor_id":"952424000001369143",
    // "inventory_account_id":"952424000000034001",
    // "initial_stock":111,"initial_stock_rate":222,
    // "crm_owner_id":"","brand":"","manufacturer":""}


    //https://books.zoho.com/api/v3/items/952424000004200007?organization_id=653606302
    // var url = config.ZOHO.url + `items/` + id + `?organization_id=` + config.ZOHO.organization_id + `&JSONString=` + JSON.stringify(data)
    // client.put(url, args, (response) => {

    //     if (Buffer.isBuffer(response)) {
    //         console.log("test", response.toString())

    //         // console.log("zoho res###############3",response.toString('base64'));
    //     }
    //     // if (response) {
    //     //     return res.json({
    //     //         code: Constant.SUCCESS_CODE,
    //     //         message: Constant.SUCCESS_GET_DATA,
    //     //         data: response || {},
    //     //         // total: total.invoices.length
    //     //     });
    //     // } else {
    //     //     return res.json({
    //     //         code: Constant.REQ_DATA_ERROR_CODE,
    //     //         message: Constant.SOMETHING_WENT_WRONG
    //     //     });
    //     // }
    // })
}

function getItemById(req, res) {
    var arg = {
        headers: {
            "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    }
    var org_id = req.user.zoho_org_id;
    let id = req.swagger.params.id.value
    var url = config.ZOHO.url + `items/editpage?itemid=` + id + `&organization_id=` + org_id;
    client.get(url, arg, (data) => {
        let invoice = data.item
        console.log(data)
        if (data) {
            return res.json({
                code: Constant.SUCCESS_CODE,
                message: Constant.SUCCESS_GET_DATA,
                data: invoice || {},
            });
        } else {
            return res.json({
                code: Constant.REQ_DATA_ERROR_CODE,
                message: Constant.SOMETHING_WENT_WRONG
            });
        }
    })
}

function addItemsZoho(req, res) {
    var org_id = req.user.zoho_org_id; //org id will be different
    var auth_token = req.user.zoho_auth;
    var zohoBooks = new ZohoBooks({
        authtoken: auth_token,
        host: 'https://books.zoho.com/api/v3',
        organization: org_id,
    })
    zohoBooks.api('/items', 'POST', req.body).then(function (data) {
        return res.json({
            code: Constant.SUCCESS_CODE,
            message: Constant.SUCCESS_GET_DATA,
            data: data || {},
            // total: total.invoices.length
        });

    }).catch(function (error) {
        return res.json({
            code: Constant.REQ_DATA_ERROR_CODE,
            message: Constant.SOMETHING_WENT_WRONG
        });
    })
}

function getPaymentsFromZoho(req, res) {
    var arg = {
        headers: {
            "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    }
    var org_id = req.user.zoho_org_id;
    if (req.body.page === 0) {
        var page = req.body.page + 1;
    }
    var page = req.body.page;
    var limitVal = req.body.limit;
    var search_string = req.body.search_string;
    var field = req.body.field
    let order = req.body.order
    let field_name = req.body.field_name
    if (field) {
        var url = config.ZOHO.url + `customerpayments?page=` + page + `&per_page=` + limitVal + `&filter_by=PaymentType.` + field + `&sort_column=payment_number&sort_order=A&usestate=true&organization_id=` + org_id;
    } else if (search_string) {
        var url = config.ZOHO.url + `customerpayments?search_text=` + search_string + `&page` + page + `&per_page=` + limitVal + `&organization_id=` + org_id;
    } else if (order && field_name) {
        var url = config.ZOHO.url + `customerpayments?page=` + page + `&per_page=` + limitVal + `&filter_by=PaymentType.Invoices&sort_column=` + field_name + `&sort_order=` + order + `&usestate=true&organization_id=` + org_id
    } else {
        var url = config.ZOHO.url + `customerpayments?page=` + page + `&per_page=` + limitVal + `&organization_id=` + org_id;
    }
    client.get(url, arg, (data) => {
        if (data) {
            return res.json({
                code: Constant.SUCCESS_CODE,
                message: Constant.SUCCESS_GET_DATA,
                data: data || {},
                total: data.page_context.page
            });
        } else {
            return res.json({
                code: Constant.REQ_DATA_ERROR_CODE,
                message: Constant.SOMETHING_WENT_WRONG
            });
        }
    })
}

function getPayRelatedInfo(req, res) {
    var arg = {
        headers: {
            "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    }
    var org_id = req.user.zoho_org_id;
    var url = config.ZOHO.url + `autocomplete/contact?search_text=&contact_type=customer&organization_id=` + org_id;

    client.get(url, arg, (data) => {
        if (data) {
            return res.json({
                code: Constant.SUCCESS_CODE,
                message: Constant.SUCCESS_GET_DATA,
                data: data || {},
            });
        } else {
            return res.json({
                code: Constant.REQ_DATA_ERROR_CODE,
                message: Constant.SOMETHING_WENT_WRONG
            });
        }
    })
}

function getPayById(req, res) {
    var arg = {
        headers: {
            "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    }
    var org_id = req.user.zoho_org_id;
    let id = req.swagger.params.id.value;
    var url = config.ZOHO.url + `customerpayments/editpage/fromcontacts?contact_id=` + id + `&organization_id=` + org_id;
    client.get(url, arg, (data) => {
        if (data) {
            return res.json({
                code: Constant.SUCCESS_CODE,
                message: Constant.SUCCESS_GET_DATA,
                data: data || {},
            });
        } else {
            return res.json({
                code: Constant.REQ_DATA_ERROR_CODE,
                message: Constant.SOMETHING_WENT_WRONG
            });
        }
    })
}

function editpagePaymentRecieved(req, res) {
    var arg = {
        headers: {
            "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    }
    var org_id = req.user.zoho_org_id;
    let id = req.swagger.params.id.value;
    var url = config.ZOHO.url + `customerpayments/editpage?payment_id=` + id + `&transaction_type=customer_payment&organization_id=` + org_id;
    client.get(url, arg, (data) => {
        // console.log('++++++++++++', data)
        if (data) {
            return res.json({
                code: Constant.SUCCESS_CODE,
                message: Constant.SUCCESS_GET_DATA,
                data: data || {},
            });
        } else {
            return res.json({
                code: Constant.REQ_DATA_ERROR_CODE,
                message: Constant.SOMETHING_WENT_WRONG
            });
        }
    })
}

function getFilteredData(req, res) {
    var arg = {
        headers: {
            "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    }
    var org_id = req.user.zoho_org_id;
    let id = req.swagger.params.id.value;
    console.log("getFilteredData", id)

    var url = config.ZOHO.url + `autocomplete/contact?search_text=` + id + `&contact_type=customer&organization_id=` + org_id;
    client.get(url, arg, (data) => {
        // console.log('++++++++++++', data)
        if (data) {
            return res.json({
                code: Constant.SUCCESS_CODE,
                message: Constant.SUCCESS_GET_DATA,
                data: data,
            });
        } else {
            return res.json({
                code: Constant.REQ_DATA_ERROR_CODE,
                message: Constant.SOMETHING_WENT_WRONG
            });
        }
    })
}

function getInvcById(req, res) {
    var arg = {
        headers: {
            "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    }
    var org_id = req.user.zoho_org_id;
    let id = req.swagger.params.id.value;
    var url = config.ZOHO.url + `invoices/editpage/fromcontacts?contact_id=` + id + `&disable_settings=true&organization_id=` + org_id;
    console.log("kkkkkkkkkkkkkkkkk", url);

    client.get(url, arg, (data) => {
        let response = data.contact
        if (response) {
            return res.json({
                code: Constant.SUCCESS_CODE,
                message: Constant.SUCCESS_GET_DATA,
                data: response || {},
            });
        } else {
            return res.json({
                code: Constant.REQ_DATA_ERROR_CODE,
                message: Constant.SOMETHING_WENT_WRONG
            });
        }
    })
}

// function zohoInvoice(req, res) {
//     // console.log('getInvcById', req.swagger.params.id.value)
//     // let id = req.swagger.params.id.value;
//     //req url is below
//     //https://books.zoho.com/api/v3/invoices/editpage?organization_id=653606302
//     var url = config.ZOHO.url + `invoices/editpage&organization_id=` + config.ZOHO.organization_id;
//     client.get(url, args, (data) => {
//         console.log('data******************', data)
//         
//         let response = data.contact
//         if (response) {
//             return res.json({
//                 code: Constant.SUCCESS_CODE,
//                 message: Constant.SUCCESS_GET_DATA,
//                 data: response || {},
//             });
//         } else {
//             return res.json({
//                 code: Constant.REQ_DATA_ERROR_CODE,
//                 message: Constant.SOMETHING_WENT_WRONG
//             });
//         }
//     })
// }

function getContacts(req, res) {
    console.log("jdzxfhdshjfbds", req.user)
    var arg = {
        headers: {
            "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    }
    var org_id = req.user.zoho_org_id;
    if (req.body.page === 0) {
        var page = req.body.page + 1;
    }
    var page = req.body.page;
    var limitVal = req.body.limit;
    var url = config.ZOHO.url + `contacts?page=` + page + `&per_page=` + limitVal + `&organization_id=` + org_id;
    client.get(url, arg, (data) => {
        if (data) {
            return res.json({
                code: Constant.SUCCESS_CODE,
                message: Constant.SUCCESS_GET_DATA,
                data: data || {},
                total: data.page_context.page
            });
        } else {
            return res.json({
                code: Constant.REQ_DATA_ERROR_CODE,
                message: Constant.SOMETHING_WENT_WRONG
            });
        }
    })

}


function getPaymentRecordList(req, res) {
    var arg = {
        headers: {
            "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    }
    var org_id = req.user.zoho_org_id;

    var url = config.ZOHO.url + `customerpayments?organization_id=` + org_id;
    client.get(url, arg, (data) => {
        let payment = data.customerpayments
        if (data) {
            return res.json({
                code: Constant.SUCCESS_CODE,
                message: Constant.SUCCESS_GET_DATA,
                data: payment || {},
                total: data.page_context
                // total: total.invoices.length
            });
        } else {
            return res.json({
                code: Constant.REQ_DATA_ERROR_CODE,
                message: Constant.SOMETHING_WENT_WRONG
            });
        }
    })
}

function getPaymentReportRecordList(req, res) {
    var arg = {
        headers: {
            "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    }
    var org_id = req.user.zoho_org_id;
    const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
    const endOfMonth = moment().endOf('month').format('YYYY-MM-DD');
    console.log("......................", startOfMonth, endOfMonth)
    var url = config.ZOHO.url + `reports/customerpayments?page=1&per_page=500&sort_column=date&sort_order=D&filter_by=PaymentDate.CustomDate%2CPaymentType.All&from_date=` + startOfMonth + `&to_date=` + endOfMonth + `&response_option=1&organization_id=` + org_id;
    client.get(url, arg, (data) => {
        let payment = data.customerpayments
        if (data) {
            return res.json({
                code: Constant.SUCCESS_CODE,
                message: Constant.SUCCESS_GET_DATA,
                data: payment || {},
                total: data.page_context
                // total: total.invoices.length
            });
        } else {
            return res.json({
                code: Constant.REQ_DATA_ERROR_CODE,
                message: Constant.SOMETHING_WENT_WRONG
            });
        }
    })
}

function getAddressById(req, res) {
    var arg = {
        headers: {
            "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    }
    var org_id = req.user.zoho_org_id;
    let id = req.swagger.params.id.value
    let url = config.ZOHO.url + `contacts/` + id + `/address?organization_id=` + org_id;
    client.get(url, arg, (data) => {
        let address = data.addresses
        if (data) {
            return res.json({
                code: Constant.SUCCESS_CODE,
                message: Constant.SUCCESS_GET_DATA,
                data: address || {},
            });
        } else {
            return res.json({
                code: Constant.REQ_DATA_ERROR_CODE,
                message: Constant.SOMETHING_WENT_WRONG
            });
        }
    })
}

function getSubAddressById(req, res) {
    var arg = {
        headers: {
            "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    }
    // var org_id = req.user.zoho_org_id;
    let contact_id = req.swagger.params.contact_id.value
    let address_id = req.swagger.params.address_id.value
    //https://books.zoho.com/api/v3/contacts/952424000004184900/address/952424000004578001
    let url = config.ZOHO.url + `contacts/` + contact_id + `/address/` + address_id
    client.get(url, arg, (data) => {
        console.log('data===========', data)
        return
        let address = data.addresses
        if (data) {
            return res.json({
                code: Constant.SUCCESS_CODE,
                message: Constant.SUCCESS_GET_DATA,
                data: address || {},
            });
        } else {
            return res.json({
                code: Constant.REQ_DATA_ERROR_CODE,
                message: Constant.SOMETHING_WENT_WRONG
            });
        }
    })
}

function updateBillingAddress(req, res) {
    var arg = {
        headers: {
            "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    }
    var org_id = req.user.zoho_org_id;
    let id = req.swagger.params.id.value;
    let data = {
        attention: (typeof req.body.attention != 'undefined') ? req.body.attention : '',
        address: (typeof req.body.address != 'undefined') ? req.body.address : '',
        street2: (typeof req.body.street != 'undefined') ? req.body.street : '',
        city: (typeof req.body.city != 'undefined') ? req.body.city : '',
        state: (typeof req.body.state != 'undefined') ? req.body.state : '',
        zip: (typeof req.body.zipcode != 'undefined') ? req.body.zipcode : '',
        country: (typeof req.body.country != 'undefined') ? req.body.country : '',
        fax: (typeof req.body.fax != 'undefined') ? req.body.fax : '',
        phone: (typeof req.body.phone != 'undefined') ? req.body.phone : '',
    }
    let customer_id = req.body.id
    let data_stringfy = JSON.stringify(data)
    var url = config.ZOHO.url + `contacts/` + customer_id + `/address` + id + `&JSONString=` + data_stringfy

    client.put(url, arg, (response) => {

        if (response) {
            return res.json({
                code: Constant.SUCCESS_CODE,
                message: Constant.SUCCESS_GET_DATA,
                data: response || {},
                // total: total.invoices.length
            });
        } else {
            return res.json({
                code: Constant.REQ_DATA_ERROR_CODE,
                message: Constant.SOMETHING_WENT_WRONG
            });
        }
    })
}

function addBillingAddress(req, res) {
    var arg = {
        headers: {
            "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    }
    var org_id = req.user.zoho_org_id;
    let data = {
        attention: (typeof req.body.attention != 'undefined') ? req.body.attention : '',
        address: (typeof req.body.address != 'undefined') ? req.body.address : '',
        street2: (typeof req.body.street != 'undefined') ? req.body.street : '',
        city: (typeof req.body.city != 'undefined') ? req.body.city : '',
        state: (typeof req.body.state != 'undefined') ? req.body.state : '',
        zip: (typeof req.body.zipcode != 'undefined') ? req.body.zipcode : '',
        country: (typeof req.body.country != 'undefined') ? req.body.country : '',
        fax: (typeof req.body.fax != 'undefined') ? req.body.fax : '',
        update_existing_transactions_address: true,
        phone: (typeof req.body.phone != 'undefined') ? req.body.phone : '',
    }
    let customer_id = req.body.id
    let data_stringfy = JSON.stringify(data)

    let url = config.ZOHO.url + `contacts/` + customer_id + `/address` + `&JSONString=` + data_stringfy
    client.post(url, arg, (response) => {
        if (response) {
            return res.json({
                code: Constant.SUCCESS_CODE,
                message: Constant.SUCCESS_GET_DATA,
                data: response || {},
                // total: total.invoices.length
            });
        } else {
            return res.json({
                code: Constant.REQ_DATA_ERROR_CODE,
                message: Constant.SOMETHING_WENT_WRONG
            });
        }
    })

}

function getInvoicesById(req, res) {
    var arg = {
        headers: {
            "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    }
    var org_id = req.user.zoho_org_id;
    let id = req.swagger.params.id.value

    var url = config.ZOHO.url + `invoices/` + id + `?organization_id=` + org_id;
    client.get(url, arg, (data) => {
        console.log('==', data)
        let invoice = data.invoice
        if (data) {
            return res.json({
                code: Constant.SUCCESS_CODE,
                message: Constant.SUCCESS_GET_DATA,
                data: invoice || {},
                // total: total.invoices.length
            });
        } else {
            return res.json({
                code: Constant.REQ_DATA_ERROR_CODE,
                message: Constant.SOMETHING_WENT_WRONG
            });
        }
    })
}

function editCustomerPayment(req, res) {
    var org_id = req.user.zoho_org_id; //org id will be different
    var auth_token = req.user.zoho_auth;
    var zohoBooks = new ZohoBooks({
        authtoken: auth_token,
        host: 'https://books.zoho.com/api/v3',
        organization: org_id,
    })
    // var arg = {
    //     headers: {
    //         "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
    //         "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    //     }
    // }
    // console.log('body======', req.body, '                         id', req.swagger.params.id.value)
    let id = req.swagger.params.id.value;
    // let request = req.body;
    // let contact_persons = [];

    // request.contact_person.forEach(element => {
    //     let obj = {
    //         "contact_person_id": element.contact_person_id,
    //         "first_name": element.first_name,
    //         "last_name": element.last_name,
    //         "mobile": element.mobile,
    //         "phone": element.phone,
    //         "email": element.email,
    //         "salutation": element.salutation,
    //         "skype": element.skype,
    //         "designation": element.designation,
    //         "department": element.department
    //     }
    //     contact_persons.push(obj)
    // });
    // console.log('hereeeeeeeeeeeeeeeeeeeeeee', req.body.updateForm.contact_display_name)
    const momentDate = new Date(req.body.date); // Replace event.value with your date value
    const formated_date = moment(momentDate).format("YYYY-MM-DD");
    console.log('moment', formated_date)
    let Data = {
        "customer_id": (typeof req.body.customer_id != 'undefined') ? req.body.customer_id : '',
        "invoices": [],
        "payment_mode": (typeof req.body.payment_mode != 'undefined') ? req.body.payment_mode : '',
        "description": (typeof req.body.description != 'undefined') ? req.body.description : '',
        "date": formated_date,
        "reference_number": (typeof req.body.reference_number != 'undefined') ? req.body.reference_number : '',
        "exchange_rate": (typeof req.body.exchange_rate != 'undefined') ? req.body.exchange_rate : 0,
        "amount": (typeof req.body.amount != 'undefined') ? req.body.amount : 0,
        "bank_charges": "",
        "tax_account_id": (typeof req.body.tax_account_id != 'undefined') ? req.body.tax_account_id : '',
        "account_id": (typeof req.body.account_id != 'undefined') ? req.body.account_id : '',
        "custom_fields": [],
        "documents": [],
        "payment_number_prefix": "",
        "payment_number_suffix": (typeof req.body.payment_number_suffix != 'undefined') ? req.body.payment_number_suffix : '',
    }

    var url = `/customerpayments/` + id
    // console.log('url.................', url)
    // client.put(url, arg, (response) => {

    //     if (response) {
    //         return res.json({
    //             code: Constant.SUCCESS_CODE,
    //             message: Constant.SUCCESS_GET_DATA,
    //             data: response || {},
    //         });
    //     } else {
    //         return res.json({
    //             code: Constant.REQ_DATA_ERROR_CODE,
    //             message: Constant.SOMETHING_WENT_WRONG
    //         });
    //     }
    // })
    zohoBooks.api(url, 'PUT', Data).then(function (data) {
        // console.log("response................", data)
        return res.json({
            code: Constant.SUCCESS_CODE,
            message: Constant.SUCCESS,
            data: data || {},
        });
    }).catch(function (error) {
        console.log("error", error)
        return res.json({
            code: Constant.REQ_DATA_ERROR_CODE,
            message: Constant.SOMETHING_WENT_WRONG
        });
    })
}

function deletePaymentRecord(req, res) {
    var arg = {
        headers: {
            "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    }
    var org_id = req.user.zoho_org_id;
    let id = req.swagger.params.id.value
    var url = config.ZOHO.url + `customerpayments/` + id + `?organization_id=` + org_id;
    client.delete(url, arg, (data) => {

        if (data) {
            return res.json({
                code: Constant.SUCCESS_CODE,
                message: Constant.DELETE_SUCCESS,

            });
        } else {
            return res.json({
                code: Constant.REQ_DATA_ERROR_CODE,
                message: Constant.SOMETHING_WENT_WRONG
            });
        }
    })
}

function getPaymentsById(req, res) {
    var arg = {
        headers: {
            "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    }
    var org_id = req.user.zoho_org_id;
    let id = req.swagger.params.id.value


    var url = config.ZOHO.url + `customerpayments/` + id + `?organization_id=` + org_id;
    var url2 = config.ZOHO.url + `customerpayments/` + id + `?include=html&organization_id=` + org_id;
    client.get(url, arg, (data) => {
        console.log("daat", url2)
        client.get(url2, arg, (data2) => {

            let payment = data.payment
            let pay = data2.payment
            if (data) {
                return res.json({
                    code: Constant.SUCCESS_CODE,
                    message: Constant.SUCCESS_GET_DATA,
                    data: payment || {},
                    pay: pay || {}
                });
            } else {
                return res.json({
                    code: Constant.REQ_DATA_ERROR_CODE,
                    message: Constant.SOMETHING_WENT_WRONG
                });
            }
        })
    })
}

function getContactById(req, res) {
    var arg = {
        headers: {
            "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    }
    var org_id = req.user.zoho_org_id;
    let id = req.swagger.params.id.value
    //get comments
    let url_comment = config.ZOHO.url + `contacts/` + id + `/comments?filter_by=RecentActivity.Comments&organization_id=` + org_id;
    //contact data 
    var url = config.ZOHO.url + `contacts/` + id + `?organization_id=` + org_id;
    //get countries url
    let url_country = config.ZOHO.url + "meta/countries?languagecode=en&organization_id=" + org_id
    client.get(url, arg, (data) => {
        let contacts = data.contact
        client.get(url_comment, arg, (comments) => {
            client.get(url_country, arg, (data) => {
                // console.log('==========', data)
                let contact = {
                    contact: contacts,
                    comments: comments.contact_comments,
                    countries: data.results
                }
                if (contact) {
                    return res.json({
                        code: Constant.SUCCESS_CODE,
                        message: Constant.SUCCESS_GET_DATA,
                        data: contact || {},
                        // total: total.invoices.length
                    });
                } else {
                    return res.json({
                        code: Constant.REQ_DATA_ERROR_CODE,
                        message: Constant.SOMETHING_WENT_WRONG
                    });
                }
            })
        })

    })
}

function deleteContact(req, res) {
    console.log('sdhadgshdgha')
    var arg = {
        headers: {
            "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    }
    var org_id = req.user.zoho_org_id;
    let id = req.swagger.params.id.value
    var url = config.ZOHO.url + `contacts/` + id + `?organization_id=` + org_id;
    client.delete(url, arg, (data) => {
        console.log(data)
        if (data) {
            return res.json({
                code: Constant.SUCCESS_CODE,
                message: Constant.DELETE_SUCCESS,
            });
        } else {
            return res.json({
                code: Constant.REQ_DATA_ERROR_CODE,
                message: Constant.SOMETHING_WENT_WRONG
            });
        }
    })
}

function deleteZohoItem(req, res) {
    var arg = {
        headers: {
            "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    }
    var org_id = req.user.zoho_org_id;
    let id = req.swagger.params.id.value
    var url = config.ZOHO.url + `items/` + id + `?organization_id=` + org_id;
    client.delete(url, arg, (data) => {
        if (data) {
            return res.json({
                code: Constant.SUCCESS_CODE,
                message: Constant.DELETE_SUCCESS,
            });
        } else {
            return res.json({
                code: Constant.REQ_DATA_ERROR_CODE,
                message: Constant.SOMETHING_WENT_WRONG
            });
        }
    })
}

function editContactZoho(req, res) {
    var org_id = req.user.zoho_org_id; //org id will be different
    var auth_token = req.user.zoho_auth;
    var zohoBooks = new ZohoBooks({
        authtoken: auth_token,
        host: 'https://books.zoho.com/api/v3',
        organization: org_id,
    })
    // var arg = {
    //     headers: {
    //         "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
    //         "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    //     }
    // }
    console.log('body======', req.body, '                         id', req.swagger.params.id.value)
    let id = req.swagger.params.id.value;
    let request = req.body;
    let contact_persons = [];

    request.contact_person.forEach(element => {
        let obj = {
            "contact_person_id": element.contact_person_id,
            "first_name": element.first_name,
            "last_name": element.last_name,
            "mobile": element.mobile,
            "phone": element.phone,
            "email": element.email,
            "salutation": element.salutation,
            "skype": element.skype,
            "designation": element.designation,
            "department": element.department
        }
        contact_persons.push(obj)
    });
    console.log('hereeeeeeeeeeeeeeeeeeeeeee', req.body.updateForm.contact_display_name)

    let Data = {
        "contact_name": request.updateForm.contact_display_name,
        // "contact_name": (typeof request.updateForm.contact_display_name != 'undefined') ? request.updateForm.contact_display_name : '',
        "company_name": (typeof request.updateForm.company_name != 'undefined') ? request.updateForm.company_name : '',
        "website": request.updateForm.website,
        "email": (typeof request.updateForm.contact_email != 'undefined') ? request.updateForm.contact_email : '',
        "contact_type": request.updateForm.myRadio,
        "currency_id": request.updateForm.currency_id,
        "payment_terms": 0,
        "payment_terms_label": request.updateForm.payment_terms,
        "credit_limit": 0,
        "pricebook_id": request.updateForm.price_list,
        "notes": '',
        "billing_address": {
            "attention": request.attention,
            "address": request.address,
            "street2": request.street2,
            "city": request.city,
            "state": request.state,
            "zip": request.zip,
            "country": request.country,
            "fax": request.fax,
            "phone": request.phone
        },
        "shipping_address": {
            "attention": request.shipping_attention,
            "address": request.shipping_address,
            "street2": request.shipping_street2,
            "city": request.shipping_city,
            "state": request.shipping_state,
            "zip": request.shipping_zip,
            "country": request.shipping_country,
            "fax": request.shipping_fax,
            "phone": request.shipping_phone
        },
        "contact_persons": contact_persons,
        "default_templates": {
            "estimate_template_id": "",
            "invoice_template_id": "",
            "creditnote_template_id": "",
            "purchaseorder_template_id": "",
            "salesorder_template_id": "",
            "retainerinvoice_template_id": "",
            "paymentthankyou_template_id": "",
            "retainerinvoice_paymentthankyou_template_id": "",
            "estimate_email_template_id": "",
            "invoice_email_template_id": "",
            "creditnote_email_template_id": "",
            "purchaseorder_email_template_id": "",
            "salesorder_email_template_id": "",
            "retainerinvoice_email_template_id": "",
            "paymentthankyou_email_template_id": "",
            "retainerinvoice_paymentthankyou_email_template_id": "",
            "bill_template_id": "",
            "payment_remittance_email_template_id": ""
        },
        "is_portal_enabled": true,
        "owner_id": "",
        "language_code": request.language_code,
        "tags": [],
        "twitter": request.twitter,
        "facebook": request.facebook,
        "ach_supported": false
    }
    console.log('ress%', req.body)
    console.log('contact for not chNGING.................', Data.contact_persons)

    var url = `/contacts/` + id
    // console.log('url.................', url)
    // client.put(url, arg, (response) => {

    //     if (response) {
    //         return res.json({
    //             code: Constant.SUCCESS_CODE,
    //             message: Constant.SUCCESS_GET_DATA,
    //             data: response || {},
    //         });
    //     } else {
    //         return res.json({
    //             code: Constant.REQ_DATA_ERROR_CODE,
    //             message: Constant.SOMETHING_WENT_WRONG
    //         });
    //     }
    // })
    zohoBooks.api(url, 'PUT', Data).then(function (data) {
        // console.log("response................", data)
        return res.json({
            code: Constant.SUCCESS_CODE,
            message: Constant.SUCCESS,
            data: data || {},
        });
    }).catch(function (error) {
        console.log("error", error)
        return res.json({
            code: Constant.REQ_DATA_ERROR_CODE,
            message: Constant.SOMETHING_WENT_WRONG
        });
    })
}

function listRefunds(req, res) {
    var arg = {
        headers: {
            "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    }
    var org_id = req.user.zoho_org_id;
    const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
    const endOfMonth = moment().endOf('month').format('YYYY-MM-DD');
    // console.log('moment', formated_due_date)
    var url = config.ZOHO.url + `reports/refundhistory?page=1&per_page=500&sort_order=A&filter_by=RefundDate.CustomDate&from_date=` + startOfMonth + `&to_date=` + endOfMonth + `&response_option=1&organization_id=` + org_id;
    client.get(url, arg, (data) => {
        // console.log('*************************', url)
        // console.log('*************************', data)
        let payment = data['refunds'];
        if (data) {
            return res.json({
                code: Constant.SUCCESS_CODE,
                message: Constant.SUCCESS_GET_DATA,
                data: payment,
                total: data.page_context
            });
        } else {
            return res.json({
                code: Constant.REQ_DATA_ERROR_CODE,
                message: Constant.SOMETHING_WENT_WRONG
            });
        }
    })

}

function getRefundById(req, res) {
    var arg = {
        headers: {
            "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    }
    var org_id = req.user.zoho_org_id;
    let refund_id = req.swagger.params.id.value
    //https://books.zoho.com/api/v3/customerpayments/952424000000209402?include=html&organization_id=653606302
    let url = config.ZOHO.url + `customerpayments/` + refund_id + `?include=html&organization_id=` + org_id;
    client.get(url, arg, (data) => {
        console.log('*************************', url)
        console.log('*************************', data)
        let payment = data.payment
        if (data) {
            return res.json({
                code: Constant.SUCCESS_CODE,
                message: Constant.SUCCESS_GET_DATA,
                data: payment || {},
            });
        } else {
            return res.json({
                code: Constant.REQ_DATA_ERROR_CODE,
                message: Constant.SOMETHING_WENT_WRONG
            });
        }
    })
}

function listCreditNotes(req, res) {
    // var arg = {
    //     headers: {
    //         "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
    //         "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    //     }
    // }
    // var org_id = req.user.zoho_org_id;
    // var url = config.ZOHO.url + `creditnotes?organization_id=` + org_id;
    // client.get(url, arg, (data) => {
    //     let payment = data.creditnotes
    //     if (data) {
    //         return res.json({
    //             code: Constant.SUCCESS_CODE,
    //             message: Constant.SUCCESS_GET_DATA,
    //             data: payment || {},
    //         });
    //     } else {
    //         return res.json({
    //             code: Constant.REQ_DATA_ERROR_CODE,
    //             message: Constant.SOMETHING_WENT_WRONG
    //         });
    //     }
    // })

    var arg = {
        headers: {
            "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    }
    var org_id = req.user.zoho_org_id;
    const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
    const endOfMonth = moment().endOf('month').format('YYYY-MM-DD');
    var url = config.ZOHO.url + `reports/creditnotedetails?page=1&per_page=500&sort_order=A&filter_by=CreditNotesDate.CustomDate&from_date=` + startOfMonth + `&to_date=` + endOfMonth + `&response_option=1&organization_id=` + org_id;
    client.get(url, arg, (data) => {
        let creditnotes = data['creditnotes'];
        if (data) {
            return res.json({
                code: Constant.SUCCESS_CODE,
                message: Constant.SUCCESS_GET_DATA,
                data: creditnotes,
                total: data.page_context
            });
        } else {
            return res.json({
                code: Constant.REQ_DATA_ERROR_CODE,
                message: Constant.SOMETHING_WENT_WRONG
            });
        }
    })

}

function getContactPersonById(req, res) {
    var arg = {
        headers: {
            "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    }
    var org_id = req.user.zoho_org_id;
    let id = req.swagger.params.id.value
    let contactPersonId = req.swagger.params.contactPersonId.value
    var url = config.ZOHO.url + `contacts/` + id + `/contactpersons/` + contactPersonId + `?organization_id=` + org_id;
    client.get(url, arg, (data) => {
        if (data) {
            return res.json({
                code: Constant.SUCCESS_CODE,
                message: Constant.SUCCESS_GET_DATA,
                data: data || {},
            });
        } else {
            return res.json({
                code: Constant.REQ_DATA_ERROR_CODE,
                message: Constant.SOMETHING_WENT_WRONG
            });
        }
    })
}

function listItems(req, res) {
    var arg = {
        headers: {
            "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    }
    var org_id = req.user.zoho_org_id;
    if (req.body.page === 0) {
        var page = req.body.page + 1;
    }
    var page = req.body.page;
    var limitVal = req.body.limit;
    var url = config.ZOHO.url + `items?page=` + page + `&per_page=` + limitVal + `&organization_id=` + org_id;
    client.get(url, arg, (data) => {

        let payment = data.items
        if (data) {
            return res.json({
                code: Constant.SUCCESS_CODE,
                message: Constant.SUCCESS_GET_DATA,
                data: payment || {},
                total: data.page_context.page
            });
        } else {
            return res.json({
                code: Constant.REQ_DATA_ERROR_CODE,
                message: Constant.SOMETHING_WENT_WRONG
            });
        }
    })
}

function markAsPrimary(req, res) {
    var org_id = req.user.zoho_org_id; //org id will be different
    var auth_token = req.user.zoho_auth;
    var zohoBooks = new ZohoBooks({
        authtoken: auth_token,
        host: 'https://books.zoho.com/api/v3',
        organization: org_id,
    })
    let contact_person_id = req.body.id
    //https://books.zoho.com/api/v3/contacts/contactpersons/{:contact_person_id}/primary?organization_id=10234695
    let url = `/contacts/contactpersons/` + contact_person_id + `/primary`
    let reqObj = {}
    zohoBooks.api(url, 'POST', reqObj).then(function (data) {
        console.log(data)
        return res.json({
            code: Constant.SUCCESS_CODE,
            message: Constant.SUCCESS,
            data: data.address_info || {},
        });

    }).catch(function (error) {
        console.log('=error ========', error)
        return res.json({
            code: Constant.REQ_DATA_ERROR_CODE,
            message: Constant.SOMETHING_WENT_WRONG
        });
    })
}

function forInvoiceListItems(req, res) {
    console.log('bsdjbfshdf')
    var arg = {
        headers: {
            "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    }
    var org_id = req.user.zoho_org_id;
    // var search_string = req.body.search_string
    var url = config.ZOHO.url + `autocomplete/product?search_text=&item_type=sales&organization_id=` + org_id;
    // var url = config.ZOHO.url + `autocomplete/product?search_text=` + search_string + `&item_type=sales&organization_id=` + org_id;

    client.get(url, arg, (data) => {
        // console.log('resss', data)
        let payment = data.results

        if (data) {
            return res.json({
                code: Constant.SUCCESS_CODE,
                message: Constant.SUCCESS_GET_DATA,
                data: payment || [],
                // total: data.page_context.page
            });
        } else {
            return res.json({
                code: Constant.REQ_DATA_ERROR_CODE,
                message: Constant.SOMETHING_WENT_WRONG
            });
        }
    })
}

function addItemsGetInfo(req, res) {
    var arg = {
        headers: {
            "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    }
    var org_id = req.user.zoho_org_id;
    var url = config.ZOHO.url + `items/editpage?clone_item_id=&organization_id=` + org_id;
    client.get(url, arg, (data) => {

        if (data) {
            return res.json({
                code: Constant.SUCCESS_CODE,
                message: Constant.SUCCESS_GET_DATA,
                data: data || {},
            });
        } else {
            return res.json({
                code: Constant.REQ_DATA_ERROR_CODE,
                message: Constant.SOMETHING_WENT_WRONG
            });
        }
    })
}

function getInventoryAdjustments(req, res) {
    var arg = {
        headers: {
            "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    }
    var org_id = req.user.zoho_org_id;
    if (req.body.page === 0) {
        var page = req.body.page + 1;
    }
    var page = req.body.page;
    var limitVal = req.body.limit;
    var url = config.ZOHO.url + `inventoryadjustments?page=` + page + `&per_page=` + limitVal + `&filter_by=AdjustmentDate.All%2CAdjustmentType.All&sort_column=created_time&sort_order=D&usestate=true&organization_id=` + org_id;
    var url2 = config.ZOHO.url + `inventoryadjustments/editpage?organization_id=` + org_id;

    client.get(url, arg, (data) => {
        client.get(url2, arg, (response) => {

            let inventory_adjustments = data.inventory_adjustments
            if (inventory_adjustments) {
                return res.json({
                    code: Constant.SUCCESS_CODE,
                    message: Constant.SUCCESS_GET_DATA,
                    data: inventory_adjustments || {},
                    response: response,
                    total: data.page_context.page
                });
            } else {
                return res.json({
                    code: Constant.REQ_DATA_ERROR_CODE,
                    message: Constant.SOMETHING_WENT_WRONG
                });
            }
        })
    })
}

function getInventoryAdjustementDetails(req, res) {
    var arg = {
        headers: {
            "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    }
    var org_id = req.user.zoho_org_id;
    let id = req.swagger.params.id.value
    var url = config.ZOHO.url + `inventoryadjustments/` + id + `?organization_id=` + org_id;
    client.get(url, arg, (data) => {

        let inventory_adjustments = data.inventory_adjustment
        if (inventory_adjustments) {
            return res.json({
                code: Constant.SUCCESS_CODE,
                message: Constant.SUCCESS_GET_DATA,
                data: inventory_adjustments || {},
            });
        } else {
            return res.json({
                code: Constant.REQ_DATA_ERROR_CODE,
                message: Constant.SOMETHING_WENT_WRONG
            });
        }
    })
}

function getItemDetails(req, res) {
    console.log('req.body of item dertails', req.swagger.params.id.value)

    var arg = {
        headers: {
            "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    }
    var org_id = req.user.zoho_org_id;
    let id = req.swagger.params.id.value;
    var url = config.ZOHO.url + `items/` + id + `?organization_id=` + org_id;
    client.get(url, arg, (data) => {
        console.log(data.item)
        let item = data.item
        if (item) {
            return res.json({
                code: Constant.SUCCESS_CODE,
                message: Constant.SUCCESS_GET_DATA,
                data: item || {},
            });
        } else {
            return res.json({
                code: Constant.REQ_DATA_ERROR_CODE,
                message: Constant.SOMETHING_WENT_WRONG
            });
        }
    })
}

function getPriceDetails(req, res) {
    var arg = {
        headers: {
            "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    }
    var org_id = req.user.zoho_org_id;
    let id = req.swagger.params.id.value;
    var url = config.ZOHO.url + `pricebooks/editpage?pricebook_id=` + id + `&organization_id=` + org_id;

    client.get(url, arg, (data) => {
        if (data) {
            return res.json({
                code: Constant.SUCCESS_CODE,
                message: Constant.SUCCESS_GET_DATA,
                data: data || {},
            });
        } else {
            return res.json({
                code: Constant.REQ_DATA_ERROR_CODE,
                message: Constant.SOMETHING_WENT_WRONG
            });
        }
    })
}

function deleteInventoryAdjustedDetails(req, res) {
    var arg = {
        headers: {
            "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    }
    var org_id = req.user.zoho_org_id;
    let id = req.swagger.params.id.value
    var url = config.ZOHO.url + `inventoryadjustments/` + id + `?organization_id=` + org_id;
    client.delete(url, arg, (data) => {

        if (data) {
            return res.json({
                code: Constant.SUCCESS_CODE,
                message: Constant.SUCCESS_GET_DATA,
                data: data || {},
            });
        } else {
            return res.json({
                code: Constant.REQ_DATA_ERROR_CODE,
                message: Constant.SOMETHING_WENT_WRONG
            });
        }
    })
}

function getPriceList(req, res) {
    var arg = {
        headers: {
            "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    }
    var org_id = req.user.zoho_org_id;
    var url = config.ZOHO.url + `pricebooks?organization_id=` + org_id;
    client.get(url, arg, (data) => {

        let pricebooks = data.pricebooks
        if (pricebooks) {
            return res.json({
                code: Constant.SUCCESS_CODE,
                message: Constant.SUCCESS_GET_DATA,
                data: pricebooks || {},
                total: data.page_context.page
            });
        } else {
            return res.json({
                code: Constant.REQ_DATA_ERROR_CODE,
                message: Constant.SOMETHING_WENT_WRONG
            });
        }
    })
}

function getInvoiceTable() {
    var arg = {
        headers: {
            "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    }
    var org_id = req.user.zoho_org_id;
    let item_id = req.swagger.params.id.value
    var url = config.ZOHO.url + `items/` + item_id + `?date=` + date + `&organization_id=` + org_id;
    client.get(url, arg, (data) => {

        if (data) {
            return res.json({
                code: Constant.SUCCESS_CODE,
                message: Constant.SUCCESS_GET_DATA,
                data: data.data || {},
            });
        } else {
            return res.json({
                code: Constant.REQ_DATA_ERROR_CODE,
                message: Constant.SOMETHING_WENT_WRONG
            });
        }
    })
}

function getInvoiceWithTemplate(req, res) {
    var arg = {
        headers: {
            "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    }
    var org_id = req.user.zoho_org_id;
    let id = req.swagger.params.id.value
    var url = config.ZOHO.url + `invoices/` + id + `/email?organization_id=` + org_id;
    client.get(url, arg, (data) => {

        if (data) {
            return res.json({
                code: Constant.SUCCESS_CODE,
                message: Constant.SUCCESS_GET_DATA,
                data: data.data || {},
            });
        } else {
            return res.json({
                code: Constant.REQ_DATA_ERROR_CODE,
                message: Constant.SOMETHING_WENT_WRONG
            });
        }
    })
}

//adds new record of payment for customer
function addRecordPayment(req, res) {
    var arg = {
        headers: {
            "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    }
    var org_id = req.user.zoho_org_id;
    // let id = req.swagger.params.id.value
    var url = config.ZOHO.url + `autocomplete/contact?search_text=` + req.body.customer_id + `&contact_type=customer&organization_id=` + org_id;
    client.get(url, arg, (data) => {

        if (data) {
            console.log('moment>>>>>>>>>>>>', data.results[0].id)
            var customer_id = data.results[0].id
            var org_id = req.user.zoho_org_id; //org id will be different
            var auth_token = req.user.zoho_auth;
            var zohoBooks = new ZohoBooks({
                authtoken: auth_token,
                host: 'https://books.zoho.com/api/v3',
                organization: org_id,
            })
            let invoice_arr = []
            req.body.invoices.forEach(i => {
                let obj = {
                    "invoice_id": (typeof req.body.invoices[i].invoice_id != 'undefined') ? req.body.invoices[i].invoice_id : '',
                    "amount_applied": (typeof req.body.invoices[i].amount_applied != 'undefined') ? req.body.invoices[i].amount_applied : '',
                    "tax_amount_withheld": (typeof req.body.invoices[i].tax_amount_withheld != 'undefined') ? req.body.invoices[i].tax_amount_withheld : '',
                    "invoice_payment_id": (typeof req.body.invoices[i].invoice_payment_id != 'undefined') ? req.body.invoices[i].invoice_payment_id : '',
                    "apply_date": (typeof req.body.invoices[i].apply_date != 'undefined') ? req.body.invoices[i].apply_date : ''
                }
                invoice_arr.push(obj)
            });
            const momentDate = new Date(req.body.date); // Replace event.value with your date value
            const formated_date = moment(momentDate).format("YYYY-MM-DD");
            let dataObj = {
                customer_id: (typeof customer_id != 'undefined') ? customer_id : '',
                invoices: (typeof invoice_arr != 'undefined') ? invoice_arr : [],
                payment_mode: (typeof req.body.payment_mode != 'undefined') ? req.body.payment_mode : '',
                description: (typeof req.body.description != 'undefined') ? req.body.description : '',
                date: (typeof formated_date != 'undefined') ? formated_date : '',
                reference_number: (typeof req.body.reference_number != 'undefined') ? req.body.reference_number : '',
                amount: (typeof req.body.amount != 'undefined') ? req.body.amount : '',
                bank_charges: (typeof req.body.bank_charges != 'undefined') ? req.body.bank_charges : '',
                tax_account_id: (typeof req.body.tax_account_id != 'undefined') ? req.body.tax_account_id : '',
                account_id: (typeof req.body.account_id != 'undefined') ? req.body.account_id : '',
                // contact_persons: (typeof req.body.contact_persons != 'undefined') ? req.body.contact_persons : '',
                custom_fields: (typeof req.body.custom_fields != 'undefined') ? req.body.custom_fields : '',
                documents: (typeof req.body.documents != 'undefined') ? req.body.documents : '',
            }
            // var url = `/customerpayments` + `?organization_id=` + org_id + `&JSONString=` + data

            zohoBooks.api('/customerpayments', 'POST', dataObj).then(function (data) {
                // console.log(data)
                return res.json({
                    code: Constant.SUCCESS_CODE,
                    message: Constant.SUCCESS,
                    data: data.payment || {},
                });

            }).catch(function (error) {
                console.log('=error ========', error)
                return res.json({
                    code: Constant.REQ_DATA_ERROR_CODE,
                    message: Constant.SOMETHING_WENT_WRONG
                });
            })
        } else {
            return res.json({
                code: Constant.REQ_DATA_ERROR_CODE,
                message: Constant.SOMETHING_WENT_WRONG
            });
        }
    })


}

function editPaymentRecieved(req, res) {
    var org_id = req.user.zoho_org_id; //org id will be different
    var auth_token = req.user.zoho_auth;
    var zohoBooks = new ZohoBooks({
        authtoken: auth_token,
        host: 'https://books.zoho.com/api/v3',
        organization: org_id,
    })
    // console.log(req.body)

    // let DATA = {
    //     "customer_id": "952424000004184900",
    //     "invoices": [],
    //     "payment_mode": "Cash",
    //     "description": "TEST NOTES",
    //     "date": "2019-04-26",
    //     "reference_number": "1234",
    //     "exchange_rate": 1,
    //     "amount": 101,
    //     "bank_charges": 0,
    //     "tax_account_id": "952424000000035001",
    //     "account_id": "952424000000000358",
    //     "custom_fields": [],
    //     "documents": [],
    //     "payment_number_prefix": "",
    //     "payment_number_suffix": "24354"
    // }
    let invoice_arr = []
    req.body.invoices.forEach(i => {
        let obj = {
            "invoice_id": (typeof req.body.invoices[i].invoice_id != 'undefined') ? req.body.invoices[i].invoice_id : '',
            "amount_applied": (typeof req.body.invoices[i].amount_applied != 'undefined') ? req.body.invoices[i].amount_applied : '',
            "tax_amount_withheld": (typeof req.body.invoices[i].tax_amount_withheld != 'undefined') ? req.body.invoices[i].tax_amount_withheld : '',
            "invoice_payment_id": (typeof req.body.invoices[i].invoice_payment_id != 'undefined') ? req.body.invoices[i].invoice_payment_id : '',
            "apply_date": (typeof req.body.invoices[i].apply_date != 'undefined') ? req.body.invoices[i].apply_date : ''
        }
        invoice_arr.push(obj)
    });
    const momentDate = new Date(req.body.date); // Replace event.value with your date value
    const formated_date = moment(momentDate).format("YYYY-MM-DD");
    console.log('moment', formated_date)
    let reqObj = {
        customer_id: (typeof req.body.customer_id != 'undefined') ? req.body.customer_id : '',
        invoices: (typeof invoice_arr != 'undefined') ? invoice_arr : [],
        payment_mode: (typeof req.body.payment_mode != 'undefined') ? req.body.payment_mode : '',
        description: (typeof req.body.description != 'undefined') ? req.body.description : '',
        date: (typeof formated_date != 'undefined') ? formated_date : '',
        reference_number: (typeof req.body.reference_number != 'undefined') ? req.body.reference_number : '',
        exchange_rate: (typeof req.body.exchange_rate != 'undefined') ? req.body.exchange_rate : 0,
        amount: (typeof req.body.amount != 'undefined') ? req.body.amount : 0,
        bank_charges: (typeof req.body.bank_charges != 'undefined') ? req.body.bank_charges : 0,
        tax_account_id: (typeof req.body.tax_account_id != 'undefined') ? req.body.tax_account_id : '',
        account_id: (typeof req.body.account_id != 'undefined') ? req.body.account_id : '',
        // contact_persons: (typeof req.body.contact_persons != 'undefined') ? req.body.contact_persons : '',
        custom_fields: (typeof req.body.custom_fields != 'undefined') ? req.body.custom_fields : [],
        documents: (typeof req.body.documents != 'undefined') ? req.body.documents : [],
        payment_number_prefix: (typeof req.body.payment_number_prefix != 'undefined') ? req.body.payment_number_prefix : '',
        payment_number_suffix: (typeof req.body.payment_number_suffix != 'undefined') ? req.body.payment_number_suffix : '',
    }
    let payment_id = req.swagger.params.id.value
    //https://books.zoho.com/api/v3/customerpayments/952424000004843045?organization_id=653606302
    let url = `/customerpayments/` + payment_id
    zohoBooks.api(url, 'PUT', reqObj).then(function (data) {
        // console.log(data)
        return res.json({
            code: Constant.SUCCESS_CODE,
            message: Constant.SUCCESS,
            data: data.payment || {},
        });

    }).catch(function (error) {
        console.log('=error ========', error)
        return res.json({
            code: Constant.REQ_DATA_ERROR_CODE,
            message: Constant.SOMETHING_WENT_WRONG
        });
    })
}

function countZoho(req, res) {
    console.log("req.user.zoho_aut", req.user)
    var arg = {
        headers: {
            "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    }
    var org_id = req.user.zoho_org_id;
    if (req.body.page === 0) {
        var page = req.body.page + 1;
    }
    var page = req.body.page;
    var limitVal = req.body.limit;
    let urlInvoices = config.ZOHO.url + `invoices?page=` + page + `&per_page=` + limitVal + `&filter_by=Status.All&sort_column=created_time&sort_order=A&response_option=2&organization_id=` + org_id;
    client.get(urlInvoices, arg, (response) => {
        // console.log("dsfdsfdsf", response)
        let invoiceRes = response.page_context.total
        let urlContacts = config.ZOHO.url + `contacts?page=` + page + `&per_page=` + limitVal + `&filter_by=Status.All&sort_column=created_time&sort_order=A&response_option=2&organization_id=` + org_id;
        client.get(urlContacts, arg, (response1) => {
            let contactRes = response1.page_context.total
            let urlPaymentRecieved = config.ZOHO.url + `customerpayments?page=` + page + `&per_page=` + limitVal + `&filter_by=PaymentType.Invoices&sort_column=created_time&sort_order=A&response_option=2&organization_id=` + org_id
            client.get(urlPaymentRecieved, arg, (response2) => {
                let paymentRes = response2.page_context.total
                let urlItems = config.ZOHO.url + `items?page=` + page + `&per_page=` + limitVal + `&filter_by=Status.All&sort_column=created_time&sort_order=A&response_option=2&organization_id=` + org_id
                client.get(urlItems, arg, (response3) => {
                    let itemsRes = response3.page_context.total;
                    let unPaidUrl = config.ZOHO.url + `reports/invoicedetails?page=1&per_page=500&status_filter=unpaid%2Cvoid&sort_column=date&sort_order=A&filter_by=InvoiceDate.CustomDate&from_date=2019-06-01&to_date=2019-06-30&select_columns=%5B%7B%22group%22%3A%22invoice%22%2C%22field%22%3A%22status%22%7D%2C%7B%22group%22%3A%22invoice%22%2C%22field%22%3A%22date%22%7D%2C%7B%22group%22%3A%22invoice%22%2C%22field%22%3A%22due_date%22%7D%2C%7B%22group%22%3A%22invoice%22%2C%22field%22%3A%22invoice_number%22%7D%2C%7B%22group%22%3A%22invoice%22%2C%22field%22%3A%22reference_number%22%7D%2C%7B%22group%22%3A%22invoice%22%2C%22field%22%3A%22customer_name%22%7D%2C%7B%22group%22%3A%22invoice%22%2C%22field%22%3A%22bcy_total%22%7D%2C%7B%22group%22%3A%22invoice%22%2C%22field%22%3A%22bcy_balance%22%7D%5D&group_by=none&response_option=1&organization_id=` + org_id;
                    client.get(unPaidUrl, arg, (response4) => {
                        let unpaidInvoices = response4.page_context.sum_columns.bcy_balance_formatted;
                        let outstandingUrl = config.ZOHO.url + `reports/customerbalances?page=1&per_page=500&sort_order=A&sort_column=customer_name&report_date=2019-06-25&can_show_detailed_reports_list=false&response_option=1&organization_id=` + org_id
                        client.get(outstandingUrl, arg, (response5) => {
                            let outstandingBalances = response5.page_context.sum_columns.bcy_balance_formatted;
                            let paymentRecivableUrl = config.ZOHO.url + `reports/customerpayments?page=1&per_page=500&sort_column=date&sort_order=D&filter_by=PaymentDate.CustomDate%2CPaymentType.All&from_date=2019-06-01&to_date=2019-06-30&response_option=1&organization_id=` + org_id
                            client.get(paymentRecivableUrl, arg, (response6) => {
                                let paymentRecivable = response6.page_context.sum_columns.bcy_amount_formatted;
                                console.log("response6", response6.page_context.sum_columns.bcy_amount_formatted)
                                let sendResponse = {
                                    invoiceRes: invoiceRes,
                                    contactRes: contactRes,
                                    paymentRes: paymentRes,
                                    itemsRes: itemsRes,
                                    unpaidInvoices: unpaidInvoices,
                                    outstandingBalances: outstandingBalances,
                                    paymentRecivable: paymentRecivable
                                }
                                if (sendResponse) {
                                    return res.json({
                                        code: Constant.SUCCESS_CODE,
                                        message: Constant.SUCCESS_GET_DATA,
                                        data: sendResponse || {},
                                    });
                                } else {
                                    return res.json({
                                        code: Constant.REQ_DATA_ERROR_CODE,
                                        message: Constant.SOMETHING_WENT_WRONG
                                    });
                                }
                            })
                        })
                    })
                })
            })
        })
    })
}

function sendInvoiceFromZoho(req, res) {
    async function sendInvoice() {
        try {
            var data = req.body;
            let mailValue = await mails.sendMail(data.sendTo, data.subject, data.body)
            if (mailValue) {
                return res.json({
                    code: Constant.SUCCESS_CODE,
                    message: Constant.SUCCESS,
                    data: {},
                });
            } else {
                return res.json({
                    code: Constant.REQ_DATA_ERROR_CODE,
                    message: Constant.SOMETHING_WENT_WRONG
                });
            }

        } catch (error) {}
    }
    sendInvoice().then(data => {});
}

function getRetainterInvoiceById(req, res) {
    var arg = {
        headers: {
            "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    }
    var org_id = req.user.zoho_org_id;
    let id = req.swagger.params.id.value
    var url = config.ZOHO.url + `recurringinvoices/` + id + `?include=htm&organization_id=` + org_id;
    client.delete(url, arg, (data) => {

        if (data) {
            return res.json({
                code: Constant.SUCCESS_CODE,
                message: Constant.SUCCESS_GET_DATA,
                data: data || {},
            });
        } else {
            return res.json({
                code: Constant.REQ_DATA_ERROR_CODE,
                message: Constant.SOMETHING_WENT_WRONG
            });
        }
    })
}

function deleteZohoInvoice(req, res) {
    var arg = {
        headers: {
            "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    }
    var org_id = req.user.zoho_org_id;
    let id = req.swagger.params.id.value
    var url = config.ZOHO.url + `invoices/` + id + `?organization_id=` + org_id;
    client.delete(url, arg, (data) => {
        if (data) {
            return res.json({
                code: Constant.SUCCESS_CODE,
                message: Constant.DELETE_SUCCESS,
            });
        } else {
            return res.json({
                code: Constant.REQ_DATA_ERROR_CODE,
                message: Constant.SOMETHING_WENT_WRONG
            });
        }
    })
}

function filterReportByDate(req, res) {
    var stDate = req.swagger.params.startDt.value;
    var endDate = req.swagger.params.endDt.value;
    var arg = {
        headers: {
            "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    }
    var org_id = req.user.zoho_org_id;
    var url = config.ZOHO.url + `reports/customerpayments?page=1&per_page=500&sort_column=date&sort_order=D&filter_by=PaymentDate.CustomDate%2CPaymentType.All&from_date=` + stDate + `&to_date=` + endDate + `&response_option=1&organization_id=` + org_id;

    // var url = config.ZOHO.url + `reports/customerpayments?page=1&per_page=500&sort_column=date&sort_order=D&filter_by=PaymentDate.CustomDate%2CPaymentType.All&from_date=` + stDate + `&to_date=` + endDate + `&organization_id=` + org_id;

    client.get(url, arg, (data) => {
        console.log(' urllll', data)

        if (data) {
            return res.json({
                code: Constant.SUCCESS_CODE,
                data: data,
                total: data.page_context,
                message: Constant.SUCCESS_GET_DATA,
            });
        } else {
            return res.json({
                code: Constant.REQ_DATA_ERROR_CODE,
                message: Constant.SOMETHING_WENT_WRONG
            });
        }
    })
}

function filterReportByDateRefund(req, res) {
    var stDate = req.swagger.params.startDt.value;
    var endDate = req.swagger.params.endDt.value;
    var arg = {
        headers: {
            "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    }
    var org_id = req.user.zoho_org_id;
    var url = config.ZOHO.url + `reports/refundhistory?page=1&per_page=500&sort_order=A&filter_by=RefundDate.CustomDate&from_date=` + stDate + `&to_date=` + endDate + `&response_option=1&organization_id=` + org_id;

    // var url = config.ZOHO.url + `reports/customerpayments?page=1&per_page=500&sort_column=date&sort_order=D&filter_by=PaymentDate.CustomDate%2CPaymentType.All&from_date=` + stDate + `&to_date=` + endDate + `&organization_id=` + org_id;

    client.get(url, arg, (data) => {
        console.log(' urllll', data)

        if (data) {
            return res.json({
                code: Constant.SUCCESS_CODE,
                data: data,
                total: data.page_context,
                message: Constant.SUCCESS_GET_DATA,
            });
        } else {
            return res.json({
                code: Constant.REQ_DATA_ERROR_CODE,
                message: Constant.SOMETHING_WENT_WRONG
            });
        }
    })
}

function filterReportByDateCreditNote(req, res) {
    var stDate = req.swagger.params.startDt.value;
    var endDate = req.swagger.params.endDt.value;
    var arg = {
        headers: {
            "Authorization": "Zoho-authtoken " + req.user.zoho_auth,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    }
    var org_id = req.user.zoho_org_id;
    var url = config.ZOHO.url + `reports/creditnotedetails?page=1&per_page=500&sort_order=A&filter_by=CreditNotesDate.CustomDate&from_date=` + stDate + `&to_date=` + endDate + `&response_option=1&organization_id=` + org_id;

    client.get(url, arg, (data) => {
        console.log(' urllll', data)

        if (data) {
            return res.json({
                code: Constant.SUCCESS_CODE,
                data: data['creditnotes'],
                total: data.page_context,
                message: Constant.SUCCESS_GET_DATA,
            });
        } else {
            return res.json({
                code: Constant.REQ_DATA_ERROR_CODE,
                message: Constant.SOMETHING_WENT_WRONG
            });
        }
    })
}

function getOutstandingBal(req, res) {

    async function get_invoices_count() {
        try {
            let condition_user = {
                _id: req.user.id
            }
            let user_details = await commonQuery.findoneData(USER, condition_user);


            var args = {
                headers: {
                    "Authorization": "Zoho-authtoken 4e8c4a6f8996aaaecdb77183ba8d6bf3",
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                }
            };
            if (user_details.bac_account_id != '') {
                if (user_details.bac_account_id.substring(0, 3) === "BER") {
                    var url = ``;
                    url = config.ZOHO.url + `invoices?search_text=` + user_details.first_name + "+" + user_details.last_name + `&organization_id=678470292`;

                    client.get(url, args, (data) => {
                        var customer_id = data.invoices[0].customer_id;
                        var url2 = '';
                        url2 = config.ZOHO.url + `contacts/` + customer_id + `?organization_id=653606302`;
                        client.get(url2, args, (data2) => {
                            console.log("data2", data2.contact.outstanding_receivable_amount)
                            if (data2) {
                                return res.json({
                                    code: Constant.SUCCESS_CODE,
                                    data: data2.contact.outstanding_receivable_amount,
                                    message: Constant.SUCCESS,
                                });
                            } else if (count === 0) {
                                return res.json({
                                    code: Constant.SUCCESS_CODE,
                                    data: 0,
                                    message: Constant.SUCCESS,
                                });
                            }
                        })
                    })
                } else {

                    var url = ``;
                    url = config.ZOHO.url + `invoices?search_text=` + user_details.first_name + "+" + user_details.last_name + `&organization_id=653606302`;

                    client.get(url, args, (data) => {
                        var customer_id = data.invoices[0].customer_id;
                        var url2 = '';
                        url2 = config.ZOHO.url + `contacts/` + customer_id + `?organization_id=653606302`;
                        client.get(url2, args, (data2) => {
                            console.log("data2", data2.contact.outstanding_receivable_amount)
                            if (data2) {
                                return res.json({
                                    code: Constant.SUCCESS_CODE,
                                    data: data2.contact.outstanding_receivable_amount,
                                    message: Constant.SUCCESS,
                                });
                            } else if (count === 0) {
                                return res.json({
                                    code: Constant.SUCCESS_CODE,
                                    data: 0,
                                    message: Constant.SUCCESS,
                                });
                            }
                        })
                    })
                }
            }
        } catch (error) {
            console.log("shdfgdjhsgdsjg", error)
            return res.json({
                code: Constant.REQ_DATA_ERROR_CODE,
                message: Constant.NOT_FOUND_DATA
            });
        }
    }
    get_invoices_count().then(dat => {});
}