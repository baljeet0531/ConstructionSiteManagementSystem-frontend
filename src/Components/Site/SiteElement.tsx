import React from 'react';
import SiteAreas from './SiteAreas';
import SiteRoles from './SiteRoles';
import SiteInfo from './SiteInfo';
import { CloseIcon } from '../../Icons/Icons';

import {
    Box,
    Button,
    Center,
    Flex,
    Text,
    IconButton,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
} from '@chakra-ui/react';

import {
    ApolloCache,
    DefaultContext,
    gql,
    MutationHookOptions,
    OperationVariables,
    useMutation,
} from '@apollo/client';
import { QUERY_SITE } from './Site';
import { Cookies } from 'react-cookie';
import { QUERY_ACCOUNT_SITES } from '../../Layouts/Layout';

const DELETE_SITE = gql`
    mutation deleteSite($siteId: String!) {
        deleteSite(siteId: $siteId) {
            ok
        }
    }
`;

const ACTIVE_SITE = gql`
    mutation ActiveSite($siteId: String!) {
        activeSite(siteId: $siteId) {
            ok
        }
    }
`;

export default function Site(props: {
    siteDetails: {
        siteId: any;
        name: string;
        avatar: string;
        start: string;
        end: string;
        city: string;
        archived: Boolean;
    };
    setPopupComponent: Function;
    setShowPopup: Function;
    rerender: Boolean;
    setRerender: Function;
}) {
    const {
        siteDetails,
        setPopupComponent,
        setShowPopup,
        setRerender,
        rerender,
    } = props;
    const { siteId, name: siteName, archived } = siteDetails;
    const { isOpen, onOpen, onClose } = useDisclosure();

    const mutationOptions: MutationHookOptions<
        any,
        OperationVariables,
        DefaultContext,
        ApolloCache<any>
    > = {
        variables: { siteId: siteId },
        onError: (error) => {
            console.log(error);
        },
        refetchQueries: [
            { query: QUERY_SITE },
            {
                query: QUERY_ACCOUNT_SITES,
                variables: {
                    username: new Cookies().get('username'),
                    archived: false,
                },
            },
        ],
    };

    const [deleteSite] = useMutation(DELETE_SITE, mutationOptions);

    const [activeSite] = useMutation(ACTIVE_SITE, mutationOptions);

    return (
        <Box
            w={'100%'}
            border={'1px solid #667080'}
            borderRadius={'10px'}
            bg={'#FFFFFF'}
            mt={'20px'}
            p={'28px 34px'}
            position={'relative'}
        >
            <IconButton
                size={'xs'}
                aria-label="DeleteSite"
                icon={<CloseIcon />}
                bg={'none'}
                position={'absolute'}
                color={'#667080'}
                top={0}
                right={0}
                onClick={onOpen}
            ></IconButton>
            <Flex
                w={'100%'}
                direction={'column'}
                align={'center'}
                justify={'start'}
            >
                <SiteInfo
                    setPopupComponent={setPopupComponent}
                    setShowPopup={setShowPopup}
                    siteDetails={siteDetails}
                ></SiteInfo>
                <SiteRoles
                    siteId={siteId}
                    siteName={siteName}
                    setPopupComponent={setPopupComponent}
                    setShowPopup={setShowPopup}
                    rerender={rerender}
                    setRerender={setRerender}
                ></SiteRoles>
                <SiteAreas
                    siteId={siteId}
                    siteName={siteName}
                    setPopupComponent={setPopupComponent}
                    setShowPopup={setShowPopup}
                ></SiteAreas>
            </Flex>
            {archived && (
                <Center
                    w={'100%'}
                    h={'100%'}
                    zIndex={1}
                    bg={'#919AA9C0'}
                    position={'absolute'}
                    left={0}
                    top={0}
                    borderRadius={'10px'}
                >
                    <Button onClick={onOpen} color={'#667080'}>
                        解除凍結
                    </Button>
                </Center>
            )}
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent
                    maxWidth={'380px'}
                    maxHeight={'266px'}
                    minHeight={'266px'}
                    padding={'30px 45px'}
                >
                    <ModalHeader padding={0}>
                        <Flex direction={'column'} width={'100%'}>
                            <Text
                                fontStyle={'normal'}
                                fontWeight={700}
                                fontSize={'20px'}
                                lineHeight={'20px'}
                                color={'#667080'}
                            >
                                {archived
                                    ? '確定解除凍結以下專案？'
                                    : '確定凍結以下專案？'}
                            </Text>
                        </Flex>
                    </ModalHeader>
                    <ModalBody bg={'#E3ECFF'} borderRadius={'10px'} mt={'20px'}>
                        <Center
                            width={'100%'}
                            height={'102px'}
                            overflowX={'auto'}
                        >
                            <Text color={'#667080'}>{siteName}</Text>
                        </Center>
                    </ModalBody>

                    <ModalFooter padding={0}>
                        <Flex
                            mt={'20px'}
                            justify={'space-between'}
                            width={'100%'}
                        >
                            <Button
                                variant={'buttonGrayOutline'}
                                size={'xs'}
                                onClick={onClose}
                            >
                                取消
                            </Button>
                            <Button
                                variant={'buttonGrayOutline'}
                                size={'xs'}
                                onClick={() => {
                                    archived ? activeSite() : deleteSite();
                                    onClose();
                                }}
                            >
                                確定
                            </Button>
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}
