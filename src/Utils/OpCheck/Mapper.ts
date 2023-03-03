import { OpCheckName } from '../../Interface/OpCheck/Common';
import { OpCheckHandler } from './Handler';
import { FireOpCheckHandler } from './Type/Fire';

// TODO: Remember to map all handler to right value
export const opCheckMap: Record<OpCheckName, typeof OpCheckHandler> = {
    assemble: FireOpCheckHandler,
    cage: FireOpCheckHandler,
    chemical: FireOpCheckHandler,
    confineSpace: FireOpCheckHandler,
    electric: FireOpCheckHandler,
    fire: FireOpCheckHandler,
    hole: FireOpCheckHandler,
    lift: FireOpCheckHandler,
    pipeDistruct: FireOpCheckHandler,
    scafold: FireOpCheckHandler
}
