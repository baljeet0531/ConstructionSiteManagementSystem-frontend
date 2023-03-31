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
    isChecked: boolean;
    isIndeterminate: boolean;
    photos: {
        [no: number]: IPhotoChecked;
    };
}

export interface IDate {
    isChecked: boolean;
    isIndeterminate: boolean;
    categories: {
        [categoryName: string]: ICategory;
    };
}

export interface IPhotosDataChecked {
    [time: string]: IDate;
}

export interface IPhotoQueryData {
    time: string;
    element: {
        categoryName: string;
        element: IPhoto[];
    }[];
}

export interface IFilteredPhotos {
    [time: string]: { [categoryName: string]: number[] };
}
