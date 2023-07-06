import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client';
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
import dayjs from 'dayjs';
import React from 'react';
import { EditIcon } from '../../Icons/Icons';
import {
    defaultErrorToast,
    defaultSuccessToast,
} from '../../Utils/DefaultToast';
import useAuth from '../../Hooks/UseAuth';

interface IGQLInfo {
    title: string;
    workBefore: Date;
    knockOff: Date;
}
interface IGQLToolboxInfo extends IGQLInfo {
    workDuring: Date;
}
interface IGQLEnvInfo extends IGQLInfo {
    number: string;
}
interface IGQLOpInfo extends IGQLInfo {
    number: string;
    name: string;
}

interface adminInfo {
    contractingCorp: string;
    goal: string;
}

const INSTANT_INFO = gql`
    query InstantInfo($siteId: String!) {
        instantInfo(siteId: $siteId) {
            workPermitFinish
            workPermitTotal
            toolboxInfo {
                title
                workBefore
                workDuring
                knockOff
            }
            envInfo {
                number
                title
                workBefore
                knockOff
            }
            opInfo {
                number
                name
                title
                workBefore
                knockOff
            }
        }
    }
`;

const ADMIN_INFO = gql`
    query DashboardAdministration($siteId: String!) {
        dashboardAdministration(siteId: $siteId) {
            contractingCorp
            goal
        }
    }
`;

const CONTRACTING_CORP_NAME = gql`
    query ContractingCorpName($siteId: String!) {
        contractingCorpName(siteId: $siteId)
    }
`;
const UPDATE_ADMIN = gql`
    mutation UpdateDashboardAdministration(
        $content: [gqlAdministrationInput]!
        $siteId: String!
    ) {
        updateDashboardAdministration(content: $content, siteId: $siteId) {
            ok
            message
        }
    }
`;

