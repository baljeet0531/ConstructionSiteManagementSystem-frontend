import { IGQLSignature, ISignature } from '../Signature';

export type EHSFormName = 'normal' | 'special';

type EHSFormNameValue = {
    label: string;
    queryName: string;
};
export type TEHSFormNameMap = Record<EHSFormName, EHSFormNameValue>;

interface IEHSSignatureCommon {
    corpName: string;
    day: string;
}

export interface IEHSSignature extends ISignature, IEHSSignatureCommon {}

export interface IGQLEHSSignature extends IGQLSignature, IEHSSignatureCommon {}

export interface IEHSCheckTarget {
    siteId: string;
    day: string;
    corpName: string;
}

export interface IEHSForm {
    siteId: string;
    day: string;
    checkDept: string | null;
    checkStaff: string | null;
    checkTarget: IEHSCheckTarget[];
    location: string | null;
    responsibleUnitSignature: IEHSSignature[] | IGQLEHSSignature[];
    supervisorUnitSignature: IEHSSignature[] | IGQLEHSSignature[];
}

export interface IEHSFormTargetInItem {
    siteId: string;
    code: string;
    corpName: string;
    day: string;
}

export interface IEHSFormFillItem {
    code: string;
    content: string;
    normal: string;
    misfit: string;
    ameliorate: string;
}

export interface IEHSFormData {
    searchName: string[];
    selectedCorp: { [key: string]: string[] };
}

export interface IEHSFormOverview {
    siteId: string;
    day: string;
    checkDept: string;
    checkStaff: string;
    checkTarget: {
        corpName: string;
    }[];
    responsibleUnitSignature: IGQLSignature[];
    supervisorUnitSignature: IGQLSignature[];
}

export interface IEHSFormOverviewChecked extends IEHSFormOverview {
    index: number;
    isChecked: boolean;
}

export interface IEHSFormOverviewTable {
    [day: string]: IEHSFormOverviewChecked;
}
