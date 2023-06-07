import { Box, Button, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { dataCellStyle, getElementProps } from '../Shared/ReactWindowTable';
import RemarksModal from './RemarksModal';

export default function Remarks(
    props: getElementProps & { editable: boolean }
) {
    const { info, style, editable } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box
            key={info['inspectionNo']}
            {...dataCellStyle}
            style={{
                ...style,
                padding: '0px',
            }}
        >
            <Button
                variant={'ghost'}
                height={'30px'}
                width={'100%'}
                colorScheme={'twitter'}
                fontFamily={'Inter'}
                fontStyle={'normal'}
                fontWeight={400}
                fontSize={'14px'}
                lineHeight={'20px'}
                color={'#4C7DE7'}
                onClick={onOpen}
            >
                查看更多
            </Button>
            <RemarksModal
                isOpen={isOpen}
                onClose={onClose}
                info={info}
                editable={editable}
            />
        </Box>
    );
}
