export interface IDailyReport {
    siteId: string;
    serialNumber: string;
    workItem: IWorkContext[];
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
    supervisor?: IWorkNumberItem;
    labor?: IWorkNumberItem;
    night?: IWorkNumberItem;
    total: IWorkNumberItem;
}

export interface IWorkNumberItem {
    fieldName: string;
}

export interface IWorkContext {
    area: string;
    today: ITodayItem[];
    tomorrow: ITomorrowItem[];
}

export interface IWorkItem {
    projectName: string;
    location: string;
    description: string | undefined;
}

export interface ITodayItem extends IWorkItem {
    completeness: number;
}
export interface ITomorrowItem extends IWorkItem {}

export function isTodayItem(v: ITodayItem | ITomorrowItem): v is ITodayItem {
    return 'completeness' in v;
}
export function isTodayList(
    v: ITodayItem[] | ITomorrowItem[]
): v is ITodayItem[] {
    return isTodayItem(v[0]);
}
