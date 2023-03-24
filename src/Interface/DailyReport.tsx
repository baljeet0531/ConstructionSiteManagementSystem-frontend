export interface IDailyReport {
    siteId: string;
    serialNumber: string;
}
export type TCategory =
    | '帆宣'
    | '空調'
    | '消防'
    | '給排水'
    | '天然氣及柴油'
    | '電力'
    | '儀控'
    | '弱電'
    | '其他'
    | '合計';

export interface IWorkNumber {
    supervisor?: IWorkNumberItem
    worker?: IWorkNumberItem
    overtime?: IWorkNumberItem
    sum: IWorkNumberItem
}

export interface IWorkNumberItem {
    fieldName: string;
}
