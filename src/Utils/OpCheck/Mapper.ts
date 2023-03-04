/* eslint-disable no-unused-vars */
import { OpCheckName, SignatureName } from '../../Interface/OpCheck/Common';
import { SignatureStateItem } from '../../Interface/Signature';
import { OpCheckHandler } from './Handler';
import { AssembleOpCheckHandler } from './Type/Assemble';
import { CageOpCheckHandler } from './Type/Cage';
import { ChemicalOpCheckHandler } from './Type/Chemical';
import { ElectricOpCheckHandler } from './Type/Electric';
import { FireOpCheckHandler } from './Type/Fire';
import { HoleOpCheckHandler } from './Type/Hole';

type OpCheckConstructor = new (
    siteId: string,
    number: string,
    signatures: Record<SignatureName, SignatureStateItem>
) => OpCheckHandler;

type OpCheckMapItem = {
    name: string;
    handler: OpCheckConstructor;
};

export const opCheckMap: Record<OpCheckName, OpCheckMapItem> = {
    assemble: { name: '施工架組裝作業', handler: AssembleOpCheckHandler },
    cage: { name: '吊籠作業', handler: CageOpCheckHandler },
    chemical: { name: '化學作業', handler: ChemicalOpCheckHandler },
    confineSpace: { name: '侷限空間作業', handler: FireOpCheckHandler },
    electric: { name: '電力作業', handler: ElectricOpCheckHandler },
    fire: { name: '動火作業', handler: FireOpCheckHandler },
    hole: { name: '開口作業', handler: HoleOpCheckHandler },
    lift: { name: '起重吊掛作業', handler: FireOpCheckHandler },
    pipeDistruct: { name: '管線拆離作業', handler: FireOpCheckHandler },
    scafold: { name: '高架作業', handler: FireOpCheckHandler },
};
