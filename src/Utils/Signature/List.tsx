import { ISignature } from '../../Interface/Signature';
import { SignatureHandler } from './Abstract';

export class ListSignatureHandler extends SignatureHandler<ISignature[]> {
    setSignature(
        index: string | number | undefined,
        new_item: ISignature
    ): void {
        if (typeof index === 'number') {
            if (this.sign[index]) {
                const arr = [...this.sign];
                arr[index] = new_item;
                this.setSign(arr);
            } else {
                this.setSign([...this.sign, new_item]);
            }
        }
    }
    removeSignature(index: string | number | undefined): void {
        if (typeof index === 'number' && this.sign[index]) {
            const arr = this.sign.filter((_, idx) => {
                return index !== idx;
            });
            this.setSign(arr);
        }
    }
    getSignature(index: string | number | undefined): ISignature | undefined {
        if (typeof index === 'number' && this.sign[index]) {
            return this.sign[index];
        }
    }
    canDelete(index: string | number | undefined): boolean {
        if (typeof index === 'number' && this.sign[index]) {
            return !!this.sign[index].image && !this.sign[index].no;
        }
        return false;
    }
    hasImage(index: string | number | undefined): boolean {
        if (typeof index === 'number' && this.sign[index]) {
            return !!this.sign[index].image;
        }
        return false;
    }
}
