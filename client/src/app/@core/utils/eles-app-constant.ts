/*
Other Person: N/A
Coded Start Date: 10-09-2018
Coded End Date: cont.
Description: Following is used to all constants of API(url)
*/

import { environment } from './../../../environments/environment';
export class ElesAppConst {
  private static appurl = environment.url;

  public static get APP_URL(): string { return this.appurl; };
  //customer signup & signin
  public static get REGISTER(): string { return this.appurl + 'f/customer'; };
  public static get CUSTOMER_LOGIN(): string { return this.appurl + 'f/customer/login'; };
  public static get MAILBOX_LOGIN(): string { return this.appurl + 'f/mailbox/login'; };


  public static get CUSTOMER_SOCIAL_LOGIN(): string { return this.appurl + 'f/customer/'; };
  //add staff
  public static get ADD_STAFF(): string { return this.appurl + 'addStaff'; };
  //list staff
  public static get GET_STAFFS(): string { return this.appurl + 'getStaffs'; };
  //search staff
  // 
  public static get SEARCH_STAFF(): string { return this.appurl + 'searchStaff'; };

  //add staff
  public static get ADD_STAFF_TYPE(): string { return this.appurl + 'addStaffType'; };
  //list staff type    
  public static get GET_STAFFTYPES(): string { return this.appurl + 'getStaffTypes'; };
  // delete staff
  public static get DELETE_STAFF(): string { return this.appurl + 'staff/'; };
  //update staff
  public static get UPDATE_STAFF_DETAIL(): string { return this.appurl + 'staff'; };
  //staff detail by id
  public static get ADD_STAFF_DETAIL(): string { return this.appurl + 'staff'; };
  //list staff type    
  public static get GET_STAFF_TYPES(): string { return this.appurl + 'getStaffTypes'; };
  //delete staff type    
  public static get DELETE_STAFF_TYPE(): string { return this.appurl + 'staffType/'; };
  //staff type by id
  public static get ADD_STAFF_TYPE_DETAIL(): string { return this.appurl + 'staffType'; };
  //update staff type    
  public static get UPDATE_STAFF_TYPE_DETAIL(): string { return this.appurl + 'staffType'; };
  //add staff permissions
  public static get ADD_STAFF_PERMISSION(): string { return this.appurl + 'permission'; };
  //gettingStaffDetail
  public static get GETTING_STAFF_DETAILS(): string { return this.appurl + 'gettingStaffDetail'; };
  //get permissions
  public static get GET_STAFF_PERMISSIONS_LIST(): string { return this.appurl + 'permission/list'; };
  public static get GET_STAFF_PARENT_PERMISSIONS_LIST(): string { return this.appurl + 'permission/parent'; };
  //update staff/admins details
  public static get UPDATE_STAFF(): string { return this.appurl + 'staff'; };
  //change password
  public static get UPLOAD_STAFF_IMAGE(): string { return this.appurl + 'StaffImageUpload'; };
  public static get UPLOAD_LOGO(): string { return this.appurl + 'uploadLogo'; };

  public static get GET_LOGO(): string { return this.appurl + 'uploadLogo'; };

  public static get GET_LOGO_DASHBOARD(): string { return this.appurl + 'f/logo'; };

  public static get STAFF_CHANGE_PASSWORD(): string { return this.appurl + 'staff/changeStaffPassword'; };
  public static get PDF_IMAGE(): string { return this.appurl + 'uploadPdfImage'; };

  // get checkin checkout staff data
  public static get GET_IN_OUT_LIST(): string { return this.appurl + 'staff/inout/list'; };
  public static get GET_IN_OUT_TIME(): string { return this.appurl + 'staff/inout/time'; };

  //staff login
  public static get STAFF_LOGIN(): string { return this.appurl + 'f/staff/login'; };
  public static get ZOHO_BRANCH_SWITCH(): string { return this.appurl + 'zoho/branch/switch'; };


  public static get STAFF_LOGOUT(): string { return this.appurl + 'staff/logout'; };
  //get quote
  public static get GET_QUOTE(): string { return this.appurl + 'f/addQuote'; };
  public static get MAILBOX_CALCULATOR(): string { return this.appurl + 'f/mailboxCalculator'; };

