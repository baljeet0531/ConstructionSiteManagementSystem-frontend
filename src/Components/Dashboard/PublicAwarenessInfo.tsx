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
import { gql, useQuery } from '@apollo/client';
import { defaultErrorToast } from '../../Utils/DefaultToast';

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
    });

    return (
        <Flex direction={'column'} mr={'11px'}>
            <Flex align={'center'} justify={'space-between'}>
                <Text variant={'w700s16'}>宣導事項</Text>
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
            </Flex>
            <Textarea
                ref={awarenessInfoRef}
                defaultValue={awarenessInfoValue}
                mt={'15px'}
                ml={'11px'}
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
            <Flex justify={'flex-end'} gap={'10px'} mt={'15px'}>
                <Button
                    size={'xs'}
                    variant={'whiteOutline'}
                    onClick={() => {
                        if (awarenessInfoRef.current && awarenessInfoValue)
                            awarenessInfoRef.current.value = awarenessInfoValue;
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
                        setEditDisabled(true);
                    }}
                >
                    確定
                </Button>
            </Flex>
            <Text variant={'w700s16'} mt={'20px'}>
                今日執行工項列表
            </Text>
            <TableContainer mt={'15px'} ml={'11px'}>
                <Table variant={'dashboardBlue'} minW={'360px'}>
                    <Thead>
                        <Tr>
                            <Th w={'60px'}>系統別</Th>
                            <Th w={'60px'}>作業區域</Th>
                            <Th w={'60px'}>作業類別</Th>
                            <Th w={'60px'}>施作項目</Th>
                            <Th w={'60px'}>承商名稱</Th>
                            <Th w={'60px'}>施工人數</Th>
                        </Tr>
                    </Thead>
                    <Tbody>{workListElement}</Tbody>
                </Table>
            </TableContainer>
        </Flex>
    );
}
