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
import { FormikErrors } from 'formik';

export abstract class OpCheckHandler {
    siteId: string;
    number: string;
    signatures: Record<SignatureName, SignatureStateItem>;
    abstract queryName: string;
    abstract query: DocumentNode;
    abstract mutationName: string;
    abstract mutation: DocumentNode;
    // eslint-disable-next-line no-unused-vars
    abstract onItems: Record<string, IOpCheckFillItem>;
    abstract offItems: Record<string, IOpCheckFillItem>;

    constructor(
        siteId: string,
        number: string,
        signatures: Record<SignatureName, SignatureStateItem>
    ) {
        this.siteId = siteId;
        this.number = number;
        this.signatures = signatures;
    }

    getInitialValues(): IOpCheck {
        return {
            siteId: this.siteId,
            number: this.number,
            area: '',
            zone: '',
            department: '',
            day: undefined,
            supervisorBefore: undefined,
            staffBefore: undefined,
            timeBefore: undefined,
            supervisorAfter: undefined,
            staffAfter: undefined,
            timeAfter: undefined,
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

    marshal(submitValues: IOpCheck) {
        console.log();
        if (this.signatures.staffBefore[0]?.time) {
            submitValues.timeBefore =
                this.signatures.staffBefore[0].time.format(
                    'YYYY-MM-DDTHH:mm:ss'
                );
        }
        if (this.signatures.staffAfter[0]?.time) {
            submitValues.timeAfter = this.signatures.staffAfter[0].time.format(
                'YYYY-MM-DDTHH:mm:ss'
            );
        }
    }

    validate(values: any) {
        const onList = Object.keys(this.onItems);
        const offList = Object.keys(this.offItems);
        const errors: FormikErrors<IOpCheck> = {};
        const filledOffKeys = [];

        for (let key of onList) {
            if (values[key as keyof IOpCheck] === null) {
                errors[key as keyof IOpCheck] = '必填';
            }
        }
        for (let key of offList) {
            filledOffKeys.push(values[key as keyof IOpCheck]);
        }

        if (filledOffKeys.some((key: any) => key === true || key === false)) {
            for (let key of offList) {
                if (values[key as keyof IOpCheck] === null) {
                    errors[key as keyof IOpCheck] = '必填';
                }
            }
        }
        return errors;
    }
}
