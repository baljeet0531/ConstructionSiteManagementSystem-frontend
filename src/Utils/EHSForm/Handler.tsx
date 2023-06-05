import { DocumentNode } from 'graphql';
import { getSignature } from '../../Interface/Signature';
import {
    IEHSForm,
    IEHSFormFillItem,
    IEHSSignature,
    IGQLEHSSignature,
    signatureColNames,
    SignatureName,
    SignaturesStateItem,
} from '../../Interface/EHSForm/Common';

export abstract class EHSFormHandler {
    siteId: string;
    day: string;
    signatures: Record<SignatureName, SignaturesStateItem>;
    abstract queryName: string;
    abstract query: DocumentNode;
    abstract mutationName: string;
    abstract mutation: DocumentNode;
    // eslint-disable-next-line no-unused-vars
    abstract itemGroups: Record<
        string,
        { name: string; items: IEHSFormFillItem[] }
    >;

    constructor(
        siteId: string,
        day: string,
        signatures: Record<SignatureName, SignaturesStateItem>
    ) {
        this.siteId = siteId;
        this.day = day;
        this.signatures = signatures;
    }

    getInitialValues(): IEHSForm {
        return {
            siteId: this.siteId,
            day: this.day,
            checkDept: '',
            checkTarget: [],
            location: '',
            responsibleUnitSignature: [],
            supervisorUnitSignature: [],
        };
    }

    parse(data: IEHSForm[]): IEHSForm | undefined {
        if (!data[0]) return;
        const t = { ...data[0] };

        for (let i = 0; i < signatureColNames.length; i++) {
            this.setSigns(i, t);
        }

        return t;
    }

    marshal(submitValues: IEHSForm) {
        console.log(submitValues);
    }

    setSigns(idx: number, form: IEHSForm) {
        const key = signatureColNames[idx];
        const [, setSignature] = this.signatures[key];
        const GQLsigns = form[key] as IGQLEHSSignature[] | undefined;
        if (GQLsigns) {
            const signs: IEHSSignature[] = [];
            const getSignList = async () => {
                for (let GQLsign of GQLsigns) {
                    const sign = await getSignature(GQLsign);
                    signs.push({
                        ...sign,
                        day: GQLsign.day,
                        corpName: GQLsign.corpName,
                        signatureType: GQLsign.signatureType,
                    });
                }
            };
            getSignList().then(() => {
                setSignature(signs);
            });
        }
    }
}
