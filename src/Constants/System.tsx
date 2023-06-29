import { ISystemBranch } from '../Interface/WorkPermit';

export const systemConst: Record<string, Record<string, ISystemBranch>> = {
    空調系統: {
        管架施工: {
            trigger: [
                'opFire',
                'opAloft',
                'opCage',
                'opLift',
                'opAssemble',
                'opHole',
            ],
            projects: {},
        },
        管路施工: {
            trigger: [],
            projects: {
                配管: [
                    'opFire',
                    'opAloft',
                    'opCage',
                    'opLift',
                    'opAssemble',
                    'opHole',
                ],
                管路焊接: ['opFire', 'opAloft', 'opCage', 'opLift'],
            },
        },
        '管路試壓(含洗管)': {
            trigger: ['opFire', 'opDetach'],
            projects: {},
        },
        保溫施作: {
            trigger: ['opAloft', 'opAssemble', 'opChemical'],
            projects: {},
        },
        設備定位安裝: {
            trigger: [
                'opFire',
                'opAloft',
                'opElectric',
                'opCage',
                'opLift',
                'opAssemble',
            ],
            projects: {},
        },
        測試運轉: {
            trigger: [],
            projects: {
                單機測試: ['opElectric'],
                系統測試: ['opElectric'],
            },
        },
        防火漆: {
            trigger: [
                'opAloft',
                'opAssemble',
                'opHole',
                'opChemical',
                'opElse',
            ],
            projects: {},
        },
    },
    電力系統: {
        照明及插座配置作業: {
            trigger: [],
            projects: {
                管線: [
                    'opFire',
                    'opAloft',
                    'opElectric',
                    'opAssemble',
                    'opHole',
                ],
                器具: [
                    'opFire',
                    'opAloft',
                    'opElectric',
                    'opAssemble',
                    'opHole',
                ],
            },
        },
        配電盤定位組裝: {
            trigger: ['opElectric', 'opLift'],
            projects: {},
        },
        '電纜線架組裝作業(含吊點)': {
            trigger: ['opElectric', 'opLift'],
            projects: {},
        },
        電力迴路配置作業: {
            trigger: ['opFire', 'opAloft', 'opElectric'],
            projects: {},
        },
    },
    消防系統: {
        消防系統配管: {
            trigger: [],
            projects: {
                '泡沫系統(水)': [
                    'opFire',
                    'opAloft',
                    'opLift',
                    'opAssemble',
                    'opDetach',
                    'opChemical',
                ],
                '管架施工/管路吊架安裝': [],
                '管架施工/防震吊架安裝': [],
                '管架施工/支管安裝': [],
                '管架施工/油漆修補': [],
                '管路施工/主管路安裝': [],
                '管路施工/一齊開放閥安裝': [],
                '管路施工/自動警報逆止閥安裝': [],
                '管路施工/泡沫頭安裝': [],
                '管路施工/管路標示': [],
                '管路施工/柱面設備安裝': [],
                '管路施工/灑水系統一次側管路配置': [],
                '灑水系統(水)': [
                    'opFire',
                    'opAloft',
                    'opLift',
                    'opAssemble',
                    'opDetach',
                ],
                '水霧系統(水)': [
                    'opFire',
                    'opAloft',
                    'opLift',
                    'opAssemble',
                    'opDetach',
                ],
                'CO2系統(氣)': [
                    'opFire',
                    'opAloft',
                    'opLift',
                    'opDetach',
                    'opChemical',
                ],
            },
        },
        消防控制系統: {
            trigger: [],
            projects: {
                消防箱系統: ['opFire', 'opElectric'],
                火警系統: ['opAloft', 'opElectric'],
                避難系統: ['opAloft', 'opElectric'],
                廣播系統: ['opAloft', 'opElectric'],
                排煙電控: ['opFire', 'opAloft', 'opElectric', 'opAssemble'],
            },
        },
        門型架施作: {
            trigger: [],
            projects: {},
        },
        CO2鋼瓶室: {
            trigger: ['opFire', 'opLift', 'opDetach', 'opChemical'],
            projects: {},
        },
        '二次配工程(配合內裝工程)': {
            trigger: ['opFire', 'opAloft', 'opLift', 'opAssemble', 'opDetach'],
            projects: {},
        },
    },
    給排水系統: {
        管架施工: {
            trigger: [
                'opFire',
                'opAloft',
                'opCage',
                'opLift',
                'opAssemble',
                'opHole',
            ],
            projects: {},
        },
        管路施工: {
            trigger: [],
            projects: {
                配管: [
                    'opFire',
                    'opAloft',
                    'opCage',
                    'opLift',
                    'opAssemble',
                    'opHole',
                ],
                管路焊接: ['opFire', 'opAloft', 'opCage', 'opLift'],
            },
        },
        設備定位安裝: {
            trigger: [],
            projects: {
                桶槽定位: ['opFire', 'opLift'],
                泵浦設備安裝: ['opFire', 'opElectric', 'opLift'],
            },
        },
        衛浴設備安裝: {
            trigger: ['opFire', 'opLift'],
            projects: {},
        },
    },
    儀控系統: {
        管架施工: {
            trigger: [
                'opFire',
                'opAloft',
                'opCage',
                'opLift',
                'opAssemble',
                'opHole',
            ],
            projects: {},
        },
        管路施工: {
            trigger: [],
            projects: {
                配管: [
                    'opFire',
                    'opAloft',
                    'opCage',
                    'opLift',
                    'opAssemble',
                    'opHole',
                ],
                管路焊接: ['opFire', 'opAloft', 'opCage', 'opLift'],
            },
        },
        設備定位安裝: {
            trigger: [],
            projects: {
                PLC盤定位: ['opElectric', 'opLift'],
                佈線與結線: ['opElectric'],
                儀表安裝: ['opElectric'],
            },
        },
    },
};
