import React from 'react';
import {
    Flex,
    Text,
    Popover,
    PopoverTrigger,
    Button,
    PopoverContent,
    PopoverArrow,
    PopoverBody,
    Grid,
} from '@chakra-ui/react';
import { DateRangePicker } from 'rsuite';
import { Navigate } from 'react-router-dom';
import { IsPermit } from '../../Mockdata/Mockdata';
import { ArrowDropDownIcon, LaunchIcon } from '../../Icons/Icons';
import { DateRange } from 'rsuite/esm/DateRangePicker/types';

export default function ToolboxFormOverview(props: {
    siteId: string;
    siteName: string;
}) {
    if (!IsPermit('eng_toolbox_form'))
        return <Navigate to="/" replace={true} />;
    const { siteName } = props;

    const [dateRange, setDateRange] = React.useState<DateRange | null>(null);

    return (
        <Flex
            direction={'column'}
            h={'100vh'}
            w={'100%'}
            pl={'42px'}
            pr={'42px'}
            pt={'47px'}
            pb={'24px'}
            gap={'11px'}
        >
            <Text variant={'pageSiteName'}>{siteName}</Text>
            <Text variant={'pageTitle'}>工具箱會議</Text>
            <Flex align={'center'} justify={'space-between'}>
                <Flex gap={'10px'} align={'center'}>
                    <DateRangePicker
                        value={dateRange}
                        onChange={(value) => setDateRange(value)}
                    />
                    <Popover placement={'bottom-start'}>
                        <PopoverTrigger>
                            <Button
                                rightIcon={<ArrowDropDownIcon />}
                                variant={'buttonGraySolid'}
                            >
                                搜尋條件
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverBody
                                display={'flex'}
                                padding={'24px'}
                                height={'328px'}
                                flexDirection={'column'}
                                justifyContent={'space-between'}
                            >
                                <Grid
                                    padding={'10px'}
                                    gap={'10px'}
                                    templateColumns={'repeat(2,1fr)'}
                                >
                                    <Flex
                                        direction={'column'}
                                        gap={'12px'}
                                        overflowX={'hidden'}
                                    >
                                        <Text>施工廠區</Text>
                                        <Flex
                                            direction={'column'}
                                            gap={'12px'}
                                            overflowY={'auto'}
                                            wordBreak={'break-word'}
                                            maxH={'202px'}
                                        >
                                            {/* {areaCheckbox} */}
                                        </Flex>
                                    </Flex>
                                    <Flex
                                        direction={'column'}
                                        gap={'12px'}
                                        overflowX={'hidden'}
                                    >
                                        <Text>系統</Text>
                                        <Flex
                                            direction={'column'}
                                            gap={'12px'}
                                            overflowY={'auto'}
                                            wordBreak={'break-word'}
                                            maxH={'202px'}
                                        >
                                            {/* {systemCheckbox} */}
                                        </Flex>
                                    </Flex>
                                </Grid>
                                <Flex justifyContent="flex-end">
                                    <Button
                                        variant={'buttonBlueSolid'}
                                        // onClick={() => {
                                        //     searchWorkpermit({
                                        //         variables: {
                                        //             siteId: siteId,
                                        //             area: areas.flatMap(
                                        //                 (area) =>
                                        //                     area.isChecked
                                        //                         ? area.name
                                        //                         : []
                                        //             ),
                                        //             system: systems.flatMap(
                                        //                 (system) =>
                                        //                     system.isChecked
                                        //                         ? system.name
                                        //                         : []
                                        //             ),
                                        //             ...(startDate && {
                                        //                 startDate: `${startDate}T08:30:00`,
                                        //             }),
                                        //             ...(endDate && {
                                        //                 endDate: `${endDate}T08:30:00`,
                                        //             }),
                                        //         },
                                        //     });
                                        // }}
                                    >
                                        確定搜尋
                                    </Button>
                                </Flex>
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                </Flex>
                <Button leftIcon={<LaunchIcon />} variant={'buttonGrayOutline'}>
                    輸出
                </Button>
            </Flex>
            {/* {(loading || searchLoading || exportLoading) && (
                <Center
                    position={'absolute'}
                    top={0}
                    left={'20vw'}
                    w={'80vw'}
                    h={'100vh'}
                    bg={'#D9D9D980'}
                    zIndex={2}
                >
                    <Spinner size={'xl'} />
                </Center>
            )} */}
        </Flex>
    );
}
