export interface IPhoto {
    no: number;
    imagePath: string;
    category: string;
    date: string;
    location: string;
    description: string;
}

export interface IPhotoChecked extends IPhoto {
    isChecked: boolean;
}

export interface ICategory {
    photos: {
        [no: number]: IPhotoChecked;
    };
}

export interface ICategoryChecked extends ICategory {
    isChecked: boolean;
    isIndeterminate: boolean;
}

export interface IDate {
    categories: {
        [categoryName: string]: ICategoryChecked;
    };
}
export interface IDateChecked extends IDate {
    isChecked: boolean;
    isIndeterminate: boolean;
}

export interface IFormattedPhotos {
    [time: string]: IDateChecked;
}

export interface IFilteredPhotos {
    [time: string]: IDate;
}

export interface IPhotoQueryData {
    time: string;
    element: {
        categoryName: string;
        element: IPhoto[];
    }[];
}
