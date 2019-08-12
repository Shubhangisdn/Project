export interface Login {
    email: String;
    password: String
}

export interface ForgetPassword {
    email: String
}

export interface ChangePassword {
    email: String;
    currentpassword: String;
    newpassword: String
}

export interface Register {
    name: String;
    email: String;
    mobile: String;
    password: String
}