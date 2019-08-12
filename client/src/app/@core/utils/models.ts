
export interface Staff {
    name: String;
    email: String,
    phonenum: Number,
    type: String
}

export interface staffsType {
    name: String,
    authority: String
}

export interface Products {
    name: String,
    duty_rate_perc: Number
}
export interface getQuotes {

    first_name: string,
    last_name: string,
    email: string,
    phone_no: Number,
    weight: Number,
    quantity:Number,
    createdAt: Number,
    description: string
}
export interface Quotes {

    quote_id: string,
    first_name: string,
    last_name: string,
    email: string,
    phone_no: Number,
    weight: string,
    quantity: Number,
    amount: object,
    bac_charges: string,
    description: string,
    status: Number
}

export interface StaffInOut {
    email: String,
    name: String,
    type: String
    created_date: String
}

export interface Customer {
    first_name: String;
    last_name: String;
    bac_account_id: String;
    email: String;
}
export interface Plans {
    currency: String,
    expiryDate: String,
    startDate: String,
    planName: String
}
// export interface Salutation {
//     salutation: String,
// }