  public static get UPDATE_GET_QUOTE(): string { return this.appurl + 'f/addQuote'; };
  public static get GET_QUOTE_DETAIL(): string { return this.appurl + 'f/addQuote'; };
  public static get GET_QUOTE_DATA_BY_ID(): string { return this.appurl + 'quote-data'; };
  // public static get UPDATE_CUSTOMER_GET_QUOTE(): string { return this.appurl + 'f/addQuote'; };

  // Email Template 
  public static get ADD_EMAILTEMPLATE(): string { return this.appurl + 'addEmailTemplate'; };
  public static get UPDATE_EMAILTEMPLATE(): string { return this.appurl + 'emailTemplateUpdate'; };
  public static get DELETE_EmailTemplate(): string { return this.appurl + 'addEmailTemplate/'; };

  // Email Template List
  public static get GET_EMAIL_TEMPLATES(): string { return this.appurl + 'getEmailTemplates'; };
  public static get GET_REGIONS_FOR_LOCATIONS(): string { return this.appurl + 'getRegionsData'; };


  public static get GET_EMAIL_TEMPLATE_BY_ID(): string { return this.appurl + 'editEmailTemplate'; };

  public static get GET_QUOTE_CHARGES(): string { return this.appurl + 'getQuoteCharges'; };

  //get product type
  public static get GET_PRODUCT_TYPE(): string { return this.appurl + 'f/getProductTypes'; };
  public static get ADD_PRODUCT(): string { return this.appurl + 'addProduct'; };
  public static get DELETE_PRODUCT(): string { return this.appurl + 'Product/'; };
  public static get EDIT_PRODUCT(): string { return this.appurl + 'Product'; };
  public static get UPDATE_PRODUCT(): string { return this.appurl + 'Product'; };
  public static get GET_PRODUCT_BY_TYPE(): string { return this.appurl + 'f/getProductByType'; };
  //restricted 


  public static get ADD_RESTRICTED_ITEM(): string { return this.appurl + 'addRestrictedItem'; };
  public static get GET_RESTRICTED_ITEM(): string { return this.appurl + 'f/getRestrictedItem'; };
  public static get FETCH_RESTRICTED_ITEM(): string { return this.appurl + 'fetchRestrictedItem'; };
  public static get EDIT_RESTRICTED_ITEM(): string { return this.appurl + 'restrictedItem'; };
  public static get UPDATE_RESTRICTED_ITEM(): string { return this.appurl + 'restrictedItem'; };
  public static get DELETE_RESTRICTED_ITEM(): string { return this.appurl + 'restrictedItem/'; };

  //Dilvery rates based on location
  public static get ADD_DELIVERY_RATE(): string { return this.appurl + 'addDeliveryRate'; };
  public static get ADD_LOCATION(): string { return this.appurl + 'addLocation'; };

  public static get GET_DELIVERY_RATES(): string { return this.appurl + 'f/getDeliveryRates'; };
  public static get ADD_REGION(): string { return this.appurl + 'addRegion'; };
  public static get DELETE_REGION(): string { return this.appurl + 'deleteRegion'; };


  public static get GET_REGIONS(): string { return this.appurl + 'f/getRegions'; };

  public static get GET_DELIVERY_RATES_WITH_REGION(): string { return this.appurl + 'getDeliveryRatesWithRegion'; };
  public static get GET_LOCATIONS(): string { return this.appurl + 'f/getLocations'; };


  public static get GET_DELIVERY_RATE_BY_ID(): string { return this.appurl + 'deliveryRate'; };
  public static get UPDATE_DELIVERY_RATE(): string { return this.appurl + 'deliveryRate'; };
  public static get DELETE_DELIVERY_RATE(): string { return this.appurl + 'deliveryRate/'; };


  public static get GET_RATES(): string { return this.appurl + 'getRatesOfLocation'; };
  public static get DELETE_RATE(): string { return this.appurl + 'getRatesOfLocation/'; };


  public static get GET_STAFF_ASSIGN_PERMISSION(): string { return this.appurl + 'staff/assignPermission'; };
  public static get GET_REGION_BY_ID(): string { return this.appurl + 'getRegionsByid'; };
  public static get UPDATE_REGION(): string { return this.appurl + 'addRegion'; };

  //customer section

