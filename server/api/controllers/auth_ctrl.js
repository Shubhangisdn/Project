'use strict';

var mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    validator = require('../../config/validator.js'),
    Config = require('../../config/config.js').get(process.env.NODE_ENV || 'staging'),
    Constant = require('../../config/constant.js'),
    STAFFF = mongoose.model('Staffs'),
    LOGINLOGS = mongoose.model('LoginLogs'),
    commonQuery = require('./../lib/commonQuery'),
    response = require('./../lib/response_handler'),
    staffService = require('./../service/staff_service'),
    bcrypt = require('bcrypt');

var salt = bcrypt.genSaltSync(10);

module.exports = {
    staffLogin: staffLogin
};


/**
 * Function is use Staff login
 * @access private
 * @return json
 * Created
 * @smartData Enterprises (I) Ltd
 * Created Date 20-09-2018
 */
function staffLogin(req, res) {
    async function asy_login() {
        try {
            var jwtToken = null;
            if ((req.body.email) && (req.body.password)) {
                if (!validator.isEmail(req.body.email)) {
                    return response(res, Constant.ERROR_CODE, Constant.INVALID_EMAIL, {});
                }
                let condition = {
                    email: req.body.email,
                    status: Constant.STATUS_ACTIVE
                }
                let staff = await commonQuery.findoneData(STAFFF, condition)
                if (!staff) {
                    return response(res, Constant.ERROR_CODE, Constant.EMAIL_NOT_REGISTRED, {});
                }
                if (!bcrypt.compareSync(req.body.password, staff.password)) {
                    return response(res, Constant.ERROR_CODE, Constant.INVALID_LOGIN_DETAILS, {});
                }
                if (staff.status == Constant.STATUS_INACTIVE) {
                    return response(res, Constant.ERROR_CODE, Constant.ACCOUNT_INACTIVE, {});
                } else if (staff.status == Constant.STATUS_DELETED) {
                    return response(res, Constant.ERROR_CODE, Constant.ACCOUNT_DELETED, {});
                } else {
                    let obj_add = {
                        staff_id: staff._id,
                        status: Constant.STATUS_ACTIVE,
                        type: Constant.LOGIN_LOGS_CHECKIN
                    }
                    await commonQuery.InsertIntoCollection(LOGINLOGS, obj_add);

                    var expirationDuration = 60 * 60 * 8 * 1; // expiration duration 8 Hours

                    let staff_details = await staffService.getStaffDetailsById(staff._id);
                    var params = {
                        id: staff._id,
                        name: staff_details.name,
                        is_super_admin: staff.is_super_admin,
                        permission: staff_details.staff_id.type.permission || '',
                        permission_name: staff_details.staff_id.type.name || '',
                        permission_type: staff_details.staff_id.type._id || '',
                        zoho_auth: staff_details.zoho_credentails[0].authtoken,
                        zoho_org_id: staff_details.zoho_credentails[0].organization_id
                    }
                    jwtToken = jwt.sign(params, Config.SECRET, {
                        expiresIn: expirationDuration
                    });
                    if (validator.isValid(jwtToken)) {
                        return response(res, Constant.SUCCESS_CODE, Constant.LOGIN_SUCCESS, staff_details, '', 'Bearer ' + jwtToken);
                    } else {
                        throw 'Token error.';
                    }

                }

            } else {
                return response(res, Constant.ERROR_CODE, Constant.LOGIN_REQUIRED_FIELDS, {});
            }
        } catch (err) {
            console.log("err", err)
            return response(res, Constant.ERROR_CODE, Constant.SOMETHING_WENT_WRONG, {});
        }

    }
    asy_login().then(dat => {});
}