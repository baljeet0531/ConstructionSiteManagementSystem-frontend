import React from 'react';
import { Feature } from './Feature';
import {
    VStack,
    Select,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    Box,
} from '@chakra-ui/react';

import { featureName, featureItem } from '../FeatureMap';
import {
    PeopleIcon,
    PlaceIcon,
    EngineeringIcon,
    EHSIcon,
    OutsourcingIcon,
} from '../../Icons/Icons';

export default function Menu(props: {
    sitesList: {
        siteId: string;
        siteName: string;
        role: string;
    }[];
    featureMap: Record<featureName, featureItem>;
    setSelectedSite: Function;
}) {
    const [selectValue, setSelectValue] = React.useState<number>(0);
    const { sitesList, featureMap, setSelectedSite } = props;
    const siteSelectElements = sitesList.map(({ siteName }, index) => {
        return (
            <option key={index} value={index}>
                {siteName}
            </option>
        );
    });
    const buttonStyle = {
        display: 'flex',
        alignItems: 'center',
        borderRadius: '4px',
        fontSize: '15px',
        fontFamily: 'Inter',
        lineHeight: '28px',
        fontStyle: 'normal',
        height: '32px',
        gap: '6px',
        paddingLeft: '6px',
        margin: '4px',
        color: '#667080',
        fontWeight: '400',
    };

    const itemStyle = {
        border: '0',
    };

    const panelStyle = {
        pt: '0',
        pl: '3',
        pb: '0',
        pr: '0',
    };

    React.useEffect(() => {
        if (sitesList.length == 0) {
            setSelectValue(-1);
        } else if (sitesList.length != 0 && selectValue == -1) {
            setSelectValue(0);
        } else if (selectValue > sitesList.length - 1) {
            setSelectValue(0);
        }
        setSelectedSite({
            ...sitesList[selectValue],
        });
    }, [sitesList, selectValue]);

    return (
        <VStack
            borderRadius="30px"
            pt="14px"
            pb="14px"
            w="80%"
            m="auto"
            pl="12px"
            pr="12px"
            spacing="24px"
            align="left"
            background="#FFFFFF"
        >
            <Accordion >
                <Feature fItem={featureMap.dashboard} />
                <Feature fItem={featureMap.site} />
                <Box pl={3}>
                    <Feature fItem={featureMap.organization} />
                </Box>
                <AccordionItem sx={itemStyle}>
                    <AccordionButton sx={buttonStyle}>
                        <PeopleIcon />
                        人才管理
                    </AccordionButton>
                    <AccordionPanel sx={panelStyle}>
                        <Feature fItem={featureMap.people_overview} />
                        <Feature fItem={featureMap.people_approval} />
                        <Feature fItem={featureMap.people_establishment} />
                    </AccordionPanel>
                </AccordionItem>
                <Select
                    value={selectValue}
                    onChange={(e) =>
                        setSelectValue(Number(e.currentTarget.value))
                    }
                >
                    {siteSelectElements}
                </Select>
                <AccordionItem style={itemStyle}>
                    <AccordionButton style={buttonStyle}>
                        <PlaceIcon />
                        專案管理
                    </AccordionButton>
                    <AccordionPanel sx={panelStyle}>
                        <Feature fItem={featureMap.project_schedule} />
                        <Feature fItem={featureMap.project_report} />
                        <Feature fItem={featureMap.project_photo} />
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem style={itemStyle}>
                    <AccordionButton style={buttonStyle}>
                        <EngineeringIcon />
                        工程管理
                    </AccordionButton>
                    <AccordionPanel sx={panelStyle}>
                        <Feature fItem={featureMap.eng_work_permit_form} />
                        <Feature fItem={featureMap.eng_toolbox_form} />
                        <Feature fItem={featureMap.eng_fault_form} />
                        <Feature fItem={featureMap.eng_env_security_form} />
                        <Feature fItem={featureMap.eng_special_form} />
                        <Feature fItem={featureMap.eng_photo} />
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem style={itemStyle}>
                    <AccordionButton style={buttonStyle}>
                        <EHSIcon />
                        職安衛管理
                    </AccordionButton>
                    <AccordionPanel sx={panelStyle}>
                        <Feature fItem={featureMap.ehs_form} />
                        <Feature fItem={featureMap.ehs_fault_form} />
                        <Feature fItem={featureMap.ehs_machinery_management} />
                        <Feature fItem={featureMap.ehs_photo} />
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem style={itemStyle}>
                    <AccordionButton style={buttonStyle}>
                        <OutsourcingIcon />
                        承商管理
                    </AccordionButton>
                    <AccordionPanel sx={panelStyle}>
                        <Feature fItem={featureMap.outsource_work_permit_form} />
                        <Feature fItem={featureMap.outsource_toolbox_form} />
                        <Feature fItem={featureMap.outsource_env_security_form} />
                        <Feature fItem={featureMap.outsource_special_form} />
                        <Feature fItem={featureMap.outsource_machinery_establishment} />
                        <Feature fItem={featureMap.outsource_fault_form} />
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </VStack>
    );
}