  public static get GET_CUSTOMER_DETAILS(): string { return this.appurl + 'f/customerDetail'; };
  public static get CHANGE_PASSWORD(): string { return this.appurl + 'changePassword'; };
  public static get CHANGE_PLAN(): string { return this.appurl + 'changePlan'; };


  //subscription plan
  public static get ADD_PLAN(): string { return this.appurl + 'addPlan'; };
  public static get GET_PLANS(): string { return this.appurl + 'getPlans'; };
  public static get DELETE_PLAN(): string { return this.appurl + 'addPlan/'; };
  public static get GET_PLAN_BY_ID(): string { return this.appurl + 'addPlan'; };
  public static get UPDATE_PLAN(): string { return this.appurl + 'addPlan'; };

  //block date
  public static get BLOCK_DATE(): string { return this.appurl + 'blockDate'; };
  public static get UNBLOCK_DATE(): string { return this.appurl + 'unblockDate'; };
  public static get GET_BLOCKED_DATE(): string { return this.appurl + 'f/getBlockDate'; };
  public static get GET_BLOCKED_DATES(): string { return this.appurl + 'getBlockedDate'; };
  public static get UPDATE_BLOCKED_DATE(): string { return this.appurl + 'updateBlockDate'; };
  public static get DELETE_BLOCKED_DATE(): string { return this.appurl + 'blockDate/'; };
  public static get SEARCH_BLOCKED_DATE(): string { return this.appurl + 'searchBlockDate/'; };


  //add service
  public static get ADD_SERVICE(): string { return this.appurl + 'f/addService'; };
  public static get SERVICE_BY_ID(): string { return this.appurl + 'f/addService'; };
  public static get DELETE_SERVICE(): string { return this.appurl + 'f/addService/'; };

  //place a order
  public static get ADD_ORDER_PRODUCT(): string { return this.appurl + 'order'; };
  public static get GET_CART_ITEMS(): string { return this.appurl + 'order'; };
  public static get GET_ITEM_CART(): string { return this.appurl + 'cart'; };
  public static get REMOVE_ITEM(): string { return this.appurl + 'cart'; };
  public static get UPDATE_CART_ITEM(): string { return this.appurl + 'cart'; };

  //locations
  public static get STATES(): string { return this.appurl + 'f/states'; };
  public static get REGIONS(): string { return this.appurl + 'f/regions'; };
  public static get AVAILABILTY_CHECK(): string { return this.appurl + 'f/availabiltyCheck'; };
  public static get AVAILABILTY_CHECK_TIME(): string { return this.appurl + 'f/availabiltyCheckTime'; };


  public static get CITIES(): string { return this.appurl + 'f/cities/forRates'; };
  public static get DELETE_LOCATION(): string { return this.appurl + 'deleteLocation'; };
  public static get DELETE_REGION_DATA(): string { return this.appurl + 'deleteRegionData'; };


  // customer shipping requests
  public static get SHIPPING_REQUEST_ITEMS(): string { return this.appurl + 'shipping/request'; };
  public static get SEARCH_PAYMENT_PICKUP(): string { return this.appurl + 'searchPaymentPickup'; };
  public static get FORGOT_PASSWORD(): string { return this.appurl + 'f/resetPassword'; };
  public static get RESET_PASSWORD(): string { return this.appurl + 'f/updatepassword'; };
  public static get ADMIN_FORGOT_PASSWORD(): string { return this.appurl + 'f/adminresetPassword'; };
  public static get ADMIN_RESET_PASSWORD(): string { return this.appurl + 'f/adminupdatepassword'; };
  public static get SEARCH_DELIVERY_DATE(): string { return this.appurl + 'searchDeliveryDate/'; };

  //customer-side order list
  public static get GET_CUSTOMER_ORDER(): string { return this.appurl + 'f/shipping/request'; };

  //update customer profile details
  // public static get UPDATE_CUSTOMER_DETAILS(): string { return this.appurl + 'f/customerDetail'; };

