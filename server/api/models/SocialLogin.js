'use strict';

var mongoose = require('mongoose');

var SocialLogin = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    email: {
        type: String,
        required: true,
        default: ''
    },
    name: {
        type: String,
        required: true,
        default: ''
    },
    provider: {
        type: String,
        required: true,
        default: ''
    },
    provider_id: {
        type: String,
        required: true,
        default: ''
    },
    provider_pic: {
        type: String,
        required: true,
        default: ''
    },
    token: {
        type: String,
        required: true,
        default: ''
    },
    status: {
        type: Boolean,
        default: false
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('SocialLogin', SocialLogin);