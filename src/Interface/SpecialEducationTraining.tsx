export interface ISpecialEducationalTraining {
    item: string;
    date: string;
    corp: string;
    name: string;
    idno: string;
    viceCorp: string;
}

export interface IQuerySpecialEducationalTraining {
    specialEducationalTraining: ISpecialEducationalTraining[];
}
export interface IQuerySpecialEducationalTrainingVar {
    keyWord?: string;
    startDay?: string | null;
    endDay?: string | null;
}
export interface IUpdateSpecialEducationalTraining {
    updateSpecialEducationalTraining: {
        ok: boolean;
        message: string;
    };
}
export interface IUpdateSpecialEducationalTrainingVar {
    date: string;
    idno: string;
    item: string;
}
