import { OpCheckName } from "../../Interface/OpCheck/Common";
import { OpCheckHandler } from "./Handler";

// eslint-disable-next-line no-unused-vars
type OpCheckMap = Record<OpCheckName, OpCheckHandler>

// TODO: Remember to map all handler to right value
// export const opCheckMap: OpCheckMap = {
//     assemble: undefined,
//     cage: undefined,
//     chemical: undefined,
//     confineSpace: undefined,
//     electric: undefined,
//     fire: undefined,
//     hole: undefined,
//     lift: undefined,
//     pipeDistruct: undefined,
//     scafold: undefined
// }