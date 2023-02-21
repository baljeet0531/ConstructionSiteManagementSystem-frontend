import { IOpCheck, IGQLOpCheck } from './Common';

export interface ICageOpCheck extends IOpCheck {
    BE01: boolean | undefined;
    BE02: boolean | undefined;
    BE03: boolean | undefined;
    BE04: boolean | undefined;
    BE01Ameliorate: string | undefined;
    BE02Ameliorate: string | undefined;
    BE03Ameliorate: string | undefined;
    BE04Ameliorate: string | undefined;
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

export interface IGQLCageOpCheck extends ICageOpCheck, IGQLOpCheck {}
