'use strict';

var mongoose = require('mongoose');

var counters = new mongoose.Schema({
    _id: {
        type: String,
        default: 'mailboxid'
    },
    sequence_value: {
        type: Number,
        default: 1
    },
}, {
    timestamps: true
});
module.exports = mongoose.model('counters', counters);