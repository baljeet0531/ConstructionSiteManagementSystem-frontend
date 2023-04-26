import { gql } from '@apollo/client';
import { IDailyReport } from '../../../Interface/DailyReport';
import { WORKITEM_FIELDS } from '../../../Utils/GQLFragments';

export const GQL_DAILY_REPORT_MUTATION = '';

export const GQL_DAILY_REPORT_QUERY = gql`
    ${WORKITEM_FIELDS}
    query getDailyReport($siteId: String!, $dailyId: Int) {
        allSites {
            edges {
                node {
                    siteId
                    avatar
                }
            }
        }
        dailyReport(siteId: $siteId, dailyId: $dailyId) {
            dailyId
            siteId
            todayProgress
            totalProgress
            projectName
            owner
            department
            date
            enterDate
            cumulativeDays
            cumulativeLabor
            weatherMorning
            weatherAfternoon
            maxTemperature
            minTemperature
            workItem {
                ...workItem
            }
            supervisorIem
            supervisorConditioner
            supervisorFire
            supervisorDrain
            supervisorGas
            supervisorElectric
            supervisorControl
            supervisorWeakElectric
            supervisorOther
            laborIem
            laborConditioner
            laborFire
            laborDrain
            laborGas
            laborElectric
            laborControl
            laborWeakElectric
            laborOther
            nightIem
            nightConditioner
            nightFire
            nightDrain
            nightGas
            nightElectric
            nightControl
            nightWeakElectric
            nightOther
            totalIem
            totalConditioner
            totalFire
            totalDrain
            totalGas
            totalElectric
            totalControl
            totalWeakElectric
            totalOther
            total
        }
    }
`;

export function parseDailyReport(list: object[]): IDailyReport | undefined {
    if (!list[0]) return;

    const t = { ...list[0] } as IDailyReport;

    if (t.workItem) {
        t.workItem.map(({ today, tomorrow }) => {
            today.push({
                projectName: '',
                location: '',
                description: '',
                completeness: 0,
            });
            tomorrow.push({
                projectName: '',
                location: '',
                description: '',
            });
        });
    }

    return t;
}
