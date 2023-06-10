import { IGQLOpCheck, IOpCheck } from './OpCheck/Common';
import { IGQLSignature } from './Signature';

export interface IEnvSecurityForm extends IOpCheck {
    AA01: boolean | null;
    AA02: boolean | null;
    AA03: boolean | null;
    AA04: boolean | null;
    AA05: boolean | null;
    AA06: boolean | null;
    AA07: boolean | null;
    AA08: boolean | null;
    AA09: boolean | null;
    AA10: boolean | null;
    AA11: boolean | null;
    AA12: boolean | null;
    AA13: boolean | null;
    AA14: boolean | null;
    AA15: boolean | null;
    AA16: boolean | null;
    AA17: boolean | null;
    AA18: boolean | null;
    AA19: boolean | null;
    AA20: boolean | null;
    AA21: boolean | null;
    AA22: boolean | null;

    AB01: boolean | null;
    AB02: boolean | null;
    AB03: boolean | null;
    AB04: boolean | null;
    AB05: boolean | null;
    AB06: boolean | null;

    AC01: boolean | null;
    AC02: boolean | null;
    AC03: boolean | null;

    AD01: boolean | null;
    AD02: boolean | null;

    AD03: boolean | null;
    AD04: boolean | null;
    AD05: boolean | null;
    AD06: boolean | null;
    AD07: boolean | null;
    AD08: boolean | null;

    AE01: boolean | null;
    AE02: boolean | null;
    AE03: boolean | null;
    AE04: boolean | null;
    AE05: boolean | null;
    AE06: boolean | null;
    AE07: boolean | null;

    AF01: boolean | null;
    AF02: boolean | null;
    AF03: boolean | null;
    AF04: boolean | null;

    AA01Ameliorate: string;
    AA02Ameliorate: string;
    AA03Ameliorate: string;
    AA04Ameliorate: string;
    AA05Ameliorate: string;
    AA06Ameliorate: string;
    AA07Ameliorate: string;
    AA08Ameliorate: string;
    AA09Ameliorate: string;
    AA10Ameliorate: string;
    AA11Ameliorate: string;
    AA12Ameliorate: string;
    AA13Ameliorate: string;
    AA14Ameliorate: string;
    AA15Ameliorate: string;
    AA16Ameliorate: string;
    AA17Ameliorate: string;
    AA18Ameliorate: string;
    AA19Ameliorate: string;
    AA20Ameliorate: string;
    AA21Ameliorate: string;
    AA22Ameliorate: string;
    AB01Ameliorate: string;
    AB02Ameliorate: string;
    AB03Ameliorate: string;
    AB04Ameliorate: string;
    AB05Ameliorate: string;
    AB06Ameliorate: string;
    AC01Ameliorate: string;
    AC02Ameliorate: string;
    AC03Ameliorate: string;
    AD01Ameliorate: string;
    AD02Ameliorate: string;
    AD03Ameliorate: string;
    AD04Ameliorate: string;
    AD05Ameliorate: string;
    AD06Ameliorate: string;
    AD07Ameliorate: string;
    AD08Ameliorate: string;
    AE01Ameliorate: string;
    AE02Ameliorate: string;
    AE03Ameliorate: string;
    AE04Ameliorate: string;
    AE05Ameliorate: string;
    AE06Ameliorate: string;
    AE07Ameliorate: string;
    AF01Ameliorate: string;
    AF02Ameliorate: string;
    AF03Ameliorate: string;
    AF04Ameliorate: string;
}

export interface IGQLEnvSecurityForm extends IGQLOpCheck, IEnvSecurityForm {}

export interface IEnvSecurityItem {
    ameliorate: keyof IEnvSecurityForm;
    content: string;
}

export type onKeys =
    | 'AA01'
    | 'AA02'
    | 'AA03'
    | 'AA04'
    | 'AA05'
    | 'AA06'
    | 'AA07'
    | 'AA08'
    | 'AA09'
    | 'AA10'
    | 'AA11'
    | 'AA12'
    | 'AA13'
    | 'AA14'
    | 'AA15'
    | 'AA16'
    | 'AA17'
    | 'AA18'
    | 'AA20'
    | 'AA21'
    | 'AC01'
    | 'AC02'
    | 'AC03'
    | 'AD01'
    | 'AD02'
    | 'AD03'
    | 'AD04'
    | 'AD05'
    | 'AD06'
    | 'AD07'
    | 'AD08'
    | 'AE01'
    | 'AE02'
    | 'AE03'
    | 'AE04'
    | 'AE05'
    | 'AE06'
    | 'AE07'
    | 'AF01'
    | 'AF02'
    | 'AF03'
    | 'AF04';

export type offKeys =
    | 'AA19'
    | 'AA22'
    | 'AB01'
    | 'AB02'
    | 'AB03'
    | 'AB04'
    | 'AB05'
    | 'AB06';

export const onKeyList: onKeys[] = [
    'AA01',
    'AA02',
    'AA03',
    'AA04',
    'AA05',
    'AA06',
    'AA07',
    'AA08',
    'AA09',
    'AA10',
    'AA11',
    'AA12',
    'AA13',
    'AA14',
    'AA15',
    'AA16',
    'AA17',
    'AA18',
    'AA20',
    'AA21',
    'AC01',
    'AC02',
    'AC03',
    'AD01',
    'AD02',
    'AD03',
    'AD04',
    'AD05',
    'AD06',
    'AD07',
    'AD08',
    'AE01',
    'AE02',
    'AE03',
    'AE04',
    'AE05',
    'AE06',
    'AE07',
    'AF01',
    'AF02',
    'AF03',
    'AF04',
];

export const offKeyList: offKeys[] = [
    'AA19',
    'AA22',
    'AB01',
    'AB02',
    'AB03',
    'AB04',
    'AB05',
    'AB06',
];

export interface IEnvSecurityFormOverview {
    siteId: string;
    day: string;
    number: string;
    department: string;
    area: string;
    supervisorBeforeRef: IGQLSignature | null;
    staffBeforeRef: IGQLSignature | null;
    supervisorAfterRef: IGQLSignature | null;
    staffAfterRef: IGQLSignature | null;
}

export interface IEnvSecurityOverviewChecked extends IEnvSecurityFormOverview {
    index: number;
    isChecked: boolean;
}

export interface IEnvSecurityOverviewTable {
    [day: string]: IEnvSecurityOverviewChecked;
}

export interface IEnvSecurityDeptArea {
    dept: string;
    area: string[];
}

export interface IEnvSecurityDeptAreaMap {
    [dept: string]: {
        areas: string[];
    };
}
