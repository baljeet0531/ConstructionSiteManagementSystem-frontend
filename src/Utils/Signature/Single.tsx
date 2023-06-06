import { ISignature } from '../../Interface/Signature';
import { SignatureHandler } from './Abstract';

export class SingleSignatureHandler extends SignatureHandler<ISignature> {
    setSignature(
        index: string | number | undefined,
        new_item: ISignature
    ): void {
        if (!index) {
            this.setSign(new_item);
        }
    }
    removeSignature(index: string | number | undefined): void {
        if (!index) {
            this.setSign(undefined);
        }
    }
    getSignature(index: string | number | undefined): ISignature | undefined {
        if (!index) {
            return this.sign;
        }
    }
    canDelete(index: string | number | undefined): boolean {
        if (!index && this.sign) {
            return !!this.sign.image && !this.sign.no;
        }
        return false;
    }
    hasImage(index: string | number | undefined): boolean {
        if (!index && this.sign) {
            return !!this.sign.image;
        }
        return false;
    }
}
