'use strict';

var mongoose = require('mongoose');
var StaffProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    staff_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staffs'
    },
    email: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: ''
    },
    image_name: {
        type: String,
        required: false,
        default: ''
    },
    image_path: {
        type: String,
        required: false,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    zoho_credentails: {
        type: [{}],
        required: false
    },
    status: {
        type: Number,
        default: 1
    },
    created_date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

var Staff = mongoose.model('staffProfile', StaffProfileSchema);
module.exports = Staff;