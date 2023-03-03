import { DocumentNode } from 'graphql';
import {
    gqlSignatureColNames,
    IGQLOpCheck,
    IOpCheck,
    IOpCheckFillItem,
    signatureColNames,
    SignatureName,
} from '../../Interface/OpCheck/Common';
import {
    getSignature,
    IGQLSignature,
    SignatureStateItem,
} from '../../Interface/Signature';

export abstract class OpCheckHandler {
    siteId: string;
    number: string;
    signatures: Record<SignatureName, SignatureStateItem>;
    abstract query: DocumentNode;
    abstract mutation: DocumentNode;
    abstract schema: IOpCheck;
    // eslint-disable-next-line no-unused-vars
    abstract onItems: Record<string, IOpCheckFillItem>;
    abstract offItems: Record<string, IOpCheckFillItem>;

    constructor(
        siteId: string,
        number: string,
        signatures: Record<SignatureName, SignatureStateItem>
    ) {
        this.signatures = signatures;
        this.siteId = siteId;
        this.number = number;
    }

    getInitialValues(): IOpCheck {
        return {
            siteId: this.siteId,
            number: this.number,
            area: '',
            zone: '',
            department: '',
            day: '',
            supervisorBefore: undefined,
            staffBefore: undefined,
            timeBefore: '',
            supervisorAfter: undefined,
            staffAfter: undefined,
            timeAfter: '',
        };
    }

    parse(data: IGQLOpCheck[]): IOpCheck | undefined {
        if (!data[0]) return;
        const t = { ...data[0] };

        for (let i = 0; i < signatureColNames.length; i++) {
            const key = signatureColNames[i];
            const [, setSignature] = this.signatures[key];
            const GQLkey = gqlSignatureColNames[i] as keyof IGQLOpCheck;
            const GQLsign = t[GQLkey] as IGQLSignature | undefined;
            if (GQLsign) {
                getSignature(GQLsign).then((item) => {
                    setSignature(item);
                });
            }
        }

        return t;
    }
}
