import { IGQLSignature, ISignature } from './Signature';
import { ISiteArea, IWorkContent } from './Site';
export interface IWorkPermitData {
    siteAreas: ISiteArea[];
    workContents: IWorkContent[];
}

export interface IWorkPermitOptions {
    zones: string[];
    workContents: string[];
    systemBranches: string[];
    projects: string[];
}

export type SignatureName =
    | 'approved'
    | 'review'
    | 'supplier'
    | 'supplierManager';

export interface IWorkPermit {
    siteId: string;
    number: string;
    applicant: string | undefined;
    applied: boolean;
    modified: boolean;
    supplyDate: string | undefined;
    system: string | undefined;
    systemBranch: string | undefined;
    project: string | undefined;
    area: string | undefined;
    zone: string | string[] | undefined;
    workStart: string | undefined;
    workEnd: string | undefined;
    supervisorCorp: string | undefined;
    supervisor: string | undefined;
    tel: string | undefined;
    projectName: string | undefined;
    opFire: boolean | undefined;
    opAloft: boolean | undefined;
    opConfined: boolean | undefined;
    opElectric: boolean | undefined;
    opCage: boolean | undefined;
    opLift: boolean | undefined;
    opAssemble: boolean | undefined;
    opDetach: boolean | undefined;
    opHole: boolean | undefined;
    opChemical: boolean | undefined;
    opElse: string | undefined;
    approved: ISignature | undefined;
    review: ISignature | undefined;
    supplierManager: ISignature | undefined;
    supplier: ISignature | undefined;
}

export interface IGQLWorkPermit extends IWorkPermit {
    approvedRef: IGQLSignature | undefined;
    reviewRef: IGQLSignature | undefined;
    supplierManagerRef: IGQLSignature | undefined;
    supplierRef: IGQLSignature | undefined;
}
