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
} from '@chakra-ui/react';
import { gql, useMutation } from '@apollo/client';
import { ALL_HUMAN_RESOURCE } from './PeopleOverview';
import {
    defaultErrorToast,
    defaultSuccessToast,
} from '../../Utils/DefaultToast';
import PageLoading from '../Shared/PageLoading';

const DELETE_HUMAN_RESOURCE = gql`
    mutation DeleteHumanResource($idno: [String!]) {
        deleteHumanResource(idno: $idno) {
            ok
            message
        }
    }
`;

const DELETE_ERROR_HUMAN_RESOURCE = gql`
    mutation DeleteErrHR($nos: [Int!]) {
        deleteErrHR(nos: $nos) {
            ok
            message
        }
    }
`;

export default function DeleteModal(props: {
    isOpen: boolean;
    onClose: () => void;
    selected?: {
        no: number | null | undefined;
        idno: string;
        name: string;
    }[];
    errorOnly: boolean;
}) {
    const toast = useToast();
    const { isOpen, onClose, selected, errorOnly } = props;
    const [deleteHumanResource, { loading }] = useMutation(
        DELETE_HUMAN_RESOURCE,
        {
            onCompleted: ({ deleteHumanResource }) => {
                if (deleteHumanResource.ok) {
                    defaultSuccessToast(toast, deleteHumanResource.message);
                }
            },
            onError: (err) => {
                console.log(err);
                defaultErrorToast(toast);
            },
            refetchQueries: [
                {
                    query: ALL_HUMAN_RESOURCE,
                    variables: { errlist: errorOnly },
                },
            ],
            onQueryUpdated: (observableQuery) => observableQuery.refetch(),
            fetchPolicy: 'network-only',
        }
    );
    const [deleteErrorHumanResource, { loading: errorLoading }] = useMutation(
        DELETE_ERROR_HUMAN_RESOURCE,
        {
            onCompleted: ({ deleteErrHR }) => {
                if (deleteErrHR.ok) {
                    defaultSuccessToast(toast, deleteErrHR.message);
                }
            },
            onError: (err) => {
                console.log(err);
                defaultErrorToast(toast);
            },
            refetchQueries: [
                {
                    query: ALL_HUMAN_RESOURCE,
                    variables: { errlist: errorOnly },
                },
            ],
            onQueryUpdated: (observableQuery) => observableQuery.refetch(),
            fetchPolicy: 'network-only',
        }
    );

    const handleConfirm = () => {
        if (selected && selected.length != 0) {
            errorOnly
                ? deleteErrorHumanResource({
                      variables: {
                          nos: selected.map(
                              (selectedElement) => selectedElement.no
                          ),
                      },
                  })
                : deleteHumanResource({
                      variables: {
                          idno: selected.map(
                              (selectedElement) => selectedElement.idno
                          ),
                      },
                  });
        }
    };

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
                            確定刪除以下人員資料？
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
                                selected.map((selectedElement, index) => {
                                    const { name, idno } = selectedElement;
                                    return (
                                        <Grid
                                            key={index}
                                            width={'164px'}
                                            h={'36px'}
                                            gap={'10px'}
                                            templateColumns={'repeat(2,1fr)'}
                                            alignItems={'center'}
                                        >
                                            <Text>{name}</Text>
                                            <Text>{idno}</Text>
                                        </Grid>
                                    );
                                })}
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
                                    handleConfirm();
                                    onClose();
                                }}
                            >
                                確定
                            </Button>
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            {(loading || errorLoading) && <PageLoading />}
        </>
    );
}
