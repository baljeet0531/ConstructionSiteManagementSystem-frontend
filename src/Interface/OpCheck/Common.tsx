import { IGQLSignature, ISignature } from '../Signature';

export type OpCheckName =
    | 'assemble' // 施工架組裝作業
    | 'cage' // 吊籠作業
    | 'chemical' // 化學作業
    | 'confineSpace' // 侷限空間作業
    | 'electric' // 電力作業
    | 'fire' // 動火作業
    | 'hole' // 管線拆離作業
    | 'lift' // 起重吊掛作業
    | 'pipeDistruct' // 管線拆離作業
    | 'scafold'; // 高架作業

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
