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
    BA01Ameliorate: string | undefined;
    BA02Ameliorate: string | undefined;
    BA03Ameliorate: string | undefined;
    BA04Ameliorate: string | undefined;
    BA05Ameliorate: string | undefined;
    BA06Ameliorate: string | undefined;
    BA07Ameliorate: string | undefined;
    BA08Ameliorate: string | undefined;
    BA09Ameliorate: string | undefined;
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

export interface IGQLFireOpCheck extends IFireOpCheck, IGQLOpCheck {}
