// import { Cookies } from "react-cookie";

export type features = {
    dashboard?: string;
    site?: string;
    organization?: string;
    people_overview?: string;
    people_approval?: string;
    people_establishment?: string;
    schedule?: string;
    report?: string;
    photo?: string;
    work_permit_form?: string;
    toolbox_form?: string;
    eng_fault_form?: string;
    env_security_form?: string;
    special_form?: string;
    ehs_form?: string;
    ehs_fault_form?: string;
    machinery_management?: string;
    machinery_establishment?: string;
    outsource_fault_form?: string;
};

// type details = {
//     "name": string;
//     "chinese name": string;
//     "features": features;
// }

// interface Permission {
//     "admin": details;
//     "project manager": details;
//     "working manager": details;
//     "project engineer": details;
//     "system engineer": details;
//     "secure staff": details;
//     "out sourcer": details;
//     "owner": details;
// }

export const PERMISSION = {
    admin: {
        name: 'admin',
        'chinese name': '系統管理員',
        features: {
            dashboard: 'crud',
            site: 'crud',
            organization: 'crud',
            people_overview: 'crud',
            people_approval: 'crud',
            people_establishment: 'crud',
            schedule: 'crud',
            report: 'crud',
            photo: 'crud',
            work_permit_form: 'crud',
            toolbox_form: 'crud',
            eng_fault_form: 'crud',
            env_security_form: 'crud',
            special_form: 'crud',
            ehs_form: 'crud',
            ehs_fault_form: 'crud',
            machinery_management: 'crud',
            machinery_establishment: 'crud',
            outsource_fault_form: 'crud'
        },
    },
    'project manager': {
        name: 'project manager',
        'chinese name': '專案經理',
        features: {
            dashboard: 'crud',
            site: 'crud',
            organization: 'crud',
            people_overview: 'crud',
            people_approval: 'crud',
            people_establishment: 'crud',
            schedule: 'crud',
            report: 'crud',
            photo: 'crud',
            work_permit_form: 'crud',
            toolbox_form: 'crud',
            eng_fault_form: 'crud',
            env_security_form: 'crud',
            special_form: 'crud',
            ehs_form: 'crud',
            ehs_fault_form: 'crud',
            machinery_management: 'crud',
            machinery_establishment: 'crud',
            outsource_fault_form: 'crud'
        },
    },
    'working manager': {
        name: 'working manager',
        'chinese name': '工地經理',
        features: {
            dashboard: 'crud',
            site: 'crud',
            organization: 'crud',
            people_overview: 'crud',
            people_approval: 'crud',
            people_establishment: 'crud',
            schedule: 'crud',
            report: 'crud',
            photo: 'crud',
            work_permit_form: 'crud',
            toolbox_form: 'crud',
            eng_fault_form: 'crud',
            env_security_form: 'crud',
            special_form: 'crud',
            ehs_form: 'crud',
            ehs_fault_form: 'crud',
            machinery_management: 'crud',
            machinery_establishment: 'crud',
            outsource_fault_form: 'crud'
        },
    },
    'project engineer': {
        name: 'project engineer',
        'chinese name': '專案工程師',
        features: {
            dashboard: 'crud',
            site: 'crud',
            organization: 'crud',
            people_overview: 'crud',
            people_approval: 'crud',
            people_establishment: 'crud',
            schedule: 'crud',
            report: 'crud',
            photo: 'crud',
            work_permit_form: 'crud',
            toolbox_form: 'crud',
            eng_fault_form: 'crud',
            env_security_form: 'crud',
            special_form: 'crud',
            ehs_form: 'crud',
            ehs_fault_form: 'crud',
            machinery_management: 'crud',
            machinery_establishment: 'crud',
            outsource_fault_form: 'crud'
        },
    },
    'system engineer': {
        name: 'system engineer',
        'chinese name': '系統工程師',
        features: {
            dashboard: 'crud',
            site: 'crud',
            organization: 'crud',
            people_overview: 'crud',
            people_approval: 'crud',
            people_establishment: 'crud',
            schedule: 'crud',
            report: 'crud',
            photo: 'crud',
            work_permit_form: 'crud',
            toolbox_form: 'crud',
            eng_fault_form: 'crud',
            env_security_form: 'crud',
            special_form: 'crud',
            ehs_form: 'crud',
            ehs_fault_form: 'crud',
            machinery_management: 'crud',
            machinery_establishment: 'crud',
            outsource_fault_form: 'crud'
        },
    },
    'secure staff': {
        name: 'secure staff',
        'chinese name': '工安人員',
        features: {
            dashboard: 'crud',
            site: 'crud',
            organization: 'crud',
            people_overview: 'crud',
            people_approval: 'crud',
            people_establishment: 'crud',
            schedule: 'crud',
            report: 'crud',
            photo: 'crud',
            work_permit_form: 'crud',
            toolbox_form: 'crud',
            eng_fault_form: 'crud',
            env_security_form: 'crud',
            special_form: 'crud',
            ehs_form: 'crud',
            ehs_fault_form: 'crud',
            machinery_management: 'crud',
            machinery_establishment: 'crud',
            outsource_fault_form: 'crud'
        },
    },
    'out sourcer': {
        name: 'out sourcer',
        'chinese name': '外包商',
        features: {
            dashboard: 'crud',
            site: 'crud',
            organization: 'crud',
            people_overview: 'crud',
            people_approval: 'crud',
            people_establishment: 'crud',
            schedule: 'crud',
            report: 'crud',
            photo: 'crud',
            work_permit_form: 'crud',
            toolbox_form: 'crud',
            eng_fault_form: 'crud',
            env_security_form: 'crud',
            special_form: 'crud',
            ehs_form: 'crud',
            ehs_fault_form: 'crud',
            machinery_management: 'crud',
            machinery_establishment: 'crud',
            outsource_fault_form: 'crud'
        },
    },
    owner: {
        name: 'owner',
        'chinese name': '業主',
        features: {
            dashboard: 'crud',
            site: 'crud',
            organization: 'crud',
            people_overview: 'crud',
            people_approval: 'crud',
            people_establishment: 'crud',
            schedule: 'crud',
            report: 'crud',
            photo: 'crud',
            work_permit_form: 'crud',
            toolbox_form: 'crud',
            eng_fault_form: 'crud',
            env_security_form: 'crud',
            special_form: 'crud',
            ehs_form: 'crud',
            ehs_fault_form: 'crud',
            machinery_management: 'crud',
            machinery_establishment: 'crud',
            outsource_fault_form: 'crud'
        },
    },
};

export function IsPermit(feature: keyof features) {
    const ROLE = 'admin';

    return feature in PERMISSION[ROLE].features;
}
