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
import { SIGNATURE_FIELDS } from '../../Utils/GQLFragments';
import { Cookies } from 'react-cookie';

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
    ${SIGNATURE_FIELDS}
    query getWorkPermit($siteId: String!, $number: String) {
        contractingCorpName(siteId: $siteId)
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
                ...gqlSignatureFields
            }
            reviewRef {
                ...gqlSignatureFields
            }
            supplierManagerRef {
                ...gqlSignatureFields
            }
            supplierRef {
                ...gqlSignatureFields
            }
        }
    }
`;

export function parseWorkPermit(
    list: object[],
    modified: boolean,
    signatures: Record<SignatureName, SignatureStateItem>
): (IWorkPermit & IGQLWorkPermit) | undefined {
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

    if (t.applicant === null) {
        t.applicant = new Cookies().get('username');
    }

    if (t.zone === '') {
        t.zone = [];
    }

    if (typeof t.zone === 'string') {
        t.zone = t.zone.split(',');
    }

    // 異動申請
    if (modified) {
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
        // 1. 初次申請 2. 修改初次申請 3. 修改異動單
    } else {
        // 1. 初次申請
        if (!t.applied && !t.modified) {
            t.applied = true;
        }
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
