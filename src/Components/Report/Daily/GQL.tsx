import { gql } from '@apollo/client';
import { IDailyReport } from '../../../Interface/DailyReport';

export const GQL_DAILY_REPORT_MUTATION = '';

export const GQL_DAILY_REPORT_QUERY = gql`
    query getDailyReport {
        allSites {
            edges {
                node {
                    siteId
                    avatar
                }
            }
        }
    }
`;

export function parseDailyReport(list: object[]): IDailyReport | undefined {
    if (!list[0]) return;

    const t = { ...list[0] } as IDailyReport;

    return t;
}
