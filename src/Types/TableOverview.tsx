export type TOverviewChecked<T> = T & {
    index: number;
    isChecked: boolean;
};

export type TOverviewTable<T> = Record<string, T>;
