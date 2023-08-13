import { featureName } from '../Layouts/FeatureMap';
import { TActions, TRoleFeature, TUserRole } from '../Types/Auth';

export const pageToFeatureAuthMap: Record<
    featureName,
    { service: string; subService: string }
> = {
    dashboard: { service: '總覽', subService: 'ALL' },
    site: { service: '專案建置', subService: 'ALL' },
    organization: { service: '專案人員組織', subService: 'ALL' },
    people_overview: { service: '人才管理', subService: '人員資料總覽' },
    people_approval: { service: '人才管理', subService: '人員資料審查' },
    people_establishment: { service: '人才管理', subService: '人員資料建置' },
    project_schedule: { service: '專案管理', subService: '排程管理' },
    project_report: { service: '專案管理', subService: '進度報表' },
    project_photo: { service: '專案管理', subService: '照片管理' },
    eng_work_permit_form: { service: '工程管理', subService: '工作許可單' },
    eng_toolbox_form: { service: '工程管理', subService: '工具箱會議' },
    eng_fault_form: { service: '工程管理', subService: '工安缺失單' },
    eng_env_security_form: {
        service: '工程管理',
        subService: '環安衛自主檢點表',
    },
    eng_op_check_form: {
        service: '工程管理',
        subService: '特殊作業自主檢點表',
    },
    eng_photo: { service: '工程管理', subService: '照片管理' },
    ehs_form: { service: '職安衛管理', subService: '工安自主檢查' },
    ehs_fault_form: { service: '職安衛管理', subService: '工安缺失單' },
    ehs_machinery_management: {
        service: '職安衛管理',
        subService: '機具檢點管理',
    },
    ehs_photo: { service: '職安衛管理', subService: '相片管理' },
    ehs_special_education_training: {
        service: '職安衛管理',
        subService: '特殊教育訓練',
    },
    outsource_work_permit_form: {
        service: '承商管理',
        subService: '工作許可單',
    },
    outsource_toolbox_form: { service: '承商管理', subService: '工具箱會議' },
    outsource_env_security_form: {
        service: '承商管理',
        subService: '環安衛自主檢點表',
    },
    outsource_op_check_form: {
        service: '承商管理',
        subService: '特殊作業自主檢點表',
    },
    outsource_machinery_establishment: {
        service: '承商管理',
        subService: '機具清單建置',
    },
    outsource_fault_form: { service: '承商管理', subService: '工安缺失單' },
};

export const roleFeatureToUserRoleMap: Record<TRoleFeature, TUserRole[]> = {
    工程管理: [
        '系統管理員',
        '專案經理',
        '工地經理',
        '專案工程師',
        '系統工程師',
        '職安衛人員',
    ],
    職安衛管理: ['職安衛人員'],
    承商管理: ['承攬商'],
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
