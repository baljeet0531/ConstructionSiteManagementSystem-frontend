import { ISignature } from '../../Interface/Signature';
import { SignatureHandler } from './Abstract';

export class ObjectSignatureHandler extends SignatureHandler<{
    [key: string]: ISignature;
}> {
    setSignature(
        index: string | number | undefined,
        new_item: ISignature
    ): void {
        if (typeof index === 'string') {
            if (this.sign[index]) {
                const arr = { ...this.sign };
                arr[index] = new_item;
                this.setSign(arr);
            } else {
                this.setSign({ ...this.sign, [index]: new_item });
            }
        }
    }
    removeSignature(index: string | number | undefined): void {
        if (typeof index === 'string' && this.sign[index]) {
            const newObj = Object.keys(this.sign)
                .filter((key) => key !== index)
                .reduce((obj, key) => {
                    obj[key] = this.sign[key];
                    return obj;
                }, {} as { [key: string]: ISignature });
            this.setSign(newObj);
        }
    }
    getSignature(index: string | number | undefined): ISignature | undefined {
        if (typeof index === 'string' && this.sign[index]) {
            return this.sign[index];
        }
    }
    canDelete(index: string | number | undefined): boolean {
        if (typeof index === 'string' && this.sign[index]) {
            return !!this.sign[index].image && !this.sign[index].no;
        }
        return false;
    }
    hasImage(index: string | number | undefined): boolean {
        if (typeof index === 'string' && this.sign[index]) {
            return !!this.sign[index].image;
        }
        return false;
    }
}
