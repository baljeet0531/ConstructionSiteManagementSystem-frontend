import { IGQLSignature, ISignature } from '../Signature';

export type EHSFormName = 'normal' | 'special';

export type EHSFormSignatureType = 'supervisor' | 'responsible';

export interface IEHSCheckTarget {
    siteId: string;
    day: string;
    corpName: string;
}

export interface IEHSForm {
    siteId: string;
    day: string;
    checkDept?: string;
    checkTarget?: [IEHSCheckTarget];
    location?: string;
    responsibleUnitSignature?: [ISignature] | [IGQLSignature];
    supervisorUnitSignature?: [ISignature] | [IGQLSignature];
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
