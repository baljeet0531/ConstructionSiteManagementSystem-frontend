import { IGQLSignature, ISignature } from '../Signature';

export type SignatureName =
    | 'supervisorBefore'
    | 'staffBefore'
    | 'supervisorAfter'
    | 'staffAfter';

export interface IOpCheck {
    siteId: string;
    number: string;
    area: string | undefined;
    zone: string | undefined;
    department: string | undefined;
    day: string | undefined;
    supervisorBefore: ISignature | undefined;
    staffBefore: ISignature | undefined;
    timeBefore: string | undefined;
    supervisorAfter: ISignature | undefined;
    staffAfter: ISignature | undefined;
    timeAfter: string | undefined;
}

export interface IGQLOpCheck extends IOpCheck {
    supervisorBeforeRef: IGQLSignature | undefined;
    staffBeforeRef: IGQLSignature | undefined;
    supervisorAfterRef: IGQLSignature | undefined;
    staffAfterRef: IGQLSignature | undefined;
}
