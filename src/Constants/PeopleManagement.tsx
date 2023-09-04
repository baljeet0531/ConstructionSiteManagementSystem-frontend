import { TCertCode, TCertTitle } from '../Types/PeopleManagement';

export const CertTitleToCodeMap: Record<
    TCertTitle,
    { code: TCertCode; expiredYear: number }
> = {
    高空作業車操作人員: { code: 'a', expiredYear: 3 },
    乙級職業安全管理員: { code: 'bosh', expiredYear: 2 },
    甲級職業安全管理師: { code: 'aos', expiredYear: 2 },
    甲級職業衛生管理師: { code: 'aoh', expiredYear: 2 },
    急救人員: { code: 'fr', expiredYear: 3 },
    '缺氧(侷限)作業主管證照': { code: 'o2', expiredYear: 3 },
    有機溶劑作業主管證照: { code: 'os', expiredYear: 3 },
    施工架組配作業主管證照: { code: 'sa', expiredYear: 3 },
    營造作業主管證照: { code: 's', expiredYear: 2 },
    作業主管證照: { code: 'ma', expiredYear: 2 },
    屋頂作業主管: { code: 'r', expiredYear: 3 },
    鋼構組配作業主管: { code: 'ssa', expiredYear: 3 },
    模板支撐作業主管: { code: 'fs', expiredYear: 3 },
    露天開挖作業主管: { code: 'pe', expiredYear: 3 },
    擋土支撐作業主管: { code: 'rs', expiredYear: 3 },
    粉塵作業主管: { code: 'dw', expiredYear: 3 },
};
