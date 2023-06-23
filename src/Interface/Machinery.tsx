interface IGQLMachineryImage {
    no: number;
    mId: string;
    mSite: string;
    path: string;
}

export interface IGQLMachineryManagement {
    checkId: string;
    siteId: string;
    corp: string;
    machinery: string;
    outerStatus: boolean | null;
    innerStatus: boolean | null;
    outerDate: Date;
    innerDate: Date;
    supplementary: string;
    images: IGQLMachineryImage[];
}

export interface IMachinery {
    vendor: string;
    mainEquipment: string;
    inspectionNo: string;
    entryInspection: boolean | null;
    entryInspectionDate: Date | null;
    onSiteInspection: boolean | null;
    onSiteInspectionDate: Date | null;
    remarks: { text: string; photos: { no: number; path: string }[] };
    siteId: string;
}

export interface IMachineryChecked extends IMachinery {
    index: number;
    isChecked: boolean;
}
