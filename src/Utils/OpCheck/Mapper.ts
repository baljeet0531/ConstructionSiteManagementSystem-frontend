/* eslint-disable no-unused-vars */
import { OpCheckName, SignatureName } from '../../Interface/OpCheck/Common';
import { SignatureStateItem } from '../../Interface/Signature';
import { OpCheckHandler } from './Handler';
import { FireOpCheckHandler } from './Type/Fire';

type OpCheckConstructor = new (
    siteId: string,
    number: string,
    signatures: Record<SignatureName, SignatureStateItem>
) => OpCheckHandler;

export const opCheckMap: Record<OpCheckName, OpCheckConstructor> = {
    assemble: FireOpCheckHandler,
    cage: FireOpCheckHandler,
    chemical: FireOpCheckHandler,
    confineSpace: FireOpCheckHandler,
    electric: FireOpCheckHandler,
    fire: FireOpCheckHandler,
    hole: FireOpCheckHandler,
    lift: FireOpCheckHandler,
    pipeDistruct: FireOpCheckHandler,
    scafold: FireOpCheckHandler,
};
