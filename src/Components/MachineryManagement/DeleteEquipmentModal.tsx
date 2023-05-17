import React from 'react';
import BlueBodyModal from '../Shared/BlueBodyModal';
import { Flex, Text, useToast } from '@chakra-ui/react';
import { gql, useMutation } from '@apollo/client';
import {
    defaultErrorToast,
    defaultSuccessToast,
} from '../../Utils/DefaultToast';
import { QUERY_MACHINERY } from './MachineryManagement';

const DELETE_MACHINERY = gql`
    mutation DeleteMachineryManagement($checkId: [String]!, $siteId: String!) {
        deleteMachineryManagement(checkId: $checkId, siteId: $siteId) {
            ok
            message
        }
    }
`;

export default function DeleteEquipmentModal(props: {
    siteId: string;
    selectedData: {
        mainEquipment: string;
        inspectionNo: string;
    }[];
    isOpen: boolean;
    onClose: () => void;
}) {
    const { siteId, selectedData, isOpen, onClose } = props;
    const toast = useToast();

    const [deleteMachinery] = useMutation(DELETE_MACHINERY, {
        onCompleted: ({ deleteMachineryManagement }) => {
            const { ok, message } = deleteMachineryManagement;
            if (ok) defaultSuccessToast(toast, message);
        },
        onError: (err) => {
            console.log(err);
            defaultErrorToast(toast);
        },
        fetchPolicy: 'network-only',
        refetchQueries: [
            { query: QUERY_MACHINERY, variables: { siteId: siteId } },
        ],
    });

    return (
        <BlueBodyModal
            title={'刪除機具'}
            cancelButton={{
                name: '取消',
                handleClick: onClose,
            }}
            confirmButton={{
                name: '確定',
                handleClick: () => {
                    deleteMachinery({
                        variables: {
                            siteId: siteId,
                            checkId: selectedData.map(
                                ({ inspectionNo }) => inspectionNo
                            ),
                        },
                    });
                },
            }}
            isOpen={isOpen}
            onClose={onClose}
            modalSize={'xs'}
            bodyStyle={{
                maxHeight: '200px',
            }}
        >
            <Flex
                direction={'column'}
                gap={'16px'}
                align={'center'}
                justify={'center'}
            >
                {selectedData.map(({ mainEquipment, inspectionNo }, index) => (
                    <Flex
                        key={index}
                        gap={'15px'}
                        align={'center'}
                        justify={'space-around'}
                    >
                        <Text
                            variant={'w400s14'}
                            style={{ textAlignLast: 'justify' }}
                            flex={1}
                        >
                            {mainEquipment}
                        </Text>
                        <Text
                            variant={'w400s14'}
                            style={{ textAlignLast: 'justify' }}
                            flex={1}
                        >
                            {inspectionNo}
                        </Text>
                    </Flex>
                ))}
            </Flex>
        </BlueBodyModal>
    );
}
