import { gql } from '@apollo/client';
import { IDailyReport } from '../../../Interface/DailyReport';
import { WORKITEM_FIELDS } from '../../../Utils/GQLFragments';

export const GQL_DAILY_REPORT_MUTATION = gql`
    mutation updateDailyReport(
        $dailyId: Int!
        $department: String
        $laborConditioner: Int
        $laborControl: Int
        $laborDrain: Int
        $laborElectric: Int
        $laborFire: Int
        $laborGas: Int
        $laborIem: Int
        $laborOther: Int
        $laborWeakElectric: Int
        $nightConditioner: Int
        $nightControl: Int
        $nightDrain: Int
        $nightElectric: Int
        $nightFire: Int
        $nightGas: Int
        $nightIem: Int
        $nightOther: Int
        $nightWeakElectric: Int
        $owner: String
        $siteId: String!
        $supervisorConditioner: Int
        $supervisorControl: Int
        $supervisorDrain: Int
        $supervisorElectric: Int
        $supervisorFire: Int
        $supervisorGas: Int
        $supervisorIem: Int
        $supervisorOther: Int
        $supervisorWeakElectric: Int
        $todayProgress: Float
        $todayWorkItem: [gqlTodayWorkItemInput]
        $tomorrowWorkItem: [gqlTomorrowWorkItemInput]
        $total: Int
        $totalConditioner: Int
        $totalControl: Int
        $totalDrain: Int
        $totalElectric: Int
        $totalFire: Int
        $totalGas: Int
        $totalIem: Int
        $totalOther: Int
        $totalProgress: Float
        $totalWeakElectric: Int
    ) {
        updateDailyReport(
            dailyId: $dailyId
            department: $department
            laborConditioner: $laborConditioner
            laborControl: $laborControl
            laborDrain: $laborDrain
            laborElectric: $laborElectric
            laborFire: $laborFire
            laborGas: $laborGas
            laborIem: $laborIem
            laborOther: $laborOther
            laborWeakElectric: $laborWeakElectric
            nightConditioner: $nightConditioner
            nightControl: $nightControl
            nightDrain: $nightDrain
            nightElectric: $nightElectric
            nightFire: $nightFire
            nightGas: $nightGas
            nightIem: $nightIem
            nightOther: $nightOther
            nightWeakElectric: $nightWeakElectric
            owner: $owner
            siteId: $siteId
            supervisorConditioner: $supervisorConditioner
            supervisorControl: $supervisorControl
            supervisorDrain: $supervisorDrain
            supervisorElectric: $supervisorElectric
            supervisorFire: $supervisorFire
            supervisorGas: $supervisorGas
            supervisorIem: $supervisorIem
            supervisorOther: $supervisorOther
            supervisorWeakElectric: $supervisorWeakElectric
            todayProgress: $todayProgress
            todayWorkItem: $todayWorkItem
            tomorrowWorkItem: $tomorrowWorkItem
            total: $total
            totalConditioner: $totalConditioner
            totalControl: $totalControl
            totalDrain: $totalDrain
            totalElectric: $totalElectric
            totalFire: $totalFire
            totalGas: $totalGas
            totalIem: $totalIem
            totalOther: $totalOther
            totalProgress: $totalProgress
            totalWeakElectric: $totalWeakElectric
        ) {
            ok
            message
        }
    }
`;

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
