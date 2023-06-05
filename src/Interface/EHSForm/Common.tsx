import { Dispatch, SetStateAction } from 'react';
import { IGQLSignature, ISignature } from '../Signature';

export type EHSFormName = 'normal' | 'special';

interface IEHSSignatureCommon {
    corpName: string;
    day: string;
    signatureType: 'responsible' | 'supervisor';
}

export interface IEHSSignature extends ISignature, IEHSSignatureCommon {}

export interface IGQLEHSSignature extends IGQLSignature, IEHSSignatureCommon {}

export type SignaturesStateItem = [
    IEHSSignature[],
    Dispatch<SetStateAction<IEHSSignature[]>>
];

export interface IEHSCheckTarget {
    siteId: string;
    day: string;
    corpName: string;
}

export interface IEHSForm {
    siteId: string;
    day: string;
    checkDept: string | null;
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
    searchName: string[]
}