  // faq category
  public static get ADD_FAQ_CATEGORY(): string { return this.appurl + 'faqCategory'; };
  public static get GET_FAQ_CATEGORY(): string { return this.appurl + 'f/getfaqCategory'; };
  public static get DELETE_FAQ_CATEGORY(): string { return this.appurl + 'f/getfaqCategory/'; };
  public static get FAQ_CATEGORY_BY_ID(): string { return this.appurl + 'faqCategory'; };
  public static get UPDATE_FAQ_CATEGORY(): string { return this.appurl + 'f/getfaqCategory'; };
  public static get SEND_CONTACT(): string { return this.appurl + 'f/sendContact'; };

  // FAQ
  public static get ADD_FAQ(): string { return this.appurl + 'faq'; };
  public static get FAQ_BY_FAQ_CATEGORY_ID(): string { return this.appurl + 'faq'; };
  public static get GET_FAQ(): string { return this.appurl + 'f/getFaq'; };
  public static get DELETE_FAQ(): string { return this.appurl + 'faq/'; };

  public static get FAQ_BY_ID(): string { return this.appurl + 'faqByID'; };
  public static get UPDATE_FAQ(): string { return this.appurl + 'faq'; };
  public static get UNDO_RELEASE(): string { return this.appurl + 'undoRelease/'; };

  public static get UPDATE_CUSTOMER_DETAILS(): string { return this.appurl + 'updateCustomerDetails'; };
  public static get GET_CUSTOMER_QUOTE(): string { return this.appurl + 'getCustomerQuote'; };
  public static get DELETE_QUOTE_DETAILS(): string { return this.appurl + 'deletequotedetails'; };
  public static get GET_CUSTOMER_QUOTE_BY_QOUTE_ID(): string { return this.appurl + 'customer/getbyid'; };
  public static get GET_FAQ_DATA(): string { return this.appurl + 'f/FAQS'; };
  public static get GET_QUOTES_BY_LIMIT(): string { return this.appurl + 'getQuotesById'; };
  public static get DELETE_BULK_QUOTE(): string { return this.appurl + 'deleteQuoteInBulk/'; };
  public static get VERIFY_PACKAGE(): string { return this.appurl + 'verifyPackageByBarcode'; };
  public static get CLEAR_SHIPPING(): string { return this.appurl + 'clearShipping'; };


  //bank management
  public static get ADD_BANK_DETAILS(): string { return this.appurl + 'addbankdetails'; };
  public static get GET_BANK_DETAILS_BY_ID(): string { return this.appurl + 'bankdetails'; };
  public static get UPDATE_BANK_DETAILS(): string { return this.appurl + 'bankdetails'; };
  public static get GET_BANK_DEAILS_LIST(): string { return this.appurl + 'getBankDetails'; };
  public static get DELETE_BANK_DETAILS(): string { return this.appurl + 'bankdetails/'; };
  public static get GET_QUOTE_DATA(): string { return this.appurl + 'quote-data'; };
  public static get GET_PROFILE_UPLOAD(): string { return this.appurl + 'profile/upload'; };

  public static get BECOME_MAILBOX(): string { return this.appurl + 'become-mailbox'; };

  // mailbox service 
  public static get ADD_MAILBOX(): string { return this.appurl + 'f/mailbox'; };
  public static get MAILBOX_LIST(): string { return this.appurl + 'getAllmailbox'; };
  public static get SEARCH_MAILBOX(): string { return this.appurl + 'mailbox'; };
  public static get DELETE_MAILBOX(): string { return this.appurl + 'mailbox/'; };
  public static get MAILBOX_BY_ID(): string { return this.appurl + 'mailboxService'; };
  public static get UPDATE_MAILBOX(): string { return this.appurl + 'mailboxService'; };
  public static get MAILBOX_EMAIL_LIST(): string { return this.appurl + 'mailboxEmails'; };
  public static get RESEND_NOTIFICATION(): string { return this.appurl + 'resendNotification'; };
  public static get SEND_TO_MUTLIPLE_EMAILS(): string { return this.appurl + 'sendToMutlipleEmails'; };
  public static get GENERATE_SHIPPING_FROM_FILE(): string { return this.appurl + 'generateShippingFromFile'; };
  public static get GET_PAY_INFO_BY_ID(): string { return this.appurl + 'getInvcById'; };


  //zoho books
  public static get PAYMENTS_FROM_ZOHO(): string { return this.appurl + 'paymentszoho'; };
  public static get INVOICE_FROM_ZOHO(): string { return this.appurl + 'zohoBooks'; };
  public static get RECURRING_INVOICE_FROM_ZOHO(): string { return this.appurl + 'recurringInvoice'; };


