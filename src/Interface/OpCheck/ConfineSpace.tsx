import { IOpCheck, IGQLOpCheck } from './Common';

export interface IConfineSpaceOpCheck extends IOpCheck {
    BC01: boolean | undefined;
    BC02: boolean | undefined;
    hypoxiaOpSupervisor: string | undefined;
    BC03: boolean | undefined;
    BC04: boolean | undefined;
    BC05: boolean | undefined;
    laborNum: number | string | undefined;
    supervisorNum: number | string | undefined;
    BC06: boolean | undefined;
    enterTime: string | undefined;
    outTime: string | undefined;
    BC07: boolean | undefined;
    BC08: boolean | undefined;
    BC09: boolean | undefined;
    BC10: boolean | undefined;
    BC11: boolean | undefined;
    BC01Ameliorate: string | undefined;
    BC02Ameliorate: string | undefined;
    BC03Ameliorate: string | undefined;
    BC04Ameliorate: string | undefined;
    BC05Ameliorate: string | undefined;
    BC06Ameliorate: string | undefined;
    BC07Ameliorate: string | undefined;
    BC08Ameliorate: string | undefined;
    BC09Ameliorate: string | undefined;
    BC10Ameliorate: string | undefined;
    BC11Ameliorate: string | undefined;
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

export interface IGQLConfineSpaceOpCheck
    extends IConfineSpaceOpCheck,
        IGQLOpCheck {}

export type onKeys =
    | 'BC01'
    | 'BC02'
    | 'BC03'
    | 'BC04'
    | 'BC05'
    | 'BC06'
    | 'BC07'
    | 'BC08'
    | 'BC09'
    | 'BC10'
    | 'BC11';

export type offKeys =
    | 'AA19'
    | 'AA22'
    | 'AB01'
    | 'AB02'
    | 'AB03'
    | 'AB04'
    | 'AB05'
    | 'AB06';
