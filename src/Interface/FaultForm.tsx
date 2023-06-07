import { FileType } from "rsuite/esm/Uploader";

export interface IFaultForm {
    siteId: string;
    faultId: number;
    checked: boolean;
    validDate: string;
    photos: FileType[];
}