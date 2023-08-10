export type TRoleFeature = '工程管理' | '職安衛管理' | '承商管理';

export type TUserRole =
    | '系統管理員'
    | '專案經理'
    | '工地經理'
    | '專案工程師'
    | '系統工程師'
    | '職安衛人員'
    | '承攬商'
    | '業主';

export type TActions = { C: boolean; R: boolean; U: boolean; D: boolean };
