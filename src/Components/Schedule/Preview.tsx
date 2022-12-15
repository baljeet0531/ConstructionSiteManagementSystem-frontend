import React from 'react';

import {
    TableContainer,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Text,
    Flex,
    Button,
} from '@chakra-ui/react';
import { BackIcon, ReplyIcon } from '../../Icons/Icons';
import { gql, useMutation } from '@apollo/client';
import { QUERY_SCHEDULE } from './Schedule';

const CREATE_SCHEDULE = gql`
    mutation createSchedule($siteId: String!, $srcFile: Upload!) {
        createSchedule(siteId: $siteId, srcFile: $srcFile) {
            ok
            message
        }
    }
`;

export default function Preview(props: {
    siteId: string;
    srcFile: File;
    onOpen: Function;
    setPreview: Function;
    setPreviewData: Function;
    // eslint-disable-next-line no-undef
    previewTableElements: JSX.Element[] | undefined;
}) {
    const {
        siteId,
        srcFile,
        onOpen,
        setPreview,
        setPreviewData,
        previewTableElements,
    } = props;

    const [createSchedule] = useMutation(CREATE_SCHEDULE, {
        onCompleted: () => {
            setPreview(false);
            setPreviewData([]);
        },
        onError: (error) => {
            console.log(error);
        },
        refetchQueries: [
            { query: QUERY_SCHEDULE, variables: { siteId: siteId } },
        ],
        fetchPolicy: 'network-only',
    });

    return (
        <Flex w={'100%'} h={'fit-content'} direction={'column'}>
            <Text
                w={'100%'}
                fontSize={'36px'}
                lineHeight={'44px'}
                fontWeight={400}
                fontFamily={'Inter'}
                color={'#667080'}
            >
                總進度表
            </Text>
            <Flex w={'100%'} justify={'space-between'} mt={'11px'}>
                <Button
                    leftIcon={<BackIcon />}
                    bg={'#6670801A'}
                    border={'2px solid #919AA9'}
                    borderRadius={'4px'}
                    color={'#667080'}
                    onClick={() => {
                        setPreview(false);
                        onOpen();
                    }}
                >
                    上一頁
                </Button>
                <Button
                    leftIcon={<ReplyIcon />}
                    bg={'#4C7DE7'}
                    color={'#FFFFFF'}
                    onClick={() => {
                        createSchedule({
                            variables: {
                                siteId: siteId,
                                srcFile: srcFile,
                            },
                        });
                    }}
                >
                    確定匯入
                </Button>
            </Flex>
            <TableContainer
                margin={'auto'}
                mt={'11px'}
                maxH={'76vh'}
                w={'100%'}
                maxW={'100%'}
                overflowY={'auto'}
                bg={'#FFFFFF'}
                border={'1px solid #919AA9'}
                borderBottom={'none'}
            >
                <Table variant={'iemGraySchedule'}>
                    <Thead position={'sticky'} top={0} zIndex={1}>
                        <Tr h={'36px'}>
                            <Th w={'8.5%'} textAlign={'center'}>
                                識別碼
                            </Th>
                            <Th w={'8.5%'} textAlign={'center'}>
                                工作類型
                            </Th>
                            <Th w={'30%'}>工作名稱</Th>
                            <Th w={'13%'}>工期（天數）</Th>
                            <Th w={'20%'}>開始時間</Th>
                            <Th w={'20%'}>結束時間</Th>
                        </Tr>
                    </Thead>
                    <Tbody>{previewTableElements}</Tbody>
                </Table>
            </TableContainer>
        </Flex>
    );
}
