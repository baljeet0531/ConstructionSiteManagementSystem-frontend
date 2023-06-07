/* eslint-disable no-unused-vars */
import { DocumentNode } from 'graphql';
import {
    ISignature,
    ObjectSignatureStateItem,
    SignatureStateItem,
    convertSignObject,
    convertSignature,
    getSignature,
} from '../../Interface/Signature';
import {
    IEHSForm,
    IEHSFormFillItem,
    IEHSFormTargetInItem,
    IEHSSignature,
    IGQLEHSSignature,
} from '../../Interface/EHSForm/Common';
import { IEHSFormNormal } from '../../Interface/EHSForm/Normal';
import { IEHSFormSpecial } from '../../Interface/EHSForm/Special';

export abstract class EHSFormHandler<
    C extends IEHSFormNormal | IEHSFormSpecial
> {
    siteId: string;
    day: string;
    supervisorSignature: SignatureStateItem;
    responsibleSignatures: ObjectSignatureStateItem;
    abstract queryName: string;
    abstract query: DocumentNode;
    abstract mutationName: string;
    abstract mutation: DocumentNode;
    abstract itemGroups: Record<
        string,
        { name: string; items: IEHSFormFillItem[] }
    >;
    abstract isAmeliorateDisabled(values: C, code: string): boolean;

    constructor(
        siteId: string,
        day: string,
        supervisorSignature: SignatureStateItem,
        responsibleSignatures: ObjectSignatureStateItem
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

        let key: keyof typeof t;
        for (key in t) {
            if (key.includes('Ameliorate') && t[key] !== null) {
                const target = t[key] as [];
                target.map((item) => {
                    delete item['__typename'];
                });
            }
        }

        if (!t.location) t.location = '';
        if (!t.checkDept) t.checkDept = '';
        if (!t.checkStaff) t.checkStaff = '';

        return t;
    }

    marshal(submitValues: IEHSForm) {
        const [signatureObj] = this.responsibleSignatures;
        const updateObj = convertSignObject(signatureObj);
        const signList: IEHSSignature[] = [];
        for (let key in updateObj) {
            const sign = updateObj[key] as ISignature;
            signList.push({
                ...sign,
                corpName: key,
                day: submitValues.day,
            });
        }
        submitValues.responsibleUnitSignature = signList;
        const [signature] = this.supervisorSignature;
        if (signature) {
            const sign = {
                ...convertSignature(signature),
                corpName: '',
                day: submitValues.day,
            };
            submitValues.supervisorUnitSignature = [sign] as IEHSSignature[];
        }
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
                    });
                }
            };
            getSignList().then(() => {
                const newObj: { [key: string]: ISignature } = {};
                signs.forEach((sign) => {
                    newObj[sign.corpName] = sign;
                });
                setSignature(newObj);
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

    getSelectedCorp(
        values: C,
        searchName: string[]
    ): { [key: string]: string[] } {
        const target = searchName.reduce(
            (acc, cur) => ({ ...acc, [cur]: [] }),
            {}
        ) as { [key: string]: string[] };

        let key: keyof C;
        for (key in values) {
            if (key.includes('Ameliorate') && values[key]) {
                const list = values[key] as IEHSFormTargetInItem[];
                list.map((item) => {
                    target[item.corpName].push(item.code);
                });
            }
        }
        return target;
    }
}
