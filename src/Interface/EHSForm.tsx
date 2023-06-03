export interface IEHSForm {
    siteId: string;
    day: string;
}

export interface IEHSFormNormal extends IEHSForm {
}

export interface IEHSFormSpecial extends IEHSForm {
}