/* eslint-disable no-unused-vars */
import {
    EHSFormName,
    SignaturesStateItem,
} from '../../Interface/EHSForm/Common';
import { IEHSFormNormal } from '../../Interface/EHSForm/Normal';
import { IEHSFormSpecial } from '../../Interface/EHSForm/Special';
import { SignatureStateItem } from '../../Interface/Signature';
import { EHSFormHandler } from './Handler';
import { EHSFormNormalHandler } from './Normal';
import { EHSFormSpecialHandler } from './Special';

type EHSFormConstructor = new (
    siteId: string,
    day: string,
    supervisorSignature: SignatureStateItem,
    responsibleSignatures: SignaturesStateItem
) => EHSFormHandler<IEHSFormNormal | IEHSFormSpecial>;

type EHSFormMapItem = {
    name: string;
    handler: EHSFormConstructor;
};

export const EHSFormMap: Record<EHSFormName, EHSFormMapItem> = {
    normal: { name: '一般作業', handler: EHSFormNormalHandler },
    special: { name: '特殊作業', handler: EHSFormSpecialHandler },
};
