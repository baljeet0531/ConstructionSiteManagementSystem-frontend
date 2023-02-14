import dayjs from 'dayjs';
import { Dispatch, SetStateAction } from 'react';
export interface ISignature {
    image: string | File | undefined;
    time: dayjs.Dayjs | undefined;
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