  public static get INVENTORY_DETAIL(): string { return this.appurl + 'inventoryDetails'; };
  public static get DELETE_INVENTORY_DETAIL(): string { return this.appurl + 'inventoryDetails/'; };
  public static get ITEM_DETAIL(): string { return this.appurl + 'itemDetails'; };
  public static get PRICE_DETAIL(): string { return this.appurl + 'priceDetails'; };
  public static get GET_INVOIC_INFO_BY_ID(): string { return this.appurl + 'getInvcById'; };
  public static get SHOW_ADDRESS_BY_ID(): string { return this.appurl + 'getAddressById'; };
  public static get ADD_BILLING_ADDRESS(): string { return this.appurl + 'userPackageAddress'; };
  public static get GET_INVOICE_FOR_EDITPAGE(): string { return this.appurl + 'getInvoiceForEditpage'; };


  //CUSTOMER HELP
  public static get ADD_CUSTOMER_HELP_DETAILS(): string { return this.appurl + 'f/addHelpDetails'; };

  // shipping management  
  public static get GET_INFORMATION_DETAILS_LIST(): string { return this.appurl + 'f/getInformationDetails'; };
  public static get GENERATE_INVOICE(): string { return this.appurl + 'createInvoices'; };

  public static get GET_USERS_DATA(): string { return this.appurl + 'getusersdata'; };

  public static get GET_INVOICE_WITH_TEMPLATE(): string { return this.appurl + 'getInvoiceWithTemplate'; };

  public static get DELETE_INFORMATION_DETAILS(): string { return this.appurl + 'informationdetails/'; };
  public static get ADD_INFORMATION_DETAILS(): string { return this.appurl + 'addinformationdetails'; };
  public static get UPDATE_INFORMATION_DETAILS(): string { return this.appurl + 'informationdetails'; };
  public static get GET_INFORMATION_DETAILS_BY_ID(): string { return this.appurl + 'informationdetails'; };
  public static get GET_DELIVERY_BY_ID(): string { return this.appurl + 'getDeliveryByid'; };
  public static get UPDATE_PICKUP_DETAILS(): string { return this.appurl + 'updatePaymentPickupDetails'; };
  public static get TRANSFER_PACK(): string { return this.appurl + 'transferPack'; };

  public static get TRANSFER_ASSIGNED_PACK(): string { return this.appurl + 'transferAssignedPack'; };

  public static get RELEASE_PACK(): string { return this.appurl + 'releasePack'; };
  public static get GET_PACKS(): string { return this.appurl + 'getPacks'; };
  public static get SEND_INVOICE(): string { return this.appurl + 'sendInvoiceFromZoho'; };


  // notifications
  public static get GET_NOTIFICATION_BY_USER(): string { return this.appurl + 'getNotificationByUser'; };
  public static get MARK_AS_READ(): string { return this.appurl + 'markAsRead'; };

  //Track all packages
  public static get GET_ALL_PACKAGES(): string { return this.appurl + 'getAllPackages'; };
  public static get GET_PACKAGES(): string { return this.appurl + 'getPackages'; };
  public static get GET_PAY_RELATED_INFO(): string { return this.appurl + 'getPayRelatedInfo'; };


  //;LOCATIONS
  public static get GET_FILTER_COUNTRIES(): string { return this.appurl + 'getFilterCountries'; };
  public static get ADD_CITY(): string { return this.appurl + 'addCity'; };
  public static get ADD_STATE(): string { return this.appurl + 'addState'; };


  //TRACK SHIPMENT

  public static get TRACK_SHIPMENT(): string { return this.appurl + 'tracker_api'; };
  public static get MAILBOX_GET_QUOTES(): string { return this.appurl + 'getQuotesByMailboxid'; };

  public static get OUTSTANDING_BAL(): string { return this.appurl + 'outstanding/balance'; };


  //CUSTOMER NEW ADDRESS

  public static get CUSTOMER_ADDRESS(): string { return this.appurl + 'customerAddress'; };
  public static get GET_CUSTOMER_ADDRESS_BY_ID(): string { return this.appurl + 'getCustomerAddressById'; };
  public static get GET_ACTIVE_ADDRESS(): string { return this.appurl + 'activeAddress'; };

