let utility = require('../lib/utility');

module.exports = {
    hideCustomerInfo: hideCustomerInfo,
    stateData: stateData,
    citiesData: citiesData,
    customerUserDetails: customerUserDetails,
    staffUserDetails: staffUserDetails,
    getQuotesInfo: getQuotesInfo,
    getMailbox: getMailbox,
    getMailboxEmails: getMailboxEmails,
    getQuotes: getQuotes,
    getCustomerAddress: getCustomerAddress,
    getInvoiceEmail: getInvoiceEmail,
    orgFlow: orgFlow
}

function hideCustomerInfo(obj, pass) {
    const resp_obj = Object.assign({}, {
        acc_no: obj.bac_account_id,
        password: pass
    });
    return resp_obj;
}

function stateData(obj) {
    const resp_obj = obj.map(state => {
        return Object.assign({}, {
            id: state.id,
            name: state.name
        });
    });
    return resp_obj;
}

function citiesData(obj) {
    const resp_obj = obj.map(cities => {
        return Object.assign({}, {
            id: cities.id,
            name: cities.name
        });
    });
    return resp_obj;
}

function customerUserDetails(user) {
    const resp_obj = Object.assign({}, {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        bac_account_id: user.bac_account_id,
        mobile_no: user.mobile_no,
        image_name: user.image_name,
        image_path: user.image_path,
        plan: user.plan,
        mailbox_id: user.mailbox_id,
        is_email_verified: user.is_email_verified,
        status: user.status,
        bac_id: user.bac_id,
        state: user.state,
        country: user.country,
        address: user.address,
        city: user.city,
        qty: user.qty,
        weight: user.weight,
        price: user.price,
        description: user.description,
        last_login: user.last_login,
        is_logged_in: user.is_logged_in,
        company: user.company,
        address: user.address,
        zipcode: user.zipcode
    });
    return resp_obj;
}

function staffUserDetails(user) {
    const resp_obj = Object.assign({}, {
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
        image_name: user.image_name,
        image_path: user.image_path,
        address: user.address,
        status: user.status,
        permission_type: user.staff_id.type,
        id: user.id
    });
    return resp_obj;
}

function orgFlow(data) {
    const resp_obj = data.map(orgData => {
        console.log("orgData", orgData)
        let value = orgData.dataa[0];
        return Object.assign({}, {
            label: value.name,
            type: 'person',
            styleClass: 'ui-person',
            expanded: true,
            data: {
                name: value.email,
                'avatar': value.image_path
            },
            children: [{
                label: orgData.docs[0].name,
                styleClass: 'department-tech'
            }]
        });
    });
    return resp_obj;
}

function getQuotesInfo(getQuote) {
    console.log('dsfsdfsdfd ', getQuote);
    const resp_obj = Object.assign({}, {
        first_name: getQuote.first_name,
        last_name: getQuote.last_name,
        phone_no: getQuote.phone_no,
        weight: getQuote.weight,
        product_type: getQuote.product_type,
        email: getQuote.email,
        description: getQuote.description,
        price: getQuote.price,
        quantity: getQuote.quantity,
        amount: {
            shiping_charges: Math.round(getQuote.amount.shiping_charges),
            duty_rate_perc: Math.round(getQuote.amount.duty_rate_perc),
            admin_charges: Math.round(getQuote.amount.admin_charges),
            total_amount: Math.round(getQuote.amount.total_amount),
            downPayment: Math.round(getQuote.amount.downPayment),
            hazmat: Math.round(getQuote.amount.hazmat) || 0,
        }
    });
    return resp_obj;
}

function getMailbox(data) {
    const resp_obj = data.map(mailbox => {
        return Object.assign({}, {
            _id: mailbox._id,
            first_name: mailbox.first_name,
            last_name: mailbox.last_name,
            phone_no: mailbox.phone_no,
            location: mailbox.location,
            about_us: mailbox.about_us,
            email: mailbox.email,
            BAC_id: mailbox.BAC_id,
            createdAt: mailbox.createdAt
        });
    });
    return resp_obj;
}

function getMailboxEmails(data) {
    const resp_obj = data.map(mailbox => {
        return Object.assign({}, {
            email: mailbox.email,
        });
    });
    return resp_obj;
}

function getQuotes(data) {
    console.log("data yaha aaaaaaaaaaaaaaa", data)
    const resp_obj = data.map(getQuote => {
        return Object.assign({}, {
            _id: getQuote._id,
            quote_id: getQuote.quote_id,
            first_name: getQuote.first_name,
            last_name: getQuote.last_name,
            phone_no: getQuote.phone_no,
            weight: getQuote.weight,
            quantity: getQuote.quantity,
            product: getQuote.docs[0].name,
            price: getQuote.price,
            amount: {
                total_amount: Math.round(getQuote.amount.total_amount),
                downPayment: Math.round(getQuote.amount.downPayment)
            }
        });
    });
    return resp_obj;
}

function getCustomerAddress(data) {
    console.log('address data here ', data);
    const resp_obj = data.map(user => {
        return Object.assign({}, {
            state: user.state,
            country: user.country,
            address: user.address,
            city: user.city,
            address: user.address,
            zipcode: user.zipcode,
            _id: user._id,
            active: user.active
        })
    })
    return resp_obj;
}

function getInvoiceEmail(data) {
    const resp_obj = data.map(user => {
        return Object.assign({}, {
            _id: user._id,
            email: user.docs[0].email,
            consignee_name: user.consignee_name,
            consignee_id: user.consignee_id,
            invoice_array: user.invoice_array,
            invoice_id: user.invoice_id
        })
    })
    return resp_obj;
}