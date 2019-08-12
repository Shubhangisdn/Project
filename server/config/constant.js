'use strict';

module.exports = {
  SUCCESS_CODE: 200,
  REQ_DATA_ERROR_CODE: 202,
  ERROR_CODE: 400,
  INVALID_CODE: 401,
  ALLREADY_EXIST: 201,
  INACTIVATE: 406,
  NOT_FOUND: 404,
  INVALID_AUTH_CODE: 402,

  //ORDER STATUS
  REQUEST_ACCEPTED: "Accepted",
  INITIATED: "Initiated",
  IN_TRANIST: "In Transit",
  VERIFIED: "Landed",
  TO_BE_DELIVERED: "To Be Delivered",
  RELEASED: "Released",
  INVOICED: "Invoiced",
  DELIVERED: "Delivered",


  //STATUS
  STATUS_ACTIVE: 1,
  STATUS_PENDING: 2,
  STATUS_EXPIRED: 3,
  STATUS_DELETED: 4,
  STATUS_INACTIVE: 5,

  //IMAGE PATH
  STAFF_PATH: '/profile_img',

  // CHARGERS CALCULATION
  CHARGES_ADMIN: 9,
  CHARGES_HAZMAT: 10,
  CHARGES_ONE_POUNDS: 8,
  CHARGES_EXTRA_POUNDS: 3,
  CHARGES_EQUAL_POUNDS: 217,
  CHARGES_WEIGHT: 5,
  //DOWN PAYMENT AMOUNT
  DWON_PAYMENT_FIFTY: 50,
  DWON_PAYMENT_SEVENTY_FIVE: 75,



  //Mailbox calculator
  MAILBOX_CHARGES_EQUAL_POUND: 217,
  MAILBOX_CHARGES_EXTRA_POUND: 2.8,
  INSURANCE: 1.9,

  //ADMIN USERNAME
  ADMIN_USER_ID: "devon@yopmail.com",

  MAILBOX_CALCI_SUCCESS: "Here is mailbox calculator amount.",
  //EMAIL TEMPLATE CODE
  EMAIL_CODE_TEST: 'test',
  EMAIL_CODE_TEST2: 'test2',
  EMAIL_CODE_TO_ADMIN: 'admin',
  EMAIL_CODE_SERVICE: 'Service',
  FORGOT_PASSWORD: "forgot-password",
  ADMIN_FORGOT_PSD: "admin_forget_password",
  EAMIL_CODE_USER_PASSWORD: 'password',
  CUSTOMER_CREATED: "Customer",
  PROFILE_CODE_UPDATE: "profile",
  ADMIN_PROFILE_UPDATE: "admin_profile_update",
  GET_QUOTE_CHANGED: "Get quote change",
  MAILBOX: "mailbox",
  CUSTOMER_HELP: "customer-help",
  CUSTOMER_CREATED_SIGNUP: "new_customer_signup",
  CONTACT_INFO: "contact-info",
  ADDRESS_UPDATED: "address-update",
  FILE_PATH_SHIPPING: '/home/nupurjaurkar/Documents/SupportProject/',
  // Admin email
  ADMIN_EMAIL_ID: 'bac@yopmail.com',
  INVOICE: "Invoice",

  DATE_NOT_AVAILABLE: 'There are no more available slots for this date, please select another date',
  TIME_SLOT_NOT_AVAILABLE: 'There are no more available slots for this time slot, please select another time slot',
  ENABLE_FETCH_DATA: 'Unable to fetch data',
  //LOGIN LOGS
  LOGIN_LOGS_CHECKIN: 'checkin',
  LOGIN_LOGS_CHECKOUT: 'checkout',
  DEFAULT_PASSWORD: '123456',
  AUTHENTICATION_FAILED: 'Authentication failed',
  //COMMON MESSAGE
  ADDED_SUCCESS: ' added successfully.',
  ADDED_UNSUCCESS: ' not added successfully.',
  UPDATED_SUCCESS: ' updated successfully.',
  UPDATED_UNSUCCESS: ' not updated successfully.',
  DELETE_SUCCESS: 'Successfuly deleted',
  DELETE_FAILED: 'Deletetion failed',
  SOMETHING_WENT_WRONG: 'Something went wrong',
  ALLREADY_REGISTERED: 'Already Registered.',
  FOUND_MESSAGE: 'Available.',
  NOT_FOUND_MESSAGE: ' Not found.',
  SUCCESS_GET_DATA: 'Successfully get data',
  NOT_FOUND_DATA: 'Data Not found.',
  NOT_AVALIBLE_DATA: 'Not avalible.',
  VALID_TOKEN: 'Valid Token.',
  NOT_VALID_TOKEN: 'Not a Valid Token.',
  INTERNAL_ERROR: 'Request could not be processed. Please try again.',
  DATA_FETCH_SUCCESS: 'Data fetch successfully.',
  IMAGE_UPDALOAD_ERROR: 'Somthing went wrong while uploading Image.',
  //User Registration/login
  SIGNUP_SUCCESS: 'User Signup successfully. Please Verfiy the email',
  DEACTIVATED_SUCCESS: 'Your account has been deactivated successfully',
  DEACTIVATED_UNSUCCESS: 'Your account can not be deactivated now. Please try again',
  ACTIVATED_SUCCESS: 'Your account has been activated successfully',
  ACTIVATED_UNSUCCESS: 'Your account can not be activated now. Please try again',
  INVALID_EMAIL: 'Email is not valid.',
  INVALID_EMAIL_CODE: 'Email is not valid.',
  REQUIRED_REGISTER_FIELDS: 'First name, Last name, Email id and password is required.',
  PASSWORD_LENGTH_GREATER_THAN_FIVE: 'Password should be at least 6 characters.',
  EMAIL_ALREADY_EXIST: 'Email already exist.',
  LOGIN_REQUIRED_FIELDS: 'Email and password is required.',
  EMAIL_NOT_FOUND: 'Email Not found.',
  EMAIL_NOT_REGISTRED: 'Email Not register. Please register.',
  INVALID_LOGIN_DETAILS: 'Email/password is not correct.',
  VERIFY_ACCOUNT: 'Your Account is not active. Please activate Mural Monkey account by verifying through email.',
  INVALID_CURRENT_PASSWORD: 'Current password is invalid.',
  PASSWORD_CHANGED_SUCCESS: 'Password changed successfully.',
  PASSWORD_SENT_SUCCESS: 'Change Password request have been sent to your mail. Please verify it in one hour.',
  PASSWORD_SENT_UNSUCCESS: 'Could not process Change Password request. Please try again later.',
  PASSWORD_IS_INVALID: 'Invalid Password',
  PASSWORD_AND_CONFIRM_PASSWORD_FAILED_TO_MATCH: "Password and confirm password do not match",
  ENTERED_AND_ORIGINAL_PASSWORD_COMPARE: "Entered old password doesn't match original password",
  NOT_PROPER_DATA: 'Request data is not proper',
  LOGIN_SUCCESS: 'Login Successfully.',
  BRANCHCHANGED: 'Branch changed Successfully.',
  IMPROPER_DATA: 'This package not belongs to you.',
  LOGOUT_SUCCESS: 'Logout Successfully.',
  NOT_AUTHORISED_USER: 'User not authorised.',
  DATA_NOT_FOUND: 'Data Not found.',
  ACCOUNT_DEACTIVATED: "Account deactivated",
  SIGNIN_SUCCESS: "Logged in successfully",

  //Staff
  STAFF_SAVE_SUCCESS: 'Staff saved successfully.',
  STAFF_SAVE_UNSUCCESS: 'Staff did not save.',
  STAFF_LIST_SUCCESS: 'Staff data is here',
  STAFF_LIST_UNSUCCESS: 'Staff list is empty',
  STAFF_UPDATE_SUCCESS: 'Staff Updated successfully.',
  STAFF_SAVE_UNSUCCESS: 'Staff did not save.',
  STAFF_DELETED_SUCCESS: 'Staff Deleted successfully.',
  STAFF_IMAGE_ADD_SUCCESS: "Staff image added succesfully.",
  STAFF_IMAGE_ADD_FAILED: "Staff image adding failed.",


};