  public static get SIX_MONTH_PLAN(): string { return this.appurl + 'sixMonthPlan'; };


  // CHARGES
  public static get ADD_CHARGES(): string { return this.appurl + 'addchargedetails'; };
  public static get GET_CHARGES_BY_ID(): string { return this.appurl + 'charges'; };
  public static get GET_CARRIER_ID(): string { return this.appurl + 'f/getCarrierAuto'; };


  public static get UPDATE_CHARGES(): string { return this.appurl + 'charges'; };
  public static get GET_CHARGES(): string { return this.appurl + 'getChargeDetails'; };
  public static get DELETE_CHARGES(): string { return this.appurl + 'charges/'; };
  //  public static get GET_QUOTE_DATA(): string { return this.appurl + 'quote-data'; };

  public static get GET_DEALS_PROMOS(): string { return this.appurl + 'f/getdealsNpromos'; };

  //CONSTRAINTS
  public static get ADD_CONSTRAINTS(): string { return this.appurl + 'serviceControls'; };
  public static get GET_CONSTRAINTS_BY_ID(): string { return this.appurl + 'ServiceControls'; };
  public static get UPDATE_CONSTRAINTS(): string { return this.appurl + 'ServiceControls'; };
  public static get GET_CONSTRAINTS(): string { return this.appurl + 'getServiceControl'; };
  public static get DELETE_CONSTRAINTS(): string { return this.appurl + 'serviceControls'; };

  //Sort data
  public static get MAILBOX_SORT_DATA(): string { return this.appurl + 'mailboxSortData'; };

  //get all users data
  public static get GET_ALL_CUSTOMER_DETAILS(): string { return this.appurl + 'getAllCustomerDetails'; };


  public static get SORT_DATA(): string { return this.appurl + 'sortData'; };

  public static get GET_CUSTOMER_DETAIL_BY_ID(): string { return this.appurl + 'getCustomerDetailById'; };
  public static get UPDATE_CUSTOMER_BY_ADMIN(): string { return this.appurl + 'updateCustomerByAdmin'; };
  public static get DELETE_CUSTOMER_BY_ADMIN(): string { return this.appurl + 'deleteCustomerByAdmin'; };
  public static get GET_CONTACTS(): string { return this.appurl + 'zohoContacts'; };

  public static get GET_INVENTORY_ADJUSTMENTS(): string { return this.appurl + 'inventoryAdjustments'; };

  public static get POST_PACKAGES(): string { return this.appurl + 'postPackages'; };
  public static get VERIFIED_PACKS(): string { return this.appurl + 'verifiedPacks'; };
  public static get ADD_BRANCH(): string { return this.appurl + 'addBranch'; };
  public static get EDIT_BRANCH(): string { return this.appurl + 'editBranch'; };
  public static get ADD_JOB(): string { return this.appurl + 'addJob'; };


  public static get RELEASED_PACK(): string { return this.appurl + 'releasedPacks'; };
  public static get GET_PACKAGES_RELEASED(): string { return this.appurl + 'releasedPacks'; };
  public static get SEARCH_RELEASES(): string { return this.appurl + 'searchReleases'; };
  public static get GET_STAFF_LIST(): string { return this.appurl + 'getStaffList'; };
  public static get GET_COURIERS(): string { return this.appurl + 'f/getCouriers'; };



  public static get INVOICES(): string { return this.appurl + 'invoices'; };
  public static get PRICE_LIST(): string { return this.appurl + 'priceList'; };

  public static get GET_RETAINTER_INVOICE_BY_ID(): string { return this.appurl + 'getRetainerInvoiceById'; };

  public static get GET__CUSTOMER_INVOICE_BY_ID(): string { return this.appurl + 'getCustomerInvoiceById'; };
  public static get MAIL_INVOICE(): string { return this.appurl + 'mailInvoice'; };
  public static get GET_INVOICE_FOR_CUSTOMER(): string { return this.appurl + 'getInvoiceForCustomer'; };
  public static get GET_BRANCHES(): string { return this.appurl + 'getBranches'; };

  public static get GET_JOBS(): string { return this.appurl + 'getjobs'; };

