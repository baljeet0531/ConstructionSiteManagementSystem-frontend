import { IOpCheck, IGQLOpCheck } from './Common';

export interface IScafoldOpCheck extends IOpCheck {
    BB01: boolean | undefined;
    BB02: boolean | undefined;
    BB03: boolean | undefined;
    BB04: boolean | undefined;
    BB05: boolean | undefined;
    BB06: boolean | undefined;
    BB07: boolean | undefined;
    BB08: boolean | undefined;
    BB09: boolean | undefined;
    BB10: boolean | undefined;
    BB11: boolean | undefined;
    BB12: boolean | undefined;
    BB13: boolean | undefined;
    BB14: boolean | undefined;
    BB15: boolean | undefined;
    BB16: boolean | undefined;
    BB17: boolean | undefined;
    BB01Ameliorate: string | undefined;
    BB02Ameliorate: string | undefined;
    BB03Ameliorate: string | undefined;
    BB04Ameliorate: string | undefined;
    BB05Ameliorate: string | undefined;
    BB06Ameliorate: string | undefined;
    BB07Ameliorate: string | undefined;
    BB08Ameliorate: string | undefined;
    BB09Ameliorate: string | undefined;
    BB10Ameliorate: string | undefined;
    BB11Ameliorate: string | undefined;
    BB12Ameliorate: string | undefined;
    BB13Ameliorate: string | undefined;
    BB14Ameliorate: string | undefined;
    BB15Ameliorate: string | undefined;
    BB16Ameliorate: string | undefined;
    BB17Ameliorate: string | undefined;
    AA19: boolean | undefined;
    AA22: boolean | undefined;
    AB01: boolean | undefined;
    AB02: boolean | undefined;
    AB03: boolean | undefined;
    AB04: boolean | undefined;
    AB05: boolean | undefined;
    AB06: boolean | undefined;
    AA19Ameliorate: string | undefined;
    AA22Ameliorate: string | undefined;
    AB01Ameliorate: string | undefined;
    AB02Ameliorate: string | undefined;
    AB03Ameliorate: string | undefined;
    AB04Ameliorate: string | undefined;
    AB05Ameliorate: string | undefined;
    AB06Ameliorate: string | undefined;
}

export interface IGQLScafoldOpCheck extends IScafoldOpCheck, IGQLOpCheck {}
