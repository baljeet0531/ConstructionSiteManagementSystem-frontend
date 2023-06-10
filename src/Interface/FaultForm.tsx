import { FileType } from 'rsuite/esm/Uploader';

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
