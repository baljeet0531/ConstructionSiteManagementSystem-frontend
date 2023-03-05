import { IOpCheck, IGQLOpCheck } from './Common';

export interface IElectricOpCheck extends IOpCheck {
    BD01: boolean | undefined;
    BD02: boolean | undefined;
    BD03: boolean | undefined;
    BD04: boolean | undefined;
    BD05: boolean | undefined;
    BD06: boolean | undefined;
    BD07: boolean | undefined;
    BD08: boolean | undefined;
    BD09: boolean | undefined;
    BD10: boolean | undefined;
    BD11: boolean | undefined;
    BD12: boolean | undefined;
    BD13: boolean | undefined;
    BD14: boolean | undefined;
    BD15: boolean | undefined;
    BD16: boolean | undefined;
    BD01Ameliorate: string | undefined;
    BD02Ameliorate: string | undefined;
    BD03Ameliorate: string | undefined;
    BD04Ameliorate: string | undefined;
    BD05Ameliorate: string | undefined;
    BD06Ameliorate: string | undefined;
    BD07Ameliorate: string | undefined;
    BD08Ameliorate: string | undefined;
    BD09Ameliorate: string | undefined;
    BD10Ameliorate: string | undefined;
    BD11Ameliorate: string | undefined;
    BD12Ameliorate: string | undefined;
    BD13Ameliorate: string | undefined;
    BD14Ameliorate: string | undefined;
    BD15Ameliorate: string | undefined;
    BD16Ameliorate: string | undefined;
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

export interface IGQLElectricOpCheck extends IElectricOpCheck, IGQLOpCheck {}

export type onKeys =
    | 'BD01'
    | 'BD02'
    | 'BD03'
    | 'BD04'
    | 'BD05'
    | 'BD06'
    | 'BD07'
    | 'BD08'
    | 'BD09'
    | 'BD10'
    | 'BD11'
    | 'BD12'
    | 'BD13'
    | 'BD14'
    | 'BD15'
    | 'BD16';

export type offKeys =
    | 'AA19'
    | 'AA22'
    | 'AB01'
    | 'AB02'
    | 'AB03'
    | 'AB04'
    | 'AB05'
    | 'AB06';
