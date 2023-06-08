import React from 'react';
import { Box, Button, useDisclosure } from '@chakra-ui/react';
import EHSFormModal from './Modal';
import { dataCellStyle, getElementProps } from '../Shared/ReactWindowTable';
import {
    EHSFormName,
    IEHSFormOverviewChecked,
} from '../../Interface/EHSForm/Common';

export default function EHSForm(
    props: getElementProps & { type: EHSFormName }
) {
    const {
        style,
        info: { siteId, day },
        type,
    }: {
        style: React.CSSProperties;
        info: IEHSFormOverviewChecked;
        type: EHSFormName;
    } = props;

    const { onOpen, onClose, isOpen } = useDisclosure();
    return (
        <Box key={day} {...dataCellStyle} style={style} pt={0} p={0}>
            <Button
                variant={'ghost'}
                height={'44px'}
                width={'100%'}
                fontFamily={'Inter'}
                fontStyle={'normal'}
                fontWeight={400}
                fontSize={'14px'}
                lineHeight={'20px'}
                color={'#667080'}
                onClick={onOpen}
            >
                {day}
            </Button>
            <EHSFormModal
                siteId={siteId}
                day={day}
                type={type}
                onClose={onClose}
                isOpen={isOpen}
            />
        </Box>
    );
}
