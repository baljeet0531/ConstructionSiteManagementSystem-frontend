import { IOpCheck, IGQLOpCheck } from './Common';

export interface IPipeDistructOpCheck extends IOpCheck {
    BH01: boolean | undefined;
    BH02: boolean | undefined;
    BH03: boolean | undefined;
    BH04: boolean | undefined;
    BH01Ameliorate: string | undefined;
    BH02Ameliorate: string | undefined;
    BH03Ameliorate: string | undefined;
    BH04Ameliorate: string | undefined;
    AA16: boolean | undefined;
    AA19: boolean | undefined;
    AB01: boolean | undefined;
    AB02: boolean | undefined;
    AB03: boolean | undefined;
    AB04: boolean | undefined;
    AB05: boolean | undefined;
    AB06: boolean | undefined;
    AA16Ameliorate: string | undefined;
    AA19Ameliorate: string | undefined;
    AB01Ameliorate: string | undefined;
    AB02Ameliorate: string | undefined;
    AB03Ameliorate: string | undefined;
    AB04Ameliorate: string | undefined;
    AB05Ameliorate: string | undefined;
    AB06Ameliorate: string | undefined;
}

export interface IGQLPipeDistructOpCheck
    extends IPipeDistructOpCheck,
        IGQLOpCheck {}

export type onKeys = 'BH01' | 'BH02' | 'BH03' | 'BH04';

export type offKeys =
    | 'AA16'
    | 'AA19'
    | 'AB01'
    | 'AB02'
    | 'AB03'
    | 'AB04'
    | 'AB05'
    | 'AB06';
