import React from 'react';
import { gql, useMutation } from '@apollo/client';

import { Center, Flex, Text, Button, useToast } from '@chakra-ui/react';
import { QUERY_SITE_AREAS } from '../SiteAreas';
import {
    defaultErrorToast,
    defaultSuccessToast,
} from '../../../Utils/DefaultToast';
import { FormLoading } from '../../Shared/Loading';

const DELETE_AREA = gql`
    mutation DeleteSiteArea($siteId: String!, $name: String!) {
        deleteSiteArea(siteId: $siteId, name: $name) {
            ok
        }
    }
`;

export default function DeleteArea(props: {
    setShowPopup: Function;
    areaName: string;
    siteId: string;
    siteName: string;
}) {
    const toast = useToast();
    const { setShowPopup, areaName, siteId, siteName } = props;
    const [deleteSiteArea, { loading }] = useMutation<{
        deleteSiteArea: { ok: boolean };
    }>(DELETE_AREA, {
        onCompleted: ({ deleteSiteArea: { ok } }) => {
            if (ok) {
                setShowPopup(false);
                defaultSuccessToast(toast, '成功刪除');
            } else defaultErrorToast(toast);
        },
        onError: (err) => {
            console.log(err);
            defaultErrorToast(toast);
        },
        refetchQueries: [
            { query: QUERY_SITE_AREAS, variables: { siteId: siteId } },
        ],
        onQueryUpdated: (observableQuery) => observableQuery.refetch(),
        fetchPolicy: 'network-only',
    });
    return loading ? (
        <FormLoading />
    ) : (
        <Center
            position={'absolute'}
            top={0}
            left={0}
            w={'100vw'}
            h={'100vh'}
            bg={'#D9D9D980'}
            zIndex={2}
        >
            <Center
                border={'1px solid #667080'}
                w={'380px'}
                borderRadius={'10px'}
                bg={'#FFFFFF'}
                p={'30px 45px'}
            >
                <Flex
                    h={'100%'}
                    w={'100%'}
                    direction={'column'}
                    color={'#667080'}
                >
                    <Text
                        fontWeight={700}
                        fontSize={'20px'}
                        lineHeight={'20px'}
                    >
                        確定刪除以下廠區資料？
                    </Text>
                    <Text
                        fontWeight={500}
                        fontSize={'12px'}
                        lineHeight={'20px'}
                        textAlign={'end'}
                    >
                        {siteName}
                    </Text>
                    <Flex
                        direction={'column'}
                        rowGap={'20px'}
                        bg={'#E3ECFF'}
                        borderRadius={'10px'}
                        p={'41px 20px'}
                    >
                        <Text
                            fontWeight={400}
                            fontSize={'14px'}
                            lineHeight={'20px'}
                        >
                            {areaName}
                        </Text>
                    </Flex>
                    <Flex justify={'space-between'} h="36px" mt={'20px'}>
                        <Button
                            onClick={() => {
                                setShowPopup(false);
                            }}
                        >
                            取消
                        </Button>
                        <Button
                            onClick={() => {
                                deleteSiteArea({
                                    variables: {
                                        siteId: siteId,
                                        name: areaName,
                                    },
                                });
                            }}
                        >
                            確定
                        </Button>
                    </Flex>
                </Flex>
            </Center>
        </Center>
    );
}
