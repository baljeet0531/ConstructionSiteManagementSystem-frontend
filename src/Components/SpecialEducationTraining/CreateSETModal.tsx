import React from 'react';
import BlueBodyModal from '../Shared/BlueBodyModal';
import { Flex, Select, Text, useToast } from '@chakra-ui/react';
import {
    LazyQueryExecFunction,
    MutationTuple,
    gql,
    useQuery,
} from '@apollo/client';
import { ItemsOptions, TItem } from './SpecialEducationTraining';
import { defaultErrorToast } from '../../Utils/DefaultToast';
import dayjs from 'dayjs';
import { DatePicker, InputPicker } from 'rsuite';
import { ItemDataType } from 'rsuite/esm/@types/common';
import { PageLoading } from '../Shared/Loading';
import { TEmptyResult } from '../../Hooks/UseGQLOverview';
import {
    IQuerySpecialEducationalTraining,
    IQuerySpecialEducationalTrainingVar,
    IUpdateSpecialEducationalTraining,
    IUpdateSpecialEducationalTrainingVar,
} from '../../Interface/SpecialEducationTraining';

interface ISpecialEducationTrainingHR {
    name: string;
    idno: string;
}

const QUERY_HUMAN_RESOURCE = gql`
    query AllHumanresource {
        allHumanresource {
            name
            idno
        }
    }
`;

export default function CreateSETModal(props: {
    isOpen: boolean;
    onClose: () => void;
    filterFunction:
        | (() => void)
        | LazyQueryExecFunction<
              IQuerySpecialEducationalTraining,
              IQuerySpecialEducationalTrainingVar
          >;
    updateResult:
        | TEmptyResult
        | MutationTuple<
              IUpdateSpecialEducationalTraining,
              IUpdateSpecialEducationalTrainingVar
          >;
}) {
    const {
        isOpen,
        onClose,
        updateResult: [updateFunction, { loading: updateLoading }],
    } = props;
    const toast = useToast();
    const [date, setDate] = React.useState<Date>(dayjs().toDate());
    const [item, setItem] = React.useState<TItem>('缺氧作業');
    const [idno, setIdno] = React.useState<string>();
    const [data, setData] = React.useState<ItemDataType[]>([]);

    const { loading } = useQuery<{
        allHumanresource: ISpecialEducationTrainingHR[];
    }>(QUERY_HUMAN_RESOURCE, {
        onCompleted: ({ allHumanresource }) => {
            setData(
                allHumanresource.map(({ name, idno }) => ({
                    label: name,
                    value: idno,
                }))
            );
        },
        onError: (err) => {
            console.log(err);
        },
        fetchPolicy: 'network-only',
    });

    const handleConfirm = () => {
        if (idno) {
            updateFunction({
                variables: {
                    date: dayjs(date).format('YYYY-MM-DD'),
                    idno,
                    item,
                },
            });
            onClose();
        } else defaultErrorToast(toast, '欄位不能為空');
    };

    return (
        <>
            <BlueBodyModal
                title={'新增教育訓練'}
                cancelButton={{
                    name: '取消新增',
                    handleClick: onClose,
                }}
                confirmButton={{
                    name: '確定新增',
                    handleClick: handleConfirm,
                }}
                isOpen={isOpen}
                onClose={onClose}
                modalSize={'sm'}
            >
                <Flex direction={'column'} gap={'20px'}>
                    <Flex
                        gap={'12px'}
                        align={'center'}
                        justify={'space-between'}
                    >
                        <Text
                            variant={'w400s14'}
                            style={{ textAlignLast: 'justify' }}
                            flex={1}
                        >
                            項次
                        </Text>
                        <Select
                            variant={'grayOutline'}
                            width={'160px'}
                            fontSize={'14px'}
                            value={item}
                            onChange={(e) => {
                                setItem(e.target.value as TItem);
                            }}
                        >
                            {ItemsOptions}
                        </Select>
                    </Flex>
                    <Flex
                        gap={'12px'}
                        align={'center'}
                        justify={'space-between'}
                    >
                        <Text
                            variant={'w400s14'}
                            style={{ textAlignLast: 'justify' }}
                            flex={1}
                        >
                            日期
                        </Text>
                        <DatePicker
                            value={date}
                            cleanable={false}
                            oneTap
                            style={{
                                width: '160px',
                                border: '2px solid',
                                borderColor: '#919AA9',
                                borderRadius: '4px',
                                background: '#FFFFFF',
                                color: '#667080',
                            }}
                            onChange={(date) => date && setDate(date)}
                        />
                    </Flex>
                    <Flex
                        gap={'12px'}
                        align={'center'}
                        justify={'space-between'}
                    >
                        <Text
                            variant={'w400s14'}
                            style={{ textAlignLast: 'justify' }}
                            flex={1}
                        >
                            姓名
                        </Text>
                        <InputPicker
                            style={{
                                width: '160px',
                                border: '2px solid',
                                borderColor: '#919AA9',
                                borderRadius: '4px',
                                background: '#FFFFFF',
                                color: '#667080',
                            }}
                            data={data}
                            value={idno}
                            onChange={setIdno}
                            renderMenuItem={(label, item) => {
                                return (
                                    <Flex direction={'column'}>
                                        <Text>{label}</Text>
                                        <Text>{item.value}</Text>
                                    </Flex>
                                );
                            }}
                        />
                    </Flex>
                </Flex>
            </BlueBodyModal>
            {(loading || updateLoading) && <PageLoading />}
        </>
    );
}
