// import { Cookies } from "react-cookie";

export type features = {
    site?: string;
    schedule?: string;
    humanResource?: string;
    security?: string;
    report?: string;
    photo?: string;
    dashboard?: string;
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
            site: 'rw',
            schedule: 'rw',
            humanResource: 'rw',
            security: 'rw',
            report: 'rw',
            photo: 'rw',
            dashboard: 'r',
        },
    },
    'project manager': {
        name: 'project manager',
        'chinese name': '專案經理',
        features: {
            site: 'rw',
            schedule: 'rw',
            humanResource: 'rw',
            security: 'r',
            report: 'rw',
            photo: 'rw',
            dashboard: 'r',
        },
    },
    'working manager': {
        name: 'working manager',
        'chinese name': '工地經理',
        features: {
            site: 'rw',
            schedule: 'rw',
            humanResource: 'rw',
            security: 'r',
            report: 'rw',
            photo: 'rw',
            dashboard: 'r',
        },
    },
    'project engineer': {
        name: 'project engineer',
        'chinese name': '專案工程師',
        features: {
            schedule: 'r',
            humanResource: 'rw',
            security: 'rw',
            report: 'rw',
            photo: 'r',
            dashboard: 'r',
        },
    },
    'system engineer': {
        name: 'system engineer',
        'chinese name': '系統工程師',
        features: {
            schedule: 'r',
            humanResource: 'rw',
            security: 'rw',
            report: 'rw',
            photo: 'r',
            dashboard: 'r',
        },
    },
    'secure staff': {
        name: 'secure staff',
        'chinese name': '工安人員',
        features: {
            schedule: 'r',
            humanResource: 'r',
            security: 'rw',
            report: 'rw',
            photo: 'rW',
            dashboard: 'r',
        },
    },
    'out sourcer': {
        name: 'out sourcer',
        'chinese name': '外包商',
        features: {
            humanResource: 'rw',
            security: 'rw',
            report: 'rw',
        },
    },
    owner: {
        name: 'owner',
        'chinese name': '業主',
        features: {
            report: 'r',
            photo: 'r',
        },
    },
};

export function IsPermit(feature: keyof features) {
    const ROLE = 'admin';

    return feature in PERMISSION[ROLE].features;
}
