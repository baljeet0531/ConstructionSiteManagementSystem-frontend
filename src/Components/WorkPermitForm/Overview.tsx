import React from 'react';
import { Navigate } from 'react-router-dom';
import {
    Button,
    Flex,
    Input,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    Text,
} from '@chakra-ui/react';
import { IsPermit } from '../../Mockdata/Mockdata';
import WPOverViewTable from './WPOverviewTable';
import { AddIcon, ArrowDropDownIcon, LaunchIcon } from '../../Icons/Icons';

export default function WorkPermitFormOverview({ siteId }: { siteId: string }) {
    if (!IsPermit('eng_work_permit_form'))
        return <Navigate to="/" replace={true} />;

    const navSingleWorkPermit = () => {
        const url = `${window.location.origin}/form/work-permit`;
        localStorage.setItem('siteId', siteId);
        // TODO: Save the workPermit item in localStorage
        // localStorage.setItem('singleWorkPermit', JSON.stringify(valueList[e.currentTarget.id]))
        window.open(url, '_blank');
    };

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
            <Text
                fontWeight={500}
                fontSize={'14px'}
                lineHeight={'20px'}
                position={'absolute'}
                top={'20px'}
                right={'42px'}
            >
                穩懋南科路竹廠機電一期新建工程
            </Text>
            <Text variant={'pageTitle'}>工作許可單</Text>
            <Flex align={'center'} justify={'space-between'}>
                <Flex gap={'10px'} align={'center'}>
                    <Input
                        type={'date'}
                        width={'208px'}
                        variant={'formOutline'}
                    ></Input>
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
                            <PopoverBody>
                                <Text>PopoverBody</Text>
                                <Flex justifyContent="flex-end">
                                    <Button variant={'buttonBlueSolid'}>
                                        確定搜尋
                                    </Button>
                                </Flex>
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                </Flex>
                <Flex gap={'10px'}>
                    <Button
                        leftIcon={<AddIcon />}
                        variant={'buttonBlueSolid'}
                        onClick={navSingleWorkPermit}
                    >
                        新增工單
                    </Button>
                    <Button
                        leftIcon={<LaunchIcon />}
                        variant={'buttonGrayOutline'}
                    >
                        輸出
                    </Button>
                </Flex>
            </Flex>
            <WPOverViewTable></WPOverViewTable>
        </Flex>
    );
}