  public static get GET_USERS(): string { return this.appurl + 'f/getUsers'; };
  public static get GET_MAILBOX_USERS(): string { return this.appurl + 'f/getMailboxUsers'; };

  //Counts of different entities
  public static get GET_USER_COUNT(): string { return this.appurl + 'getUsersCount'; };
  public static get GET_PIE_CHART_DATA(): string { return this.appurl + 'pieChartData'; };
  public static get GET_DELIVERIES_COUNT(): string { return this.appurl + 'getDeliveryCount'; };
  public static get GET_QUOTES_COUNT(): string { return this.appurl + 'getQuotesCount'; };
  public static get GET_USER_GRAPH_DATA(): string { return this.appurl + 'getUserGraphdata'; };
  public static get GET_INVOICES_COUNT(): string { return this.appurl + 'getInvoicesCount'; };
  public static get GET_ZOHO_COUNT(): string { return this.appurl + 'countZoho'; };

  //Deals and promotions
  public static get ADD_DEALS_N_PROMOS(): string { return this.appurl + 'dealsNpromos'; };
  public static get GET_DEALS_LIST(): string { return this.appurl + 'getDealsList'; };
  public static get UPDATE_DEALS_PROMOS(): string { return this.appurl + 'updateDealsNPromos'; };
  public static get DELETE_DEALS_PROMOS(): string { return this.appurl + 'deleteDealsNPromos'; };

  public static get GET_CONTACT_LIST(): string { return this.appurl + 'contactInfoList'; };
  public static get GET_DEAL_DETAIL_BY_ID(): string { return this.appurl + 'getDealDetailsById'; };

  public static get ZOHO_INVOICE_BY_ID(): string { return this.appurl + 'invoiceByIdZoho'; };
  public static get ZOHO_PAYMENTS_BY_ID(): string { return this.appurl + 'paymentsByIdZoho'; };
  public static get ZOHO_CONTACTS_BY_ID(): string { return this.appurl + 'getContactById'; };
  public static get ACTIVATE_PLAN(): string { return this.appurl + 'activatePlan'; };



  public static get ZOHO_CONTACTS_PERSON_BY_ID(): string { return this.appurl + 'getContactPersonById'; };
  public static get DELETE_ITEM_ZOHO(): string { return this.appurl + 'deleteItem'; };

  public static get DELETE_INVOICE_ZOHO(): string { return this.appurl + 'deleteZohoInvoice'; };

  public static get DELETE_CONTACT_ZOHO(): string { return this.appurl + 'deleteContact'; };

  public static get UPDATE_CONTACT_ZOHO(): string { return this.appurl + 'editContactZoho'; };
  public static get GET_CREDIT_NOTE_DETAILS(): string { return this.appurl + 'listCreditNotes'; };

  public static get GET_ITEM_LIST_DETAILS(): string { return this.appurl + 'listItems'; };
  public static get GET_ITEM_BY_TYPE(): string { return this.appurl + ''; };
  public static get GET_ITEM_TYPE(): string { return this.appurl + ''; };

  public static get DELETE_CONTACT(): string { return this.appurl + 'deleteContactInfo'; };


  // };
  //subscription plans
  public static get GET_PLAN_LIST(): string { return this.appurl + 'listPlans'; };
  public static get GET_SUBSCRIPTION_CHARGE_BY_ID(): string { return this.appurl + 'getChargeByiD'; };
  public static get UPDATE_SUBSCRIPTION_CHARGES(): string { return this.appurl + 'getChargeByiD'; };
  public static get FILTER_BY_DATE(): string { return this.appurl + 'filterRecordByDt'; };
  public static get FILTER_BY_DATE_REFUND(): string { return this.appurl + 'filterRecordByDtRefund'; };

  public static get FILTER_BY_DATE_CREDITNOTE(): string { return this.appurl + 'filterRecordByDtCreditNote'; };

  //zoho items
  public static get GET_ACCOUNT_LIST(): string { return this.appurl + 'addItemsGetInfo'; };
  public static get ADD_ITEMS_ZOHO(): string { return this.appurl + 'itemsZoho'; };
  public static get GET_ITEM_BY_ID(): string { return this.appurl + 'getItemById'; };
  public static get EDIT_ITEMS_ZOHO(): string { return this.appurl + 'itemsZoho'; };

