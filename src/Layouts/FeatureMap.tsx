import React from 'react';

import Dashboard from '../Components/Dashboard/Dashboard';
import Site from '../Components/Site/Site';
import Organization from '../Components/Organization/Organization';
import PeopleOverview from '../Components/PeopleOverview/PeopleOverview';
import PeopleApproval from '../Components/PeopleApproval/PeopleApproval';
import PeopleEstablishment from '../Components/PeopleEstablishment/PeopleEstablishment';
import Schedule from '../Components/Schedule/Schedule';
import Report from '../Components/Report/Report';
import Photo from '../Components/Photo/Photo';
import WorkPermitForm from '../Components/WorkPermitForm/WorkPermitForm';
import ToolboxForm from '../Components/ToolboxForm/ToolboxForm';
import EngFaultForm from '../Components/EngFaultForm/EngFaultForm';
import EnvSecurityForm from '../Components/EnvSecurityForm/EnvSecurityForm';
import SpecialForm from '../Components/SpecialForm/SpecialForm';
import EHSForm from '../Components/EHSForm/EHSForm';
import EHSFaultForm from '../Components/EHSFaultForm/EHSFaultForm';
import MachineryManagement from '../Components/MachineryManagement/MachineryManagement';
import MachineryEstablishment from '../Components/MachineryEstablishment/MachineryEstablishment';
import OutsourceFaultForm from '../Components/OutsourceFaultForm/OutsourceFaultForm';

import { DashboardIcon, SiteIcon } from '../Icons/Icons';

export type featureName =
    | 'dashboard'
    | 'site'
    | 'organization'
    | 'people_overview'
    | 'people_approval'
    | 'people_establishment'
    | 'project_schedule'
    | 'project_report'
    | 'project_photo'
    | 'eng_work_permit_form'
    | 'eng_toolbox_form'
    | 'eng_fault_form'
    | 'eng_env_security_form'
    | 'eng_special_form'
    | 'eng_photo'
    | 'ehs_form'
    | 'ehs_fault_form'
    | 'ehs_machinery_management'
    | 'ehs_photo'
    | 'outsource_work_permit_form'
    | 'outsource_toolbox_form'
    | 'outsource_env_security_form'
    | 'outsource_special_form'
    | 'outsource_machinery_establishment'
    | 'outsource_fault_form';

export type featureItem = {
    name: string;
    path: string;
    icon?: () => JSX.Element;
    page: JSX.Element;
};

export function getFeatureMap({
    siteId,
}: {
    siteId: string;
}): Record<featureName, featureItem> {
    return {
        dashboard: {
            name: '總覽',
            path: '/dashboard',
            icon: DashboardIcon,
            page: <Dashboard />,
        },
        site: {
            name: '專案建置',
            path: '/site',
            icon: SiteIcon,
            page: <Site />,
        },
        organization: {
            name: '專案人員組織',
            path: '/organization',
            page: <Organization />,
        },
        people_overview: {
            name: '人員資料總覽',
            path: '/people/overview',
            page: <PeopleOverview />,
        },
        people_approval: {
            name: '人員資料審查',
            path: '/people/approval',
            page: <PeopleApproval />,
        },
        people_establishment: {
            name: '人員資料建置',
            path: '/people/establishment',
            page: <PeopleEstablishment />,
        },
        project_schedule: {
            name: '排程管理',
            path: '/project/schedule',
            page: <Schedule siteId={siteId} />,
        },
        project_report: {
            name: '進度報表',
            path: '/project/report',
            page: <Report />,
        },
        project_photo: {
            name: '相片管理',
            path: '/project/photo',
            page: <Photo />,
        },
        eng_work_permit_form: {
            name: '工作許可單',
            path: '/eng/form/work-permit',
            page: <WorkPermitForm />,
        },
        eng_toolbox_form: {
            name: '工具箱會議',
            path: '/eng/form/toolbox',
            page: <ToolboxForm />,
        },
        eng_fault_form: {
            name: '工安缺失單',
            path: '/eng/form/fault',
            page: <EngFaultForm />,
        },
        eng_env_security_form: {
            name: '環安衛自主檢點表',
            path: '/eng/form/env-security',
            page: <EnvSecurityForm />,
        },
        eng_special_form: {
            name: '特殊作業自主檢點表',
            path: '/eng/form/special',
            page: <SpecialForm />,
        },
        eng_photo: {
            name: '相片管理',
            path: '/eng/photo',
            page: <Photo />,
        },
        ehs_form: {
            name: '工安自主檢查',
            path: '/ehs/form',
            page: <EHSForm />,
        },
        ehs_fault_form: {
            name: '工安缺失單',
            path: '/ehs/form/fault',
            page: <EHSFaultForm />,
        },
        ehs_machinery_management: {
            name: '機具檢點管理',
            path: '/ehs/machinery/management',
            page: <MachineryManagement />,
        },
        ehs_photo: {
            name: '相片管理',
            path: '/ehs/photo',
            page: <Photo />,
        },
        outsource_work_permit_form: {
            name: '工作許可單',
            path: '/outsource/form/work-permit',
            page: <MachineryEstablishment />,
        },

        outsource_toolbox_form: {
            name: '工具箱會議',
            path: '/outsource/form/toolbox',
            page: <MachineryEstablishment />,
        },

        outsource_env_security_form: {
            name: '環安衛自主檢點表',
            path: '/outsource/form/env-security',
            page: <MachineryEstablishment />,
        },
        outsource_special_form: {
            name: '特殊作業自主檢點表',
            path: '/outsource/form/special',
            page: <MachineryEstablishment />,
        },

        outsource_machinery_establishment: {
            name: '機具清單建置',
            path: '/outsource/machinery/establishment',
            page: <MachineryEstablishment />,
        },
        outsource_fault_form: {
            name: '工安缺失單',
            path: '/outsource/form/fault',
            page: <OutsourceFaultForm />,
        },
    };
}
