import { Flex, Input, Text, useToast } from '@chakra-ui/react';
import React from 'react';
import BlueBodyModal from '../Shared/BlueBodyModal';
import { gql, useMutation } from '@apollo/client';
import { defaultSuccessToast } from '../../Utils/DefaultToast';

const CREATE_MACHINERY = gql`
    mutation CreateMachineryManagement(
        $amount: Int!
        $corp: String!
        $machinery: String!
        $siteId: String!
    ) {
        createMachineryManagement(
            amount: $amount
            corp: $corp
            machinery: $machinery
            siteId: $siteId
        ) {
            ok
            message
        }
    }
`;

export default function CreateEquipmentModal(props: {
    siteId: string;
    isOpen: boolean;
    onClose: () => void;
}) {
    const { siteId, isOpen, onClose } = props;
    const toast = useToast();

    const corpRef = React.useRef<HTMLInputElement>(null);
    const machineryRef = React.useRef<HTMLInputElement>(null);
    const amountRef = React.useRef<HTMLInputElement>(null);

    const [createMachinery] = useMutation(CREATE_MACHINERY, {
        onCompleted: ({ createMachineryManagement }) => {
            const { ok, message } = createMachineryManagement;
            if (ok) defaultSuccessToast(toast, message);
        },
        onError: (err) => {
            console.log(err);
        },
        fetchPolicy: 'network-only',
    });

    const handleClick = () => {
        amountRef.current &&
            corpRef.current &&
            machineryRef.current &&
            createMachinery({
                variables: {
                    siteId: siteId,
                    corp: corpRef.current.value,
                    machinery: machineryRef.current.value,
                    amount: Number(amountRef.current.value),
                },
            });
    };

    return (
        <BlueBodyModal
            title={'新增機具'}
            cancelButton={{
                name: '取消新增',
                handleClick: onClose,
            }}
            confirmButton={{
                name: '確定新增',
                handleClick: handleClick,
            }}
            isOpen={isOpen}
            onClose={onClose}
            modalSize={'sm'}
        >
            <Flex direction={'column'} gap={'20px'}>
                <Flex gap={'12px'} align={'center'} justify={'space-between'}>
                    <Text
                        variant={'w400s14'}
                        style={{ textAlignLast: 'justify' }}
                        flex={1}
                    >
                        廠商名稱
                    </Text>
                    <Input
                        variant={'grayOutline'}
                        width={'160px'}
                        ref={corpRef}
                    />
                </Flex>
                <Flex gap={'12px'} align={'center'} justify={'space-between'}>
                    <Text
                        variant={'w400s14'}
                        style={{ textAlignLast: 'justify' }}
                        flex={1}
                    >
                        主要機具
                    </Text>
                    <Input
                        variant={'grayOutline'}
                        width={'160px'}
                        ref={machineryRef}
                    />
                </Flex>
                <Flex gap={'12px'} align={'center'} justify={'space-between'}>
                    <Text
                        variant={'w400s14'}
                        style={{ textAlignLast: 'justify' }}
                        flex={1}
                    >
                        數量
                    </Text>
                    <Input
                        type="number"
                        variant={'grayOutline'}
                        width={'160px'}
                        ref={amountRef}
                    />
                </Flex>
            </Flex>
        </BlueBodyModal>
    );
}