export default function InstantInfo(props: { siteId: string }) {
    const { siteId } = props;
    const toast = useToast();

    const adminInfoWithGoalAssigned = React.useRef(new Map<string, string>());

    const [workPermitAmount, setWorkPermitAmount] =
        React.useState<[string, string]>();
    const [toolboxInfo, setToolboxInfo] = React.useState<IGQLToolboxInfo[]>([]);
    const [envInfo, setEnvInfo] = React.useState<IGQLEnvInfo[]>([]);
    const [opInfo, setOpInfo] = React.useState<IGQLOpInfo[]>([]);
    const [adminInfo, setAdminInfo] = React.useState<adminInfo[]>([]);

    const [editDisabled, setEditDisabled] = React.useState<boolean>(true);
    const administrationRef = React.useRef<any>();

    const getMap: () => Map<string, HTMLTextAreaElement> = () =>
        administrationRef.current || (administrationRef.current = new Map());

    const saveChange = () => {
        const myMap = getMap();
        const newAdminInfo = Array.from(myMap).map((item) => ({
            contractingCorp: item[0],
            goal: item[1].value,
        }));
        setAdminInfo(newAdminInfo);
        updateAdmin({
            variables: {
                content: newAdminInfo,
                siteId: siteId,
            },
        });
    };

    const cancelChange = () => {
        const myMap = getMap();
        let index = 0;
        myMap.forEach((item) => {
            item.value = adminInfo[index].goal;
            index += 1;
        });
    };

    const formatDate = (date: Date | null) =>
        date ? (
            <Text>{dayjs(date).format('HH:MM')}</Text>
        ) : (
            <Text color={'#DB504A'}>尚未填寫</Text>
        );

    const adminElement = adminInfo.map((element, index) => {
        const { contractingCorp, goal } = element;
        return (
            <Tr key={index}>
                <Td>{contractingCorp}</Td>
                <Td padding={0}>
                    <Textarea
                        ref={(node) => {
                            const map = getMap();
                            node
                                ? map.set(contractingCorp, node)
                                : map.delete(contractingCorp);
                        }}
                        defaultValue={goal}
                        variant={'dashboardAdministration'}
                        disabled={editDisabled}
                    ></Textarea>
                </Td>
            </Tr>
        );
    });

    const toolboxElement = toolboxInfo.map((element, index) => {
        const { title, workBefore, workDuring, knockOff } = element;

        return (
            <Tr key={index}>
                <Td>{title}</Td>
                <Td>{formatDate(workBefore)}</Td>
                <Td>{formatDate(workDuring)}</Td>
                <Td>{formatDate(knockOff)}</Td>
            </Tr>
        );
    });
    const envElement = envInfo.map((element, index) => {
        const { number, title, workBefore, knockOff } = element;

        return (
            <Tr key={index}>
                <Td>{number}</Td>
                <Td>{title}</Td>
                <Td>{formatDate(workBefore)}</Td>
                <Td>{formatDate(knockOff)}</Td>
            </Tr>
        );
    });
    const opElement = opInfo.map((element, index) => {
        const { number, name, title, workBefore, knockOff } = element;

        return (
            <Tr key={index}>
                <Td>{number}</Td>
                <Td>{name}</Td>
                <Td>{title}</Td>
                <Td>{formatDate(workBefore)}</Td>
                <Td>{formatDate(knockOff)}</Td>
            </Tr>
        );
    });

    useQuery(INSTANT_INFO, {
        variables: {
            siteId: siteId,
        },
        onCompleted: ({ instantInfo }) => {
            const {
                workPermitFinish,
                workPermitTotal,
                toolboxInfo,
                envInfo,
                opInfo,
            } = instantInfo;
            setWorkPermitAmount([workPermitFinish, workPermitTotal]);
            setToolboxInfo(toolboxInfo);
            setEnvInfo(envInfo);
            setOpInfo(opInfo);
        },
        onError: (err) => {
            console.log(err);
            defaultErrorToast(toast);
        },
        fetchPolicy: 'network-only',
    });

    useQuery(ADMIN_INFO, {
        variables: {
            siteId: siteId,
        },
        onCompleted: ({
            dashboardAdministration,
        }: {
            dashboardAdministration: adminInfo[];
        }) => {
            dashboardAdministration.forEach((element) => {
                const { contractingCorp, goal } = element;
                adminInfoWithGoalAssigned.current.set(contractingCorp, goal);
            });
            getCorpName();
        },
        onError: (err) => {
            console.log(err);
            defaultErrorToast(toast);
        },
        fetchPolicy: 'network-only',
    });

    const [getCorpName] = useLazyQuery(CONTRACTING_CORP_NAME, {
        variables: {
            siteId: siteId,
        },
        onCompleted: ({
            contractingCorpName,
        }: {
            contractingCorpName: string[];
        }) => {
            const adminInfoAll = contractingCorpName.sort().map((corpName) => {
                return {
                    contractingCorp: corpName,
                    goal: adminInfoWithGoalAssigned.current.get(corpName) || '',
                };
            });
            setAdminInfo(adminInfoAll);
        },
        onError: (err) => {
            console.log(err);
            defaultErrorToast(toast);
        },
        fetchPolicy: 'network-only',
    });

    const [updateAdmin] = useMutation(UPDATE_ADMIN, {
        onCompleted: ({ updateDashboardAdministration }) => {
            if (updateDashboardAdministration.ok) {
                defaultSuccessToast(
                    toast,
                    updateDashboardAdministration.message
                );
            }
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
            <Text variant={'w700s16'}>即時資訊</Text>
            <Flex mt={'10px'}>
                <Text variant={'dashboardList'}>
                    工作許可單（完成數/申請數）：
                </Text>
                <Text
                    variant={'dashboardList'}
                    fontWeight={700}
                    fontSize={'1rem'}
                >
                    {workPermitAmount
                        ? `${workPermitAmount[0]}張/${workPermitAmount[1]}張`
                        : '--'}
                </Text>
            </Flex>
            <Text variant={'dashboardList'}>工具箱會議</Text>
            <TableContainer>
                <Table variant={'dashboardBlue'}>
                    <Thead>
                        <Tr>
                            <Th w={'150px'}>地點/系統/分類/項目</Th>
                            <Th w={'50px'}>施工前</Th>
                            <Th w={'50px'}>施工中</Th>
                            <Th w={'50px'}>收工前</Th>
                        </Tr>
                    </Thead>
                    <Tbody>{toolboxElement}</Tbody>
                </Table>
            </TableContainer>
            <Text variant={'dashboardList'}>自主檢查</Text>
            <TableContainer>
                <Table variant={'dashboardBlue'}>
                    <Thead>
                        <Tr>
                            <Th w={'60px'}>單號</Th>
                            <Th w={'140px'}>單位/地點</Th>
                            <Th w={'50px'}>施工前</Th>
                            <Th w={'50px'}>收工前</Th>
                        </Tr>
                    </Thead>
                    <Tbody>{envElement}</Tbody>
                </Table>
            </TableContainer>
            <Text variant={'dashboardList'}>特殊作業</Text>
            <TableContainer>
                <Table variant={'dashboardBlue'}>
                    <Thead>
                        <Tr>
                            <Th w={'60px'}>單號</Th>
                            <Th w={'75px'}>類別</Th>
                            <Th w={'65px'}>單位/地點</Th>
                            <Th w={'50px'}>施工前</Th>
                            <Th w={'50px'}>收工前</Th>
                        </Tr>
                    </Thead>
                    <Tbody>{opElement}</Tbody>
                </Table>
            </TableContainer>
            <Flex align={'center'} justify={'space-between'}>
                <Text variant={'dashboardList'}>週月管理值</Text>
                {actions.find((action) => action === 'U') && (
                    <IconButton
                        size={'xs'}
                        h={'20px'}
                        color={'#667080'}
                        bg={'#FFFFFF'}
                        aria-label="edit administration"
                        icon={<EditIcon />}
                        onClick={() => {
                            setEditDisabled(false);
                        }}
                    />
                )}
            </Flex>
            <TableContainer>
                <Table variant={'dashboardBlue'}>
                    <Thead>
                        <Tr>
                            <Th w={'150px'}>承商</Th>
                            <Th w={'150px'}>目標值</Th>
                        </Tr>
                    </Thead>
                    <Tbody>{adminElement}</Tbody>
                </Table>
            </TableContainer>
            {!editDisabled && (
                <Flex justify={'flex-end'} gap={'10px'} mt={'15px'}>
                    <Button
                        size={'xs'}
                        variant={'whiteOutline'}
                        onClick={() => {
                            cancelChange();
                            setEditDisabled(true);
                        }}
                    >
                        取消
                    </Button>
                    <Button
                        size={'xs'}
                        variant={'buttonBlueSolid'}
                        onClick={() => {
                            saveChange();
                            setEditDisabled(true);
                        }}
                    >
                        確定
                    </Button>
                </Flex>
            )}
        </Flex>
    );
}
