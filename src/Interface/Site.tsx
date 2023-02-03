export interface ISiteArea  {
    name: string,
    zone: string
}

export interface ISystemBranch {
    name: string,
    project: string[]
}

export interface ISystem {
    name: string,
    systemBranch: ISystemBranch
}

export interface IWorkContent {
    name: string,
    system: ISystem
}