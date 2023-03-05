import { IOpCheck, IGQLOpCheck } from './Common';

export interface IHoleOpCheck extends IOpCheck {
    BI01: boolean | undefined;
    BI02: boolean | undefined;
    BI03: boolean | undefined;
    BI01Ameliorate: string | undefined;
    BI02Ameliorate: string | undefined;
    BI03Ameliorate: string | undefined;
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

export interface IGQLHoleOpCheck extends IHoleOpCheck, IGQLOpCheck {}

export type onKeys = 'BI01' | 'BI02' | 'BI03';

export type offKeys =
    | 'AA19'
    | 'AA22'
    | 'AB01'
    | 'AB02'
    | 'AB03'
    | 'AB04'
    | 'AB05'
    | 'AB06';
