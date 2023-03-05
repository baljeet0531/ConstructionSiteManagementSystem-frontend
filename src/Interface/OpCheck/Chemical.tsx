import { IOpCheck, IGQLOpCheck } from './Common';

export interface IChemicalOpCheck extends IOpCheck {
    BJ01: boolean | undefined;
    BJ02: boolean | undefined;
    BJ03: boolean | undefined;
    BJ04: boolean | undefined;
    BJ05: boolean | undefined;
    BJ06: boolean | undefined;
    BJ07: boolean | undefined;
    BJ08: boolean | undefined;
    BJ01Ameliorate: string | undefined;
    BJ02Ameliorate: string | undefined;
    BJ03Ameliorate: string | undefined;
    BJ04Ameliorate: string | undefined;
    BJ05Ameliorate: string | undefined;
    BJ06Ameliorate: string | undefined;
    BJ07Ameliorate: string | undefined;
    BJ08Ameliorate: string | undefined;
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

export interface IGQLChemicalOpCheck extends IChemicalOpCheck, IGQLOpCheck {}

export type onKeys =
    | 'BJ01'
    | 'BJ02'
    | 'BJ03'
    | 'BJ04'
    | 'BJ05'
    | 'BJ06'
    | 'BJ07'
    | 'BJ08';

export type offKeys =
    | 'AA19'
    | 'AA22'
    | 'AB01'
    | 'AB02'
    | 'AB03'
    | 'AB04'
    | 'AB05'
    | 'AB06';