  //ZOHO RECORD PAYMENTS
  public static get ADD_RECORD_PAYMENT(): string { return this.appurl + 'recordPayment'; };
  public static get GET_PAYMENT_RECORDS(): string { return this.appurl + 'getPaymentRecordList'; };
  public static get GET_PAYMENT_REPORT_RECORDS(): string { return this.appurl + 'getPaymentReportRecordList'; };


  public static get DELETE_PAYMENT(): string { return this.appurl + 'recordPayment'; };
  public static get GET_PAY_BY_ID(): string { return this.appurl + 'getPayById'; };
  public static get GET_FILTERED_PAYMENT(): string { return this.appurl + 'getFilteredData'; };


  public static get GET_ORG_CHART(): string { return this.appurl + 'getChart'; };
  public static get GET_PACKAGE_BY_ID(): string { return this.appurl + 'packageById'; };
  public static get EDIT_PACKAGE_DETAILS(): string { return this.appurl + 'packageById'; };
  public static get GET_INVOICE_TABLE(): string { return this.appurl + 'invoiceTableData'; };
  public static get ADD_ADDRESS(): string { return this.appurl + 'addAddress'; };
  public static get GET_SUB_ADDRESS_BY_ID(): string { return this.appurl + 'getSubAddressById'; };
  public static get EDIT_ADDITIONAL_ADDRESS(): string { return this.appurl + 'additionalAddress'; };
  public static get DELETE_ADDITIONAL_ADDRESS(): string { return this.appurl + 'additionalAddress'; };
  public static get GET_INVOICE_BY_ID_ZOHO(): string { return this.appurl + 'getinvoicebyid'; };
  public static get GET_TRACKING_STATUS(): string { return this.appurl + 'f/trackingStatusById'; };



  public static get GET_COUNTRIES(): string { return this.appurl + 'getCountries'; };
  public static get EDIT_CONTACT_PERSON(): string { return this.appurl + 'contactPerson'; };
  public static get ADD_CONTACT_PERSON(): string { return this.appurl + 'contactPerson'; };
  public static get DELETE_CONTACT_PERSON(): string { return this.appurl + 'getContactById'; };
  public static get ENABLE_PAYMENT_REMINDER(): string { return this.appurl + 'enableReminder'; };
  public static get DISABLE_PAYMENT_REMINDER(): string { return this.appurl + 'disableReminder'; };
  public static get MARK_AS_PRIMARY(): string { return this.appurl + 'markAsPrimary'; };

  public static get GET_ESTIMATES(): string { return this.appurl + 'estimates'; };
  public static get DELETE_ESTIMATE(): string { return this.appurl + 'estimates'; };
  public static get ADD_ESTIMATE(): string { return this.appurl + 'estimates'; };
  public static get UPDATE_ESTIMATE(): string { return this.appurl + 'estimates'; };

  public static get SUBSCRIPTION_FORM(): string { return this.appurl + 'addSubscribedUser'; };
  public static get EDITPAGE_ESTIMATE(): string { return this.appurl + 'editpageEstimate'; };
  public static get GET_ESTIMATE_BY_ID(): string { return this.appurl + 'estimateById'; };
  public static get GET_REFUNDS_LIST(): string { return this.appurl + 'listRefunds'; };
  public static get EDITPAGE_PAYMENT_RECIEVED(): string { return this.appurl + 'editpagePaymentRecieved'; };
  public static get GET_REFUND_BY_ID(): string { return this.appurl + 'getRefundById'; };
  public static get UPDATE_PAYMENT_RECIEVED(): string { return this.appurl + 'paymentRecieved'; };
  public static get EDITPAGE_PRICELIST(): string { return this.appurl + 'editpagePriceBook'; };
  public static get GET_PRICELIST_ITEMS(): string { return this.appurl + 'pricebookItems'; };
  public static get UPDATE_PRICE_LIST(): string { return this.appurl + 'pricebookItems'; };
  public static get GET_CURRENCIES(): string { return this.appurl + 'getCurrencies'; };
  public static get INVENTORY_PRODS(): string { return this.appurl + 'inventoryProducts'; };
  // public static get DELETE_PRIMARY_CONTACT(): string { return this.appurl + 'getContactById'; };
};
