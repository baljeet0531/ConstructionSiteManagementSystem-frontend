export interface IDailyReport {
    siteId: string;
    dailyId: number;
    todayProgress: string;
    totalProgress: string;
    projectName: string;
    owner: string;
    department: string;
    date: string;
    enterDate: string;
    cumulativeDays: number;
    cumulativeLabor: number;
    weatherMorning: string;
    weatherAfternoon: string;
    maxTemperature: number;
    minTemperature: number;
    workItem: IWorkContext[];
    supervisorIem: number;
    supervisorConditioner: number;
    supervisorFire: number;
    supervisorDrain: number;
    supervisorGas: number;
    supervisorElectric: number;
    supervisorControl: number;
    supervisorWeakElectric: number;
    supervisorOther: number;
    laborIem: number;
    laborConditioner: number;
    laborFire: number;
    laborDrain: number;
    laborGas: number;
    laborElectric: number;
    laborControl: number;
    laborWeakElectric: number;
    laborOther: number;
    nightIem: number;
    nightConditioner: number;
    nightFire: number;
    nightDrain: number;
    nightGas: number;
    nightElectric: number;
    nightControl: number;
    nightWeakElectric: number;
    nightOther: number;
    totalIem: number;
    totalConditioner: number;
    totalFire: number;
    totalDrain: number;
    totalGas: number;
    totalElectric: number;
    totalControl: number;
    totalWeakElectric: number;
    totalOther: number;
    total: number;
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
    fieldName: keyof IDailyReport;
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

export interface GQLWorkItemCommon {
    dailyId: number;
    siteId: string;
    buildingName: string;
}

export interface GQLTodayItem extends ITodayItem, GQLWorkItemCommon {}

export interface GQLTomorrowItem extends ITomorrowItem, GQLWorkItemCommon {}

export interface GQLDailyReport extends IDailyReport {
    todayWorkItem?: GQLTodayItem[];
    tomorrowWorkItem?: GQLTomorrowItem[];
}

export function isTodayItem(v: ITodayItem | ITomorrowItem): v is ITodayItem {
    return 'completeness' in v;
}
export function isTodayList(
    v: ITodayItem[] | ITomorrowItem[]
): v is ITodayItem[] {
    return isTodayItem(v[0]);
}
