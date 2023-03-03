import dayjs from 'dayjs';
import { Dispatch, SetStateAction } from 'react';
import { getImage } from '../Utils/Resources';
export interface ISignature {
    no: number | undefined;
    image: File | undefined;
    time: dayjs.Dayjs | undefined;
    owner: string | undefined;
}

export interface IGQLSignature {
    no: number;
    path: string;
    time: string;
    owner: string;
}

export type SignatureStateItem = [
    ISignature,
    Dispatch<SetStateAction<ISignature>>
];

export type MultiSignatureStateItem = [
    ISignature[],
    Dispatch<SetStateAction<ISignature[]>>
];

export async function getSignature(sign: IGQLSignature) {
    const target: ISignature = {
        no: sign.no,
        image: undefined,
        time: dayjs(sign.time, 'YYYY-MM-DDTHH:mm:ss'),
        owner: sign.owner,
    };
    if (sign.path) {
        const blob = await getImage(sign.path);
        const filename = sign.path.split('/').at(-1);
        if (blob && filename) target.image = new File([blob], filename);
    }
    return target;
}

export const convertSignature = (signature: ISignature | undefined) => {
    if (!signature) return;
    return {
        ...signature,
        no: Number(signature?.no),
        time: signature?.time?.format('YYYY/MM/DDTHH:mm:ss'),
    };
};

export const convertSignList = (signList: ISignature[]) => {
    return signList.map((s) => ({
        ...s,
        no: Number(s?.no),
        time: s?.time?.format('YYYY-MM-DDTHH:mm:ss'),
    }));

}