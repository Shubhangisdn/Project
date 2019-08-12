'use strict';

const config = {
    local: {
        SECRET: 'crm@$12&*01',
        DATABASE: {
            dbname: 'baccourier',
            host: 'mongodb://54.233.144.249:27717/',
            port: 0,
            username: 'baccourier',
            password: 'Cr438UrBcA'
        }
    },

};
module.exports.get = function get(env) {
    return config[env] || config.default;
}