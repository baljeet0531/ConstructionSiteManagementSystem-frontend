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
import ToolboxForm from '../Components/ToolboxForm/ToolboxForm';
import EngFaultForm from '../Components/EngFaultForm/EngFaultForm';
import EnvSecurityForm from '../Components/EnvSecurityForm/EnvSecurityForm';
import SpecialForm from '../Components/SpecialForm/SpecialForm';
import EHSForm from '../Components/EHSForm/EHSForm';
import EHSFaultForm from '../Components/EHSFaultForm/EHSFaultForm';
import MachineryManagement from '../Components/MachineryManagement/MachineryManagement';
import MachineryEstablishment from '../Components/MachineryEstablishment/MachineryEstablishment';
import OutsourceFaultForm from '../Components/OutsourceFaultForm/OutsourceFaultForm';
import NoContentPageIcon from '../Images/NoContentPage.svg';

import { DashboardIcon, SiteIcon } from '../Icons/Icons';
import { Box, Center, Flex, Image, Text } from '@chakra-ui/react';

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

const emptySiteIdPage = (
    <Center w={'100%'} h={'100%'}>
        請選擇專案
    </Center>
);

const noContentPage = (
    <Center w={'100%'} h={'100%'}>
        <Flex
            w={'60%'}
            direction={'column'}
            gap={'35px'}
            justify={'center'}
            align={'center'}
        >
            <Image src={NoContentPageIcon}></Image>
            <Text
                fontFamily={'Inter'}
                fontStyle={'normal'}
                fontWeight={700}
                fontSize={'1.5rem'}
                lineHeight={'1.25rem'}
                color={'#4C7DE7'}
                textAlign={'center'}
            >
                目前頁面施工中，敬請期待
            </Text>
        </Flex>
    </Center>
);

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
            // page: <Dashboard />,
            page: noContentPage,
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
            // page: <Organization />,
            page: noContentPage,
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
            page: siteId == '' ? emptySiteIdPage : <Schedule siteId={siteId} />,
        },
        project_report: {
            name: '進度報表',
            path: '/project/report',
            // page: <Report />,
            page: noContentPage,
        },
        project_photo: {
            name: '相片管理',
            path: '/project/photo',
            // page: <Photo />,
            page: noContentPage,
        },
        eng_work_permit_form: {
            name: '工作許可單',
            path: '/eng/form/work-permit',
            page:
                siteId == '' ? (
                    emptySiteIdPage
                ) : (
                    <WorkPermitFormOverview siteId={siteId} />
                ),
        },
        eng_toolbox_form: {
            name: '工具箱會議',
            path: '/eng/form/toolbox',
            // page: <ToolboxForm />,
            page: noContentPage,
        },
        eng_fault_form: {
            name: '工安缺失單',
            path: '/eng/form/fault',
            // page: <EngFaultForm />,
            page: noContentPage,
        },
        eng_env_security_form: {
            name: '環安衛自主檢點表',
            path: '/eng/form/env-security',
            // page: <EnvSecurityForm />,
            page: noContentPage,
        },
        eng_special_form: {
            name: '特殊作業自主檢點表',
            path: '/eng/form/special',
            // page: <SpecialForm />,
            page: noContentPage,
        },
        eng_photo: {
            name: '相片管理',
            path: '/eng/photo',
            // page: <Photo />,
            page: noContentPage,
        },
        ehs_form: {
            name: '工安自主檢查',
            path: '/ehs/form/ehs-form',
            // page: <EHSForm />,
            page: noContentPage,
        },
        ehs_fault_form: {
            name: '工安缺失單',
            path: '/ehs/form/fault',
            // page: <EHSFaultForm />,
            page: noContentPage,
        },
        ehs_machinery_management: {
            name: '機具檢點管理',
            path: '/ehs/machinery/management',
            // page: <MachineryManagement />,
            page: noContentPage,
        },
        ehs_photo: {
            name: '相片管理',
            path: '/ehs/photo',
            // page: <Photo />,
            page: noContentPage,
        },
        outsource_work_permit_form: {
            name: '工作許可單',
            path: '/outsource/form/work-permit',
            page:
                siteId == '' ? (
                    emptySiteIdPage
                ) : (
                    <WorkPermitFormOverview siteId={siteId} />
                ),
        },
        outsource_toolbox_form: {
            name: '工具箱會議',
            path: '/outsource/form/toolbox',
            // page: <MachineryEstablishment />,
            page: noContentPage,
        },
        outsource_env_security_form: {
            name: '環安衛自主檢點表',
            path: '/outsource/form/env-security',
            // page: <MachineryEstablishment />,
            page: noContentPage,
        },
        outsource_special_form: {
            name: '特殊作業自主檢點表',
            path: '/outsource/form/special',
            // page: <MachineryEstablishment />,
            page: noContentPage,
        },
        outsource_machinery_establishment: {
            name: '機具清單建置',
            path: '/outsource/machinery/establishment',
            // page: <MachineryEstablishment />,
            page: noContentPage,
        },
        outsource_fault_form: {
            name: '工安缺失單',
            path: '/outsource/form/fault',
            // page: <OutsourceFaultForm />,
            page: noContentPage,
        },
    };
}
