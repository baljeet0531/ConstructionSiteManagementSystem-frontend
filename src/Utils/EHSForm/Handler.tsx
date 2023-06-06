import { DocumentNode } from 'graphql';
import {
    SignatureStateItem,
    convertSignList,
    convertSignature,
    getSignature,
} from '../../Interface/Signature';
import {
    IEHSForm,
    IEHSFormFillItem,
    IEHSSignature,
    IGQLEHSSignature,
    SignaturesStateItem,
} from '../../Interface/EHSForm/Common';
import { IEHSFormNormal } from '../../Interface/EHSForm/Normal';
import { IEHSFormSpecial } from '../../Interface/EHSForm/Special';

export abstract class EHSFormHandler<
    C extends IEHSFormNormal | IEHSFormSpecial
> {
    siteId: string;
    day: string;
    supervisorSignature: SignatureStateItem;
    responsibleSignatures: SignaturesStateItem;
    abstract queryName: string;
    abstract query: DocumentNode;
    abstract mutationName: string;
    abstract mutation: DocumentNode;
    // eslint-disable-next-line no-unused-vars
    abstract itemGroups: Record<
        string,
        { name: string; items: IEHSFormFillItem[] }
    >;
    // eslint-disable-next-line no-unused-vars
    abstract isAmeliorateDisabled(values: C, code: string): boolean;

    constructor(
        siteId: string,
        day: string,
        supervisorSignature: SignatureStateItem,
        responsibleSignatures: SignaturesStateItem
    ) {
        this.siteId = siteId;
        this.day = day;
        this.supervisorSignature = supervisorSignature;
        this.responsibleSignatures = responsibleSignatures;
    }

    getInitialValues(): IEHSForm {
        return {
            siteId: this.siteId,
            day: this.day,
            checkDept: '',
            checkStaff: '',
            checkTarget: [],
            location: '',
            responsibleUnitSignature: [],
            supervisorUnitSignature: [],
        };
    }

    parse(data: IEHSForm[]): IEHSForm | undefined {
        if (!data[0]) return;
        const t = { ...data[0] };

        this.setResponsibleSigns(t);
        this.setSupervisorSign(t);

        if (!t.location) t.location = '';
        if (!t.checkDept) t.checkDept = '';
        if (!t.checkStaff) t.checkStaff = '';

        return t;
    }

    marshal(submitValues: IEHSForm) {
        const [signatureList] = this.responsibleSignatures;
        submitValues.responsibleUnitSignature = convertSignList(
            signatureList
        ) as IEHSSignature[];

        const [signature] = this.supervisorSignature;
        const sign = {
            ...convertSignature(signature),
            corpName: '',
            day: submitValues.day,
            signatureType: 'supervisor',
        };
        submitValues.supervisorUnitSignature = [sign] as IEHSSignature[];
        if (!submitValues.checkDept) submitValues.checkDept = null;
        if (!submitValues.checkStaff) submitValues.checkStaff = null;
        if (!submitValues.location) submitValues.location = null;
    }

    setResponsibleSigns(form: IEHSForm) {
        const [, setSignature] = this.responsibleSignatures;
        const GQLsigns = form.responsibleUnitSignature as
            | IGQLEHSSignature[]
            | undefined;
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

    setSupervisorSign(form: IEHSForm) {
        const [, setSignature] = this.supervisorSignature;
        const GQLsign = form.supervisorUnitSignature as
            | IGQLEHSSignature[]
            | undefined;
        if (GQLsign && GQLsign[0]) {
            getSignature(GQLsign[0]).then((sign) => {
                setSignature(sign);
            });
        }
    }

    getRowCount(): number {
        let count = 0;
        for (let group in this.itemGroups) {
            count += this.itemGroups[group].items.length;
        }
        return count;
    }
}
