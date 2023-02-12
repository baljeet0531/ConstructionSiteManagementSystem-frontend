import { Dispatch, SetStateAction } from 'react';
export interface ISignature {
    image: string | File | undefined;
    time: string | Date | undefined;
    owner: string | undefined;
}

export type SignatureStateItem = [
    ISignature,
    Dispatch<SetStateAction<ISignature>>
];

export type MultiSignatureStateItem = [
    ISignature[],
    Dispatch<SetStateAction<ISignature[]>>
]
