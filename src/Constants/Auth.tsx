import { featureName } from '../Layouts/FeatureMap';
import { TActions, TRoleFeature, TUserRole } from '../Types/Auth';

export const pageToFeatureAuthMap: Record<featureName, string> = {
    dashboard: '總覽',
    site: '專案管理',
    organization: '人員名單',
    people_overview: '人才管理',
    people_approval: '人才管理',
    people_establishment: '人才管理',
    project_schedule: '排程管理',
    project_report: '進度報表',
    project_photo: '照片管理',
    eng_work_permit_form: '工安表單',
    eng_toolbox_form: '工安表單',
    eng_fault_form: '工安表單',
    eng_env_security_form: '工安表單',
    eng_op_check_form: '工安表單',
    eng_photo: '照片管理',
    ehs_form: '工安表單',
    ehs_fault_form: '工安表單',
    ehs_machinery_management: '機具管理',
    ehs_photo: '照片管理',
    ehs_special_education_training: '工安表單',
    outsource_work_permit_form: '工安表單',
    outsource_toolbox_form: '工安表單',
    outsource_env_security_form: '工安表單',
    outsource_op_check_form: '工安表單',
    outsource_machinery_establishment: '機具管理',
    outsource_fault_form: '工安表單',
};

export const roleFeatureToUserRoleMap: Record<TRoleFeature, TUserRole[]> = {
    工程管理: [
        '系統管理員',
        '專案經理',
        '工地經理',
        '專案工程師',
        '系統工程師',
    ],
    職安衛管理: ['系統管理員', '專案經理', '工地經理', '工安人員'],
    承商管理: ['系統管理員', '專案經理', '工地經理', '外包商'],
};
export const pagePrefixToRoleFeatureMap: Record<string, TRoleFeature> = {
    eng: '工程管理',
    ehs: '職安衛管理',
    outsource: '承商管理',
};

export const initActions: TActions = {
    C: false,
    R: false,
    U: false,
    D: false,
};
