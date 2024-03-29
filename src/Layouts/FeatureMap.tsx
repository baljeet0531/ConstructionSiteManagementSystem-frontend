/* eslint-disable no-unused-vars */
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
import WorkPermitFormOverview from '../Components/WorkPermitForm/Overview';
import ToolboxFormOverview from '../Components/ToolboxForm/Overview';
import EngFaultOverview from '../Components/EngFaultForm/Overview';
import EnvSecurityForm from '../Components/EnvSecurityForm/EnvSecurityForm';
import OpCheckOverview from '../Components/OpCheckForm/Overview';
import EHSForm from '../Components/EHSForm/EHSForm';
import EHSFaultForm from '../Components/EHSFaultForm/EHSFaultForm';
import MachineryManagement from '../Components/MachineryManagement/MachineryManagement';
import MachineryEstablishment from '../Components/MachineryEstablishment/MachineryEstablishment';
import NoContentPageIcon from '../Images/NoContentPage.svg';

import { DashboardIcon, SiteIcon } from '../Icons/Icons';
import { Center, Flex, Image, Text } from '@chakra-ui/react';
import EHSOverview from '../Components/EHSForm/Overview';
import EnvSecurityOverview from '../Components/EnvSecurityForm/Overview';
import EHSFaultOverview from '../Components/EHSFaultForm/Overview';
import OutsourceFaultOverview from '../Components/OutsourceFaultForm/Overview';
import NoContentPage from '../Components/Shared/NoContentPage';
import SpecialEducationTraining from '../Components/SpecialEducationTraining/SpecialEducationTraining';

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
    | 'eng_op_check_form'
    | 'eng_photo'
    | 'ehs_form'
    | 'ehs_fault_form'
    | 'ehs_machinery_management'
    | 'ehs_photo'
    | 'ehs_special_education_training'
    | 'outsource_work_permit_form'
    | 'outsource_toolbox_form'
    | 'outsource_env_security_form'
    | 'outsource_op_check_form'
    | 'outsource_machinery_establishment'
    | 'outsource_fault_form';

export type featureItem = {
    name: string;
    path: string;
    icon?: () => JSX.Element;
    page: JSX.Element;
};

const emptySiteIdPage = <NoContentPage label="請先選擇專案，以顯示內容" />;
const noContentPage = <NoContentPage label="目前頁面施工中，敬請期待" />;

