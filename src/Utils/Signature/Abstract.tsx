/* eslint-disable no-unused-vars */
import { Dispatch, SetStateAction } from 'react';
import { ISignature } from '../../Interface/Signature';

export abstract class SignatureHandler<T extends ISignature | [] | {}> {
    sign: T | undefined;
    setSign: Dispatch<SetStateAction<T | undefined>>;
    constructor([sign, setSign]: [
        sign: T | undefined,
        setSign: Dispatch<SetStateAction<T | undefined>>
    ]) {
        this.sign = sign;
        this.setSign = setSign;
    }
    abstract removeSignature(index: number | string | undefined): void;
    abstract setSignature(
        index: number | string | undefined,
        new_item: ISignature
    ): void;
    abstract getSignature(
        index: number | string | undefined
    ): ISignature | undefined;
    abstract canDelete(index: number | string | undefined): boolean;
    abstract hasImage(index: number | string | undefined): boolean;
}
