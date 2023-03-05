import { IOpCheck, IGQLOpCheck } from './Common';

export interface IAssembleOpCheck extends IOpCheck {
    BG01: boolean | undefined;
    BG02: boolean | undefined;
    BG03: boolean | undefined;
    BG04: boolean | undefined;
    BG05: boolean | undefined;
    BG06: boolean | undefined;
    BG07: boolean | undefined;
    BG01Ameliorate: string | undefined;
    BG02Ameliorate: string | undefined;
    BG03Ameliorate: string | undefined;
    BG04Ameliorate: string | undefined;
    BG05Ameliorate: string | undefined;
    BG06Ameliorate: string | undefined;
    BG07Ameliorate: string | undefined;
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

export interface IGQLAssembleOpCheck extends IAssembleOpCheck, IGQLOpCheck {}

export type onKeys =
    | 'BG01'
    | 'BG02'
    | 'BG03'
    | 'BG04'
    | 'BG05'
    | 'BG06'
    | 'BG07';

export type offKeys =
    | 'AA19'
    | 'AA22'
    | 'AB01'
    | 'AB02'
    | 'AB03'
    | 'AB04'
    | 'AB05'
    | 'AB06';
