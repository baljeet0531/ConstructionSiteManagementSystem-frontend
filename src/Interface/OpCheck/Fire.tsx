import { IOpCheck, IGQLOpCheck } from './Common';

export interface IFireOpCheck extends IOpCheck {
    BA01: boolean | undefined;
    BA02: boolean | undefined;
    BA03: boolean | undefined;
    BA04: boolean | undefined;
    BA05: boolean | undefined;
    BA06: boolean | undefined;
    BA07: boolean | undefined;
    BA08: boolean | undefined;
    BA09: boolean | undefined;
    BA01Ameliorate: string;
    BA02Ameliorate: string;
    BA03Ameliorate: string;
    BA04Ameliorate: string;
    BA05Ameliorate: string;
    BA06Ameliorate: string;
    BA07Ameliorate: string;
    BA08Ameliorate: string;
    BA09Ameliorate: string;
    AA19: boolean | undefined;
    AA22: boolean | undefined;
    AB01: boolean | undefined;
    AB02: boolean | undefined;
    AB03: boolean | undefined;
    AB04: boolean | undefined;
    AB05: boolean | undefined;
    AB06: boolean | undefined;
    AA19Ameliorate: string;
    AA22Ameliorate: string;
    AB01Ameliorate: string;
    AB02Ameliorate: string;
    AB03Ameliorate: string;
    AB04Ameliorate: string;
    AB05Ameliorate: string;
    AB06Ameliorate: string;
}

export interface IGQLFireOpCheck extends IFireOpCheck, IGQLOpCheck {}

export type onKeys =
    | 'BA01'
    | 'BA02'
    | 'BA03'
    | 'BA04'
    | 'BA05'
    | 'BA06'
    | 'BA07'
    | 'BA08'
    | 'BA09';

export type offKeys =
    | 'AA19'
    | 'AA22'
    | 'AB01'
    | 'AB02'
    | 'AB03'
    | 'AB04'
    | 'AB05'
    | 'AB06';
