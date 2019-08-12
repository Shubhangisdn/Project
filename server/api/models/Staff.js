'use strict';

var mongoose = require('mongoose');
var StaffSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StaffType',
        required: true
    },
    is_super_admin: {
        type: Boolean,
        default: false
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

var Staff = mongoose.model('Staffs', StaffSchema);
module.exports = Staff;