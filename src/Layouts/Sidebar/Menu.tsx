import React from 'react';
import { Feature } from './Feature';
import { VStack, Select } from '@chakra-ui/react';

export default function Menu(props: {
    sitesList: {
        siteId: string;
        siteName: string;
        role: string;
    }[];
    setSelectedSite: Function;
}) {
    const { sitesList, setSelectedSite } = props;

    const siteSelectElements = sitesList.map(({ siteName }, index) => {
        return (
            <option key={index} value={index}>
                {siteName}
            </option>
        );
    });

    return (
        <VStack
            borderRadius="30px"
            pt="24px"
            pb="24px"
            w="80%"
            m="auto"
            pl="12px"
            pr="12px"
            spacing="24px"
            align="left"
            background="#FFFFFF"
        >
            <Feature feature="site"></Feature>
            <Select
                onChange={(e) => {
                    setSelectedSite({ ...sitesList[Number(e.target.value)] });
                }}
            >
                {siteSelectElements}
            </Select>
            <Feature feature="dashboard"></Feature>
            <Feature feature="people"></Feature>
            <Feature feature="schedule"></Feature>
            <Feature feature="security"></Feature>
            <Feature feature="report"></Feature>
            <Feature feature="photo"></Feature>
        </VStack>
    );
}
