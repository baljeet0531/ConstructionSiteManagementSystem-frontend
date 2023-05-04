import { Button, Flex, Radio, RadioGroup, Text } from '@chakra-ui/react';
import React from 'react';
import { LaunchIcon } from '../../../Icons/Icons';

const planDates = ['2022/01/25', '2022/04/01', '2022/06/04'];
const timeGranularity = ['月', '季'];

export default function MonthlyReport() {
    const planDatesRadios = planDates.map((date, index) => (
        <Radio key={index} value={`${index}`} colorScheme={'gray'}>
            <Text>{date}</Text>
        </Radio>
    ));
    const timeGranularityRadios = timeGranularity.map((unit, index) => (
        <Radio key={index} value={`${index}`} colorScheme={'gray'}>
            <Text>{unit}</Text>
        </Radio>
    ));

    return (
        <Flex
            direction={'column'}
            align={'flex-end'}
            justify={'flex-start'}
            width={'464px'}
            border={'1px dashed #919AA9'}
            borderRadius={'5px'}
            padding={'15px'}
        >
            <Flex width={'100%'}>
                <Flex width={'50%'}>
                    <Text>原始計畫：</Text>
                    <RadioGroup defaultValue={'0'}>
                        <Flex direction={'column'}>{planDatesRadios}</Flex>
                    </RadioGroup>
                </Flex>
                <Flex width={'50%'}>
                    <Text>時間單位：</Text>
                    <RadioGroup defaultValue={'0'}>
                        <Flex direction={'column'}>
                            {timeGranularityRadios}
                        </Flex>
                    </RadioGroup>
                </Flex>
            </Flex>
            <Button
                leftIcon={<LaunchIcon />}
                variant={'buttonGrayOutline'}
                onClick={() => {}}
            >
                輸出
            </Button>
        </Flex>
    );
}
