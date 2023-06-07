/* eslint-disable no-unused-vars */
import {
    EHSFormName,
    SignatureName,
    SignaturesStateItem,
} from '../../Interface/EHSForm/Common';
import { EHSFormHandler } from './Handler';
import { EHSFormNormalHandler } from './Normal';
import { EHSFormSpecialHandler } from './Special';

type EHSFormConstructor = new (
    siteId: string,
    day: string,
    signatures: Record<SignatureName, SignaturesStateItem>
) => EHSFormHandler;

type EHSFormMapItem = {
    name: string;
    handler: EHSFormConstructor;
};

export const EHSFormMap: Record<EHSFormName, EHSFormMapItem> = {
    normal: { name: '一般作業', handler: EHSFormNormalHandler },
    special: { name: '特殊作業', handler: EHSFormSpecialHandler },
};
