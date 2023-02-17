import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Text,
    Grid,
    Flex,
    Button,
    useToast,
    Center,
    Spinner,
} from '@chakra-ui/react';
import { gql, useMutation } from '@apollo/client';
import { SITE_LABOR } from './Organization';
import {
    defaultErrorToast,
    defaultSuccessToast,
} from '../../Utils/DefaultToast';

const DELETE_SITE_LABOR = gql`
    mutation DeleteSiteLabor($idno: [String]!, $siteId: String!) {
        deleteSiteLabor(idno: $idno, siteId: $siteId) {
            ok
            message
        }
    }
`;

export default function DeleteLaborModal(props: {
    siteId: string;
    isOpen: boolean;
    onClose: () => void;
    selected?: { name: string; idno: string }[];
}) {
    const toast = useToast();
    const { siteId, isOpen, onClose, selected } = props;
    const [deleteSiteLabor, { loading }] = useMutation(DELETE_SITE_LABOR, {
        onCompleted: ({ deleteSiteLabor }) => {
            if (deleteSiteLabor.ok) {
                defaultSuccessToast(toast, deleteSiteLabor.message);
            }
        },
        onError: (err) => {
            console.log(err);
            defaultErrorToast(toast);
        },
        refetchQueries: [
            {
                query: SITE_LABOR,
                variables: {
                    siteId: siteId,
                },
            },
        ],
        fetchPolicy: 'network-only',
    });

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent
                    maxWidth={'330px'}
                    maxHeight={'500px'}
                    minHeight={'266px'}
                    padding={'30px 45px 30px 45px'}
                >
                    <ModalHeader padding={0}>
                        <Text
                            fontStyle={'normal'}
                            fontWeight={700}
                            fontSize={'20px'}
                            lineHeight={'20px'}
                        >
                            確定將以下人員移除專案？
                        </Text>
                    </ModalHeader>
                    <ModalBody
                        bg={'#E3ECFF'}
                        mt={'20px'}
                        padding={'41px 37px'}
                        borderRadius={'10px'}
                        overflowY={'auto'}
                        maxHeight={'300px'}
                        minHeight={'118px'}
                    >
                        <Flex
                            width={'100%'}
                            height={'100%'}
                            bg={'#E3ECFF'}
                            direction={'column'}
                            gap={'10px'}
                        >
                            {selected &&
                                Object.values(selected).map(
                                    (selectedElement, index) => {
                                        const { name, idno } = selectedElement;
                                        return (
                                            <Grid
                                                key={index}
                                                width={'164px'}
                                                h={'36px'}
                                                gap={'10px'}
                                                templateColumns={
                                                    'repeat(2,1fr)'
                                                }
                                                alignItems={'center'}
                                            >
                                                <Text>{name}</Text>
                                                <Text>{idno}</Text>
                                            </Grid>
                                        );
                                    }
                                )}
                        </Flex>
                    </ModalBody>

                    <ModalFooter padding={0} mt={'20px'}>
                        <Flex justify={'space-between'} width={'100%'}>
                            <Button
                                variant={'buttonGrayOutline'}
                                size={'sm'}
                                mr={3}
                                onClick={onClose}
                            >
                                取消
                            </Button>
                            <Button
                                variant={'buttonGrayOutline'}
                                size={'sm'}
                                onClick={() => {
                                    if (selected && selected.length != 0) {
                                        deleteSiteLabor({
                                            variables: {
                                                idno: Object.values(
                                                    selected
                                                ).map(
                                                    (selectedElement) =>
                                                        selectedElement.idno
                                                ),
                                                siteId: siteId,
                                            },
                                        });
                                    }
                                    onClose();
                                }}
                            >
                                確定
                            </Button>
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            {loading && (
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
            )}
        </>
    );
}
