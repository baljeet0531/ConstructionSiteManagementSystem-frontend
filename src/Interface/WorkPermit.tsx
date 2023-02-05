import { ISiteArea, IWorkContent } from "./Site";

export interface IWorkPermitData  {
    siteAreas: ISiteArea[],
    workContents: IWorkContent[]
} 

export interface IWorkPermitOptions {
    zones: string[],
    workContents: string[],
    systemBranches: string[],
    projects: string[]
}