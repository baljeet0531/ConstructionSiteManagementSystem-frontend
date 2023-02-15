import { gql } from '@apollo/client';
import dayjs from 'dayjs';
import {
    getSignature,
    IGQLSignature,
    SignatureStateItem,
} from '../../Interface/Signature';
import {
    IGQLWorkPermit,
    IWorkPermit,
    SignatureName,
} from '../../Interface/WorkPermit';

export const GQL_WORK_PERMIT_MUTATION = gql`
    mutation uwp(
        $approved: signatureInput
        $applicant: String!
        $applied: Boolean
        $area: String
        $modified: Boolean
        $number: String
        $opAssemble: Boolean
        $opAloft: Boolean
        $opCage: Boolean
        $opChemical: Boolean
        $opConfined: Boolean
        $opDetach: Boolean
        $opElectric: Boolean
        $opElse: String
        $opFire: Boolean
        $opHole: Boolean
        $opLift: Boolean
        $project: String
        $projectName: String
        $review: signatureInput
        $siteId: String!
        $supervisor: String
        $supervisorCorp: String
        $supplier: signatureInput
        $supplierManager: signatureInput
        $supplyDate: Date
        $system: String
        $systemBranch: String
        $tel: String
        $workStart: DateTime!
        $workEnd: DateTime!
        $zone: String
    ) {
        updateWorkPermit(
            applicant: $applicant
            applied: $applied
            approved: $approved
            area: $area
            modified: $modified
            number: $number
            opAloft: $opAloft
            opAssemble: $opAssemble
            opCage: $opCage
            opChemical: $opChemical
            opConfined: $opConfined
            opDetach: $opDetach
            opElectric: $opElectric
            opElse: $opElse
            opFire: $opFire
            opHole: $opHole
            opLift: $opLift
            project: $project
            projectName: $projectName
            review: $review
            siteId: $siteId
            supervisor: $supervisor
            supervisorCorp: $supervisorCorp
            supplier: $supplier
            supplierManager: $supplierManager
            supplyDate: $supplyDate
            system: $system
            systemBranch: $systemBranch
            tel: $tel
            workEnd: $workEnd
            workStart: $workStart
            zone: $zone
        ) {
            ok
            message
        }
    }
`;

export const GQL_WORK_PERMIT_QUERY = gql`
    query getWorkPermit($siteId: String!, $number: String) {
        workContent(siteId: $siteId) {
            content {
                name
                system {
                    name
                    systemBranch {
                        name
                        project
                    }
                }
            }
        }
        siteAreas(siteId: $siteId) {
            name
            zone
        }
        workPermit(siteId: $siteId, number: $number) {
            siteId
            number
            applicant
            applied
            modified
            supplyDate
            system
            systemBranch
            project
            area
            zone
            workStart
            workEnd
            supervisorCorp
            supervisor
            tel
            projectName
            opFire
            opAloft
            opConfined
            opElectric
            opCage
            opLift
            opAssemble
            opDetach
            opHole
            opChemical
            opElse
            approvedRef {
                path
                time
                owner
            }
            reviewRef {
                path
                time
                owner
            }
            supplierManagerRef {
                path
                time
                owner
            }
            supplierRef {
                path
                time
                owner
            }
        }
    }
`;

export function parseWorkPermit(
    list: object[],
    modified: boolean,
    signatures: Record<SignatureName, SignatureStateItem>
): IWorkPermit | undefined {
    if (!list[0]) return;
    const gqlSignatureColName = [
        'approvedRef',
        'reviewRef',
        'supplierManagerRef',
        'supplierRef',
    ];
    const signatureColName: SignatureName[] = [
        'approved',
        'review',
        'supplierManager',
        'supplier',
    ];

    const t = { ...list[0] } as IGQLWorkPermit;
    if (typeof t.zone === 'string') {
        t.zone = t.zone.split(',');
    }

    if (modified) {
        t.number = '';
        t.modified = true;
        t.applied = false;
        for (let name of signatureColName) {
            t[name] = undefined;
        }
        t.workStart = dayjs(t.workStart, 'YYYY-MM-DDTHH:mm:ss')
            .hour(18)
            .minute(0)
            .format('YYYY-MM-DDTHH:mm:ss');
        t.workEnd = dayjs(t.workEnd, 'YYYY-MM-DDTHH:mm:ss')
            .hour(23)
            .minute(30)
            .format('YYYY-MM-DDTHH:mm:ss');
    } else {
        for (let i = 0; i < signatureColName.length; i++) {
            const GQLkey = gqlSignatureColName[i] as keyof IGQLWorkPermit;
            const GQLsign = t[GQLkey] as IGQLSignature | undefined;
            const key = signatureColName[i];
            const [, setSignature] = signatures[key];
            if (GQLsign) {
                getSignature(GQLsign).then((item) => {
                    setSignature(item);
                });
            }
        }
    }
    return t;
}
