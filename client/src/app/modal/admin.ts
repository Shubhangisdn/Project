export interface Admin {
}
export interface Submenu {
    routerLink: String;
    icon: String;
    title: String;
}

export interface Menu {
    routerLink: String;
    icon: String;
    title: String;
    submenu?: Submenu[]
}
