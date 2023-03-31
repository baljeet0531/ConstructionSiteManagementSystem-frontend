import { gql, useMutation } from '@apollo/client';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
    Button,
    useToast,
} from '@chakra-ui/react';
import React from 'react';
import {
    defaultErrorToast,
    defaultSuccessToast,
} from '../../Utils/DefaultToast';
import { IPhotosDataChecked } from './Interface';
import { QUERY_IMAGE_OPTIONS } from './Photo';
import { QUERY_FILTER_PHOTOS, QUERY_PHOTOS } from './PhotoOverviewPage';

const DELETE_PHOTOS = gql`
    mutation DeleteImageManagement($no: [Int]!) {
        deleteImageManagement(no: $no) {
            ok
            message
        }
    }
`;

export default function DeleteModal(props: {
    checkedRef: React.MutableRefObject<IPhotosDataChecked>;
    isOpen: boolean;
    onClose: () => void;
}) {
    const { checkedRef, isOpen, onClose } = props;
    const toast = useToast();

    const [deletePhotos] = useMutation(DELETE_PHOTOS, {
        onCompleted: ({ deleteImageManagement }) => {
            const { ok, message } = deleteImageManagement;
            if (ok) {
                defaultSuccessToast(toast, message);
            }
        },
        onError: (err) => {
            console.log(err);
            defaultErrorToast(toast);
        },
        fetchPolicy: 'network-only',
        refetchQueries: [
            QUERY_PHOTOS,
            QUERY_FILTER_PHOTOS,
            QUERY_IMAGE_OPTIONS,
        ],
    });

    const selectedNumbers = Object.values(checkedRef.current).flatMap((date) =>
        Object.values(date.categories).flatMap((category) =>
            Object.values(category.photos).flatMap(({ isChecked, no }) =>
                isChecked ? no : []
            )
        )
    );

    const handleDelete = () => {
        deletePhotos({
            variables: {
                no: selectedNumbers,
            },
        });
        onClose();
    };
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent padding={'24px'}>
                <ModalHeader padding={0} pt={'6px'} pb={'6px'} mb={'16px'}>
                    <Text
                        fontSize={'1.25rem'}
                        lineHeight={'1.5rem'}
                        fontWeight={'700'}
                    >
                        確定要刪除 {selectedNumbers.length} 張相片嗎？
                    </Text>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody padding={0} mb={'16px'}>
                    <Text variant={'w400s14'}>
                        刪除所選相片後將無法復原，確定要刪除嗎？
                    </Text>
                </ModalBody>
                <ModalFooter padding={0}>
                    <Button variant={'whiteOutline'} mr={3} onClick={onClose}>
                        取消
                    </Button>
                    <Button variant={'buttonBlueSolid'} onClick={handleDelete}>
                        確認
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
