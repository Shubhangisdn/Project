'use strict';

var mongoose = require('mongoose');
var StaffTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    permission: {
        type: String,        
        default: ''
    },
    is_active: {
        type: Boolean,
        default: true
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
    created_date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

var StaffType = mongoose.model('StaffType', StaffTypeSchema);
module.exports = StaffType;