export function getFeatureMap(site: {
    siteId: string;
    siteName: string;
}): Record<featureName, featureItem> {
    const { siteId, siteName } = site;
    return {
        dashboard: {
            name: '總覽',
            path: '/dashboard',
            icon: DashboardIcon,
            page:
                siteId == '' ? (
                    emptySiteIdPage
                ) : (
                    <Dashboard
                        key={siteId}
                        siteId={siteId}
                        siteName={siteName}
                    />
                ),
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
            page:
                siteId == '' ? (
                    emptySiteIdPage
                ) : (
                    <Organization
                        key={siteId}
                        siteId={siteId}
                        siteName={siteName}
                    />
                ),
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
            page:
                siteId == '' ? (
                    emptySiteIdPage
                ) : (
                    <Schedule
                        key={siteId}
                        siteId={siteId}
                        siteName={siteName}
                    />
                ),
        },
        project_report: {
            name: '進度報表',
            path: '/project/report',
            page:
                siteId == '' ? (
                    emptySiteIdPage
                ) : (
                    <Report key={siteId} siteId={siteId} siteName={siteName} />
                ),
        },
        project_photo: {
            name: '相片管理',
            path: '/project/photo',
            page:
                siteId == '' ? (
                    emptySiteIdPage
                ) : (
                    <Photo key={siteId} siteId={siteId} siteName={siteName} />
                ),
        },
        eng_work_permit_form: {
            name: '工作許可單',
            path: '/eng/form/work-permit',
            page:
                siteId == '' ? (
                    emptySiteIdPage
                ) : (
                    <WorkPermitFormOverview
                        key={siteId}
                        siteId={siteId}
                        siteName={siteName}
                    />
                ),
        },
        eng_toolbox_form: {
            name: '工具箱會議',
            path: '/eng/form/toolbox',
            page:
                siteId == '' ? (
                    emptySiteIdPage
                ) : (
                    <ToolboxFormOverview
                        key={siteId}
                        siteId={siteId}
                        siteName={siteName}
                    />
                ),
        },
        eng_fault_form: {
            name: '工安缺失單',
            path: '/eng/form/fault',
            page:
                siteId == '' ? (
                    emptySiteIdPage
                ) : (
                    <EngFaultOverview
                        key={siteId}
                        siteId={siteId}
                        siteName={siteName}
                    />
                ),
        },
        eng_env_security_form: {
            name: '環安衛自主檢點表',
            path: '/eng/form/env-security',
            page:
                siteId == '' ? (
                    emptySiteIdPage
                ) : (
                    <EnvSecurityOverview
                        key={siteId}
                        siteId={siteId}
                        siteName={siteName}
                    />
                ),
        },
        eng_op_check_form: {
            name: '特殊作業自主檢點表',
            path: '/eng/form/opcheck',
            page:
                siteId == '' ? (
                    emptySiteIdPage
                ) : (
                    <OpCheckOverview
                        key={siteId}
                        siteId={siteId}
                        siteName={siteName}
                    />
                ),
        },
        eng_photo: {
            name: '相片管理',
            path: '/eng/photo',
            page:
                siteId == '' ? (
                    emptySiteIdPage
                ) : (
                    <Photo key={siteId} siteId={siteId} siteName={siteName} />
                ),
        },
        ehs_form: {
            name: '工安巡迴檢查表',
            path: '/ehs/form/ehs-form',
            page:
                siteId == '' ? (
                    emptySiteIdPage
                ) : (
                    <EHSOverview
                        key={siteId}
                        siteId={siteId}
                        siteName={siteName}
                    />
                ),
        },
        ehs_fault_form: {
            name: '工安缺失單',
            path: '/ehs/form/fault',
            page:
                siteId == '' ? (
                    emptySiteIdPage
                ) : (
                    <EHSFaultOverview
                        key={siteId}
                        siteId={siteId}
                        siteName={siteName}
                    />
                ),
        },
        ehs_machinery_management: {
            name: '機具檢點管理',
            path: '/ehs/machinery/management',
            page:
                siteId == '' ? (
                    emptySiteIdPage
                ) : (
                    <MachineryManagement
                        key={siteId}
                        siteId={siteId}
                        siteName={siteName}
                    />
                ),
        },
        ehs_photo: {
            name: '相片管理',
            path: '/ehs/photo',
            page:
                siteId == '' ? (
                    emptySiteIdPage
                ) : (
                    <Photo key={siteId} siteId={siteId} siteName={siteName} />
                ),
        },
        ehs_special_education_training: {
            name: '特殊教育訓練',
            path: '/ehs/special-education-training',
            page: <SpecialEducationTraining />,
        },
        outsource_work_permit_form: {
            name: '工作許可單',
            path: '/outsource/form/work-permit',
            page:
                siteId == '' ? (
                    emptySiteIdPage
                ) : (
                    <WorkPermitFormOverview
                        key={siteId}
                        siteId={siteId}
                        siteName={siteName}
                    />
                ),
        },
        outsource_toolbox_form: {
            name: '工具箱會議',
            path: '/outsource/form/toolbox',
            // page: <MachineryEstablishment />,
            page:
                siteId == '' ? (
                    emptySiteIdPage
                ) : (
                    <ToolboxFormOverview
                        key={siteId}
                        siteId={siteId}
                        siteName={siteName}
                    />
                ),
        },
        outsource_env_security_form: {
            name: '環安衛自主檢點表',
            path: '/outsource/form/env-security',
            page:
                siteId == '' ? (
                    emptySiteIdPage
                ) : (
                    <EnvSecurityOverview
                        key={siteId}
                        siteId={siteId}
                        siteName={siteName}
                    />
                ),
        },
        outsource_op_check_form: {
            name: '特殊作業自主檢點表',
            path: '/outsource/form/opcheck',
            page:
                siteId == '' ? (
                    emptySiteIdPage
                ) : (
                    <OpCheckOverview
                        key={siteId}
                        siteId={siteId}
                        siteName={siteName}
                    />
                ),
        },
        outsource_machinery_establishment: {
            name: '機具清單建置',
            path: '/outsource/machinery/establishment',
            page:
                siteId == '' ? (
                    emptySiteIdPage
                ) : (
                    <MachineryEstablishment
                        key={siteId}
                        siteId={siteId}
                        siteName={siteName}
                    />
                ),
        },
        outsource_fault_form: {
            name: '工安缺失單',
            path: '/outsource/form/fault',
            page:
                siteId == '' ? (
                    emptySiteIdPage
                ) : (
                    <OutsourceFaultOverview
                        key={siteId}
                        siteId={siteId}
                        siteName={siteName}
                    />
                ),
        },
    };
}
