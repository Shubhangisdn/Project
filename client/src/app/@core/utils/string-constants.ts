
import { environment } from '../../../environments/environment';
export class StringConst {
    private static awspath = environment.awspath;
    private static awsbucket = environment.bucketname;
    public static get APP_NAME(): string { return 'BAC Couriers'; };
    public static get ADMIN_LOCAL_STORAGE_NAME(): string { return '__b__stf'; };
    public static get CUSTOMER_LOCAL_STORAGE_NAME(): string { return 'c__bac'; };
    public static get CART_LOCAL_STORAGE_NAME(): string { return '__eSt__CI'; };
    public static get MURAL_LOCAL_STORAGE_NAME(): string { return '__eSt__MI'; };
    public static get RECENT_LOCAL_STORAGE_NAME(): string { return '__eSt__RS'; };

    public static get INVALID_INFORMATION(): string { return "Please Enter Valid Information"; };
    public static get INVALID_EMAIL(): string { return "Invalid email"; };
    public static get NOT_FOUND(): string { return 'Not Found'; };
    public static get PLEASE_LOGIN(): string { return 'Please Login'; };
    public static get SOMETHING_WENT_WRONG(): string { return 'Something Went Wrong.'; };
    public static get PLEASE_TRY_AGAIN_LATER(): string { return 'Please Try Again Later'; };
    public static get PLEASE_SELECT_IMAGE(): string { return 'Please Try Again Later'; };
    public static get PLEASE_FILL_FORM(): string { return 'Please fill the form'; };

    public static get AWS_PATH(): string { return this.awspath + this.awsbucket; };

    public static get SELECT(): string { return 'Select one record'; };

    public static get AUTHENTICATION_MODULE_URL(): string { return '/user'; };


    public static get META_AUTHOR(): any { return { name: 'author', content: 'Element Signs' }; };
    public static get CHARGES_WEIGHT(): number { return 5 };


    public static get NOT_MODIFIED(): number { return 0 };
    public static get NEW(): number { return 1 };
    public static get MODIFIED(): number { return 2 };
    public static get DELETED(): number { return 3 };
    public static get PRODUCT_IMAGE_RESTRICT_MB(): number { return 4 };
    public static get SHIPPING_PERCENTAGE(): number { return 0 };
    public static get SUCCESS(): string { return "successfully"; };
    public static get FAILED(): string { return "failed!"; };

    public static get MATERIAL_TYPE(): string[] { return ["Removable", "Non-Removable"]; };
    public static get MATERIAL_PRICE(): number[] { return [6.75, 5.35]; };
    public static get DANGEROUS_GOODS(): string { return '5bbf38dfa821942f338d7aac'; };
    public static get DANGEROUS_GOODS_TYPE(): string { return 'Hazmat Product'; };
    //Form validations
    public static get PLEASE_ENTER_ONLY_CHARACTERS(): string { return 'Please enter only characters!'; };
    public static get PLEASE_ENTER_CORRECT_OR_COMPLETE_EMAIL(): string { return 'Please enter correct or complete email!'; };
    public static get PLEASE_ENTER_TEN_DIGIT_CONTACT_NUMBER(): string { return 'Please enter 10 digit contact number!'; };
    public static get PLEASE_ENTER_ONLY_CONTACT_NUMBER(): string { return 'Please enter only contact number!'; };
    public static get PLEASE_ENTER_COST_OF_CART(): string { return 'Please enter cost of cart!'; };
    public static get PLEASE_ENTER_WEIGHT_IN_POUNDS(): string { return 'Please enter number!'; };
    public static get PLEASE_SELECT_CUSTOMER(): string { return 'Please select a customer!'; };


    public static get BRANCH_GEORGETOWN(): string { return 'GEORGETOWN' }
};