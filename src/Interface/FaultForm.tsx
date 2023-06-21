import { FileType } from 'rsuite/esm/Uploader';
import { IGQLSignature } from './Signature';

export interface IFaultForm {
    siteId: string;
    day: string;
    responsibleTarget: string;
    code: string;
    staff: string | null;
    area: string | null;
    jobNumber: string | null;
    serialNumber: number | null;
    department: string | null;
    issueDay: string | null;
    responsibleUnitStatus: boolean | null;
    description: string | null;
    promptFix: boolean | null;
    fixDeadline: string | null;
    fixReport: boolean | null;
    faultPoint: number | null;
    reviewDate: string | null;
    reviewer: string | null;
    reviewResult: boolean | null;
    images: { edges: IFaultFormImage[] } | (File | undefined)[];
    uploaderImages: FileType[];
}

export interface IFaultFormImage {
    node: { path: string };
}

export const stringKeys: (keyof IFaultForm)[] = [
    'staff',
    'area',
    'jobNumber',
    'department',
    'issueDay',
    'description',
    'fixDeadline',
    'reviewDate',
    'reviewer',
];

export interface IFaultFormPrimaryKey {
    day: string;
    responsibleTarget: string;
    code: string;
}
export interface IFaultFormCheckPrimaryKey {
    day: string;
    target: string;
    code: string;
}

export interface IFaultFormOverview {
    siteId: string;
    day: string;
    code: string;
    staff: string;
}

export interface IEHSFaultFormOverview extends IFaultFormOverview {
    area: string;
    responsibleTarget: string;
}
export interface IEngFaultFormOverview extends IFaultFormOverview {
    target: string;
    outsourcerStatus: boolean | null;
    outsourcerDescription: string;
    outsourcerSignature: IGQLSignature | null;
    engineerStatus: boolean | null;
    engineerDescription: string;
    engineerSignature: IGQLSignature | null;
    managerStatus: boolean | null;
}
export interface IOutsourceFaultFormOverview extends IFaultFormOverview {
    outsourcerStatus: boolean | null;
    outsourcerDescription: string;
    outsourcerSignature: IGQLSignature | null;
    target: string;
}

export interface IEngFaultFormOverviewExtend extends IEngFaultFormOverview {
    index: number;
}
export interface IOutsourceFaultFormOverviewExtend
    extends IOutsourceFaultFormOverview {
    index: number;
}
