import React from 'react';
import {
    Button,
    Flex,
    IconButton,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Textarea,
    Th,
    Thead,
    Tr,
    useToast,
} from '@chakra-ui/react';
import { EditIcon } from '../../Icons/Icons';
import { gql, useMutation, useQuery } from '@apollo/client';
import {
    defaultErrorToast,
    defaultSuccessToast,
} from '../../Utils/DefaultToast';
import useAuth from '../../Hooks/UseAuth';

interface IGQLTodayWorkList {
    system: string;
    area: string;
    opType: string;
    workItem: string;
    corpName: string;
    laborAmount: string;
}

const AWARENESS_INFO = gql`
    query DashboardPublicMatters($siteId: String!) {
        dashboardPublicMatters(siteId: $siteId)
    }
`;
const WORK_LIST = gql`
    query TodayWorkList($siteId: String!) {
        todayWorkList(siteId: $siteId) {
            system
            area
            opType
            workItem
            corpName
            laborAmount
        }
    }
`;

const UPDATE_AWARENESS = gql`
    mutation UpdateDashboardMatters($matters: String!, $siteId: String!) {
        updateDashboardMatters(matters: $matters, siteId: $siteId) {
            ok
            message
        }
    }
`;

export default function PublicAwarenessInfo(props: { siteId: string }) {
    const { siteId } = props;
    const toast = useToast();

    const [editDisabled, setEditDisabled] = React.useState<boolean>(true);
    const awarenessInfoRef = React.useRef<HTMLTextAreaElement>(null);
    const [awarenessInfoValue, setAwarenessInfoValue] =
        React.useState<string>('');
    const [workList, setWorkList] = React.useState<IGQLTodayWorkList[]>([]);

    const workListElement = workList.map(
        ({ system, area, opType, workItem, corpName, laborAmount }, index) => (
            <Tr key={index}>
                <Td>{system}</Td>
                <Td>{area}</Td>
                <Td>{opType}</Td>
                <Td>{workItem}</Td>
                <Td>{corpName}</Td>
                <Td>{laborAmount}</Td>
            </Tr>
        )
    );

    useQuery(AWARENESS_INFO, {
        variables: {
            siteId: siteId,
        },
        onCompleted: ({ dashboardPublicMatters }) => {
            setAwarenessInfoValue(dashboardPublicMatters);
        },
        onError: (err) => {
            console.log(err);
            defaultErrorToast(toast);
        },
        fetchPolicy: 'network-only',
    });

    const [updateAwareness] = useMutation(UPDATE_AWARENESS, {
        onCompleted: ({ updateDashboardMatters }) => {
            if (updateDashboardMatters.ok) {
                defaultSuccessToast(toast, updateDashboardMatters.message);
            }
        },
        onError: (err) => {
            console.log(err);
            defaultErrorToast(toast);
        },
        fetchPolicy: 'network-only',
    });

    useQuery(WORK_LIST, {
        variables: {
            siteId: siteId,
        },
        onCompleted: ({ todayWorkList }) => {
            setWorkList(todayWorkList);
        },
        onError: (err) => {
            console.log(err);
            defaultErrorToast(toast);
        },
        fetchPolicy: 'network-only',
    });

    const {
        actions,
        lazyQueryResultTuple: [queryAuth],
    } = useAuth();

    React.useEffect(() => {
        siteId &&
            queryAuth({
                variables: {
                    siteId: siteId,
                    service: '即時資訊欄',
                    subService: 'ALL',
                },
            });
    }, [siteId]);

    return (
        <Flex direction={'column'}>
            <Flex align={'center'} justify={'space-between'}>
                <Text variant={'w700s16'}>宣導事項</Text>
                {actions.find((action) => action === 'U') && (
                    <IconButton
                        size={'xs'}
                        h={'20px'}
                        color={'#667080'}
                        bg={'#FFFFFF'}
                        aria-label="edit awareness"
                        icon={<EditIcon />}
                        onClick={() => {
                            setEditDisabled(false);
                        }}
                    />
                )}
            </Flex>
            <Textarea
                ref={awarenessInfoRef}
                defaultValue={awarenessInfoValue}
                mt={'15px'}
                h={'205px'}
                w={'auto'}
                resize={'none'}
                border={'2px dashed '}
                borderColor={'#EA9895'}
                color={'#667080'}
                bg={'#66708030'}
                _hover={{
                    borderColor: '#EA9895',
                }}
                _disabled={{
                    cursor: 'default',
                    opacity: 1,
                    bg: '#FFFFFF',
                }}
                disabled={editDisabled}
            ></Textarea>
            {!editDisabled && (
                <Flex justify={'flex-end'} gap={'10px'} mt={'15px'}>
                    <Button
                        size={'xs'}
                        variant={'whiteOutline'}
                        onClick={() => {
                            if (awarenessInfoRef.current && awarenessInfoValue)
                                awarenessInfoRef.current.value =
                                    awarenessInfoValue;
                            setEditDisabled(true);
                        }}
                    >
                        取消
                    </Button>
                    <Button
                        size={'xs'}
                        variant={'buttonBlueSolid'}
                        onClick={() => {
                            setAwarenessInfoValue(
                                awarenessInfoRef.current?.value || ''
                            );
                            updateAwareness({
                                variables: {
                                    siteId: siteId,
                                    matters:
                                        awarenessInfoRef.current?.value || '',
                                },
                            });
                            setEditDisabled(true);
                        }}
                    >
                        確定
                    </Button>
                </Flex>
            )}
            <Text variant={'w700s16'} mt={'20px'}>
                今日執行工項列表
            </Text>
            <TableContainer mt={'15px'}>
                <Table variant={'dashboardBlue'}>
                    <Thead>
                        <Tr>
                            <Th w={'50px'}>系統別</Th>
                            <Th w={'50px'}>作業區域</Th>
                            <Th w={'50px'}>作業類別</Th>
                            <Th w={'50px'}>施作項目</Th>
                            <Th w={'50px'}>承商名稱</Th>
                            <Th w={'50px'}>施工人數</Th>
                        </Tr>
                    </Thead>
                    <Tbody>{workListElement}</Tbody>
                </Table>
            </TableContainer>
        </Flex>
    );
}
