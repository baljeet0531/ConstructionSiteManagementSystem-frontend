import { IOpCheck, IGQLOpCheck } from './Common';

export interface ILiftOpCheck extends IOpCheck {
    BF01: boolean | undefined;
    BF02: boolean | undefined;
    BF03: boolean | undefined;
    BF04: boolean | undefined;
    BF05: boolean | undefined;
    BF06: boolean | undefined;
    BF07: boolean | undefined;
    BF08: boolean | undefined;
    BF09: boolean | undefined;
    BF10: boolean | undefined;
    BF11: boolean | undefined;
    BF01Ameliorate: string | undefined;
    BF02Ameliorate: string | undefined;
    BF03Ameliorate: string | undefined;
    BF04Ameliorate: string | undefined;
    BF05Ameliorate: string | undefined;
    BF06Ameliorate: string | undefined;
    BF07Ameliorate: string | undefined;
    BF08Ameliorate: string | undefined;
    BF09Ameliorate: string | undefined;
    BF10Ameliorate: string | undefined;
    BF11Ameliorate: string | undefined;
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

export interface IGQLLiftOpCheck extends ILiftOpCheck, IGQLOpCheck {}

export type onKeys =
    | 'BF01'
    | 'BF02'
    | 'BF03'
    | 'BF04'
    | 'BF05'
    | 'BF06'
    | 'BF07'
    | 'BF08'
    | 'BF09'
    | 'BF10'
    | 'BF11';

export type offKeys =
    | 'AA19'
    | 'AA22'
    | 'AB01'
    | 'AB02'
    | 'AB03'
    | 'AB04'
    | 'AB05'
    | 'AB06';
