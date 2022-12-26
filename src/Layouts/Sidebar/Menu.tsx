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
    const [selectValue, setSelectValue] = React.useState<number>(0);
    const { sitesList, setSelectedSite } = props;
    const siteSelectElements = sitesList.map(({ siteName }, index) => {
        return (
            <option key={index} value={index}>
                {siteName}
            </option>
        );
    });

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
                value={selectValue}
                onChange={(e) => setSelectValue(Number(e.currentTarget.value))}
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
