// import { gql } from '@apollo/client';
import { IFaultForm } from '../../Interface/FaultForm';

export const GQL_FAULT_FORM_MUTATION = ``;

export const GQL_FAULT_FORM_QUERY = ``;

export function parseFaultForm(list: object[]): IFaultForm | undefined {
    if (!list[0]) return;

    const t = { ...list[0] } as IFaultForm;

    return t;
}
