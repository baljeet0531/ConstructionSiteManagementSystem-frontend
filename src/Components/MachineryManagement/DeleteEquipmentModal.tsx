import React from 'react';
import BlueBodyModal from '../Shared/BlueBodyModal';
import { Flex, Text } from '@chakra-ui/react';

export default function DeleteEquipmentModal(props: {
    selectedData: {
        equipment: string;
        number: string;
    }[];
    isOpen: boolean;
    onClose: () => void;
}) {
    const { selectedData, isOpen, onClose } = props;

    return (
        <BlueBodyModal
            title={'刪除機具'}
            cancelButton={{
                name: '取消',
                handleClick: () => {},
            }}
            confirmButton={{
                name: '確定',
                handleClick: () => {},
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
                {selectedData.map(({ equipment, number }, index) => (
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
                            {equipment}
                        </Text>
                        <Text
                            variant={'w400s14'}
                            style={{ textAlignLast: 'justify' }}
                            flex={1}
                        >
                            {number}
                        </Text>
                    </Flex>
                ))}
            </Flex>
        </BlueBodyModal>
    );
}
